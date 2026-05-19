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

-- Education Table
CREATE TABLE IF NOT EXISTS education (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  institution TEXT NOT NULL,
  degree TEXT NOT NULL,
  period TEXT NOT NULL,
  location TEXT,
  order_index INT DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Awards Table
CREATE TABLE IF NOT EXISTS awards (
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

-- Enable Row Level Security
ALTER TABLE experience ENABLE ROW LEVEL SECURITY;
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE skills ENABLE ROW LEVEL SECURITY;
ALTER TABLE education ENABLE ROW LEVEL SECURITY;
ALTER TABLE awards ENABLE ROW LEVEL SECURITY;
ALTER TABLE settings ENABLE ROW LEVEL SECURITY;

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
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Allow public read access on education') THEN
        CREATE POLICY "Allow public read access on education" ON education FOR SELECT USING (true);
    END IF;
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Allow public read access on awards') THEN
        CREATE POLICY "Allow public read access on awards" ON awards FOR SELECT USING (true);
    END IF;
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Allow public read access on settings') THEN
        CREATE POLICY "Allow public read access on settings" ON settings FOR SELECT USING (true);
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
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Allow auth admin to manage education') THEN
        CREATE POLICY "Allow auth admin to manage education" ON education FOR ALL TO authenticated USING (true) WITH CHECK (true);
    END IF;
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Allow auth admin to manage awards') THEN
        CREATE POLICY "Allow auth admin to manage awards" ON awards FOR ALL TO authenticated USING (true) WITH CHECK (true);
    END IF;
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Allow auth admin to manage settings') THEN
        CREATE POLICY "Allow auth admin to manage settings" ON settings FOR ALL TO authenticated USING (true) WITH CHECK (true);
    END IF;
END $$;

-- Wipe existing data
TRUNCATE TABLE experience RESTART IDENTITY;
TRUNCATE TABLE projects RESTART IDENTITY;
TRUNCATE TABLE skills RESTART IDENTITY;

-- Insert Initial Data (Experience)
INSERT INTO experience (company, role, period, location, points, order_index) VALUES
('Lorem Ipsum Corp', 'Lorem Ipsum Developer', 'Jan 2020 – Present', 'Remote', ARRAY['Lorem ipsum dolor sit amet, consectetur adipiscing elit.', 'Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'], 1);

-- Insert Initial Data (Projects)
INSERT INTO projects (title, description, tech, href, points, order_index) VALUES
('Lorem Project', 'Lorem ipsum dolor sit amet description', ARRAY['Lorem', 'Ipsum'], 'https://github.com', ARRAY['Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.', 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.'], 1);

-- Insert Initial Data (Skills)
INSERT INTO skills (category, items, order_index) VALUES
('LOREM_SKILLS', ARRAY['Lorem', 'Ipsum', 'Dolor', 'Sit', 'Amet'], 1);

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
    {Multipurpose Developer With 5 years of experience in Web Development, AI, Automation, and Robotics} \\\\
    \\vspace{2pt}
    \\small \\href{mailto:marcellolienarta663@gmail.com}{marcellolienarta663@gmail.com} $|$ \\href{https://linkedin.com/in/marcellolienarta}{linkedin.com/in/marcellolienarta} $|$ \\href{https://celloportfolio.vercel.app}{celloportfolio.vercel.app} $|$ Jakarta, Indonesia
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
