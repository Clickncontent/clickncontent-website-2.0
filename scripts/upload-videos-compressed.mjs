import { createClient } from "@supabase/supabase-js";
import { readFileSync, existsSync, readdirSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..");
const SUPABASE_URL = "https://amhuqfdevbnhhyhzgyrw.supabase.co";
const SERVICE_KEY = process.env.SUPABASE_SERVICE_KEY;

if (!SERVICE_KEY) { console.error("❌  Set SUPABASE_SERVICE_KEY"); process.exit(1); }

const supabase = createClient(SUPABASE_URL, SERVICE_KEY, { auth: { persistSession: false } });

async function uploadFile(bucketName, localPath, bucketKey, mime) {
  if (!existsSync(localPath)) { console.warn(`⚠️   Not found: ${localPath}`); return; }

  const { data: existing } = await supabase.storage.from(bucketName).list("", { search: bucketKey });
  if (existing?.some((f) => f.name === bucketKey)) {
    console.log(`⏭️   Already uploaded: ${bucketKey}`); return;
  }

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
  console.log("🚀  Uploading ClicknContent Compressed videos to Supabase…\n");

  const compressedDir = join(ROOT, "Compressed");
  const files = readdirSync(compressedDir).filter(f => f.toLowerCase().endsWith('.mp4'));

  for (const f of files) {
    const slug = f.toLowerCase().replace(/[^a-z0-9.]/g, '-').replace(/-+/g, '-');
    await uploadFile("videos", join(compressedDir, f), slug, "video/mp4");
  }

  console.log("\n🎉  All done!");
}

main().catch((e) => { console.error(e); process.exit(1); });
