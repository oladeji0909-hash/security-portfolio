# Security Health Check — Sample Report

**Target:** https://www.google.com  
**Scan date:** February 16, 2026  
**Scan tool:** `node scan.js` (built-in header + directory checks)

## Executive summary
Low-hanging improvements: the site already serves over HTTPS, but several hardening headers are missing. Adding them and documenting the policy will raise trust with browsers and reduce attack surface for clickjacking or MIME-sniffing. No open directories or exposed admin endpoints were detected during this pass.

## Findings
1. **Missing Content Security Policy**  
   - **Impact:** allows inline scripts/styles by default and does not restrict script origins, increasing risk of cross-site scripting (XSS).  
   - **Recommendation:** deploy `Content-Security-Policy` referencing approved script, style, and image hosts; use `report-uri`/`report-to` if feasible.

2. **Missing `Strict-Transport-Security` header**  
   - **Impact:** browsers cannot automatically enforce HTTPS for future visits.  
   - **Recommendation:** add `Strict-Transport-Security: max-age=31536000; includeSubDomains; preload` after confirming the domain supports HTTPS everywhere.

3. **Missing `X-Content-Type-Options` header**  
   - **Impact:** browsers might MIME-sniff resources, potentially interpreting downloads as executable code.  
   - **Recommendation:** add `X-Content-Type-Options: nosniff` at the web server or CDN level.

4. **Missing `Referrer-Policy` and `Permissions-Policy` headers**  
   - **Impact:** referrer leakage and overly broad browser permissions can expose sensitive URLs or features to third parties.  
   - **Recommendation:** serve `Referrer-Policy: same-origin` and tighten `Permissions-Policy` to only allow required APIs (`camera=(), microphone=(), fullscreen=(self)`).

5. **Present `X-Frame-Options: SAMEORIGIN`**  
   - This is a positive control—that header is already set, so clickjacking protection is in place.

## Manual review notes
- No exposed `/.env`, `/admin`, or `/wp-admin` endpoints were reachable via the landing page.  
- Login/contact flows were not available on the sampled page; no input sanitization issues were observed (no forms were present).

## Prioritized fixes
| Priority | Work item | Estimate |
| --- | --- | --- |
| High | Add CSP, HSTS, and `X-Content-Type-Options` headers | 1–2 hours |
| Medium | Apply strict `Referrer-Policy` and `Permissions-Policy` | 30–45 minutes |
| Low | Document the headers in the delivery checklist + monitoring runbook | 30 minutes |

## Optional upsells
- **Remediation sprint ($150–$400):** implement the missing headers, deploy the policy via CDN, and test with securityheader.com or a CI step.  
- **Monthly monitoring ($75/mo):** glide new scans, log alerts for header regression, and review dependency security notices. Includes quarterly report with screenshots and recommended action items.

## Next steps
1. Test header deployment (CDN/host) in staging.  
2. Bake this checklist into the portfolio’s Health Check showcase (report + deliverables).  
3. Use these findings in outreach messaging (“I noticed your CSP/HSTS isn’t configured; I can fix and monitor it for $X”).
