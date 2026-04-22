# zoon Client Portal

Next.js App Router implementation of the zoon project management dashboard inspired by the supplied high-contrast red and graphite references.

## Stack

- Next.js 15
- React 19
- TypeScript
- App Router
- Tailwind CSS

## Routes

- `/overview` - command-center style dashboard with pipeline and activity views
- `/projects` - project listing and execution board
- `/projects/create` - create project workspace and initialization form
- `/projects/quantum-core-refactoring` - detailed project workspace with milestones, team, files, and activity
- `/payments` - invoicing and revenue dashboard
- `/reviews` - client reviews and testimonial center
- `/auth/login` - branded login screen

## Local Setup

```bash
npm install
npm run dev
```

Then open `http://localhost:3000`.

## Notes

- All content is currently mocked in [`lib/data.ts`](/f:/Projects/zoon_management_software_frontend/lib/data.ts).
- Tailwind theme tokens and base styles live in [`app/globals.css`](/f:/Projects/zoon_management_software_frontend/app/globals.css).
- The app uses a shared dashboard shell with reusable UI sections, badges, and progress bars.
