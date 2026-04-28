#!/bin/bash

# Exit on error
set -e

# Define directories
ROOT_DIR="."
COMPRESSED_DIR="./Compressed"
OUT_DIR="./WebOptimized"

# Create output directory
mkdir -p "$OUT_DIR"

# Common FFmpeg settings
# -c:v libx264: H.264 codec for wide browser compatibility
# -crf 28: Constant Rate Factor (lower is better quality, 23-28 is good for web)
# -preset slow: Better compression ratio at the cost of slower encoding
# -c:a aac -b:a 128k: Compress audio slightly as well
FFMPEG_OPTS="-c:v libx264 -crf 28 -preset veryfast -c:a aac -b:a 128k -movflags +faststart"

# Smart scale filters that maintain aspect ratio and don't upscale
# If horizontal (width > height), set width=max, height=auto
# If vertical (height > width), set height=max, width=auto
SCALE_1080="scale='if(gt(iw,ih),min(1920,iw),-2)':'if(gt(iw,ih),-2,min(1920,ih))'"
SCALE_720="scale='if(gt(iw,ih),min(1280,iw),-2)':'if(gt(iw,ih),-2,min(1280,ih))'"

process_video() {
  local INPUT="$1"
  local TYPE="$2" # "main" or "thumbnail"
  
  if [ ! -f "$INPUT" ]; then
    echo "Warning: File $INPUT not found, skipping..."
    return
  fi

  local FILENAME=$(basename "$INPUT")
  local BASENAME="${FILENAME%.*}"
  local OUT_FILE="$OUT_DIR/${BASENAME}.mp4"

  echo "--------------------------------------------------------"
  echo "Processing: $FILENAME ($TYPE)"

  local SCALE_FILTER=""
  if [ "$TYPE" == "thumbnail" ]; then
    SCALE_FILTER="$SCALE_720"
  else
    SCALE_FILTER="$SCALE_1080"
  fi

  ffmpeg -y -i "$INPUT" -vf "$SCALE_FILTER" $FFMPEG_OPTS "$OUT_FILE"

  local ORIG_SIZE=$(stat -f%z "$INPUT")
  local NEW_SIZE=$(stat -f%z "$OUT_FILE")
  local ORIG_MB=$(echo "scale=2; $ORIG_SIZE / 1048576" | bc)
  local NEW_MB=$(echo "scale=2; $NEW_SIZE / 1048576" | bc)

  echo "Finished: $FILENAME"
  echo "Original Size: ${ORIG_MB}MB -> New Size: ${NEW_MB}MB"
}

# 1. Process Thumbnails (720p max)
process_video "$COMPRESSED_DIR/Dressforsuccess thumbnail.mp4" "thumbnail"
process_video "$COMPRESSED_DIR/Lumant thumbnail.mp4" "thumbnail"
process_video "$COMPRESSED_DIR/Nadim thumbnail.mp4" "thumbnail"
process_video "$COMPRESSED_DIR/skonhedsklinik thumbnail.mp4" "thumbnail"
process_video "$ROOT_DIR/transformer-story.compact.mp4" "thumbnail"

# 2. Process Main Videos (1080p max)
process_video "$COMPRESSED_DIR/Hejslet.mp4" "main"
process_video "$COMPRESSED_DIR/Lumant testimonial.mp4" "main"
process_video "$COMPRESSED_DIR/Mads.mp4" "main"
process_video "$ROOT_DIR/Transformer story.mp4" "main"
process_video "$ROOT_DIR/Lejstudentervogn.mp4" "main"
process_video "$ROOT_DIR/Nadia Nadim.mp4" "main"
process_video "$ROOT_DIR/Video #1.mov" "main"
process_video "$ROOT_DIR/Balvid.mp4" "main"

echo "========================================================"
echo "All videos have been successfully compressed and saved to $OUT_DIR."
echo "Please upload the files from $OUT_DIR to your Cloudflare R2 bucket."
