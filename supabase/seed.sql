-- Seed data matching current portfolio content
-- IMPORTANT: Run migrations/001_schema.sql FIRST to create the tables, then run this file.

-- Hero (single row)
INSERT INTO hero (id, name, tagline, bio, cv_url, image_url, location, email, phone, social_links) VALUES (
  gen_random_uuid(),
  'Hamdi Mokni',
  'Full-Stack .NET Engineer',
  'Building Scalable Solutions with Clean Architecture',
  null,
  null,
  'Monastir, Tunisia',
  'hamdimokni712@gmail.com',
  '+216 50 430 778',
  '{"github": "https://github.com/Mk-1000", "linkedin": "https://linkedin.com/in/mokni-hamdi712", "email": "mailto:hamdimokni712@gmail.com"}'::jsonb
);

-- About text
INSERT INTO about_text (section_key, content, sort_order) VALUES
  ('section_title', 'About Me', 0),
  ('heading', 'Passionate Full-Stack .NET Engineer', 1),
  ('paragraph_1', 'With over 3 years of experience in software development, I specialize in building scalable, high-performance applications using .NET Core, microservices architecture, and modern frontend technologies.', 2),
  ('paragraph_2', 'My expertise spans the entire software development lifecycle, from system design and architecture to deployment and maintenance. I''m passionate about clean code, Domain-Driven Design, and creating solutions that make a real impact.', 3),
  ('paragraph_3', 'I thrive in collaborative environments and enjoy tackling complex technical challenges. Whether it''s migrating legacy systems to modern architectures or building innovative solutions from scratch, I bring dedication and technical excellence to every project.', 4);

-- About highlights
INSERT INTO about_highlights (icon_name, title, description, sort_order) VALUES
  ('Code', '3+ Years Experience', 'Building scalable enterprise applications', 0),
  ('Rocket', 'Microservices Expert', 'Architecting distributed systems', 1),
  ('Award', 'Clean Architecture', 'Following best practices and patterns', 2),
  ('Users', 'Full-Stack Developer', 'From database to UI/UX', 3);

-- About stats
INSERT INTO about_stats (number, label, sort_order) VALUES
  ('3+', 'Years Experience', 0),
  ('20+', 'Projects Completed', 1),
  ('10+', 'Technologies', 2),
  ('100%', 'Client Satisfaction', 3);

-- Skill categories and skills (category ids will be set by name after insert)
DO $$
DECLARE
  cat_backend uuid;
  cat_frontend uuid;
  cat_db uuid;
  cat_devops uuid;
  cat_arch uuid;
  cat_other uuid;
