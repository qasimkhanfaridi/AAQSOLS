# Deploy on Netlify — Quick Guide

You already created a Netlify account. Follow these steps.

---

## Step 1 — Upload the site (2 minutes)

1. Log in at [https://app.netlify.com](https://app.netlify.com)
2. On the **Projects** dashboard, find **"Add new project"** → **"Deploy manually"**
   - Or drag and drop directly onto the dashboard
3. Open File Explorer and go to:

   ```
   D:\AAQSOLS\website
   ```

4. **Drag the entire `website` folder** onto the Netlify drop zone
5. Wait ~30 seconds — your site is live at a URL like:

   ```
   https://random-name-123.netlify.app
   ```

6. Click the link to confirm the AAQSOLS site loads correctly

---

## Step 2 — Rename your Netlify URL (optional)

1. Site → **Domain management** → **Options** on the netlify.app domain
2. **Edit** → change to something like `aaqsols.netlify.app`

---

## Step 3 — Connect GoDaddy domain (aaqsols.com)

1. In Netlify: **Domain management** → **Add a domain** → enter `aaqsols.com`
2. Also add `www.aaqsols.com`
3. Netlify shows DNS records to add — go to **GoDaddy → My Products → aaqsols.com → DNS**

   Usually you add:

   | Type  | Name | Value                          |
   |-------|------|--------------------------------|
   | A     | @    | 75.2.60.5                      |
   | CNAME | www  | your-site-name.netlify.app     |

   **Important:** Use the exact values Netlify shows you — they may differ slightly.

4. Save in GoDaddy. DNS can take 10 minutes to 48 hours.
5. Back in Netlify, click **Verify DNS** and enable **HTTPS** (SSL certificate is free)

---

## Step 4 — Set up email (HR@aaqsols.com)

The website shows **HR@aaqsols.com**. Set this up separately:

1. Sign up at [Zoho Mail](https://www.zoho.com/mail/) (free for 1 user)
2. Add your domain `aaqsols.com`
3. Zoho gives you **MX records** — add them in GoDaddy DNS
4. Create mailbox: `HR@aaqsols.com`

---

## Update the site later

1. Edit files in `D:\AAQSOLS\website`
2. Netlify dashboard → your site → **Deploys** tab
3. Drag the `website` folder again onto the deploy area

Or connect GitHub later for automatic deploys on every push.

---

## Checklist

- [ ] Drag `D:\AAQSOLS\website` to Netlify
- [ ] Site loads on netlify.app URL
- [ ] Add `aaqsols.com` in Domain management
- [ ] Update GoDaddy DNS with Netlify records
- [ ] HTTPS enabled
- [ ] Set up HR@aaqsols.com on Zoho

---

## Folder to upload

```
D:\AAQSOLS\website\
  index.html      ← main page
  styles.css      ← styling
  netlify.toml    ← Netlify config
  CNAME           ← aaqsols.com (for custom domain)
  about.html      ← redirects to index
  contact.html    ← redirects to index
  services.html   ← redirects to index
```
