# Security Health Check

## Objective
Deliver a low-touch semi-automated scan plus editable report that quickly proves value to small-business prospects while showing the hardened mindset behind the overall project.

## Components
1. **Automated checks**
   - HTTPS verification, TLS/A+ grade, certificate expiration date.
   - HTTP response header analysis: `Content-Security-Policy`, `Strict-Transport-Security`, `X-Frame-Options`, `X-Content-Type-Options`, `Referrer-Policy`, `Permissions-Policy`.
   - OWASP Top 10 quick tests (input sanitization, CSRF tokens, directory listing detection, bcrypt/pbkdf usage on sample endpoints).
   - Broken auth/404 exposures (common admin paths like `/admin`, `/wp-admin`, `/.env`, `/config.yaml`).
   - Dependency fingerprint (check `package.json` or asset libs for outdated versions).

2. **Manual review**
   - Run through login forms, contact forms, and exposed config files for leaks.
   - Ensure knowledge of runtime behavior (caching headers, third-party scripts).
   - Capture screenshots of insecure patterns.

3. **Deliverable**
   - Editable 1–2 page PDF with summary, findings, action items, prioritized fixes, and optional upsell (remediation + retainer).
   - Include remediation steps and quick security tips.
   - Log timestamps and tool results for future audits.

4. **Future automation path**
   - Wrap the Node.js scan in a serverless function (Vercel/Netlify) if clients demand an API.
   - Add email delivery via SendGrid/Supabase mail and preserve rate limiting (e.g., queue job + 10-minute cooldown).

## Delivery workflow
1. Run `node scan.js https://target.site` locally or via Replit.
2. Capture JSON/log output + screenshots.
3. Fill the PDF template (Google Docs or Markdown converted).
4. Email PDF with short summary + optional remediation quote ($100–$500) and retainer pitch ($50–$200/mo).

## Security posture reminders
- Sanitize all inputs in the script output. Do not store sensitive client data.
- Do not test without written permission.
- Rotate API keys (if used) and keep them in `.env` files that are gitignored.
- Keep the scan script dependencies up to date (run `npm audit` before each release).