BEGIN
  INSERT INTO skill_categories (title, icon_name, sort_order) VALUES ('Backend Development', 'Server', 0) RETURNING id INTO cat_backend;
  INSERT INTO skills (category_id, name, level, years, sort_order) VALUES
    (cat_backend, '.NET Core', 95, '3+', 0),
    (cat_backend, 'Spring Boot', 80, '2+', 1),
    (cat_backend, 'NestJS', 85, '2+', 2),
    (cat_backend, 'RESTful APIs', 90, '3+', 3);

  INSERT INTO skill_categories (title, icon_name, sort_order) VALUES ('Frontend Development', 'Code', 1) RETURNING id INTO cat_frontend;
  INSERT INTO skills (category_id, name, level, years, sort_order) VALUES
    (cat_frontend, 'React', 85, '2+', 0),
    (cat_frontend, 'Flutter', 80, '2+', 1),
    (cat_frontend, 'Razor Pages', 75, '2+', 2),
    (cat_frontend, 'Vue.js', 70, '1+', 3);

  INSERT INTO skill_categories (title, icon_name, sort_order) VALUES ('Databases', 'Database', 2) RETURNING id INTO cat_db;
  INSERT INTO skills (category_id, name, level, years, sort_order) VALUES
    (cat_db, 'SQL Server', 90, '3+', 0),
    (cat_db, 'PostgreSQL', 85, '2+', 1),
    (cat_db, 'MongoDB', 80, '2+', 2),
    (cat_db, 'Redis', 75, '1+', 3);

  INSERT INTO skill_categories (title, icon_name, sort_order) VALUES ('DevOps & Cloud', 'Container', 3) RETURNING id INTO cat_devops;
  INSERT INTO skills (category_id, name, level, years, sort_order) VALUES
    (cat_devops, 'Docker', 90, '2+', 0),
    (cat_devops, 'Kubernetes', 80, '1+', 1),
    (cat_devops, 'CI/CD', 85, '2+', 2),
    (cat_devops, 'GCP', 75, '1+', 3);

  INSERT INTO skill_categories (title, icon_name, sort_order) VALUES ('Architecture', 'Layers', 4) RETURNING id INTO cat_arch;
  INSERT INTO skills (category_id, name, level, years, sort_order) VALUES
    (cat_arch, 'Clean Architecture', 95, '3+', 0),
    (cat_arch, 'DDD', 85, '2+', 1),
    (cat_arch, 'Microservices', 90, '2+', 2),
    (cat_arch, 'CQRS', 80, '2+', 3);

  INSERT INTO skill_categories (title, icon_name, sort_order) VALUES ('Other Technologies', 'Cloud', 5) RETURNING id INTO cat_other;
  INSERT INTO skills (category_id, name, level, years, sort_order) VALUES
    (cat_other, 'Git', 90, '3+', 0),
    (cat_other, 'GraphQL', 75, '1+', 1),
    (cat_other, 'WebSocket', 80, '2+', 2),
    (cat_other, 'RabbitMQ', 75, '1+', 3);
END $$;

-- Projects
INSERT INTO projects (title, description, image_url, tech, impact, github_url, demo_url, sort_order) VALUES
  ('Al-Fikr Application Migration', 'Migrated a legacy monolithic MVC application to a modern microservices architecture, improving scalability and reducing deployment time by 60%.', 'https://images.unsplash.com/photo-1676030789467-a097e2291bb2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtaWNyb3NlcnZpY2VzJTIwYXJjaGl0ZWN0dXJlJTIwdGVjaG5vbG9neXxlbnwxfHx8fDE3NzA5MjQ4MzR8MA&ixlib=rb-4.1.0&q=80&w=1080', '[".NET Core", "Docker", "Microservices", "MariaDB", "RabbitMQ"]'::jsonb, 'Improved scalability and reduced deployment time', '#', null, 0),
  ('Football KickOff (Startup)', 'A comprehensive SaaS platform for football team management featuring real-time messaging, automated reservations, and team coordination tools.', 'https://images.unsplash.com/photo-1759884247264-86c2aa311632?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBzb2Z0d2FyZSUyMGRldmVsb3BtZW50fGVufDF8fHx8MTc3MDg5OTkxNXww&ixlib=rb-4.1.0&q=80&w=1080', '["NestJS", "MongoDB", "WebSocket", "Docker", "GCP"]'::jsonb, 'Active users managing teams and reservations', null, 'https://app.kickoff-sports.tn', 1),
  ('Sa7ty Health Platform', 'An innovative healthcare platform with AI-powered diagnostic assistant for symptom analysis and real-time diagnostics, improving healthcare accessibility.', 'https://images.unsplash.com/photo-1747224317356-6dd1a4a078fd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoZWFsdGhjYXJlJTIwdGVjaG5vbG9neSUyMHBsYXRmb3JtfGVufDF8fHx8MTc3MDkyNDgzNXww&ixlib=rb-4.1.0&q=80&w=1080', '["Symfony", "Flask", "Machine Learning", "Vue.js", "PostgreSQL"]'::jsonb, 'AI-powered symptom analysis and diagnostics', '#', null, 2),
  ('Kardili E-Commerce App', 'A cross-platform mobile application offering buy-now-pay-later functionality with seamless payment integration and user-friendly interface.', 'https://images.unsplash.com/photo-1723705027411-9bfc3c99c2e9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlY29tbWVyY2UlMjBtb2JpbGUlMjBhcHBsaWNhdGlvbnxlbnwxfHx8fDE3NzA5MjQ4MzV8MA&ixlib=rb-4.1.0&q=80&w=1080', '["Flutter", "Firebase", "Google Pay", "REST API"]'::jsonb, 'Cross-platform mobile experience', null, null, 3),

