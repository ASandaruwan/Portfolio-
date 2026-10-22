# Achira Sandaruwan — Portfolio

Single-page developer portfolio built with Next.js 16 (App Router), TypeScript, Tailwind CSS v4 and Motion (Framer Motion).

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # production build (all routes prerender as static)
```

## Before you deploy

| What | Where |
| --- | --- |
| GitHub / LinkedIn / Medium URLs | `src/data/site.ts` → `socials` |
| Profile photo | `profileImage` in `src/data/site.ts`: a file in `public/` or a Google Drive share link |
| CV | `resumeUrl` in `src/data/site.ts`: `/resume.pdf` in `public/` (downloads) or an external link (opens in a new tab) |
| Projects | `src/data/projects.ts`: set `image` to a file in `public/images/projects/` or a Google Drive share link |
| Articles | `src/data/articles.ts`: add the Medium `url`; the cover image is pulled from your Medium RSS feed automatically |

Google Drive files must be shared as "Anyone with the link". To use images from another site, add its host to `images.remotePatterns` in `next.config.ts`.
| Site URL + contact email delivery | Copy `.env.example` to `.env.local` and fill it in |

### Contact form

The form posts to a Server Action (`src/app/actions.ts`) that validates input, rejects bots with a honeypot field, and sends the message through [Resend](https://resend.com) using `RESEND_API_KEY`. Without a key, messages are logged to the server console in development; in production the visitor sees an error asking them to email you directly.

## Structure

```text
src/
  app/            layout (metadata, theme script), page, server action, OG image, icons, robots, sitemap, manifest
  components/
    layout/       Header (glass nav + mobile menu + scroll progress), ScrollTracker (01–06), ThemeToggle, Footer
    sections/     Hero, About, Journey, TechStack, Projects, Articles, Contact
    ui/           Section, Reveal, ProjectCard, ArticleCard, ContactForm, Tag, SocialLinks, icons
  data/           site config, section list, journey, stack, projects, articles
  hooks/          useTheme, useActiveSection
  lib/            theme + contact helpers
  types/          Project, Article, TimelineItem, StackCategory
```

- **Theme:** an inline script in `<head>` applies the saved or system theme before first paint (no flash); `useTheme` keeps the toggle in sync and persists the choice.
- **Animations:** the hero uses CSS keyframes so it renders before hydration; everything else reveals on scroll via `<Reveal>`. Both respect `prefers-reduced-motion`.
