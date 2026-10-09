# PropTwin

Interactive 3D apartment walkthrough built with Blender and Unity, with planned
Meta Quest VR support, voice communication, and hand interactions.

This repository contains the PropTwin website: a 3D modeling studio for real
estate. Built with [Next.js](https://nextjs.org) and exported as a **fully
static site** (no backend), deployed to GitHub Pages.

## Run locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Build

```bash
npm run build
```

Writes the complete site to `out/` as plain HTML/CSS/JS, ready for any static
host. A `postbuild` step (`scripts/flatten-prefetch-files.mjs`) adds files that
static hosts need for Next.js link prefetching.

## Deploy to GitHub Pages

Deployment is automatic via `.github/workflows/deploy.yml`.

1. Push this repository to GitHub.
2. In the repository, open **Settings → Pages** and set **Source** to
   **GitHub Actions**.
3. Push to `main`. The workflow builds and publishes the site to
   `https://<user>.github.io/<repo>/`.

The workflow detects the sub-path (`/<repo>`) automatically. To use a custom
domain such as `proptwin.in`, add it under **Settings → Pages → Custom domain**;
the next deploy serves the site from `/`.

## Project content

| Path | What it is |
| --- | --- |
| `public/models/villa.glb` | Blender villa (Draco-compressed), shown in the hero |
| `public/draco/` | Self-hosted Draco decoder for the villa |
| `public/walkthrough/` | Unity WebGL apartment walkthrough (desktop + touch) |
| `public/projects/` | Project images (floor plan) |
