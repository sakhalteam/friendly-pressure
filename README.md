# 💧 Friendly Pressure

The website for **Friendly Pressure** — a small, friendly, do-it-right pressure-washing business run by Nic. Pressure washing done with a smile, a fair price, and a genuine care for your property (and the storm drain downstream).

Built to be clean and approachable but with room for silliness — water droplets, a nozzle cursor, the works. Not your average copy-paste tradesman template.

## Stack

- **Vite 8** + **React 19** + **TypeScript 6**
- **Tailwind v4** via `@tailwindcss/vite`
- Deploys to **GitHub Pages** via GitHub Actions (Node 22)
- No backend — quote form composes a `mailto:` (easy to upgrade later)

## Run it

```bash
npm install
npm run dev        # local dev server
npm run build      # production build → dist/
npm run preview    # preview the production build
npm run typecheck  # tsc -b (run before pushing!)
```

Lives at **https://sakhalteam.github.io/friendly-pressure/** once Pages is enabled
(Settings → Pages → Source: GitHub Actions).

## Where to edit things

**Almost all the words and numbers live in one file:** [`src/content.ts`](src/content.ts).
Change copy, services, prices, service-area towns, and contact info there without
touching components. Anything marked `TODO` is a placeholder to fill in for real.

### 📝 Before this goes live — fill in:

- [ ] **Real business phone** — `555-WASH` is a placeholder (`business.phone`)
- [x] Business email — `FriendlyPressureWA@gmail.com`
- [ ] **Home base town** + real **service-area towns** (`serviceArea`)
- [ ] **A photo of Nic** — set `about.photo`
- [ ] **Sanity-check the pricing ranges** against what you actually charge
- [ ] **Real per-job before/after photos** — right now `before_01`/`after_01`
      are reused across all three gallery slots. Drop new pairs in
      `public/photos/` and point each `gallery[]` item at its own pair.
- [ ] (optional) **Real quote inbox** — swap the `mailto:` form for Formspree /
      Netlify Forms. See the upgrade note at the top of
      [`src/sections/QuoteForm.tsx`](src/sections/QuoteForm.tsx).

## Structure

```
src/
  content.ts            ← edit copy/prices/contact HERE
  App.tsx               ← page assembly (section order)
  index.css             ← theme tokens, glass, buttons, water EFFECTS
  components/
    Nav.tsx             ← sticky top nav
    Section.tsx         ← section wrapper + scroll reveal
    Droplets.tsx        ← decorative falling-water effect
    BeforeAfter.tsx     ← drag-to-wipe before/after slider
    Lightbox.tsx        ← full-screen click-to-zoom modal
    GrimeReveal.tsx     ← spray-off-the-grime minigame (canvas)
  sections/
    Hero.tsx  Services.tsx  Gallery.tsx  Pricing.tsx
    Process.tsx  About.tsx  ServiceArea.tsx  QuoteForm.tsx  Footer.tsx
public/
  droplet.svg           ← favicon
  nozzle.svg            ← spray-wand cursor + grime-spray cursor
  photos/               ← before_01, after_01, service_area
```

## Fun knobs to play with

- **Grime minigame:** `<GrimeReveal src=… onActivate=… />` covers any image in
  grime you spray off with the nozzle (hover on desktop; hold-to-wash button on
  mobile; "Clear grime" escape hatch). Tune the cone size / clean threshold near
  the top of [`GrimeReveal.tsx`](src/components/GrimeReveal.tsx). Currently on the
  service-area map — drop it on anything.
- **Before/after slider:** `<BeforeAfter before=… after=… />` — drag to wipe.
- **Nozzle cursor:** add `className="nozzle-cursor"` to `<body>` (in `index.html`)
  or any element to turn the cursor into a spray wand.
- **More/less rain:** `<Droplets count={N} />` — used in the hero, drop it
  anywhere with a `position: relative` parent.
- **Shine/wipe effect:** add `className="shine"` to any relative container for a
  clean-swipe-on-hover (already on service & gallery cards).
- **New water effects** go in the `EFFECTS` section of `index.css`.

## Theme

Dark-first ocean palette — deep wet-asphalt navy with bright spray-cyan glows,
frosted glass, and a touch of friendly warmth. Tokens live at the top of
`index.css` (`--spray`, `--deep`, `--mint`, `--sun`, …) so the whole look
re-skins from one place.

---

A sakhalteam joint. Best compliment you can give: tell a neighbor.
