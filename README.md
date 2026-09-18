# AAQSOLS — Company Assets

**GitHub:** [github.com/AAQSOLS-Private/aaqsols](https://github.com/AAQSOLS-Private/aaqsols)

Everything you need to start getting clients.

## Folder Contents

| File / Folder | Purpose |
|---------------|---------|
| `Company-Profile-AAQSOLS.pdf` | 1-page company profile — attach to emails and proposals |
| `Company-Profile-AAQSOLS.md` | Editable source for company profile |
| `website/` | One-page company website (Projects, Services, About, Contact) |
| `proposals/Proposal-Templates.md` | 6 proposal templates + anti-AI rejection guide |

## Website — Deploy (Cloudflare Pages)

**Repo:** https://github.com/AAQSOLS-Private/aaqsols  
**Live site:** https://aaqsols.com  
**Contact on site:** HR@aaqsols.com

**Full setup:** see [`website/CLOUDFLARE-PAGES.md`](website/CLOUDFLARE-PAGES.md)

1. Add `aaqsols.com` to Cloudflare (Free) and point GoDaddy nameservers to Cloudflare  
2. **Workers & Pages** → Connect Git → repo **`AAQSOLS-Private/aaqsols`**  
3. Build output directory: **`website`** (no build command)  
4. Add custom domains `aaqsols.com` and `www.aaqsols.com`  
5. Disconnect Netlify and disable GitHub Pages for this repo  

Every `git push` to `main` auto-redeploys on Cloudflare Pages.

### B — Push code to GitHub (one time)

If the repo is empty or push failed, run in PowerShell:

```powershell
cd D:\AAQSOLS
git push -u origin main
```

If GitHub asks you to sign in, use a **Personal Access Token** as the password:
[github.com/settings/tokens](https://github.com/settings/tokens) → Generate token → check **repo** scope.

Full guides: `website/NETLIFY-DEPLOY.md` | `website/DEPLOY.md`

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
