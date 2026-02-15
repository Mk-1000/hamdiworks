-- Storage bucket for portfolio images (hero profile, project images)
-- Run this in Supabase SQL Editor if migrations are not applied automatically.

INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'portfolio',
  'portfolio',
  true,
  524288,
  ARRAY['image/webp', 'image/jpeg', 'image/png']
)
ON CONFLICT (id) DO NOTHING;

-- RLS on storage.objects: allow public read; authenticated upload/update/delete for portfolio bucket
CREATE POLICY "portfolio_public_read"
ON storage.objects FOR SELECT
TO public
USING (bucket_id = 'portfolio');

CREATE POLICY "portfolio_authenticated_insert"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'portfolio');

CREATE POLICY "portfolio_authenticated_update"
ON storage.objects FOR UPDATE
TO authenticated
USING (bucket_id = 'portfolio');

CREATE POLICY "portfolio_authenticated_delete"
ON storage.objects FOR DELETE
TO authenticated
USING (bucket_id = 'portfolio');
