# AAQSOLS — Company Assets

Everything you need to start getting clients.

## Folder Contents

| File / Folder | Purpose |
|---------------|---------|
| `Company-Profile-AAQSOLS.pdf` | 1-page company profile — attach to emails and proposals |
| `Company-Profile-AAQSOLS.md` | Editable source for company profile |
| `website/` | One-page company website (Projects, Services, About, Contact) |
| `proposals/Proposal-Templates.md` | 6 proposal templates + anti-AI rejection guide |

## Website — How to Deploy

**Contact on site:** HR@aaqsols.com (no phone number)

### GitHub Pages (recommended)

1. Create repo: [github.com/new](https://github.com/new) → name it `aaqsols-website`
2. Push from PowerShell:

```powershell
cd D:\AAQSOLS
git init
git add .
git commit -m "AAQSOLS company website"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/aaqsols-website.git
git push -u origin main
```

3. Repo → **Settings → Pages → Source: GitHub Actions**
4. Point GoDaddy DNS to GitHub (see `website/DEPLOY.md`)

Full guide: **`website/DEPLOY.md`**

## Proposals — How to Use

1. Open `proposals/Proposal-Templates.md`
2. Pick the template matching the job (Upwork .NET, FinTech, Dedicated Team, Email)
3. Replace everything in **[BRACKETS]** with details from the client's post
4. Read the "Rules" section — avoid AI-sounding phrases
5. Keep Upwork proposals under 300 words
6. Attach `Company-Profile-AAQSOLS.pdf` for formal proposals only (not Upwork cover letter)

## Next Steps

- [x] Register aaqsols.com domain (GoDaddy)
- [ ] Deploy website to Netlify
- [ ] Point GoDaddy DNS to Netlify
- [ ] Create LinkedIn Company Page for AAQSOLS
- [ ] Set up HR@aaqsols.com email (Zoho free tier)
- [ ] Create Upwork agency profile (not individual)
- [ ] Customize and send first 10 proposals this week

## Regenerate Company Profile PDF

```
python generate_profile_pdf.py
```
