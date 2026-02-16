-- Platform settings (singleton): name, favicon, logos, color palette
CREATE TABLE platform_settings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  platform_name text NOT NULL DEFAULT 'Portfolio',
  favicon_url text,
  logo_header_url text,
  logo_footer_url text,
  colors jsonb DEFAULT '{}',
  colors_dark jsonb DEFAULT '{}',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Singleton row (fixed id for simple upsert from admin)
INSERT INTO platform_settings (id, platform_name)
VALUES ('00000000-0000-0000-0000-000000000001'::uuid, 'Portfolio')
ON CONFLICT (id) DO NOTHING;

-- RLS
ALTER TABLE platform_settings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "platform_settings_select" ON platform_settings FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "platform_settings_write" ON platform_settings FOR ALL TO authenticated USING (true) WITH CHECK (true);
