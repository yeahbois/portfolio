-- Supabase Migration: Create tables for portfolio data

-- Experience Table
CREATE TABLE IF NOT EXISTS experience (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  company TEXT NOT NULL,
  role TEXT NOT NULL,
  period TEXT NOT NULL,
  location TEXT,
  points TEXT[] NOT NULL DEFAULT '{}',
  order_index INT DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Certificates Table (Refactored from Education)
CREATE TABLE IF NOT EXISTS certificates (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  institution TEXT NOT NULL,
  degree TEXT NOT NULL,
  period TEXT NOT NULL,
  location TEXT,
  order_index INT DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Achievements Table (Refactored from Awards)
CREATE TABLE IF NOT EXISTS achievements (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  order_index INT DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Projects Table
CREATE TABLE IF NOT EXISTS projects (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  tech TEXT[] NOT NULL DEFAULT '{}',
  href TEXT,
  points TEXT[] NOT NULL DEFAULT '{}',
  order_index INT DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Skills Table
CREATE TABLE IF NOT EXISTS skills (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  category TEXT NOT NULL,
  items TEXT[] NOT NULL DEFAULT '{}',
  order_index INT DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Settings Table for global config like Resume LaTeX
CREATE TABLE IF NOT EXISTS settings (
  key TEXT PRIMARY KEY,
  value TEXT NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Public Projects Table
CREATE TABLE IF NOT EXISTS public_projects (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  images TEXT[] NOT NULL DEFAULT '{}',
  description TEXT,
  details TEXT,
  creator TEXT,
  status_percentage INT DEFAULT 0,
  status_message TEXT,
  order_index INT DEFAULT 0,
  github_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Blogs Table
CREATE TABLE IF NOT EXISTS blogs (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  images TEXT[] NOT NULL DEFAULT '{}',
  date TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  order_index INT DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Shortener Table
CREATE TABLE IF NOT EXISTS shortener (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  slug TEXT UNIQUE NOT NULL,
  long_url TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Enable Row Level Security
ALTER TABLE experience ENABLE ROW LEVEL SECURITY;
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE skills ENABLE ROW LEVEL SECURITY;
ALTER TABLE certificates ENABLE ROW LEVEL SECURITY;
ALTER TABLE achievements ENABLE ROW LEVEL SECURITY;
ALTER TABLE settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public_projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE blogs ENABLE ROW LEVEL SECURITY;
ALTER TABLE shortener ENABLE ROW LEVEL SECURITY;

-- Create Public Read Access Policies
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Allow public read access on experience') THEN
        CREATE POLICY "Allow public read access on experience" ON experience FOR SELECT USING (true);
    END IF;
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Allow public read access on projects') THEN
        CREATE POLICY "Allow public read access on projects" ON projects FOR SELECT USING (true);
    END IF;
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Allow public read access on skills') THEN
        CREATE POLICY "Allow public read access on skills" ON skills FOR SELECT USING (true);
    END IF;
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Allow public read access on certificates') THEN
        CREATE POLICY "Allow public read access on certificates" ON certificates FOR SELECT USING (true);
    END IF;
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Allow public read access on achievements') THEN
        CREATE POLICY "Allow public read access on achievements" ON achievements FOR SELECT USING (true);
    END IF;
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Allow public read access on settings') THEN
        CREATE POLICY "Allow public read access on settings" ON settings FOR SELECT USING (true);
    END IF;
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Allow public read access on public_projects') THEN
        CREATE POLICY "Allow public read access on public_projects" ON public_projects FOR SELECT USING (true);
    END IF;
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Allow public read access on blogs') THEN
        CREATE POLICY "Allow public read access on blogs" ON blogs FOR SELECT USING (true);
    END IF;
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Allow public read access on shortener') THEN
        CREATE POLICY "Allow public read access on shortener" ON shortener FOR SELECT USING (true);
    END IF;

    -- Admin/Authenticated Access Policies (Allow all operations for authenticated users)
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Allow auth admin to manage experience') THEN
        CREATE POLICY "Allow auth admin to manage experience" ON experience FOR ALL TO authenticated USING (true) WITH CHECK (true);
    END IF;
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Allow auth admin to manage projects') THEN
        CREATE POLICY "Allow auth admin to manage projects" ON projects FOR ALL TO authenticated USING (true) WITH CHECK (true);
    END IF;
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Allow auth admin to manage skills') THEN
        CREATE POLICY "Allow auth admin to manage skills" ON skills FOR ALL TO authenticated USING (true) WITH CHECK (true);
    END IF;
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Allow auth admin to manage certificates') THEN
        CREATE POLICY "Allow auth admin to manage certificates" ON certificates FOR ALL TO authenticated USING (true) WITH CHECK (true);
    END IF;
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Allow auth admin to manage achievements') THEN
        CREATE POLICY "Allow auth admin to manage achievements" ON achievements FOR ALL TO authenticated USING (true) WITH CHECK (true);
    END IF;
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Allow auth admin to manage settings') THEN
        CREATE POLICY "Allow auth admin to manage settings" ON settings FOR ALL TO authenticated USING (true) WITH CHECK (true);
    END IF;
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Allow auth admin to manage public_projects') THEN
        CREATE POLICY "Allow auth admin to manage public_projects" ON public_projects FOR ALL TO authenticated USING (true) WITH CHECK (true);
    END IF;
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Allow auth admin to manage blogs') THEN
        CREATE POLICY "Allow auth admin to manage blogs" ON blogs FOR ALL TO authenticated USING (true) WITH CHECK (true);
    END IF;
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Allow auth admin to manage shortener') THEN
        CREATE POLICY "Allow auth admin to manage shortener" ON shortener FOR ALL TO authenticated USING (true) WITH CHECK (true);
    END IF;
END $$;

-- Wipe existing data
TRUNCATE TABLE experience RESTART IDENTITY;
TRUNCATE TABLE projects RESTART IDENTITY;
TRUNCATE TABLE skills RESTART IDENTITY;
TRUNCATE TABLE certificates RESTART IDENTITY;
TRUNCATE TABLE achievements RESTART IDENTITY;
TRUNCATE TABLE public_projects RESTART IDENTITY;
TRUNCATE TABLE blogs RESTART IDENTITY;
TRUNCATE TABLE shortener RESTART IDENTITY;

-- Insert Initial Data (Experience)
INSERT INTO experience (company, role, period, location, points, order_index) VALUES
('Lorem Ipsum Corp', 'Lorem Ipsum Developer', 'Jan 2020 – Present', 'Remote', ARRAY['Lorem ipsum dolor sit amet, consectetur adipiscing elit.', 'Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'], 1);

-- Insert Initial Data (Certificates)
INSERT INTO certificates (institution, degree, period, location, order_index) VALUES
('Lorem University', 'Bachelor of Science in Computer Science', '2016 – 2020', 'Lorem City', 1);

-- Insert Initial Data (Achievements)
INSERT INTO achievements (title, description, order_index) VALUES
('Lorem Excellence Award', 'Awarded for outstanding performance in lorem ipsum.', 1);

-- Insert Initial Data (Projects)
INSERT INTO projects (title, description, tech, href, points, order_index) VALUES
('Lorem Project', 'Lorem ipsum dolor sit amet description', ARRAY['Lorem', 'Ipsum'], 'https://github.com', ARRAY['Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.', 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.'], 1);

-- Insert Initial Data (Skills)
INSERT INTO skills (category, items, order_index) VALUES
('LOREM_SKILLS', ARRAY['Lorem', 'Ipsum', 'Dolor', 'Sit', 'Amet'], 1);

-- Insert Initial Data (Public Projects)
INSERT INTO public_projects (name, description, details, creator, status_percentage, status_message, order_index)
VALUES ('Lorem Public Project', 'Lorem ipsum short description', 'Lorem ipsum long details about the public project.', 'Lorem Creator', 50, 'In Progress', 1);

-- Insert Initial Data (Blogs)
INSERT INTO blogs (title, content, order_index)
VALUES ('Lorem Blog Post', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.', 1);

-- Insert Initial Resume LaTeX
INSERT INTO settings (key, value) VALUES ('resume_latex', '\\documentclass[9pt,a4paper]{article}
\\usepackage[utf8]{inputenc}
\\usepackage[margin=0.4in]{geometry}
\\usepackage{hyperref}
\\usepackage{xcolor}
\\usepackage{enumitem}
\\usepackage{titlesec}

\\hypersetup{
    colorlinks=true,
    linkcolor=black,
    filecolor=magenta,
    urlcolor=blue,
    pdftitle={Marcello Lienarta - Resume},
}

\\pagestyle{empty}
\\setlist[itemize]{noitemsep, topsep=0pt, leftmargin=1.2em, partopsep=0pt, parsep=0pt}
\\titlespacing*{\\section}{0pt}{5pt}{3pt}

\\begin{document}

\\begin{center}
    {\\huge \\textbf{Marcello Lienarta}} \\\\
    \\vspace{1pt}
    {Full-Stack Developer $|$ Automation \\& Artificial Intelligence Systems Builder} \\\\
    \\vspace{2pt}
    \\small \\href{mailto:marcellolienarta663@gmail.com}{marcellolienarta663@gmail.com} $|$ \\href{https://linkedin.com/in/marcellolienarta}{linkedin.com/in/marcellolienarta} $|$ \\href{https://github.com/yeahbois}{github.com/yeahbois} $|$ \\href{https://celloportfolio.vercel.app}{celloportfolio.vercel.app} $|$ Jakarta, Indonesia
\\end{center}

\\section*{Experience}
\\hrule
\\vspace{2pt}
\\textbf{Lorem Ipsum Corp} \\hfill Jan 2020 -- Present \\\\
\\textit{Lorem Ipsum Developer} \\hfill Remote
\\begin{itemize}
    \\item Lorem ipsum dolor sit amet, consectetur adipiscing elit.
    \\item Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
\\end{itemize}
\\vspace{4pt}

\\section*{Projects}
\\hrule
\\vspace{2pt}
\\textbf{Lorem Project} $|$ \\textit{Lorem, Ipsum} \\hfill \\href{https://github.com}{Link}
\\begin{itemize}
    \\item Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
    \\item Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
\\end{itemize}
\\vspace{4pt}

\\section*{Skills}
\\hrule
\\vspace{2pt}
\\textbf{LOREM SKILLS}: Lorem, Ipsum, Dolor, Sit, Amet

\\end{document}') ON CONFLICT (key) DO UPDATE SET value = EXCLUDED.value;
