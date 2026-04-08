import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL as string || "https://amhuqfdevbnhhyhzgyrw.supabase.co";
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string || "sb_publishable_4ph2eNMhdw4RFkrDUtA_3g_QU3WWXxp";

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

/** Returns a public CDN URL for a file in a Supabase Storage bucket. */
export function getMediaUrl(bucket: "videos" | "images", filename: string): string {
  return `${SUPABASE_URL}/storage/v1/object/public/${bucket}/${filename}`;
}

// Pre-built video URL map — all filenames are URL-safe slugs
export const VIDEOS = {
  // Hero
  transformerStory:       getMediaUrl("videos", "transformer-story.mp4"),
  nadiaNadim:             getMediaUrl("videos", "nadia-nadim.mp4"),
  nadiaNadimNew:          getMediaUrl("videos", "nadia-nadim-new.mp4"),
  // VideoGrid
  ss6Story:               getMediaUrl("videos", "ss-6-story.mp4"),
  lejStudentervogn:       getMediaUrl("videos", "lejstudentervogn.mp4"),
  hvadKosterStudentvogn:  getMediaUrl("videos", "hvad-koster-en-studentervogn.mp4"),
  nygthJanuar:            getMediaUrl("videos", "nygth-januar.mp4"),
  mads:                   getMediaUrl("videos", "mads.mp4"),
  balvid:                 getMediaUrl("videos", "balvid.mp4"),
  video1:                 getMediaUrl("videos", "video-1.mp4"),
  yukiVideo:              getMediaUrl("videos", "yuki-video.mp4"),
  // Cases page
  nadimThumbnail:         getMediaUrl("videos", "nadim-thumbnail.mp4"),
  lumantThumbnail:        getMediaUrl("videos", "lumant-thumbnail.mp4"),
  skonhedsklinikThumb:    getMediaUrl("videos", "skonhedsklinik-thumbnail.mp4"),
  dressforsuccess:        getMediaUrl("videos", "dressforsuccess-thumbnail.mp4"),
  hejslet:                getMediaUrl("videos", "hejslet.mp4"),
  // Case detail + CaseResults
  lumantTestimonial:      getMediaUrl("videos", "lumant-testimonial.mp4"),
  ajrTestimonial:         getMediaUrl("videos", "ajr-testimonial.mp4"),
} as const;
