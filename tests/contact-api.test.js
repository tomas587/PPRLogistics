import test from 'node:test';
import assert from 'node:assert/strict';
import { randomUUID, generateKeyPairSync, verify } from 'node:crypto';
import contactHandler from '../api/contact.js';
import { tryAcquireSubmissionLock } from '../src/utils/submissionLock.js';

const envKeys = [
  'ENTRA_TENANT_ID',
  'ENTRA_CLIENT_ID',
  'ENTRA_CLIENT_SECRET',
  'ENTRA_CERTIFICATE_PRIVATE_KEY',
  'ENTRA_CERTIFICATE_THUMBPRINT',
  'SENDER_MAILBOX',
  'CONTACT_EMAIL',
  'FRONTEND_URL',
];

const workingConfig = {
  ENTRA_TENANT_ID: 'tenant-test',
  ENTRA_CLIENT_ID: 'client-test',
  ENTRA_CLIENT_SECRET: 'test-secret',
  SENDER_MAILBOX: 'sender@prplogistic.com',
  CONTACT_EMAIL: 'Info@pprlogistics.net',
  FRONTEND_URL: 'https://ppr.example',
};

const validForm = {
  name: 'Test Sender',
  email: 'sender@example.com',
  subject: 'Test request',
  message: 'Test message body',
};

async function withEnvironment(values, callback) {
  const previous = Object.fromEntries(envKeys.map((key) => [key, process.env[key]]));
  for (const key of envKeys) delete process.env[key];
  for (const [key, value] of Object.entries(values)) {
    if (value === undefined) delete process.env[key];
    else process.env[key] = value;
  }
  try {
    await callback();
  } finally {
    for (const key of envKeys) {
      if (previous[key] === undefined) delete process.env[key];
      else process.env[key] = previous[key];
    }
  }
}

function makeResponse() {
  return {
    statusCode: 0,
    body: undefined,
    headers: {},
    setHeader(name, value) { this.headers[name.toLowerCase()] = value; },
    status(code) { this.statusCode = code; return this; },
    json(body) { this.body = body; return this; },
  };
}

function makeRequest({ method = 'POST', body = validForm, headers = {}, ip = randomUUID() } = {}) {
  const serializedBody = body === undefined ? '' : JSON.stringify(body);
  return {
    method,
    body,
    headers: {
      'content-type': 'application/json',
      'content-length': String(Buffer.byteLength(serializedBody)),
      'x-forwarded-for': ip,
      ...headers,
    },
  };
}

async function invoke(options) {
  const res = makeResponse();
  await contactHandler(makeRequest(options), res);
  return res;
}

function graphSuccessFetch(onSend = () => {}) {
  return async (url, options) => {
    if (String(url).includes('/oauth2/v2.0/token')) {
      return new Response(JSON.stringify({ access_token: 'unit-test-access-token', expires_in: 3600 }), { status: 200 });
    }
    await onSend(url, options);
    return new Response(null, { status: 202 });
  };
}

test('valid submission sends to the configured recipient and succeeds only on Graph 202', async () => {
  await withEnvironment(workingConfig, async () => {
    const originalFetch = globalThis.fetch;
    let graphRequest;
    globalThis.fetch = graphSuccessFetch((url, options) => { graphRequest = { url, options }; });
    try {
      const response = await invoke({ headers: { origin: workingConfig.FRONTEND_URL } });
      assert.equal(response.statusCode, 200);
      assert.deepEqual(response.body, { success: true, message: 'Message sent successfully.' });
      assert.equal(response.headers['access-control-allow-origin'], workingConfig.FRONTEND_URL);
      assert.equal(graphRequest.url, 'https://graph.microsoft.com/v1.0/users/sender%40prplogistic.com/sendMail');
      assert.equal(graphRequest.options.headers.Authorization, 'Bearer unit-test-access-token');
      const mail = JSON.parse(graphRequest.options.body).message;
      assert.equal(mail.toRecipients[0].emailAddress.address, 'Info@pprlogistics.net');
      assert.equal(mail.replyTo[0].emailAddress.address, validForm.email);
      assert.equal(mail.subject, validForm.subject);
    } finally {
      globalThis.fetch = originalFetch;
    }
  });
});

test('certificate credentials produce a signed client assertion and require a fresh expiring access token', async () => {
  const { privateKey, publicKey } = generateKeyPairSync('rsa', { modulusLength: 2048 });
  const thumbprint = '0123456789abcdef0123456789abcdef01234567';
  const expectedThumbprint = Buffer.from(thumbprint, 'hex').toString('base64url');
  await withEnvironment({
    ...workingConfig,
    ENTRA_CLIENT_SECRET: undefined,
    ENTRA_CERTIFICATE_PRIVATE_KEY: privateKey.export({ type: 'pkcs8', format: 'pem' }),
    ENTRA_CERTIFICATE_THUMBPRINT: thumbprint,
  }, async () => {
    const originalFetch = globalThis.fetch;
    let certificateAssertion;
    globalThis.fetch = async (url, options) => {
      if (String(url).includes('/oauth2/v2.0/token')) {
        const params = new URLSearchParams(options.body);
        certificateAssertion = params.get('client_assertion');
        assert.equal(params.get('scope'), 'https://graph.microsoft.com/.default');
        assert.equal(params.get('client_assertion_type'), 'urn:ietf:params:oauth:client-assertion-type:jwt-bearer');
        return new Response(JSON.stringify({ access_token: 'certificate-access-token', expires_in: 3600 }), { status: 200 });
      }
      return new Response(null, { status: 202 });
    };
    try {
      const response = await invoke();
      assert.equal(response.statusCode, 200);
      const [encodedHeader, encodedClaims, encodedSignature] = certificateAssertion.split('.');
      const payload = `${encodedHeader}.${encodedClaims}`;
      const header = JSON.parse(Buffer.from(encodedHeader, 'base64url').toString('utf8'));
      const claims = JSON.parse(Buffer.from(encodedClaims, 'base64url').toString('utf8'));
      assert.equal(header.alg, 'RS256');
      assert.equal(header.x5t, expectedThumbprint);
      assert.equal(claims.aud, 'https://login.microsoftonline.com/tenant-test/oauth2/v2.0/token');
      assert.ok(claims.exp > claims.nbf);
      assert.equal(verify('RSA-SHA256', Buffer.from(payload), publicKey, Buffer.from(encodedSignature, 'base64url')), true);
    } finally {
      globalThis.fetch = originalFetch;
    }
  });
});

