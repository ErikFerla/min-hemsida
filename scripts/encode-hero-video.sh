#!/usr/bin/env bash
# Kodar startsidans film (HeroSlideshow, första bilden) från en källfil.
#
#   scripts/encode-hero-video.sh <källfil> [start_s] [längd_s]
#
# Skapar i public/video/:
#   hero-strand.mp4         H.264, 1280×720, utan ljud, faststart, mål ≤ 1,5 MB
#   hero-strand.webm        VP9,   1280×720, utan ljud,            mål ≤ 1,2 MB
#   hero-strand-poster.jpg  klippets första bildruta, 1280 px, JPEG ~q80
#
# Utdrag: från start_s (standard 0) och längd_s sekunder (standard 13; hela filen om den är ≤ 15 s).
# Sömlös loop: klippets sista XFADE sekunder tonas över i bildrutorna strax före klippets
# början, så att sista bildrutan går direkt över i den första. Kräver längd_s + XFADE sekunder källa.
# Överskrids storleksmålet höjs CRF stegvis (bildkvaliteten sänks lite) tills filen ryms.
#
# Kräver ffmpeg/ffprobe (FFMPEG=/sökväg/ffmpeg för att välja en annan).
set -euo pipefail

FFMPEG=${FFMPEG:-ffmpeg}
FFPROBE=${FFPROBE:-ffprobe}
IN=${1:?Användning: $0 <källfil> [start_s] [längd_s]}
START=${2:-0}
LEN=${3:-}
XFADE=${XFADE:-1}
MP4_MAX=$((1500 * 1024))
WEBM_MAX=$((1200 * 1024))

ROOT=$(cd "$(dirname "$0")/.." && pwd)
OUT="$ROOT/public/video"
mkdir -p "$OUT"
TMP=$(mktemp -d)
trap 'rm -rf "$TMP"' EXIT

DUR=$("$FFPROBE" -v error -show_entries format=duration -of csv=p=0 "$IN")
AVAIL=$(awk -v d="$DUR" -v s="$START" 'BEGIN { print d - s }')
if [ -z "$LEN" ]; then
  # ≤ 15 s kvar: använd allt (minus övertoningen); annars 13 s.
  LEN=$(awk -v a="$AVAIL" -v x="$XFADE" 'BEGIN { if (a <= 15) print a - x; else print 13 }')
fi
NEED=$(awk -v l="$LEN" -v x="$XFADE" 'BEGIN { print l + x }')
if awk -v a="$AVAIL" -v n="$NEED" 'BEGIN { exit !(a + 0.001 < n) }'; then
  echo "Källan räcker inte: behöver ${NEED}s från ${START}s, har ${AVAIL}s." >&2
  exit 1
fi
OFFSET=$(awk -v l="$LEN" -v x="$XFADE" 'BEGIN { print l - x }')
echo "Utdrag: ${START}s + ${NEED}s ur källan → klipp på ${LEN}s med ${XFADE}s övertoning i loopen."

# Gemensam bildkedja: 1280×720 (beskuret till 16:9), övertoning för sömlös loop, yuv420p.
# A = källan [START, START+LEN+XFADE]; klippet = A[XFADE, XFADE+LEN] där sista XFADE s tonas
# över i A[0, XFADE] – sista bildrutan ≈ A[XFADE] = första bildrutan.
FILTER="[0:v]trim=start=${START}:duration=${NEED},setpts=PTS-STARTPTS,\
scale=1280:720:force_original_aspect_ratio=increase,crop=1280:720,setsar=1,format=yuv420p,split[a][b];\
[a]trim=start=${XFADE},setpts=PTS-STARTPTS[main];\
[b]trim=duration=${XFADE},setpts=PTS-STARTPTS[head];\
[main][head]xfade=transition=fade:duration=${XFADE}:offset=${OFFSET},format=yuv420p[v]"

# Mellanfil utan förluster, så att båda kodningarna (och postern) utgår från samma bildrutor.
"$FFMPEG" -v error -y -i "$IN" -filter_complex "$FILTER" -map "[v]" -an \
  -c:v libx264 -preset veryfast -qp 0 "$TMP/loop.mkv"

size() { stat -c %s "$1"; }

crf=28
while :; do
  "$FFMPEG" -v error -y -i "$TMP/loop.mkv" -an -c:v libx264 -preset slow -crf "$crf" -g 240 \
    -profile:v high -pix_fmt yuv420p -movflags +faststart "$OUT/hero-strand.mp4"
  s=$(size "$OUT/hero-strand.mp4")
  echo "mp4  crf $crf: $((s / 1024)) KB"
  [ "$s" -le "$MP4_MAX" ] || [ "$crf" -ge 36 ] && break
  crf=$((crf + 2))
done

# VP9: lång GOP (8 s) och alt-ref-bildrutor ger mest för en lugn drönarfilm.
crf=36
while :; do
  "$FFMPEG" -v error -y -i "$TMP/loop.mkv" -an -c:v libvpx-vp9 -b:v 0 -crf "$crf" -g 240 \
    -row-mt 1 -tile-columns 2 -deadline good -cpu-used 1 -auto-alt-ref 1 -lag-in-frames 25 \
    "$OUT/hero-strand.webm"
  s=$(size "$OUT/hero-strand.webm")
  echo "webm crf $crf: $((s / 1024)) KB"
  [ "$s" -le "$WEBM_MAX" ] || [ "$crf" -ge 48 ] && break
  crf=$((crf + 2))
done

# Postern = klippets första bildruta (ur den kodade mp4:an, så att den stämmer exakt med filmen).
"$FFMPEG" -v error -y -i "$OUT/hero-strand.mp4" -frames:v 1 -q:v 4 "$OUT/hero-strand-poster.jpg"

ls -l "$OUT"/hero-strand*
for f in "$OUT/hero-strand.mp4" "$OUT/hero-strand.webm"; do
  if "$FFPROBE" -v error -select_streams a -show_entries stream=index -of csv=p=0 "$f" | grep -q .; then
    echo "FEL: $f har ett ljudspår." >&2
    exit 1
  fi
done
echo "Klart. Aktivera filmen enligt README (\"Startsidans film\")."
