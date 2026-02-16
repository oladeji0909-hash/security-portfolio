# Portfolio Site

## Goal
This static landing page describes the student developer + security specialist mission, highlights demo projects (landing, dashboard, MVP), explains the Security Health Check offering, and drives visitors toward the free 10-minute scan CTA.

## Tech Surface
- Plain HTML template with embedded CSS and semantic sections for hero, projects, offering cards, scan pitch, and contact details.
- Designed for responsiveness with a single CSS grid and utility styles.

## Deploying
1. Create a GitHub repository (e.g., `security-portfolio`) and push this directory. From `portfolio/`, run:
   ```
   git init
   git add .
   git commit -m "Initial portfolio"
   git branch -M main
   git remote add origin https://github.com/<your-username>/security-portfolio.git
   git push -u origin main
   ```
2. Sign in to Vercel or Netlify and link the GitHub repo. Select the `portfolio/` folder (if your repo contains just this folder, root is fine), keep defaults for a static HTML build, and deploy.
3. The platform will give you a public URL with HTTPS. Share that link in your outreach and log it in your plan.
4. Optional: buy a cheap domain (Namecheap ~$10/year) and point the `A`/`CNAME` records to Vercel/Netlify as explained in their dashboard.
5. For a quick local preview during edits, run:
   ```
   npx serve .
   ```
   or `python -m http.server 4173` if you prefer Python.

## Next enhancements
- Hook the CTA button to a real booking form or link to a Calendly/Google Form.
- Replace the placeholder email/phone with actual contact details.
- Add testimonials or Health Check results once they exist.
