"""Subsets the Font Awesome webfonts to the icons the site uses (scripts/fa-codepoints.txt, written by build-vendor-css.mjs).
Run with: PYTHONPATH=<dir with fonttools+brotli> python3 scripts/subset-fa-fonts.py"""
import shutil
from fontTools import subset

codepoints = [line.strip() for line in open("scripts/fa-codepoints.txt") if line.strip()]
unicodes = ",".join("U+" + cp for cp in codepoints)
for name in ("fa-solid-900", "fa-regular-400", "fa-brands-400"):
    subset.main([
        f"node_modules/@fortawesome/fontawesome-free/webfonts/{name}.woff2",
        f"--unicodes={unicodes}",
        "--flavor=woff2",
        "--layout-features=*",
        f"--output-file=src/assets/fonts/fa/{name}.woff2",
    ])
shutil.copy("scripts/fa-codepoints.txt", "src/assets/fonts/fa/codepoints.txt")
print(f"subset {len(codepoints)} icons")
