# Al-Ihsan Academy Alumni: Newsletter & Web Platform

A free website and monthly-newsletter platform for past and present senior
students (Grades 9-12) of Al-Ihsan Academy (ISNS, Rolling Meadows).

Built with **[Astro](https://astro.build)** + **Tailwind CSS**, with a friendly
**[Decap CMS](https://decapcms.org)** admin panel so the editor can publish
content without touching code. Forms are built into the site using **Netlify
Forms** (free, responses land in your Netlify dashboard). Hosted free on
**Netlify**.

---

## ✨ Features

- **Homepage:** mission, latest announcement, current newsletter preview.
- **Newsletter Archive:** read online or download PDFs (`/newsletters`).
- **Alumni Registration:** free sign-up form (`/register`).
- **Get Involved:** submit Expert Q&A questions, Question-of-the-Month answers,
  and college updates (`/get-involved`).
- **Question of the Month:** current question + past winners (`/question-of-the-month`).
- **Expert Q&A:** answers from Muftis/scholars (`/expert-qa`).
- **Alumni Insights:** published college experiences & advice (`/alumni-insights`).
- **Admin panel:** point-and-click editing at `/admin`.

---

## 🚀 Quick start (for developers)

Requires [Node.js](https://nodejs.org) 18+.

```bash
npm install      # install dependencies
npm run dev      # start local site at http://localhost:4321
npm run build    # build the production site into dist/
npm run preview  # preview the production build locally
```

---

## 🌐 Part 1: Put the site online (Netlify)

This is a one-time setup. It connects this GitHub repo to Netlify, which builds
and hosts the site for free and rebuilds automatically whenever content changes.

1. Go to **[netlify.com](https://www.netlify.com)** and sign up (use the
   "Sign up with GitHub" option, easiest).
2. Click **Add new site → Import an existing project → GitHub**.
3. Choose the **`AIA-Academy-Website`** repository.
4. Netlify auto-detects the settings from `netlify.toml`
   (build command `npm run build`, publish directory `dist`). Click **Deploy**.
5. After a minute, your site is live at a URL like
   `https://random-name-123.netlify.app`. You can rename it under
   **Site configuration → Change site name**.
6. **Update the site URL in the code:** edit `astro.config.mjs` and
   `public/admin/config.yml` and replace `aia-academy-alumni.netlify.app`
   with your real Netlify URL.

> 💡 You can later add a custom domain (e.g. `alumni.al-ihsan-academy.org`) for
> free in **Domain settings** if you own a domain.

---

## 🔐 Part 2: Turn on the admin panel (`/admin`)

The admin panel lets the editor (e.g. **Jaddi**) log in with an email + password
and edit everything, no coding. It uses **Netlify Identity** + **Git Gateway**.

1. In your Netlify site dashboard, go to **Integrations / Identity** and click
   **Enable Identity**. *(On newer Netlify dashboards this is under
   "Add-ons" or "Identity"; search "Identity" if you can't find it.)*
2. Under **Identity → Registration**, set it to **Invite only**
   (so random people can't sign up to edit).
3. Under **Identity → Services → Git Gateway**, click **Enable Git Gateway**.
   *(This is what lets the panel save changes back to GitHub.)*
4. Go to **Identity → Invite users** and invite the editor's email address.
5. The editor gets an email, clicks the link, sets a password, done.
6. They can now log in any time at **`https://your-site.netlify.app/admin/`**.

When the editor publishes something in `/admin`, it commits to GitHub, Netlify
rebuilds, and the change appears on the live site within ~1 minute.

---

## 📝 Part 3: The forms (Netlify Forms)

The registration and submission forms are built right into the site — **no
Google Forms or external setup needed**. They use **Netlify Forms**, which is
included free with Netlify hosting. There are **four** forms:

| Form | Used on page |
|------|--------------|
| Alumni Registration | `/register` |
| Expert Q&A question | `/expert-qa`, `/get-involved` |
| Question of the Month answer | `/question-of-the-month`, `/get-involved` |
| Alumni update / college experience | `/get-involved`, `/alumni-insights` |

After your first deploy, do this one-time setup:

1. **Enable form detection** (REQUIRED — off by default on new sites): Netlify →
   your site → **Forms** → **Enable form detection**. Then go to **Deploys →
   Trigger deploy → Deploy site** so Netlify scans the pages. Until you do this,
   submissions return a 404 / never arrive.
2. In Netlify → **Forms** you'll now see the four forms (`register`, `expertQa`,
   `questionOfMonth`, `alumniUpdate`).
3. Click **Form notifications → Add notification → Email notification** to get an
   email on every submission. Send it to the address in `src/config/site.ts`
   (`contactEmail`).

> 📊 **To read responses:** either in the Netlify dashboard (**Forms** → click a
> form), or right inside the admin panel under **Form Submissions** — see Part 3b.
>
> 💬 **To change the questions:** edit the `FORMS` object in
> `src/components/NetlifyForm.astro` (and mirror the field names in
> `public/__forms.html` so Netlify keeps detecting them), then commit. No code
> knowledge needed beyond copying the existing pattern.
>
> ℹ️ The free Netlify plan includes **100 submissions/month**. That's plenty for
> a school alumni network; if you ever exceed it, Netlify will prompt to upgrade.

### Part 3b: View submissions inside the admin panel

The admin panel (`/admin`) has a **Form Submissions** item in its left sidebar
that lists every form submission grouped by form — no need to log into the
Netlify dashboard. Because it lives inside the admin, only people invited as
editors (Netlify Identity users) can see it.

To switch it on, add two environment variables in Netlify (**Site configuration
→ Environment variables → Add a variable**):

| Variable | Value | Where to find it |
|----------|-------|------------------|
| `NETLIFY_API_TOKEN` | a Netlify **personal access token** | Netlify avatar → **User settings → Applications → Personal access tokens → New access token**. Copy it immediately. |
| `AIA_SITE_ID` | this site's **API ID** | **Project configuration → General → Project information → "Project ID" / "Site ID"**. (We use `AIA_SITE_ID` because plain `SITE_ID` is a reserved Netlify name you can't set.) |

Then **Deploys → Trigger deploy → Deploy site**. Open `/admin`, log in, and click
**Form Submissions** in the sidebar. The token stays on Netlify's servers and is
never exposed to visitors; only logged-in editors can load the data.

> The viewer is **read-only**. To publish a submission (e.g. feature a
> Question-of-the-Month answer or publish a Q&A), copy it into a new entry in the
> admin panel (`/admin`).

---

## 🧑‍💻 Part 4: How the editor uses the admin panel (day-to-day)

Go to **`/admin/`** and log in. You'll see these sections in the sidebar:

- **📰 Newsletters:** add a new monthly issue. You can upload a **PDF**, write
  the issue as text, or both. Tick **"Feature on homepage"** to show it as the
  current newsletter.
- **📢 Announcements:** short news items. The newest (or pinned) one shows on
  the homepage.
- **❓ Question of the Month:** set this month's question, mark submissions
  open/closed, and announce last month's winner.
- **💬 Expert Q&A:** publish answers from scholars to alumni questions.
- **🎓 Alumni Insights:** publish college experiences/advice from graduates.

Fill in the fields, click **Publish** (or save as draft first). Changes go live
automatically within about a minute.

---

## 📁 Project structure

```
public/
  admin/            Decap CMS (the /admin editing panel)
    index.html
    config.yml      ← which content types the editor can manage
  uploads/          uploaded PDFs & images land here
  favicon.svg
src/
  config/site.ts    ← site name, contact email, navigation (EDIT THIS)
  components/NetlifyForm.astro ← the four on-site forms (edit questions here)
  content/          all editable content (Markdown), managed via /admin
    newsletters/  announcements/  questions/  qa/  insights/
    config.ts       content schemas
  components/        reusable UI pieces
  layouts/           page shell (header/footer/fonts)
  pages/             one file per page/route
  styles/global.css  theme + Tailwind
astro.config.mjs     site URL & integrations
tailwind.config.mjs  colors & fonts
netlify.toml         Netlify build settings
```

---

## 🎨 Customizing the look

- **Site name, tagline, contact email, nav links:** `src/config/site.ts`
- **Colors & fonts:** `tailwind.config.mjs` (emerald = primary, gold = accent)
- **Global styles & buttons:** `src/styles/global.css`
- **Logo:** currently a styled monogram in `src/components/Header.astro`; swap in
  a real ISNS logo image there and update `public/favicon.svg`.

---

*A free community initiative. May Allah accept this effort and make it a source of
benefit for the ummah. Ameen.*
