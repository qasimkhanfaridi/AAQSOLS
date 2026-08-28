# Deploy AAQSOLS Website

Free hosting options for your one-page site. **Contact:** HR@aaqsols.com

---

## Option 1 — GitHub Pages (recommended if you use GitHub)

### One-time setup

1. **Create a GitHub repo**
   - Open: [https://github.com/new](https://github.com/new)
   - Repository name: `aaqsols-website` (or any name)
   - Public repo → Create repository

2. **Push this project from your PC**

   Open PowerShell in `D:\AAQSOLS` and run (replace `YOUR_USERNAME`):

   ```powershell
   cd D:\AAQSOLS
   git init
   git add .
   git commit -m "AAQSOLS company website"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/aaqsols-website.git
   git push -u origin main
   ```

3. **Enable GitHub Pages**
   - Repo → **Settings** → **Pages**
   - **Source:** GitHub Actions (not “Deploy from branch”)
   - After the first push, the workflow `Deploy website to GitHub Pages` runs automatically
   - Live URL: `https://YOUR_USERNAME.github.io/aaqsols-website/` (until custom domain is set)

4. **Connect GoDaddy domain (aaqsols.com)**
   - Repo → **Settings** → **Pages** → **Custom domain** → enter `aaqsols.com` → Save
   - The file `website/CNAME` already contains `aaqsols.com`
   - In **GoDaddy DNS** for aaqsols.com, add:

   | Type  | Name | Value                |
   |-------|------|----------------------|
   | A     | @    | 185.199.108.153      |
   | A     | @    | 185.199.109.153      |
   | A     | @    | 185.199.110.153      |
   | A     | @    | 185.199.111.153      |
   | CNAME | www  | YOUR_USERNAME.github.io |

   - Enable **Enforce HTTPS** in GitHub Pages settings (may take up to 24 hours after DNS propagates)

### Update the site later

```powershell
cd D:\AAQSOLS
git add .
git commit -m "Update website"
git push
```

GitHub Actions redeploys automatically in ~1 minute.

---

## Option 2 — Netlify (drag & drop, no Git)

1. Go to [https://app.netlify.com](https://app.netlify.com) → sign up free
2. Drag the `website` folder onto the dashboard
3. Add custom domain `aaqsols.com` in Netlify → point GoDaddy DNS to Netlify’s records

---

## Email — HR@aaqsols.com

Set up on your domain via [Zoho Mail (free)](https://www.zoho.com/mail/) or Google Workspace, then add their MX records in GoDaddy DNS.

---

## Files deployed

```
website/
  index.html
  styles.css
  CNAME          ← custom domain aaqsols.com
```

Redirect pages (`about.html`, etc.) are optional.

## Checklist

- [ ] Create GitHub repo at [github.com/new](https://github.com/new)
- [ ] Push `D:\AAQSOLS` to GitHub
- [ ] Enable Pages → GitHub Actions
- [ ] Add GoDaddy DNS records for aaqsols.com
- [ ] Set up HR@aaqsols.com email
- [ ] Visit https://aaqsols.com
