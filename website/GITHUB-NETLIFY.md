# Connect GitHub + Netlify

**Repo:** https://github.com/AAQSOLS-Private/aaqsols

Your code is committed locally. Follow these steps to push and deploy.

---

## Step 1 — Push to GitHub

Open PowerShell:

```powershell
cd D:\AAQSOLS
git push -u origin main
```

**If it says "Repository not found":**
- Make sure the repo exists at [github.com/AAQSOLS-Private/aaqsols](https://github.com/AAQSOLS-Private/aaqsols)
- Make sure you are logged into GitHub as a member of **AAQSOLS-Private**
- Use a Personal Access Token if prompted for password: [github.com/settings/tokens](https://github.com/settings/tokens)

---

## Step 2 — Connect Netlify to GitHub

1. Go to [app.netlify.com](https://app.netlify.com)
2. **Add new project** → **Import from Git**
3. **GitHub** → authorize Netlify → select **`AAQSOLS-Private/aaqsols`**
4. Set these build options:

   | Setting | Value |
   |---------|-------|
   | Branch | `main` |
   | Base directory | *(empty)* |
   | Build command | *(empty)* |
   | Publish directory | **`website`** |

5. Click **Deploy site**

Your site will be live at `https://random-name.netlify.app`

---

## Step 3 — Connect aaqsols.com (GoDaddy)

1. Netlify → **Domain management** → **Add domain** → `aaqsols.com`
2. Add `www.aaqsols.com` too
3. Copy DNS records from Netlify into **GoDaddy DNS**
4. Enable **HTTPS** after DNS verifies

---

## Step 4 — Auto-deploy on every update

After GitHub is connected, any push updates the live site:

```powershell
cd D:\AAQSOLS
# edit files...
git add .
git commit -m "Update website"
git push
```

Netlify redeploys automatically in ~1 minute.

---

## Alternative — GitHub Pages

Repo → **Settings** → **Pages** → **Source: GitHub Actions**

The workflow `.github/workflows/deploy-pages.yml` is already included — it deploys the `website` folder.

Then add custom domain `aaqsols.com` in Pages settings and point GoDaddy DNS to GitHub.
