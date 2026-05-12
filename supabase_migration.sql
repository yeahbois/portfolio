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
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Allow auth admin to manage settings') THEN
        CREATE POLICY "Allow auth admin to manage settings" ON settings FOR ALL TO authenticated USING (true) WITH CHECK (true);
    END IF;
END $$;

-- Insert Initial Data (Experience)
INSERT INTO experience (company, role, period, location, points, order_index) VALUES
('Existential Robotics Lab', 'Research Assistant', 'Nov 2025 – Present', 'San Diego, United States', ARRAY['Integrated onboard camera streams via a ROS2–Unity bridge for real-time quadrotor perception.', 'Processed motor thrust signals through a filtered pipeline for smooth state interpolation and stable flight control.'], 1),
('Triton Robotics', 'Autonomy', 'Aug 2025 – Present', 'San Diego, United States', ARRAY['Optimized a Kalman Filter pipeline achieving an average converged error of 4 × 10−3 m during jerky, abrupt movements for robust multi-panel center estimation.', 'Integrated ROS 2 for perception, ManiSkill for simulation, and FilterPy for probabilistic filtering.'], 2),
('Algoverse', 'Researcher', 'Jul 2025 – Present', 'Remote', ARRAY['Conducted research on high-norm activations in Diffusion Transformers using PyTorch, analyzing activation distributions across Flux-Schnell, PixArt-σ, and other architectures.', 'Performed ablation experiments to evaluate the generative and semantic impact of removing high-norm activations.', 'Accepted to XAI4Science at AAAI 2026.'], 3),
('Ruangguru', 'Software Engineering Intern', 'Jun 2025 – Aug 2025', 'Jakarta, Indonesia', ARRAY['Developed interactive animations for learning Data Structure and Algorithms using React.js and GSAP.', 'Built a Node.js CLI tool that syncs animation code with voiceovers using ElevenLabs and Gemini API, automating alignment and boosting efficiency by 90%.', 'Integrated Firebase for user authentication and progress tracking.'], 4)
ON CONFLICT DO NOTHING;

-- Insert Initial Data (Projects)
INSERT INTO projects (title, description, tech, href, points, order_index) VALUES
('memARy', 'AR glasses that remember everything', ARRAY['Snap AR', 'ChromaDB', 'FastAPI', 'Lens Studio', 'React.js'], 'https://github.com', ARRAY['Engineered a streaming system that transmits frames from Snap Spectacles to the backend through websockets.', 'Integrated Reka’s Llama Vision Model for scene summarization and ChromaDB for vector-based memory retrieval, forming a complete cognitive pipeline.'], 1),
('Vanilla Navigation VLA', 'ROS2, Gazebo, YOLO, PyDantic, Ollama, Twist Mux', ARRAY['ROS2', 'Gazebo', 'YOLO', 'PyDantic', 'Ollama', 'Twist Mux'], 'https://github.com', ARRAY['Implemented a Vision–Language–Action (VLA) pipeline using YOLO and a local LLaMA 3.2 Vision model to convert natural language goals into navigation commands.', 'Developed modular ROS2 nodes for teleoperation, twist multiplexing, safety stop, and mLLM inference under GPU constraints.'], 2),
('Computer Vision Controlled Robot Arm', 'Mediapipe, RaspberryPi 5', ARRAY['Mediapipe', 'RaspberryPi 5'], 'https://github.com', ARRAY['Developed a computer vision-based control system using MediaPipe for real-time hand and arm tracking.', 'Built and programmed a robotic arm, interfaced via PCA9685 servo driver and controlled through Raspberry Pi.'], 3)
ON CONFLICT DO NOTHING;

-- Insert Initial Data (Skills)
INSERT INTO skills (category, items, order_index) VALUES
('CORE_LANGUAGES', ARRAY['Typescript', 'Rust', 'Go', 'Python', 'C++', 'SQL'], 1),
('FRAMEWORKS_SYSTEMS', ARRAY['Next.js', 'React', 'Node.js', 'Docker', 'Kubernetes', 'PostgreSQL'], 2),
('SPECIALIZATIONS', ARRAY['System Architecture', 'Security Engineering', 'Cloud Infrastructure', 'UI/UX Engineering'], 3)
ON CONFLICT DO NOTHING;

-- Insert Initial Resume LaTeX
INSERT INTO settings (key, value) VALUES ('resume_latex', '\documentclass[11pt,a4paper]{article}
\usepackage[utf8]{inputenc}
\usepackage[margin=1in]{geometry}
\usepackage{hyperref}
\usepackage{xcolor}

\hypersetup{
    colorlinks=true,
    linkcolor=blue,
    filecolor=magenta,
    urlcolor=cyan,
}

\title{Marcello Lienarta - Resume}
\author{Marcello Lienarta}
\date{\today}

\begin{document}

\maketitle

\section{Contact}
Email: \href{mailto:marcellolienarta663@gmail.com}{marcellolienarta663@gmail.com}

\section{Summary}
Senior Multipurpose Developer.

\section{Experience}
Placeholder for experience data.

\end{document}') ON CONFLICT (key) DO UPDATE SET value = EXCLUDED.value;
