-- Additional Migration for Public Projects and Blogs

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

-- Enable RLS
ALTER TABLE public_projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE blogs ENABLE ROW LEVEL SECURITY;

-- Policies
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Allow public read access on public_projects') THEN
        CREATE POLICY "Allow public read access on public_projects" ON public_projects FOR SELECT USING (true);
    END IF;
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Allow public read access on blogs') THEN
        CREATE POLICY "Allow public read access on blogs" ON blogs FOR SELECT USING (true);
    END IF;

    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Allow auth admin to manage public_projects') THEN
        CREATE POLICY "Allow auth admin to manage public_projects" ON public_projects FOR ALL TO authenticated USING (true) WITH CHECK (true);
    END IF;
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Allow auth admin to manage blogs') THEN
        CREATE POLICY "Allow auth admin to manage blogs" ON blogs FOR ALL TO authenticated USING (true) WITH CHECK (true);
    END IF;
END $$;
