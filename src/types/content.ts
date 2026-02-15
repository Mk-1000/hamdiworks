export interface HeroRow {
  id: string;
  name: string;
  tagline: string;
  bio: string;
  cv_url: string | null;
  image_url: string | null;
  location: string | null;
  email: string | null;
  phone: string | null;
  social_links: Record<string, string>;
}

export interface AboutHighlightRow {
  id: string;
  icon_name: string;
  title: string;
  description: string;
  sort_order: number;
}

export interface AboutTextRow {
  id: string;
  section_key: string;
  content: string;
  sort_order: number;
}

export interface AboutStatRow {
  id: string;
  number: string;
  label: string;
  sort_order: number;
}

export interface SkillCategoryRow {
  id: string;
  title: string;
  icon_name: string;
  sort_order: number;
}

export interface SkillRow {
  id: string;
  category_id: string;
  name: string;
  level: number;
  years: string;
  sort_order: number;
}

export interface ProjectRow {
  id: string;
  title: string;
  description: string;
  image_url: string | null;
  tech: string[];
  impact: string | null;
  github_url: string | null;
  demo_url: string | null;
  sort_order: number;
}

export interface ExperienceRow {
  id: string;
  company: string;
  role: string;
  period: string;
  location: string;
  achievements: string[];
  technologies: string[];
  sort_order: number;
}

export interface CertificationRow {
  id: string;
  title: string;
  issuer: string;
  date: string;
  description: string;
  skills: string[];
  sort_order: number;
}

export interface AchievementRow {
  id: string;
  text: string;
  sort_order: number;
}

export interface ContactInfoRow {
  id: string;
  type: string;
  label: string;
  value: string;
  link: string | null;
  sort_order: number;
}

export interface ContentData {
  hero: HeroRow | null;
  aboutText: AboutTextRow[];
  aboutHighlights: AboutHighlightRow[];
  aboutStats: AboutStatRow[];
  skillCategories: (SkillCategoryRow & { skills: SkillRow[] })[];
  projects: ProjectRow[];
  experiences: ExperienceRow[];
  certifications: CertificationRow[];
  achievements: AchievementRow[];
  contactInfo: ContactInfoRow[];
}
