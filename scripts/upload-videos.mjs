import { createClient } from "@supabase/supabase-js";
import { readFileSync, existsSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..");
const SUPABASE_URL = "https://amhuqfdevbnhhyhzgyrw.supabase.co";
const SERVICE_KEY = process.env.SUPABASE_SERVICE_KEY;

if (!SERVICE_KEY) { console.error("❌  Set SUPABASE_SERVICE_KEY"); process.exit(1); }

const supabase = createClient(SUPABASE_URL, SERVICE_KEY, { auth: { persistSession: false } });

const VIDEOS = [
  { local: "Transformer story.mp4",            bucket: "transformer-story.mp4" },
  { local: "Nadia Nadim.mp4",                  bucket: "nadia-nadim.mp4" },
  { local: "SS 6 Story.mp4",                   bucket: "ss-6-story.mp4" },
  { local: "Hvad koster en studentervogn.mp4", bucket: "hvad-koster-en-studentervogn.mp4" },
  { local: "Nygth Januar.mp4",                 bucket: "nygth-januar.mp4" },
  { local: "Video_1.mp4",                      bucket: "video-1.mp4" },
  { local: "Yuki video.mp4",                   bucket: "yuki-video.mp4" },
  { local: "Nadim thumbnail.mp4",              bucket: "nadim-thumbnail.mp4" },
  { local: "Lumant thumbnail.mp4",             bucket: "lumant-thumbnail.mp4" },
  { local: "Skonhedsklinik thumbnail.mp4",     bucket: "skonhedsklinik-thumbnail.mp4" },
  { local: "Dressforsuccess.mp4",              bucket: "dressforsuccess.mp4" },
  { local: "Hejslet.mp4",                      bucket: "hejslet.mp4" },
  { local: "Lumant testimonial.MP4",           bucket: "lumant-testimonial.mp4" },
];

const IMAGES = [
  { local: "public/Nadim Aestethics.jpeg",  bucket: "nadim-aesthetics.jpeg",  mime: "image/jpeg" },
  { local: "public/Lumant.webp",             bucket: "lumant.webp",             mime: "image/webp" },
  { local: "public/Skonhedsklinik.png",      bucket: "skonhedsklinik.png",      mime: "image/png" },
  { local: "public/Dressforsuccess.JPG",     bucket: "dressforsuccess.jpg",     mime: "image/jpeg" },
  { local: "public/DSC01262.JPG",            bucket: "dsc01262.jpg",            mime: "image/jpeg" },
  { local: "public/cases/hejslet-logo.png",  bucket: "hejslet-logo.png",        mime: "image/png" },
  { local: "public/cases/hejslet-photo.png", bucket: "hejslet-photo.png",       mime: "image/png" },
];

async function ensureBucket(name, mimeTypes) {
  const { data: buckets } = await supabase.storage.listBuckets();
  if (!buckets?.some((b) => b.name === name)) {
    const { error } = await supabase.storage.createBucket(name, {
      public: true,
      
      allowedMimeTypes: mimeTypes,
    });
    if (error) throw new Error(`Bucket creation failed: ${error.message}`);
    console.log(`✅  Created bucket: ${name}`);
  } else {
    console.log(`ℹ️   Bucket '${name}' already exists`);
  }
}

async function uploadFile(bucketName, localRelPath, bucketName2, mime) {
  const localPath = join(ROOT, localRelPath);
  if (!existsSync(localPath)) { console.warn(`⚠️   Not found: ${localRelPath}`); return; }

  const { data: existing } = await supabase.storage.from(bucketName).list("", { search: bucketName2 });
  if (existing?.some((f) => f.name === bucketName2)) {
    console.log(`⏭️   Already uploaded: ${bucketName2}`); return;
  }

  const sizeKB = Math.round(readFileSync(localPath).length / 1024);
  console.log(`⬆️   Uploading ${bucketName2} (${sizeKB > 1024 ? (sizeKB/1024).toFixed(1)+"MB" : sizeKB+"KB"})…`);
  const fileData = readFileSync(localPath);
  const { error } = await supabase.storage.from(bucketName).upload(bucketName2, fileData, {
    contentType: mime,
    cacheControl: "31536000",
    upsert: false,
  });
  if (error) console.error(`❌  Failed: ${bucketName2} — ${error.message}`);
  else console.log(`✅  ${SUPABASE_URL}/storage/v1/object/public/${bucketName}/${bucketName2}`);
}

async function main() {
  console.log("🚀  Uploading ClicknContent media to Supabase…\n");

  console.log("── Videos ─────────────────────────────");
  await ensureBucket("videos", ["video/mp4", "video/quicktime"]);
  for (const v of VIDEOS) await uploadFile("videos", `public/${v.local}`, v.bucket, "video/mp4");

  console.log("\n── Images ─────────────────────────────");
  await ensureBucket("images", ["image/jpeg", "image/png", "image/webp"]);
  for (const img of IMAGES) await uploadFile("images", img.local, img.bucket, img.mime);

  console.log("\n🎉  All done!");
}

main().catch((e) => { console.error(e); process.exit(1); });
