# Complete Setup — GitHub + Netlify + GoDaddy

Do these steps in order. Total time: ~20 minutes.

---

## PART 1 — Push code to GitHub

### 1.1 Create a GitHub token (one time)

1. Open [github.com/settings/tokens](https://github.com/settings/tokens)
2. **Generate new token (classic)**
3. Name: `AAQSOLS deploy`
4. Check: **repo** (full control)
5. Generate → **copy the token** (you won't see it again)

### 1.2 Push from your PC

Open **PowerShell**:

```powershell
cd D:\AAQSOLS
git push -u origin main
```

When prompted:
- **Username:** your GitHub username (or `AAQSOLS-Private`)
- **Password:** paste the **token** (not your GitHub password)

If push succeeds, refresh [github.com/AAQSOLS-Private/aaqsols](https://github.com/AAQSOLS-Private/aaqsols) — you should see all files.

**Still "Repository not found"?**
- Confirm the repo exists and you're a member of the **AAQSOLS-Private** org
- Or create the repo: GitHub → New → name `aaqsols` under org `AAQSOLS-Private`

---

## PART 2 — Deploy on Netlify (connect GitHub)

1. Go to [app.netlify.com](https://app.netlify.com)
2. **Add new project** → **Import from an existing project** → **GitHub**
3. Authorize Netlify to access GitHub (if asked)
4. Select repository: **`AAQSOLS-Private/aaqsols`**
5. Netlify should auto-read settings from `netlify.toml`:
   - Publish directory: **website**
   - Build command: *(empty)*
6. Click **Deploy aaqsols**
7. Wait ~1 minute → site live at `https://xxxxx.netlify.app`

### Rename Netlify URL (optional)

- **Domain management** → **Options** on the netlify.app subdomain → Edit
- Change to: **`aaqsols.netlify.app`**

---

## PART 3 — Connect aaqsols.com (GoDaddy DNS)

### 3.1 Add domain in Netlify

1. Netlify → your site → **Domain management**
2. **Add a domain** → type **`aaqsols.com`** → Verify
3. **Add domain alias** → **`www.aaqsols.com`**

Netlify shows DNS instructions. Use **Netlify DNS** or **External DNS** (GoDaddy).

### 3.2 Update GoDaddy DNS

1. Log in [godaddy.com](https://www.godaddy.com)
2. **My Products** → **aaqsols.com** → **DNS** (or **Manage DNS**)
3. **Delete or edit** old A/CNAME records for `@` and `www` if they conflict
4. **Add these records** (Netlify may show slightly different values — use Netlify's if different):

#### For root domain (aaqsols.com)

| Type | Name | Value        | TTL  |
|------|------|--------------|------|
| A    | @    | 75.2.60.5    | 600  |

*(Some setups use Netlify Load Balancer IP — check Netlify domain panel for exact IP)*

#### For www (www.aaqsols.com)

| Type  | Name | Value                    | TTL  |
|-------|------|--------------------------|------|
| CNAME | www  | aaqsols.netlify.app      | 600  |

Replace `aaqsols.netlify.app` with **your actual** Netlify site name shown in Domain management.

#### Optional — apex redirect via GoDaddy forwarding

If `@` A record doesn't work quickly, use GoDaddy **Forwarding**:
- Forward `aaqsols.com` → `https://www.aaqsols.com` (301 permanent)

### 3.3 Enable HTTPS

1. Back in Netlify → **Domain management**
2. Wait for **DNS verification** (green check) — can take 10 min to 48 hours
3. **HTTPS** → **Verify DNS configuration** → **Provision certificate**
4. Turn on **Force HTTPS**

---

## PART 4 — Email HR@aaqsols.com (Zoho free)

1. [zoho.com/mail](https://www.zoho.com/mail/) → Sign up free
2. Add domain **`aaqsols.com`**
3. Zoho gives **MX records** — add in GoDaddy DNS:

   | Type | Name | Value              | Priority |
   |------|------|--------------------|----------|
   | MX   | @    | mx.zoho.com        | 10       |
   | MX   | @    | mx2.zoho.com       | 20       |

4. Add **TXT** for verification (Zoho shows exact value)
5. Create mailbox: **HR@aaqsols.com**

---

## PART 5 — Test everything

- [ ] https://aaqsols.com loads AAQSOLS website
- [ ] https://www.aaqsols.com works (or redirects to non-www)
- [ ] Padlock / HTTPS shows in browser
- [ ] Click **HR@aaqsols.com** on site → opens email
- [ ] Send test email to HR@aaqsols.com

---

## Update website later

```powershell
cd D:\AAQSOLS
# edit website/index.html etc.
git add .
git commit -m "Update website content"
git push
```

Netlify redeploys automatically in ~1 minute.

---

## Quick links

| What | URL |
|------|-----|
| GitHub repo | https://github.com/AAQSOLS-Private/aaqsols |
| Netlify dashboard | https://app.netlify.com |
| GoDaddy DNS | https://dcc.godaddy.com/manage/aaqsols.com/dns |
| Zoho Mail | https://www.zoho.com/mail/ |
