# LimeShift Design and Motion Specification (V6)

## Theme identity

- Theme name: **LimeShift**. Demonstration portfolio and hero identity: **AYRA / Ayra Malik**.
- Visual direction: near-black matte surfaces, high-contrast near-white typography, neon-lime lighting, selective purple/coral/ivory accent phases, rounded glass/card geometry.
- Current web palette and actual spacing values are specified by CSS variables and selectors in `styles.css` and `fidelity.css`; these source values are authoritative. Original template RGB/color profile not available.
- Desktop reference is a 384×832 filmed portrait video of a landscape laptop display; measurements from the video are estimates, not a direct native screenshot.

## Section order and interaction contract

1. **Intro:** opening AYRA letter treatment with dismiss/skip behavior.
2. **Hero:** large typography, spotlight-revealed lime letterforms, WebP portrait, directional eye compositing, moving halo, floating badges, magnetic calls to action, spring-smoothed pointer.
3. **Services:** four selectable/hover-expandable service shutter cards; local pointer lighting; keyboard navigation.
4. **Work:** scroll-pinned horizontal track of four projects, progress indicator, control arrows, perspective pointer tilt, project detail dialog.
5. **About / bento:** responsive 12-column layout, animated portrait loop with playback controls, numerical cards and editorial tiles.
6. **Process:** four sequential 3D-inspired card states, scroll-scrub navigation and accessible stage arrows.
7. **Toolbox:** proximity-responsive tile lighting/tilt with touch fallback.
8. **Testimonials:** horizontal cards with drag momentum and button navigation.
9. **Contact:** text inputs with validation, no backend submission; email draft behavior.
10. **Footer:** responsive logo, navigation, large moving illuminated wordmark.

## Technical motion behavior

- `app.js` owns the main `requestAnimationFrame` cursor interpolation, scroll measurement, active-stage selection, and gallery motion.
- `fidelity.js` augments local lighting, keyboard service controls, drag momentum, footer fallback and gallery recalculation.
- Respect `prefers-reduced-motion`, pointer capabilities, touch actions and visible keyboard controls; never require hover alone.
- Re-measure scroll regions after resize/fonts/media load; avoid moving page layout when only visual transforms are needed.
- For consistent QA, fix viewport size, device pixel ratio, scroll progress, pointer coordinates, and animation settle time when comparing frames.

## Reference fidelity constraints

The original creator's facial rig, original project/media assets, typeface source, exact animation curves and complete site flows were not supplied. The replacement portraits/animations/illustrations are independently created assets and cannot be guaranteed pixel-identical to the video. See `REFERENCE_AND_RIGHTS.md`.
