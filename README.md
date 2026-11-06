# Raj Tandoor — scroll-driven 3D product homepage

A cinematic homepage hero for **Raj Tandoor & Kitchen Equipment**. As the visitor scrolls, one continuous
timeline moves the camera around a 3D stainless-steel tandoor, lifts its lid to reveal the clay-lined cooking chamber,
highlights construction details, and ends on the enquiry call to action.

## Run it

Requires Node 20+.

```bash
npm install
```

```bash
npm run dev
```

Open http://localhost:5173. For a production build:

```bash
npm run build
```

```bash
npm run preview
```

The `dist/` folder is a static site and can be deployed to any static host.

### Dependencies

| Package | Why |
| --- | --- |
| `react`, `react-dom` | UI |
| `three`, `@react-three/fiber` | WebGL scene |
| `@react-three/drei` | Studio environment, contact shadows, floor reflection |
| `gsap` (incl. `ScrollTrigger`) | Scroll-scrubbed timeline |
| `vite`, `typescript`, `@vitejs/plugin-react` | Build tooling (dev only) |

## How it is built

No 3D model file was supplied, so the tandoor is a **procedural 3D approximation** built from the reference photo's
proportions (`src/three/`). It has separate parts — body, rim bands, clay collar, cooking chamber, removable lid with
handle, side handles, firebox, feet and emblem — so the lid can move on its own. It is not an engineering replica.

The product photo (`public/images/raj-tandoor-product.webp`) is used as:

- the instant **poster** shown while the 3D code loads (then cross-faded out), and
- the **image-based fallback** when WebGL is unavailable: the photo zooms and pans per chapter, and no lid animation
  is faked on the flat photo.

### Files

```
index.html                       SEO meta + static crawlable hero shown before JS runs
src/config/content.ts            ALL copy, CTA links, nav, contact details
src/animation/storyConfig.ts     Camera shots per layout, chapter timing, lid timing, callout anchors
src/animation/buildStoryTimeline.ts  The single GSAP + ScrollTrigger timeline
src/animation/storyStore.ts      Shared mutable state (GSAP writes, three.js reads — no React re-renders)
src/three/TandoorScene.tsx       Canvas, lighting, environment, floor, camera rig, callout projection
src/three/TandoorModel.tsx       Procedural tandoor parts
src/three/useTandoorAssets.ts    Geometry/material creation and disposal
src/three/textures.ts            Canvas-generated textures (brushed steel, clay, embers, emblem)
src/components/TandoorHero.tsx   Pinned story section, lazy-loads the scene, builds the timeline
src/components/ScrollStory.tsx   Chapter copy (real HTML)
src/components/FeatureCallout.tsx  Labels pinned to 3D points on the product
src/components/ProductFallback.tsx Poster / no-WebGL photo
src/components/Header.tsx, HeroCTA.tsx, BrandMark.tsx, PageSections.tsx
src/styles/global.css            Design tokens (colours at the top) and all styles
```

## Scroll timeline

The hero is a tall section (640vh desktop, 520vh phones) with a sticky full-screen stage. One GSAP timeline of
length 100 is scrubbed by ScrollTrigger, so each number below is "% of hero scroll". Scrolling up reverses everything.

| % | Chapter | What moves |
| --- | --- | --- |
| 0–18 | The Reveal | Camera eases closer; reflections drift across the steel. On load, a short time-based fade-up of exposure + dolly. |
| 18–38 | Craftsmanship | Camera to upper body, product turns slightly; callouts 01 → 02 → 03 appear one at a time. |
| 38–62 | Inside the Tandoor | Camera rises over the opening; lid lifts and tilts back (43–52%); warm glow rises inside; lid returns (57–64%). |
| 62–80 | Every Detail | Camera drops to the lower body with low grazing light; firebox, body, handles, base labels. |
| 80–100 | Complete Product | Back to a full three-quarter view; final CTAs. |

All timing lives in `src/animation/storyConfig.ts` (`shotSchedule`, `chapterWindows`, `lidSchedule`, `callouts`).

## Customising

**Text, buttons and links** — edit `src/config/content.ts`:

- `links.exploreTandoors` / `links.requestQuote` — where every CTA goes (currently in-page `#tandoors` and `#contact`;
  change to e.g. `/collections/tandoors` or a contact page URL).