-- Experiences
INSERT INTO experiences (company, role, period, location, achievements, technologies, sort_order) VALUES
  ('Tech Company A', 'Senior Full-Stack .NET Engineer', '2024 - Present', 'Remote', '["Led migration of monolithic application to microservices architecture", "Reduced deployment time by 60% through containerization with Docker", "Mentored junior developers in Clean Architecture principles", "Implemented CI/CD pipelines improving release frequency"]'::jsonb, '[".NET Core", "Docker", "Kubernetes", "Azure", "React"]'::jsonb, 0),
  ('Football KickOff (Startup)', 'Full-Stack Developer & Co-Founder', '2023 - Present', 'Monastir, Tunisia', '["Built SaaS platform from scratch serving 1000+ users", "Implemented real-time messaging with WebSocket", "Designed scalable microservices architecture on GCP", "Reduced server costs by 40% through optimization"]'::jsonb, '["NestJS", "MongoDB", "Docker", "GCP", "WebSocket"]'::jsonb, 1),
  ('Digital Solutions Inc.', 'Full-Stack Developer', '2022 - 2023', 'Tunisia', '["Developed healthcare platform with AI diagnostic features", "Integrated machine learning models for symptom analysis", "Built responsive admin dashboards with Vue.js", "Optimized database queries improving performance by 50%"]'::jsonb, '["Symfony", "Flask", "Vue.js", "PostgreSQL", "ML"]'::jsonb, 2),
  ('Mobile Dev Studio', 'Mobile Application Developer', '2021 - 2022', 'Tunisia', '["Created cross-platform e-commerce mobile app with Flutter", "Integrated payment gateways including Google Pay", "Implemented offline-first architecture with local storage", "Published apps with 4.5+ star ratings on app stores"]'::jsonb, '["Flutter", "Firebase", "REST API", "Google Pay"]'::jsonb, 3);

-- Certifications
INSERT INTO certifications (title, issuer, date, description, skills, sort_order) VALUES
  ('IBM DevOps Essentials', 'IBM', '2023', 'Comprehensive understanding of DevOps practices, CI/CD, and automation', '["CI/CD", "Jenkins", "Docker", "Kubernetes"]'::jsonb, 0),
  ('Scrum Foundation Professional Certificate', 'CertiProf', '2023', 'Certified in Agile methodologies and Scrum framework implementation', '["Scrum", "Agile", "Sprint Planning", "Team Collaboration"]'::jsonb, 1),
  ('Foundations of Web Programming', 'Duke University', '2022', 'Advanced web development concepts and best practices', '["HTML5", "CSS3", "JavaScript", "Web Standards"]'::jsonb, 2),
  ('.NET Core Professional', 'Microsoft', '2022', 'Expert-level .NET Core development and architecture patterns', '[".NET Core", "C#", "ASP.NET", "Entity Framework"]'::jsonb, 3);

-- Achievements (Certifications section bullet list)
INSERT INTO achievements (text, sort_order) VALUES
  ('Published multiple open-source projects on GitHub', 0),
  ('Speaker at local tech meetups on microservices', 1),
  ('Contributed to .NET community projects', 2),
  ('Built startup from idea to production with 1000+ users', 3),
  ('Mentored 5+ junior developers', 4);

-- Contact info
INSERT INTO contact_info (type, label, value, link, sort_order) VALUES
  ('email', 'Email', 'hamdimokni712@gmail.com', 'mailto:hamdimokni712@gmail.com', 0),
  ('phone', 'Phone', '+216 50 430 778', 'tel:+21650430778', 1),
  ('location', 'Location', 'Monastir, Tunisia', null, 2);
