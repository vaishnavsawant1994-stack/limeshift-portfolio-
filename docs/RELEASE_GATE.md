# LimeShift release and reference-fidelity gate

Updated: 2026-11-15.

## Source changes implemented
- Portrait gaze layer query corrected to select all four eye overlays.
- Portrait hover now samples the transparency of the WebP at reduced resolution; the local color effect is gated by sampled image alpha.
- Pointer animation runs on demand and settles to idle instead of unconditionally animating forever.
- The work gallery has one scroll controller in `app.js`; `fidelity.js` no longer writes `--work-x`.
- Toolbox hover writes are throttled to one animation frame at a time.
- Mobile navigation supports Escape and outside-click dismissal.
- The intro skip button is keyboard available.
- Repeatable source checks: `python3 scripts/verify_site.py`, `node --check app.js`, `node --check fidelity.js`.
- Reproducible offline preview: `python3 scripts/build_preview.py`. CI publishes a fresh generated standalone HTML artifact.

## Verification completed
- CI gate validates structural HTML/asset references, JavaScript syntax, portrait/gallery invariants, and produces the standalone file.
- A passing CI job is evidence of source integrity, **not** proof of visual matching or performance.

## Visual acceptance still needed
- Reference-video frame-by-frame comparison at matching camera/frame/viewport positions.
- Actual head and eye motion direction/range/trajectory comparison; this implementation remains 2.5D, not an original facial mesh rig.
- Validate color blending and mask in Chrome, Safari and Firefox, including sharp, rotating portrait edges.
- Validate mouse enter/leave, mouse over empty alpha pixels, center/corners and fast pointer sweeps at 60/120/144 Hz.
- 1920×1080, 1440×900, 1366×768, 1024×768, 768×1024, 390×844 and 320×720 current-version screenshot comparisons.
- Keyboard navigation, focus, screen reader, prefers-reduced-motion, contrast and touch tests.
- Performance trace on midrange hardware (FPS, long tasks, layout/paint time, memory), Lighthouse and Core Web Vitals.
- Test real email delivery with a backend only if the site is meant to accept server-side contact submissions.
- Replace illustrative client testimonials, identity, contact links and mock case studies with permissioned facts before launch.
- Verify license, asset provenance, HTTPS, production deployment, redirects and rollback plan.

## Important limitations
This repository does not include the original commercial template, original video rig, original portrait or timing curves. Do not claim identical animated facial movement without those source files and a measured comparison.

The committed `preview/limeshift-ayra-standalone.html` snapshot can lag behind source. Build the current version from the script, or download the CI artifact. Promote a generated snapshot into the repository only after reviewing its visual quality.

## Release decision
Source improvements are integrated and can be merged after CI, but **reference parity and live production certification remain blocked** by the visual and device checks above.
