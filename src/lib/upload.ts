import { supabase } from './supabase';

const BUCKET = 'portfolio';

/**
 * Upload a blob to Supabase Storage and return the public URL.
 * Path should be e.g. "hero/abc-123.webp" or "projects/xyz.webp".
 */
export async function uploadImageToStorage(blob: Blob, path: string): Promise<string> {
  const { data, error } = await supabase.storage.from(BUCKET).upload(path, blob, {
    contentType: 'image/webp',
    upsert: true,
  });
  if (error) throw error;
  const { data: urlData } = supabase.storage.from(BUCKET).getPublicUrl(data.path);
  return urlData.publicUrl;
}
