import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL as string || "https://amhuqfdevbnhhyhzgyrw.supabase.co";
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string || "sb_publishable_4ph2eNMhdw4RFkrDUtA_3g_QU3WWXxp";

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// Cloudflare R2 public bucket URL
const R2 = "https://pub-a2a0fc80d4724d84b0af62189bafe2c5.r2.dev";

// Maps expected image names → actual filenames in R2 (uploaded with original casing/names)
const IMAGE_MAP: Record<string, string> = {
  "dsc01262.jpg":         "DSC01262.JPG",
  "lumant.webp":          "Lumant.webp",
  "skonhedsklinik.png":   "Skonhedsklinik.png",
  "dressforsuccess.jpg":  "Dressforsuccess.JPG",
  "nadim-aesthetics.jpeg":"Nadim Aestethics.jpeg",
  "hejslet-logo.png":     "hejslet-logo.png",
  "hejslet-photo.png":    "hejslet-photo.png",
};

/** Returns a public CDN URL for a file in Cloudflare R2. */
export function getMediaUrl(bucket: "videos" | "images", filename: string): string {
  const mapped = IMAGE_MAP[filename] ?? filename;
  return `${R2}/${mapped}`;
}

// Pre-built video URL map — using Cloudflare R2
export const VIDEOS = {
  // Hero — not yet uploaded to R2
  transformerStory:       `${R2}/Transformer story.mp4`,
  nadiaNadim:             `${R2}/Nadim skils.mp4`,
  nadiaNadimNew:          `${R2}/nadia-nadim-new.mp4`,
  // VideoGrid
  ss6Story:               `${R2}/Smartsalg.mp4`,
  lejStudentervogn:       `${R2}/Lejstudentervogn.mp4`,
  hvadKosterStudentvogn:  `${R2}/Lejstudentervogn.mp4`,
  nygthJanuar:            `${R2}/Nygth Januar.mp4`,
  mads:                   `${R2}/Mads.mp4`,
  balvid:                 `${R2}/Balvid.mp4`,
  video1:                 `${R2}/Video%20%231.mp4`,
  yukiVideo:              `${R2}/Yuki video.mp4`,
  // Cases page
  nadimThumbnail:         `${R2}/Nadim thumbnail.mp4`,
  lumantThumbnail:        `${R2}/Lumant thumbnail.mp4`,
  skonhedsklinikThumb:    `${R2}/skonhedsklinik thumbnail.mp4`,
  dressforsuccess:        `${R2}/Dressforsuccess thumbnail.mp4`,
  hejslet:                `${R2}/Hejslet.mp4`,
  // Case detail + CaseResults
  lumantTestimonial:      `${R2}/Lumant testimonial.mp4`,
  ajrTestimonial:         `${R2}/Mads.mp4`,
} as const;
