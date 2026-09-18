# Deploy aaqsols.com on Cloudflare Pages

One host only: **Cloudflare Pages** serves the `website/` folder.
Disconnect **Netlify** and stop uploading to **GoDaddy IIS** for the main site.

---

## Part 1 - Cloudflare account and domain (recommended)

Keep the domain **registered at GoDaddy**, but run **DNS on Cloudflare**.

1. Sign up: https://dash.cloudflare.com/sign-up
2. **Add a site** -> enter `aaqsols.com` -> Free plan
3. Cloudflare imports DNS - **keep MX records** (email)
4. Copy Cloudflare **nameservers** to GoDaddy (custom nameservers)
5. Wait until Cloudflare shows **Active**

In Cloudflare DNS, delete old hosting A record `@` -> `160.153.0.104` and Netlify records when Pages is live. Do not delete MX.

---

## Part 2 - Create Pages project (GitHub)

1. **Workers & Pages** -> **Create** -> **Pages** -> **Connect to Git**
2. Repo: **AAQSOLS-Private/aaqsols**
3. Build settings:

| Setting | Value |
|--------|--------|
| Production branch | main |
| Framework preset | None |
| Build command | (empty) |
| Build output directory | website |

4. Save and Deploy -> test `https://YOUR-PROJECT.pages.dev/careers.html`

---

## Part 3 - Custom domain

1. Pages -> **Custom domains** -> add `aaqsols.com` and `www.aaqsols.com`
2. SSL/TLS -> Full

Test: https://aaqsols.com/careers.html

---

## Part 4 - Turn off old hosts

- Netlify: remove aaqsols.com custom domain
- GoDaddy IIS: stop FTP uploads for public site
- GitHub Pages: Settings -> Pages -> Disable

Push to `main` auto-redeploys on Cloudflare.

---

## Checklist

- [ ] Nameservers on Cloudflare
- [ ] Pages output directory = website
- [ ] Custom domain on Pages
- [ ] Netlify disconnected
- [ ] careers.html works in incognito