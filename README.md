# Rotary Club MVP Website

A modern, mobile-first MVP website for a newly chartered Rotary Club. The site uses React components, Tailwind utility classes, Framer Motion animations, Rotary-inspired colors, accessible navigation, conversion-focused CTAs, and responsive sections for membership, events, donations, projects, leadership, and stories.

## Open the MVP

The MVP is built as a static browser-openable React page using CDN modules, so it can be deployed directly with GitHub Pages.

From this folder:

```bash
python3 -m http.server 4173
```

Then open:

```text
http://127.0.0.1:4173
```

## Deploy to GitHub Pages

1. Create a new empty repository on GitHub.
2. Push this project to the repository:

```bash
git init
git add .
git commit -m "Initial Rotary Club MVP website"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
git push -u origin main
```

3. In GitHub, open the repository settings.
4. Go to **Pages**.
5. Under **Build and deployment**, choose **Deploy from a branch**.
6. Select branch `main` and folder `/root`.
7. Save.

GitHub will publish the site at:

```text
https://YOUR_USERNAME.github.io/YOUR_REPO/
```

## Files

- `index.html` contains SEO metadata, Tailwind CDN configuration, and the app mount.
- `src/app.js` contains the React component library and all site sections.
- `src/styles.css` contains responsive CSS, accessibility polish, fluid type, and visual helpers.

## Production Migration

When a package manager is available, this can be moved into Vite or Next.js directly:

1. Install dependencies from `package.json`.
2. Replace the CDN imports in `src/app.js` with package imports:

```js
import React, { useEffect, useMemo, useState } from "react";
import { createRoot } from "react-dom/client";
import { motion, AnimatePresence } from "framer-motion";
```

3. Move Tailwind config into `tailwind.config.js` and compile CSS for production.
4. Replace placeholder images, leaders, contact details, events, and impact stats with CMS-backed content.
