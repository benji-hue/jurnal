#!/usr/bin/env bash
# Builds the journal PDF: renders every page of journal/index.html at 3x (~288 dpi on A4)
# and packs the JPEGs losslessly into an A4 PDF.
set -euo pipefail
cd "$(dirname "$0")/.."
OUT="Зелёный спектр — журнал профиля «Зелёная химия».pdf"
rm -rf build/pages
node scripts/render.js build/pages "${DPR:-3}" "${QUALITY:-88}"
python3 - "$OUT" <<'EOF'
import sys, glob, img2pdf
pages = sorted(glob.glob('build/pages/p*.jpg'))
a4 = (img2pdf.mm_to_pt(210), img2pdf.mm_to_pt(297))
with open(sys.argv[1], 'wb') as f:
    f.write(img2pdf.convert(pages, layout_fun=img2pdf.get_layout_fun(a4),
        title='Зелёный спектр — журнал профиля «Зелёная химия»',
        author='Профиль «Зелёная химия», смена «Индустрия будущего»',
        subject='Журнал профиля · творческая мастерская «Преломление»'))
print('PDF:', sys.argv[1], len(pages), 'pages')
EOF
