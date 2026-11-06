"""One-off: CM Geom otf/ttf -> woff2, and prints metrics for the size-adjusted fallback font.
Run with: PYTHONPATH=<dir with fonttools+brotli> python3 scripts/convert-fonts.py"""
from fontTools.ttLib import TTFont

for src, dst in (("src/assets/fonts/cmgeom-regular.otf", "src/assets/fonts/cmgeom-regular.woff2"),
                 ("src/assets/fonts/cmgeom-regular.ttf", "src/assets/fonts/cmgeom-bold.woff2")):
    font = TTFont(src)
    upm = font["head"].unitsPerEm
    hhea, os2 = font["hhea"], font["OS/2"]
    print(src, "upm", upm, "ascent", hhea.ascent, "descent", hhea.descent, "lineGap", hhea.lineGap,
          "xAvgCharWidth", os2.xAvgCharWidth)
    font.flavor = "woff2"
    font.save(dst)
