# Deploy LimeShift

## Local

```bash
python -m http.server 8080
```

Open `http://localhost:8080` and verify fonts, media, the custom pointer, service shutters, gallery, and all responsive navigation.

## Hostinger shared hosting

1. In hPanel, choose the intended website/domain and open File Manager.
2. Upload root website files `index.html`, `styles.css`, `fidelity.css`, `app.js`, `fidelity.js`, and the entire `assets/` directory into that website's `public_html/` directory (not into a nested repository folder).
3. Confirm the root URL serves `index.html`, WebP/SVG/MP4 media load, and all site anchors resolve.
4. Replace AYRA demo copy, contact email, fabricated examples, and social placeholders before launch.
5. Confirm SSL/HTTPS and run browser/device QA. If media caching is aggressive, version filenames after major changes.

## GitHub Pages (optional)

This site is also static and can be deployed from the `main` branch root via GitHub Pages repository settings if the owner wishes. Pages configuration has **not** been changed as part of this commit.

## Notes

- No Node build step, API, database, or authentication system.
- The contact form opens an email draft (`mailto:`) after validation; production backend email sending requires a separate service and user consent.
- The included `preview/limeshift-ayra-standalone.html` is a standalone snapshot, not automatically rebuilt when the primary source changes.
- Do not publish licensed original CodeAlder template files unless you have redistribution rights.
