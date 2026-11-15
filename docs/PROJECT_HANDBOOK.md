# LimeShift — Motion-rich Portfolio Theme — Complete Project Guide

**Repository:** `vaishnavsawant1994-stack/limeshift-portfolio-` · **Review:** 15 November 2026  
**Evidence level:** current README, repository layout and manifest where available; no fresh deployed-end-to-end certification.

## Product identity and problem
Independent portfolio theme with neon-lime, cursor-reactive and scroll storytelling experiences, shown using illustrative AYRA example content.

**Primary users:** Designers, creative studios and frontend engineers.

## Functional areas and intended user journeys
1. Interactive hero and case-study presentation.
2. Cursor-responsive visual effects.
3. Scroll-driven transitions and animated sections.
4. Static standalone preview and reference/QA documentation.

Features above describe documented capability areas, source/UI surfaces or product intents. A listed module is not necessarily a functioning integrated feature.

## System design and codebase
HTML/CSS/JavaScript, `index.html`, `styles.css`, `fidelity.css`, `app.js`, `fidelity.js`, `assets/`, `preview/`, `screenshots/`, `docs/`. No backend/database required for the demo.

## Implementation status
README describes V6 reconstruction. Reference matching is not verified pixel-perfect. Motion, text layout and image treatments remain comparison tasks.

**Do not conflate:** planned scope, code existence, passing old CI, live production deployment and independent release acceptance. They require separate evidence.

## Development and testing
Use `python -m http.server 8080` at repo root and open localhost:8080; review standalone offline HTML in `preview/` and recorded QA docs.

Before using any environment: examine .env examples and source code, use test accounts, protect secrets, and inspect the target database prior to migrations/seed commands.

## Data security, privacy and operations
- Do not imply AYRA is the purchaser's brand.
- Use rights-cleared images and original creative assets.
- Prevent motion effects from harming accessibility/performance.
Additionally validate backup/restore, audit logs, staging isolation, access reviews, monitoring and release rollback before production use.

## Priority development plan
1. Compare reference video frame by frame.
2. Measure typography, imagery and mouse/hover behavior.
3. Test touch fallback and reduced-motion preferences.
4. Capture reproducible desktop/mobile evidence.

## Where to read more
- [`README.md`](../README.md)
- [`docs/QA_REPORT.md`](../docs/QA_REPORT.md)
- [`docs/REFERENCE_AND_RIGHTS.md`](../docs/REFERENCE_AND_RIGHTS.md)
- [`fidelity.js`](../fidelity.js)
- [`screenshots/`](../screenshots/)

This guide should be revised after verified code, architecture, data schema, deployment or product-scope changes. The underlying source and gated engineering documents remain authoritative.
