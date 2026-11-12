import { createSign, randomUUID } from 'node:crypto';

const MAX_BODY_BYTES = 12 * 1024;
const LIMIT = 5;
const WINDOW_MS = 15 * 60 * 1000;
const requests = new Map();

function sendJson(res, status, body) {
  return res.status(status).json(body);
}

function cleanText(value) {
  return typeof value === 'string' ? value.trim() : '';
}

function isValidEmail(value) {
  return typeof value === 'string'
    && value.length <= 254
    && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function base64Url(value) {
  return Buffer.from(value).toString('base64url');
}

function createClientAssertion(tenantId, clientId, privateKey, thumbprint) {
  const now = Math.floor(Date.now() / 1000);
  const audience = `https://login.microsoftonline.com/${tenantId}/oauth2/v2.0/token`;
  const encodedThumbprint = /^[a-f\d]{40}$/i.test(thumbprint)
    ? Buffer.from(thumbprint, 'hex').toString('base64url')
    : thumbprint;
  const header = base64Url(JSON.stringify({ alg: 'RS256', typ: 'JWT', x5t: encodedThumbprint }));
  const claims = base64Url(JSON.stringify({
    aud: audience,
    iss: clientId,
    sub: clientId,
    jti: randomUUID(),
    nbf: now - 30,
    exp: now + 600,
  }));
  const payload = `${header}.${claims}`;
  const signer = createSign('RSA-SHA256');
  signer.update(payload);
  signer.end();
  return `${payload}.${signer.sign(privateKey, 'base64url')}`;
}

async function acquireGraphToken({ tenantId, clientId, clientSecret, certificateKey, certificateThumbprint }) {
  const tokenUrl = `https://login.microsoftonline.com/${tenantId}/oauth2/v2.0/token`;
  const params = new URLSearchParams({
    client_id: clientId,
    scope: 'https://graph.microsoft.com/.default',
    grant_type: 'client_credentials',
  });

  if (certificateKey && certificateThumbprint) {
    params.set('client_assertion_type', 'urn:ietf:params:oauth:client-assertion-type:jwt-bearer');
    params.set('client_assertion', createClientAssertion(tenantId, clientId, certificateKey, certificateThumbprint));
  } else {
    params.set('client_secret', clientSecret);
  }

  const response = await fetch(tokenUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: params,
    signal: AbortSignal.timeout(10000),
  });
  if (!response.ok) throw new Error('Graph authentication failed');
  const token = await response.json();
  if (
    typeof token.access_token !== 'string'
    || !token.access_token
    || !Number.isFinite(token.expires_in)
    || token.expires_in <= 0
  ) throw new Error('Graph authentication failed');
  return token.access_token;
}

function overRateLimit(ip, now) {
  const record = requests.get(ip);
  if (record && now - record.startedAt < WINDOW_MS) {
    if (record.count >= LIMIT) return true;
    record.count += 1;
  } else {
    requests.set(ip, { startedAt: now, count: 1 });
  }
  if (requests.size > 5000) {
    for (const [key, item] of requests) {
      if (now - item.startedAt >= WINDOW_MS) requests.delete(key);
      if (requests.size <= 4000) break;
    }
  }
  return false;
}

