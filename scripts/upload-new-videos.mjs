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

async function uploadFile(bucketName, localPathRel, bucketKey, mime) {
  const localPath = join(ROOT, localPathRel);
  if (!existsSync(localPath)) { console.warn(`⚠️   Not found: ${localPath}`); return; }

  const sizeKB = Math.round(readFileSync(localPath).length / 1024);
  console.log(`⬆️   Uploading ${bucketKey} (${sizeKB > 1024 ? (sizeKB/1024).toFixed(1)+"MB" : sizeKB+"KB"})…`);
  const fileData = readFileSync(localPath);
  const { error } = await supabase.storage.from(bucketName).upload(bucketKey, fileData, {
    contentType: mime,
    cacheControl: "31536000",
    upsert: true,
  });
  if (error) console.error(`❌  Failed: ${bucketKey} — ${error.message}`);
  else console.log(`✅  ${SUPABASE_URL}/storage/v1/object/public/${bucketName}/${bucketKey}`);
}

async function main() {
  console.log("🚀  Uploading newly added videos to Supabase…\n");

  const files = [
    { local: "transformer-story.compact.mp4", bucket: "transformer-story.mp4" },
    { local: "Lejstudentervogn.mp4", bucket: "lejstudentervogn.mp4" },
    { local: "Balvid.mp4", bucket: "balvid.mp4" },
    { local: "Nadia Nadim.mp4", bucket: "nadia-nadim-new.mp4" }, // using -new just in case. Wait, if it overwrites the old one, it's fine. I'll use the original slug.
  ];

  for (const f of files) {
    await uploadFile("videos", f.local, f.bucket, "video/mp4");
  }

  console.log("\n🎉  All done!");
}

main().catch((e) => { console.error(e); process.exit(1); });