- `contact.email` — **set this to enable the enquiry form** (it opens the visitor's mail app with the enquiry filled in).
  Until it is set, the form shows a polite "not connected yet" message. To post to a backend instead, change
  `onSubmit` in `src/components/PageSections.tsx`.
- `contact.phone` — optional; shown in the enquiry section when set.
- `chapters` — every chapter's eyebrow, heading (`\n` = line break), body, short mobile body, features and CTAs.
- `nav` — header links.

**Colours** — the tokens at the top of `src/styles/global.css` (`--bg`, `--gold`, …).

**Logo** — the header emblem is the SVG in `src/components/BrandMark.tsx`. On the 3D model the emblem is drawn with
real text from `brand` in `content.ts`. To use the official artwork instead, add a square transparent PNG/WebP
(ideally 1024×1024) to `public/images/` and set `brand.emblemTextureUrl` to its path.

**Product photo** — replace `public/images/raj-tandoor-product.webp` (keep the name, or update `productImage` in
`content.ts` with the new path, width and height). A dark background works best because the poster edges are faded.

## Using a real 3D model (GLB/GLTF)

A photographed-and-modelled GLB will always look better than the procedural version.

1. Export the model in metres with the base at y = 0, the front (emblem side) facing +Z, and the **lid as a separate
   named node** (e.g. `Lid`). Draco/Meshopt compression is recommended.
2. Put it in `public/models/raj-tandoor.glb`.
3. Replace `<TandoorModel assets={assets} />` in `src/three/TandoorScene.tsx` with a component that loads it:

   ```tsx
   import { useGLTF } from '@react-three/drei';
   function GltfTandoor() {
     const { scene, nodes } = useGLTF('/models/raj-tandoor.glb');
     useFrame(() => {
       const lid = nodes.Lid;
       lid.position.y = LID_REST_Y + sceneState.lidY;
       lid.position.z = sceneState.lidZ;
       lid.rotation.x = sceneState.lidTilt;
     });
     return <primitive object={scene} scale={SCALE} />;
   }
   ```

   Scale it so it is ~2 units tall, or update `DIM` in `src/three/dimensions.ts` and the callout anchors in
   `storyConfig.ts` to match the model.

## Responsive, accessibility & performance

- **Layouts** (`src/hooks/useEnvironment.ts`): `desktop` (≥1200px landscape) full story with 3D callouts;
  `tablet` (≥820px landscape) gentler camera moves and compact callouts; `stacked` (phones, portrait tablets) copy on
  top, product below, no floating labels (features shown as a list), short copy, large touch CTAs.
- **Reduced motion**: with `prefers-reduced-motion` (or `?reduced-motion` in the URL) the hero is a single still
  composition and the chapter content is shown as normal sections below it.
- **No WebGL** (or `?static` in the URL): photo-based story, no lid animation.
- **SEO**: title/description in `index.html`; a static hero with the H1, copy, CTAs and product image is in
  `index.html` for crawlers and pre-JS paint. All chapter text is real HTML. No product structured data is included
  because no verified product details (price, SKU, specs) were supplied — add it once they are.
- **Performance**: three.js is code-split and loaded after first paint (initial JS ≈124 KB gzip; 3D chunk ≈279 KB gzip
  loads lazily). The canvas renders **on demand** only when scroll/state changes (no idle GPU work). Textures are
  generated on a canvas (no image downloads). Pixel ratio is capped (1.75 desktop, 1.5 phones). The reflective floor
  is desktop-only. All geometries, materials, textures and ScrollTriggers are disposed on unmount.
- Keyboard: skip links, chapter navigation buttons, visible focus rings, Escape closes the mobile menu.

## What was tested

Run locally in the Claude desktop browser (Chromium) against both the dev server and the production build:
page load, asset loading, CTA anchors, forward and reverse scrolling through all five chapters, lid lift/return,
callout placement at 1440×900 and 1024×768, the 390×844 phone layout, `?reduced-motion` and `?static` fallbacks,
and console errors (none).

Not tested: Safari/Firefox, real phones/tablets (touch scrolling, iOS address bar), actual OS reduced-motion setting,
low-end GPU performance, and screen readers.

## Known limitations

- The tandoor is a procedural approximation; fine details (welds, exact handle shape, logo curvature) are simplified.
- The 3D emblem is redrawn from the photo with real text — replace it with the official artwork for exact branding.
- The enquiry form needs `contact.email` (or a backend) before it can send anything.
- Collection, kitchen equipment and about sections are short placeholders using only facts visible in the reference.
#   r a j t a n d o o r k i t c h e n e q u i p m e n t s  
 