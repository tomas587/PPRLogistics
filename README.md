# PPR Logistics

## Contact form: Microsoft Graph configuration

The React contact form posts to the Vercel serverless function at `/api/contact`. The function obtains an app-only OAuth 2.0 token from Microsoft Entra ID and calls Microsoft Graph `POST /v1.0/users/{sender}/sendMail`. It sends inquiries to the configured `CONTACT_EMAIL` (set this to `Info@pprlogistics.net`), sets the visitor's email as `replyTo`, and reports success only when Graph responds with `202 Accepted`. A Graph `202` means the request was accepted for processing; it does not independently prove final mailbox delivery.

### Vercel environment variables

Add these values in **Vercel → Project → Settings → Environment Variables**, for each environment you deploy (Production, Preview, and Development as appropriate), then redeploy:

- `ENTRA_TENANT_ID`: Microsoft Entra tenant (directory) ID.
- `ENTRA_CLIENT_ID`: app registration's application (client) ID.
- `SENDER_MAILBOX`: authorized company mailbox UPN, such as `contact@yourdomain.com`.
- `CONTACT_EMAIL`: recipient for site inquiries. Set to `Info@pprlogistics.net` in each Vercel environment.
- `FRONTEND_URL`: exact origin of the site, such as `https://www.example.com` (no trailing slash).
- One credential method: `ENTRA_CERTIFICATE_PRIVATE_KEY` and `ENTRA_CERTIFICATE_THUMBPRINT` (preferred), or `ENTRA_CLIENT_SECRET`.

Keep all credential variables server-side in Vercel. Never use a `VITE_` prefix for them. The `.env.example` file documents the required variable names and sample values; it is not production configuration. Standard Vercel Functions do not have an Azure managed identity; this endpoint supports a registered certificate assertion and a client secret fallback. Store the certificate private key as a protected Vercel variable. Rotate it before expiration. If using a client secret, use a short-lived secret, store it only in Vercel, and rotate it on a schedule.

### Microsoft 365 / Entra administrator setup

1. In Microsoft Entra admin center, create an app registration in the company tenant and record its tenant ID and client ID. Add either a certificate credential (recommended) or a client secret. Register only the public certificate with Entra; keep its private key in Vercel.
2. Create or identify the dedicated company sending mailbox and set its UPN as `SENDER_MAILBOX`. The mailbox must be able to send mail through Exchange Online.
3. In Exchange Online PowerShell, create a resource scope that matches only the sender mailbox. For example, set a dedicated custom attribute on that mailbox, then run:

   ```powershell
   Connect-ExchangeOnline
   Set-Mailbox -Identity <sender-mailbox-upn> -CustomAttribute15 "PPRContactSender"
   New-ManagementScope -Name "PPR Contact Sender" -RecipientRestrictionFilter "CustomAttribute15 -eq 'PPRContactSender'"
   ```

4. Register the Entra service principal with Exchange Online using the app's **Application (client) ID** and its **Enterprise application service principal Object ID** (not the app registration Object ID), then grant the scoped role:

   ```powershell
   New-ServicePrincipal -AppId <client-id> -ObjectId <enterprise-app-service-principal-object-id> -DisplayName "PPR Contact Form"
   New-ManagementRoleAssignment -App <enterprise-app-service-principal-object-id> -Role "Application Mail.Send" -CustomResourceScope "PPR Contact Sender"
   Test-ServicePrincipalAuthorization -Identity <enterprise-app-service-principal-object-id> -Resource <sender-mailbox-upn>
   ```

   Confirm the test reports the sender mailbox in scope. With this recommended Exchange RBAC route, do not also add an organization-wide Microsoft Entra `Mail.Send` app role. Exchange's scoped `Application Mail.Send` role is the permission grant, and an unscoped Entra grant would widen access.
5. If the organization requires the Entra API-permission route instead, add only Microsoft Graph **Application → Mail.Send** and have an administrator grant tenant-wide consent. That permission can send as any user by default. Restrict it with an Exchange Application Access Policy scoped to a mail-enabled security group containing only the sender mailbox. Application Access Policies are legacy; Microsoft recommends Exchange RBAC for new scoped access. Do not combine scoped RBAC with an unscoped Entra `Mail.Send` grant.
6. Add the IDs, sender mailbox, `CONTACT_EMAIL=Info@pprlogistics.net`, site origin, and chosen credential to Vercel. Redeploy and submit a real test inquiry. Check that it reaches `Info@pprlogistics.net` and that replying to it addresses the visitor.

The implementation validates required fields, email format, and length, limits request size, restricts browser origins using `FRONTEND_URL`, and applies a best-effort per-instance rate limit. Vercel instances do not share that in-memory counter; use a shared rate-limit store or edge protection if stronger global throttling is required. Errors returned to visitors do not include token or Graph response details.

Run the mocked contact API tests with `npm run test:contact`. These tests do not send email. To validate production delivery, deploy with real Vercel environment variables, submit a test form, and confirm receipt in `Info@pprlogistics.net`; Microsoft Graph's `202 Accepted` response alone is not proof of final delivery.
