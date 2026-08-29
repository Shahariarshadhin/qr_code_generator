# Social QR Hub

A tiny Next.js + Tailwind app for exactly one job: generate **one QR code**
that opens a landing page with buttons for your Facebook, Instagram,
Website, YouTube, and WhatsApp — designed to be printed on a shopping bag.

## Why one landing page instead of stuffing 5 links into one QR?

A QR code can only encode a single string. Cramming 5 URLs into one code
either breaks scanning apps or produces a code so dense it won't scan once
printed small on a bag. The standard, reliable solution (same idea as
Linktree) is: the QR encodes **one URL**, and that URL is a page you host
which then links out to everything else. This project gives you both
pieces — the generator and the landing page — in one deployable app.

## Run it locally

```bash
npm install
npm run dev
```

Open http://localhost:3000 — fill in your links, and you'll see the QR
code update live on the right, pointing at `/links?fb=...&ig=...` etc.

## Deploy it (so the QR actually works when scanned)

The QR code is only useful once it points at a **real, live URL**. The
easiest path:

1. Push this project to a GitHub repo.
2. Import it into [Vercel](https://vercel.com/new) (free tier is fine) —
   it auto-detects Next.js, no config needed.
3. Once deployed, you'll get a URL like `https://your-project.vercel.app`.
4. Go back to the generator, paste that URL into the "Hub domain" field.
5. Download the QR code (SVG for print, or the 2000px PNG).

You can later attach a custom domain in Vercel's settings, regenerate the
QR with that domain, and the same printed bags keep working since the
`/links` route and query params don't change — only re-print if you want
the QR to point at a new domain.

## Printing it on the bag

- Prefer the **SVG download** — hand it to your printer as vector artwork,
  it stays crisp at any size.
- If your printer only takes raster images, use the **2000px PNG**.
- Keep the QR at least 2 x 2 cm on the bag, with a plain (non-busy)
  background behind it, and test-scan a printed sample before a full print
  run — ink spread on fabric/paper bags can blur fine detail.

## Editing links later

Nothing is hardcoded — everything lives in the URL query string
(`?name=...&fb=...&ig=...&web=...&yt=...&wa=...`). If a link changes,
generate a new QR only if you're doing a fresh print run; for bags already
printed, you'd need the QR itself to change, since it's baked into the ink.
For a link you expect to change often (like a seasonal promo), point that
button at a URL you fully control (e.g. your own site) and update the
redirect there instead.
