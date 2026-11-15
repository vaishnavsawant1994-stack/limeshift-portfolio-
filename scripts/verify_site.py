#!/usr/bin/env python3
"""Portable static quality gate for the LimeShift demo; no third-party packages."""
from __future__ import annotations
from html.parser import HTMLParser
from pathlib import Path
import re
import sys

ROOT = Path(__file__).resolve().parents[1]

class SiteParser(HTMLParser):
    def __init__(self):
        super().__init__()
        self.ids = []
        self.anchors = []
        self.assets = []
        self.errors = []
        self.labels = set()
        self.controls = []
        self.aria_links = []
    def handle_starttag(self, tag, attrs):
        d = dict(attrs)
        if 'id' in d:
            self.ids.append(d['id'])
        if d.get('href', '').startswith('#') and len(d['href']) > 1:
            self.anchors.append(d['href'][1:])
        for attr in ('src', 'href', 'poster'):
            path = d.get(attr, '')
            if path.startswith('assets/'):
                self.assets.append(path)
        if tag == 'img' and 'alt' not in d:
            self.errors.append('image without alt: ' + repr(d.get('src')))
        if tag in ('input', 'textarea', 'select') and d.get('type') != 'hidden':
            self.controls.append(d.get('id'))
        if tag == 'label' and d.get('for'):
            self.labels.add(d['for'])
        if d.get('aria-labelledby'):
            self.aria_links.extend(d['aria-labelledby'].split())

def main():
    html = (ROOT / 'index.html').read_text(encoding='utf-8')
    p = SiteParser()
    p.feed(html)
    errors = p.errors[:]
    if len(p.ids) != len(set(p.ids)):
        errors.append('duplicate HTML IDs')
    for anchor in p.anchors + p.aria_links:
        if anchor not in p.ids:
            errors.append('unresolved in-page/ARIA link: ' + anchor)
    for control in p.controls:
        if control and control not in p.labels and not re.search(
            r'id="' + re.escape(control) + r'"[^>]*aria-label=', html
        ):
            errors.append('form control missing associated label: ' + control)
    for path in p.assets:
        if not (ROOT / path).is_file():
            errors.append('missing media asset: ' + path)
    for name in ('app.js', 'fidelity.js', 'styles.css', 'fidelity.css'):
        if not (ROOT / name).is_file():
            errors.append('missing site resource: ' + name)
    app = (ROOT / 'app.js').read_text(encoding='utf-8')
    extra = (ROOT / 'fidelity.js').read_text(encoding='utf-8')
    if 'updateGallery' in extra or "setProperty('--work-x'" in extra:
        errors.append('duplicate gallery controller detected in fidelity.js')
    if "const gazeLayers=$$('.eye-overlay')" not in app:
        errors.append('gaze overlay must select all eye layers')
    if 'figureHit(ix,iy)' not in app:
        errors.append('portrait silhouette hit-test is not configured')
    if 'function requestMotion()' not in app:
        errors.append('pointer motion must be throttled and idle-aware')
    for e in errors:
        print('FAIL:', e)
    if errors:
        sys.exit(1)
    print('PASS: asset paths, IDs, anchors, form labels, portrait and gallery invariants')
    print(f'Checked {len(p.ids)} IDs, {len(p.assets)} local asset references and {len(p.anchors)} anchors.')

if __name__ == '__main__':
    main()
