#!/bin/bash
# usage: ocr.sh PDF OUT_TXT  -> OCR every page (4 in parallel), with "=== page N" markers
pdf="$1"; out="$2"; tmp=$(mktemp -d)
pdftoppm -r 150 -png "$pdf" "$tmp/p"
ls "$tmp"/p-*.png | xargs -P 4 -I{} sh -c 'OMP_THREAD_LIMIT=1 tesseract "{}" "{}" --oem 1 >/dev/null 2>&1'
: > "$out"
for txt in $(ls "$tmp"/p-*.png.txt | sort -V); do
  n=$(basename "$txt" .png.txt | sed 's/p-0*//')
  echo "=== page $n" >> "$out"; cat "$txt" >> "$out"
done
rm -rf "$tmp"