test('missing required fields return 400 without contacting Microsoft Graph', async () => {
  await withEnvironment(workingConfig, async () => {
    const originalFetch = globalThis.fetch;
    globalThis.fetch = async () => { throw new Error('Graph must not be contacted'); };
    try {
      const response = await invoke({ body: { ...validForm, message: ' ' } });
      assert.equal(response.statusCode, 400);
      assert.equal(response.body.success, false);
    } finally {
      globalThis.fetch = originalFetch;
    }
  });
});

test('malformed email addresses return 400', async () => {
  await withEnvironment(workingConfig, async () => {
    const response = await invoke({ body: { ...validForm, email: 'not-an-email' } });
    assert.equal(response.statusCode, 400);
    assert.match(response.body.message, /valid email/i);
  });
});

test('missing mail configuration returns 503 and does not fall back to a personal recipient', async () => {
  await withEnvironment({}, async () => {
    const originalFetch = globalThis.fetch;
    globalThis.fetch = async () => { throw new Error('Graph must not be contacted'); };
    try {
      const response = await invoke();
      assert.equal(response.statusCode, 503);
      assert.equal(response.body.success, false);
    } finally {
      globalThis.fetch = originalFetch;
    }
  });
});

test('Graph authentication errors return a sanitized 502', async () => {
  await withEnvironment(workingConfig, async () => {
    const originalFetch = globalThis.fetch;
    globalThis.fetch = async () => new Response(JSON.stringify({ error: 'private token detail' }), { status: 401 });
    try {
      const response = await invoke();
      assert.equal(response.statusCode, 502);
      assert.doesNotMatch(JSON.stringify(response.body), /private token detail|test-secret|access-token/i);
    } finally {
      globalThis.fetch = originalFetch;
    }
  });
});

test('invalid token expiration is rejected and hidden from the visitor', async () => {
  await withEnvironment(workingConfig, async () => {
    const originalFetch = globalThis.fetch;
    globalThis.fetch = async () => new Response(JSON.stringify({ access_token: 'bad-token' }), { status: 200 });
    try {
      const response = await invoke();
      assert.equal(response.statusCode, 502);
      assert.doesNotMatch(JSON.stringify(response.body), /bad-token/);
    } finally {
      globalThis.fetch = originalFetch;
    }
  });
});

test('Graph rejection does not return success or expose upstream details', async () => {
  await withEnvironment(workingConfig, async () => {
    const originalFetch = globalThis.fetch;
    globalThis.fetch = async (url) => {
      if (String(url).includes('/oauth2/v2.0/token')) {
        return new Response(JSON.stringify({ access_token: 'unit-test-access-token', expires_in: 3600 }), { status: 200 });
      }
      return new Response(JSON.stringify({ error: 'mailbox secret failure' }), { status: 403 });
    };
    try {
      const response = await invoke();
      assert.equal(response.statusCode, 502);
      assert.equal(response.body.success, false);
      assert.doesNotMatch(JSON.stringify(response.body), /mailbox secret failure|unit-test-access-token/);
    } finally {
      globalThis.fetch = originalFetch;
    }
  });
});

test('wrong origin is rejected and non-POST methods return 405', async () => {
  await withEnvironment(workingConfig, async () => {
    const wrongOrigin = await invoke({ headers: { origin: 'https://other.example' } });
    assert.equal(wrongOrigin.statusCode, 403);
    const wrongMethod = await invoke({ method: 'GET' });
    assert.equal(wrongMethod.statusCode, 405);
    assert.equal(wrongMethod.headers.allow, 'POST');
  });
});

test('unsupported content type and oversized payload are rejected', async () => {
  await withEnvironment(workingConfig, async () => {
    const wrongContentType = await invoke({ headers: { 'content-type': 'text/plain' } });
    assert.equal(wrongContentType.statusCode, 415);
    const oversized = await invoke({ body: { ...validForm, message: 'x'.repeat(13_000) } });
    assert.equal(oversized.statusCode, 413);
  });
});

test('the synchronous submit lock permits one request and blocks rapid duplicates', () => {
  const lock = { current: false };
  assert.equal(tryAcquireSubmissionLock(lock), true);
  assert.equal(tryAcquireSubmissionLock(lock), false);
  lock.current = false;
  assert.equal(tryAcquireSubmissionLock(lock), true);
});

test('rate limiting rejects repeated requests from the same client IP', async () => {
  await withEnvironment(workingConfig, async () => {
    const ip = `192.0.2.${Math.floor(Math.random() * 200) + 1}`;
    const responses = [];
    for (let attempt = 0; attempt < 6; attempt += 1) {
      responses.push(await invoke({ body: {}, ip }));
    }
    assert.equal(responses.slice(0, 5).every((response) => response.statusCode === 400), true);
    assert.equal(responses[5].statusCode, 429);
    assert.equal(responses[5].headers['retry-after'], '900');
  });
});
