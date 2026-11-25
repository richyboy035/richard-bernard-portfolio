# Richard Bernard Portfolio — Starter

A premium, motion-ready portfolio starter built with Next.js, TypeScript, Tailwind CSS, and Framer Motion.

## Requirements
- Node.js 20.9+ recommended
- npm

## Run locally
1. Extract this folder.
2. Open the folder in VS Code.
3. Open the integrated terminal.
4. Run:
   ```bash
   npm install
   npm run dev
   ```
5. Open http://localhost:3000

## What's included
- Responsive navigation with mobile menu
- Animated hero section
- Responsive technology-stack marquee with local brand icons and reduced-motion support
- Responsive project cards with image previews where assets are available
- Selected-work cards with scroll reveal
- About page with experience, process and selected projects
- Print-friendly resume page
- Contact CTA and footer
- Design tokens and global styling

## Planned next phases
1. Refine the visual system and responsive details.
2. Add real project imagery and project detail pages.
3. Add project filters and dynamic routing.
4. Integrate Supabase for database, authentication, and media storage.
5. Build the admin CMS for project publishing.

Project cards use a consistent 4:3 thumbnail area. RentDirect uses its supplied
cover image; PocketPlan, Border Cash, Ajo Circle, and PowerWatch currently show
an explicit missing-image message until suitable project assets are provided.
Project data remains static.

The About page uses `public/images/richard-bernard-profile.png` for its portrait.
The resume prints or saves to PDF through the browser. Add verified employment
dates and education details when available in `data/experience.ts` and
`app/resume/page.tsx`. The contact address is configured in `data/contact.ts`.
