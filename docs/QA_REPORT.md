# AYRA V6 — Visual and Functional QA Report

Date: 2026-11-13. Reference: uploaded 46-second vertical video, recorded from a filmed laptop screen at 384 × 832 video resolution.

## Result
**Working reconstruction completed. Exact 100% identity is not verified.** The original source assets, image/face rig and timing curves were not available for direct comparison. The original recorded laptop pixels are angled and occupy only part of the vertical clip, so cross-resolution pixel-diff scores would be misleading.

## Verified Chromium results

| Check | Result |
|---|---|
| Desktop 1920×1080 | Pass, 0 px horizontal overflow, 0 observed page errors |
| Desktop 1440×900 | Pass, 0 px horizontal overflow, 0 observed page errors |
| Desktop 1366×768 | Pass, 0 px horizontal overflow, 0 observed page errors |
| Small desktop 1024×768 | Pass, 0 px horizontal overflow, 0 observed page errors |
| Tablet 768×1024 | Pass, 0 px horizontal overflow, 0 observed page errors |
| Mobile 390×844 | Pass, menu open/close verified, 0 px horizontal overflow |
| Small mobile 320×720 | Pass, menu open/close verified, 0 px horizontal overflow |
| Service shutter | One active card, widths [221, 221, 624, 221]px at 1440px (active ≈2.82× neighboring card) |
| Pinned projects | Nonzero horizontal scroll translation measured: `matrix(1, 0, 0, 1, -1345.63, 0)` |
| Project detail dialog | Open and close confirmed in Chromium |
| 4 process stages | Stages 0, 1, 2, 3 activated in order by scroll |
| Toolbox | 3 nearby tiles highlighted in pointer test |
| Testimonials | Arrow moved scrollLeft from 0 to 510px |
| Form validation | Invalid submission displayed: Please enter your name (at least 2 characters). |
| Footer pointer mask | Reactive CSS coordinates observed: ['65.51036075373426%', '77.80197328136148%'] |
| Bento geometry | 0 content-card overlaps detected |
| Runtime JavaScript | 0 observed page errors in inspected test states |
| Syntax | Both JS files passed `node --check`; CSS parsed using `tinycss2` |

### Issues corrected from prior versions
1. Hero portrait resolution/shape mismatch improved with a 1086 × 1448 cutout and corresponding gaze layers.
2. Desktop gallery heading duplication/overlap corrected; slide progress linked to actual translation.
3. About bento now uses a filled 12-column placement with non-overlapping text and numeric panels.
4. Desktop stage cards resized and repositioned for more of the full card to remain visible.
5. Mobile navigation visibility and lack of horizontal overflow checked at two narrow widths.
6. Site-wide glow and card spotlight variables localized and tuned. Gallery, toolbox and testimonial effects verified via pointer/scroll tests.
7. Standalone build no longer depends on external assets to function; online Google Fonts load non-blockingly where available.

## Remaining video mismatches — NOT falsely marked complete

| Video element | V6 fidelity limitation | How to reach exactness |
|---|---|---|
| Live face/head tracking | Gaze-overlay compositing and 2.5D transformations, not the filmed creator's true animated head mesh or facial rig | Obtain original model/rig and motion curves; calibrate against full-resolution footage |
| Hero photograph and red-sweater animation | High-resolution synthetic replacements, not the film's original photography | Use licensed original photo and video assets |
| Project artwork geometry | Four independent scalable artworks are thematically aligned but not pixel-identical to original | Acquire original 4 project illustrations/screenshots |
| Font metrics | Uses DM Sans, Manrope and Instrument Serif via nonblocking Google Fonts; source may use other/custom font faces | Obtain source font families/weights, then match glyph geometry |
| Exact motion timing | Interaction categories and states reconstructed, not original GSAP/Three.js keyframes | Inspect licensed template code and tune scrub/timing curves |
| Colors and lighting | Matched by visible video approximation, not calibrated source RGB/ICC | Original palette/design tokens or high-quality direct screen capture |
| Micro-interactions not shown in clip | Cannot verify hidden states, a11y variants and complete secondary-page workflows | Original demo/site or author-provided specs |
| Device-performance | Interactive states pass desktop Chromium checks; no real-device GPU benchmark performed | Profile on target devices and optimize layer count/paint as needed |

## Suggested next checks if the original files become available
Acquire the licensed template from the store shown in the video; use direct reference viewport captures; pair visual-state screenshots and frame-timed trajectories; replace synthetic assets and fonts; profile 60fps input/scroll performance on real hardware. Without those files, claiming 100% pixel-identical is not defensible.
