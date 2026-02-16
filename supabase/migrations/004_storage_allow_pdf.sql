-- Allow PDF in portfolio bucket for resume/CV uploads
UPDATE storage.buckets
SET allowed_mime_types = ARRAY['image/webp', 'image/jpeg', 'image/png', 'application/pdf']
WHERE id = 'portfolio';
