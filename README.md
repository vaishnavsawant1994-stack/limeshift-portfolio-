# LimeShift — Interactive Portfolio Theme

**LimeShift** is a dark, motion-rich portfolio theme with neon-lime accents, cursor-responsive effects, scroll-driven storytelling, and a responsive static frontend. **AYRA / Ayra Malik** is the example portfolio currently included. The demo name/content is not the name of the reusable theme.

> **Status:** V6 reference-based reconstruction, not a verified pixel-perfect copy of the original video. See [the QA report](docs/QA_REPORT.md) and [known visual limitations](docs/REFERENCE_AND_RIGHTS.md).

## Run locally

No npm dependencies, backend, or database are required.

```bash
python -m http.server 8080
```

Open http://localhost:8080. For offline sharing, see `preview/limeshift-ayra-standalone.html` (prebuilt snapshot).

## Pages and effects

- Intro and portrait-led hero with cursor spotlight, spring-smoothed pointer, magnetic buttons and gaze-direction layers.
- Four expandable services; a scroll-pinned horizontal case-study gallery with image parallax and details dialog.
- Animated portrait and editorial bento grid, four-stage scroll-driven process deck, proximity-responsive toolbox.
- Draggable testimonials, contact form, full-width illuminated footer, and keyboard/touch/reduced-motion alternatives.
- Responsive desktop, tablet, and mobile layouts; scalable SVG project artwork and embedded MP4/WebP demo media.

## Project layout

```text
index.html             Entry point (AYRA demo)
styles.css             Main styling and responsive layouts
fidelity.css           Reference-fidelity refinements
app.js                 Main interactive behaviors
fidelity.js            Additional motion and accessibility refinements
assets/                Local WebP portraits/eye overlays, project SVGs, About MP4
preview/               Self-contained static HTML snapshot
screenshots/           V6 visual QA captures (not source artwork)
docs/                  Setup, motion/design, QA, version history, rights notes
```

## Development

Start by editing `index.html` and the styles/scripts alongside it. Source is **vanilla HTML/CSS/JavaScript**, rather than a Next.js/React application. Keep relative `assets/` paths intact. See [design/motion spec](docs/DESIGN_AND_MOTION.md).

To customize the portfolio, replace the AYRA demo copy, portrait, project artworks, profile details, testimonial placeholders, and contact address. Verify usage rights for any real clients or assets you add. **The form validates input and opens a `mailto:` draft; it does not send or persist information to a server.**

## Deployment

Upload the files from repository root (`index.html`, CSS, JS, and `assets/`) to Hostinger's chosen domain `public_html` folder or any static host. The `preview/` directory is optional, and nothing has been connected to a production domain by this commit. See [deployment guide](docs/DEPLOYMENT.md).

## Verification and limitations

The V6 QA recording covered 1920×1080, 1440×900, 1366×768, 1024×768, 768×1024, 390×844 and 320×720. See actual [QA results](docs/viewport-qa-results.json) and [motion results](docs/motion-qa-results.json). This GitHub upload is a source-control operation, not a new pixel-parity certification.

The original template behind the [reference YouTube Short](https://youtube.com/shorts/n7LGSs1H_Bc) was not provided; this package uses newly made replacement media, not its original facial rig, licensed source images or fonts. [Reference and provenance](docs/REFERENCE_AND_RIGHTS.md).

## Licensing

No open-source license is granted by the mere presence of this public repository. The owner can choose and add a license later. Third-party fonts load from Google Fonts; inspect their separate applicable licenses before redistributing fonts themselves.
