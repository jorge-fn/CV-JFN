# Security Notes and Checklist

This document contains quick security guidance for this static CV site.

- robots: Ensure `robots.txt` exists and blocks indexing while in testing:
  - `robots.txt` currently contains `User-agent: *\nDisallow: /` which blocks crawlers during development.
  - Remove or update when ready to publish.

- Remove debug traces: All `console.log`/`console.warn` debug traces should be removed before production.
  - I removed debug `console.log` lines in `js/scripts.js` (particle init logs).

- CDN and SRI (Subresource Integrity):
  - Use trusted CDNs (e.g., `https://cdn.jsdelivr.net`, `https://cdnjs.cloudflare.com`) and add an `integrity` attribute (SRI) + `crossorigin="anonymous"` to their `<script>`/`<link>` tags.
  - Example to compute a sha384 SRI hash (Linux/macOS/WSL with openssl):

    ```bash
    curl -sSL https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/js/bootstrap.bundle.min.js \
      | openssl dgst -sha384 -binary | openssl base64 -A
    # then prepend: integrity="sha384-<BASE64>"
    ```

  - Or with Node.js: `node -e "require('crypto').createHash('sha384').update(require('fs').readFileSync(0)).digest('base64')" < file.js`
  - I can fetch the external assets and compute/insert the exact `integrity` values if you want me to do that next.

- Content-Security-Policy (CSP):
  - A strict CSP is added in `_headers` limiting script/style/font origins to only required CDNs and `'self'`.
  - Review CSP after adding/removing external resources (Google Fonts, Font Awesome, any analytics).

- Other security headers (set in `_headers`):
  - `Strict-Transport-Security`, `X-Frame-Options`, `X-Content-Type-Options`, `Referrer-Policy`, `Permissions-Policy`.
  - Adapt header deployment to your hosting (Netlify `_headers`, Vercel `headers`, nginx/apache configs).

- Forms validation:
  - This CV has no server-side forms. If you add forms in the future, ensure BOTH client-side and server-side validation are implemented.
  - Client-side: use HTML5 constraints and JS validation for UX.
  - Server-side: validate, sanitize, and enforce length/format checks; never trust client input.

- Post-deploy checks:
  - Run Mozilla Observatory (https://observatory.mozilla.org) and SecurityHeaders (https://securityheaders.com) against your deployed URL.
  - Fix issues reported (e.g., missing headers, weak CSP directives).

If you want, I can:
- Compute and insert SRI `integrity` attributes for the CDN assets used in `index.html` (I will fetch the assets and compute hashes).
- Update the `<script>`/`<link>` tags in `index.html` to include `integrity` and `crossorigin="anonymous"` once you approve.
- Adapt `_headers` to your target host (nginx, apache, Vercel) instead of Netlify format.
