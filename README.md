# Nikhil Kumar — Personal Website

A responsive, editorial-style personal website built with **Next.js App Router, TypeScript, Tailwind CSS 4, and Lucide icons**. It has two purposes: a clear portfolio for recruiters and a personal home for other builders, curious people, competitive programmers, and AI/ML practitioners.

## What’s included

- Responsive layout for laptop, tablet, and mobile.
- Prominent email contact CTA in the sticky header and a second contact section near the footer.
- Selected project stories for GreenEye, Blogit, and FootyPundit, with dedicated crawlable `/projects/greeneye`, `/projects/blogit`, and `/projects/footypundit` pages.
- GitHub project directory with category filters and search.
- Automatic GitHub repository metadata + README sync script with bundled fallback data.
- A competitive-programming section with Codeforces, DSA, and Codolio links.
- In-progress sections for Psychoveda and Masterin7ways, with honest status labels.
- About, certifications, education, current interests, a Now section, and a future notes area.
- Search metadata, JSON-LD (`Person`, `CreativeWork`, and `ItemList`), Open Graph image, `robots.txt`, sitemap, manifest, `llms.txt`, and semantic headings/links for search engines and AI crawlers.
- Optimized local WebP versions of your provided photos and character illustration.
- The supplied résumé PDF at `public/Nikhil-Kumar-Resume.pdf`.
- Original project illustrations in SVG. These are clearly described in the page as conceptual visuals, not screenshots of deployed products.

## Run locally

Requires **Node.js 20.9 or newer**.

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

The `predev` script attempts to sync your public GitHub repositories first. If the GitHub API is unavailable, it keeps the bundled snapshot, so the site can still run. To refresh the repo list yourself:

```bash
npm run sync:github
```

The sync script reads the account’s public repository metadata and README files, then regenerates `data/github-repositories.json`. It guesses a category and a display prominence from public metadata/README contents; review the result before publishing, especially any forks or archived repositories. It excludes the profile-configuration repository named `nikhilkyumar` from the project directory.

## Build and deploy

```bash
npm run build
npm run start
```

Before deploying, copy `.env.example` to `.env.local` and set `NEXT_PUBLIC_SITE_URL` to your actual domain, for example your Vercel URL or custom domain. This value is used for canonical, Open Graph, structured data, and sitemap URLs. Do not leave the sample domain in place. Then deploy the project through Vercel or another platform with Next.js support.

## Important final checks before publishing

1. Run `npm run sync:github` while online, inspect the full repository inventory, and edit category/prominence labels where the automatic guess is inaccurate.
2. Verify which resume projects match public repositories. GreenEye, Blogit, and FootyPundit currently have source/profile-level project details, but this package avoids attaching unverified repo URLs to them.
3. Update the `Now` section and its “Last updated” text when your focus changes.
4. Confirm the linked résumé has the version you want publicly shared.
5. Replace the local site URL environment variable with your real deployed URL and verify the generated sitemap, social-preview metadata, and contact email.
6. Check the site at narrow mobile widths, especially the navigation dropdown and repository filter controls.

## Asset notes

Your personal portrait and character art are based on images you uploaded and are included as compressed WebP assets under `public/images/`. The source files are not required at runtime. The visual direction takes inspiration from modern editorial/developer portfolios and public Dribbble/Pinterest moodboards, but no third-party portfolio artwork was copied into this project. This avoids embedding assets whose license or attribution rights are unclear.

See [`DESIGN-RESOURCES.md`](./DESIGN-RESOURCES.md) for the inspiration and asset-library links used while defining the direction.
