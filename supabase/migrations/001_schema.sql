-- Portfolio content tables and RLS for admin dashboard

-- Hero (singleton)
CREATE TABLE hero (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL DEFAULT '',
  tagline text NOT NULL DEFAULT '',
  bio text NOT NULL DEFAULT '',
  cv_url text,
  image_url text,
  location text,
  email text,
  phone text,
  social_links jsonb DEFAULT '{}',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- About section text blocks (section_key: section_title, heading, paragraph_1, etc.)
CREATE TABLE about_text (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  section_key text NOT NULL UNIQUE,
  content text NOT NULL DEFAULT '',
  sort_order int NOT NULL DEFAULT 0
);

-- About highlights (icon_name maps to Lucide icon: Code, Rocket, Award, Users)
CREATE TABLE about_highlights (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  icon_name text NOT NULL DEFAULT 'Code',
  title text NOT NULL DEFAULT '',
  description text NOT NULL DEFAULT '',
  sort_order int NOT NULL DEFAULT 0
);

-- About stats (number + label for stat cards)
CREATE TABLE about_stats (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  number text NOT NULL DEFAULT '',
  label text NOT NULL DEFAULT '',
  sort_order int NOT NULL DEFAULT 0
);

-- Skill categories (icon_name: Server, Code, Database, Container, Layers, Cloud)
CREATE TABLE skill_categories (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL DEFAULT '',
  icon_name text NOT NULL DEFAULT 'Server',
  sort_order int NOT NULL DEFAULT 0
);

CREATE TABLE skills (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  category_id uuid NOT NULL REFERENCES skill_categories(id) ON DELETE CASCADE,
  name text NOT NULL DEFAULT '',
  level int NOT NULL DEFAULT 80 CHECK (level >= 0 AND level <= 100),
  years text NOT NULL DEFAULT '1+',
  sort_order int NOT NULL DEFAULT 0
);

-- Projects
CREATE TABLE projects (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL DEFAULT '',
  description text NOT NULL DEFAULT '',
  image_url text,
  tech jsonb DEFAULT '[]',
  impact text,
  github_url text,
  demo_url text,
  sort_order int NOT NULL DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Experiences
CREATE TABLE experiences (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  company text NOT NULL DEFAULT '',
  role text NOT NULL DEFAULT '',
  period text NOT NULL DEFAULT '',
  location text NOT NULL DEFAULT '',
  achievements jsonb DEFAULT '[]',
  technologies jsonb DEFAULT '[]',
  sort_order int NOT NULL DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Certifications
CREATE TABLE certifications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL DEFAULT '',
  issuer text NOT NULL DEFAULT '',
  date text NOT NULL DEFAULT '',
  description text NOT NULL DEFAULT '',
  skills jsonb DEFAULT '[]',
  sort_order int NOT NULL DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Achievements (bullet list in Certifications section)
CREATE TABLE achievements (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  text text NOT NULL DEFAULT '',
  sort_order int NOT NULL DEFAULT 0
);

-- Contact info (type: email, phone, location; label; value; optional link)
CREATE TABLE contact_info (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  type text NOT NULL DEFAULT 'email',
  label text NOT NULL DEFAULT '',
  value text NOT NULL DEFAULT '',
  link text,
  sort_order int NOT NULL DEFAULT 0
);

-- RLS: enable on all tables
ALTER TABLE hero ENABLE ROW LEVEL SECURITY;
ALTER TABLE about_text ENABLE ROW LEVEL SECURITY;
ALTER TABLE about_highlights ENABLE ROW LEVEL SECURITY;
ALTER TABLE about_stats ENABLE ROW LEVEL SECURITY;
ALTER TABLE skill_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE skills ENABLE ROW LEVEL SECURITY;
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE experiences ENABLE ROW LEVEL SECURITY;
ALTER TABLE certifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE achievements ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_info ENABLE ROW LEVEL SECURITY;

-- Public read (anon and authenticated)
CREATE POLICY "hero_select" ON hero FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "about_text_select" ON about_text FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "about_highlights_select" ON about_highlights FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "about_stats_select" ON about_stats FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "skill_categories_select" ON skill_categories FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "skills_select" ON skills FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "projects_select" ON projects FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "experiences_select" ON experiences FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "certifications_select" ON certifications FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "achievements_select" ON achievements FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "contact_info_select" ON contact_info FOR SELECT TO anon, authenticated USING (true);

-- Admin write (authenticated only)
CREATE POLICY "hero_write" ON hero FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "about_text_write" ON about_text FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "about_highlights_write" ON about_highlights FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "about_stats_write" ON about_stats FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "skill_categories_write" ON skill_categories FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "skills_write" ON skills FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "projects_write" ON projects FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "experiences_write" ON experiences FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "certifications_write" ON certifications FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "achievements_write" ON achievements FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "contact_info_write" ON contact_info FOR ALL TO authenticated USING (true) WITH CHECK (true);