export default async function handler(req, res) {
  const configuredOrigin = cleanText(process.env.FRONTEND_URL);
  const contactEmail = cleanText(process.env.CONTACT_EMAIL);
  let allowedOrigin = '';
  try {
    const parsedOrigin = new URL(configuredOrigin);
    if ((parsedOrigin.protocol === 'https:' || parsedOrigin.protocol === 'http:') && parsedOrigin.origin === configuredOrigin) {
      allowedOrigin = parsedOrigin.origin;
    }
  } catch {
    // Keep configuration failures generic; details remain server-side.
  }

  const origin = req.headers.origin;
  res.setHeader('Vary', 'Origin');
  res.setHeader('Cache-Control', 'no-store');

  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return sendJson(res, 405, { success: false, message: 'Method not allowed.' });
  }

  if (origin && allowedOrigin && origin !== allowedOrigin) {
    return sendJson(res, 403, { success: false, message: 'Request origin is not allowed.' });
  }

  const contentType = String(req.headers['content-type'] || '').split(';', 1)[0].trim().toLowerCase();
  if (contentType !== 'application/json') {
    return sendJson(res, 415, { success: false, message: 'Please submit the form as JSON.' });
  }

  if (Number(req.headers['content-length'] || 0) > MAX_BODY_BYTES) {
    return sendJson(res, 413, { success: false, message: 'Your message is too large.' });
  }
  if (!req.body || typeof req.body !== 'object' || Array.isArray(req.body)) {
    return sendJson(res, 400, { success: false, message: 'Please submit the completed form.' });
  }
  if (Buffer.byteLength(JSON.stringify(req.body), 'utf8') > MAX_BODY_BYTES) {
    return sendJson(res, 413, { success: false, message: 'Your message is too large.' });
  }

  const ip = (req.headers['x-forwarded-for'] || 'unknown').split(',')[0].trim();
  if (overRateLimit(ip, Date.now())) {
    res.setHeader('Retry-After', String(Math.ceil(WINDOW_MS / 1000)));
    return sendJson(res, 429, { success: false, message: 'Too many messages. Please try again later.' });
  }

  const name = cleanText(req.body.name);
  const email = cleanText(req.body.email);
  const subject = cleanText(req.body.subject);
  const message = cleanText(req.body.message);
  if (!name || !email || !subject || !message) {
    return sendJson(res, 400, { success: false, message: 'Please complete all required fields.' });
  }
  if (name.length > 120 || email.length > 254 || subject.length > 200 || message.length > 5000) {
    return sendJson(res, 400, { success: false, message: 'One or more fields exceed the allowed length.' });
  }
  if (!isValidEmail(email)) {
    return sendJson(res, 400, { success: false, message: 'Please enter a valid email address.' });
  }
  const safeName = name.replace(/[\r\n]+/g, ' ').trim();
  const safeSubject = subject.replace(/[\r\n]+/g, ' ').trim();
  if (!safeName || !safeSubject) {
    return sendJson(res, 400, { success: false, message: 'Please check the name and subject fields.' });
  }

  const hasCertificate = Boolean(process.env.ENTRA_CERTIFICATE_PRIVATE_KEY && process.env.ENTRA_CERTIFICATE_THUMBPRINT);
  const hasClientSecret = Boolean(process.env.ENTRA_CLIENT_SECRET);
  if (
    !allowedOrigin
    || !process.env.ENTRA_TENANT_ID
    || !process.env.ENTRA_CLIENT_ID
    || !process.env.SENDER_MAILBOX
    || !isValidEmail(contactEmail)
    || (!hasCertificate && !hasClientSecret)
  ) {
    return sendJson(res, 503, { success: false, message: 'Email service is not configured. Please try again later.' });
  }
  if (origin) res.setHeader('Access-Control-Allow-Origin', allowedOrigin);

  const {
    ENTRA_TENANT_ID: tenantId,
    ENTRA_CLIENT_ID: clientId,
    ENTRA_CLIENT_SECRET: clientSecret,
    ENTRA_CERTIFICATE_PRIVATE_KEY: certificateKey,
    ENTRA_CERTIFICATE_THUMBPRINT: certificateThumbprint,
    SENDER_MAILBOX: senderMailbox,
  } = process.env;

  try {
    const accessToken = await acquireGraphToken({
      tenantId,
      clientId,
      clientSecret,
      certificateKey: certificateKey?.replace(/\\n/g, '\n'),
      certificateThumbprint,
    });
    const graphResponse = await fetch(
      `https://graph.microsoft.com/v1.0/users/${encodeURIComponent(senderMailbox)}/sendMail`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: {
            subject: safeSubject,
            body: {
              contentType: 'Text',
              content: `Name: ${safeName}\nEmail: ${email}\nSubject: ${safeSubject}\n\n${message}`,
            },
            toRecipients: [{ emailAddress: { address: contactEmail } }],
            replyTo: [{ emailAddress: { address: email, name: safeName } }],
          },
        }),
        signal: AbortSignal.timeout(15000),
      },
    );
    if (graphResponse.status !== 202) {
      return sendJson(res, 502, { success: false, message: 'Unable to send your message right now. Please try again later.' });
    }
    return sendJson(res, 200, { success: true, message: 'Message sent successfully.' });
  } catch {
    return sendJson(res, 502, { success: false, message: 'Unable to send your message right now. Please try again later.' });
  }
}
