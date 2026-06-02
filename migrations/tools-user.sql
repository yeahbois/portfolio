-- Migration script for tools_user and associated progress tracking
-- Created for the Specialized Authentication & Progress Storage System

-- Enable UUID extension if not enabled
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create tools_user table
CREATE TABLE IF NOT EXISTS tools_user (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    username TEXT UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    nickname TEXT,
    delf_dalf_progress JSONB DEFAULT '{}'::jsonb,
    hsk_csca_progress JSONB DEFAULT '{}'::jsonb,
    ioai_progress JSONB DEFAULT '{}'::jsonb,
    ielts_sat_progress JSONB DEFAULT '{}'::jsonb,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Documentation on JSONB structures:
-- delf_dalf_progress: {
--   "A1": {"mastered_words": [], "quiz_history": []},
--   ...,
--   "C1": {"mastered_words": [], "quiz_history": []}
-- }
-- hsk_csca_progress: {
--   "HSK1": {"mastered_chars": [], "pinyin_scores": {}, "failure_queue": []},
--   ...
-- }

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_tools_user_username ON tools_user(username);

-- GIN indexes for high-performance JSONB lookups
CREATE INDEX IF NOT EXISTS idx_tools_user_delf_dalf ON tools_user USING GIN (delf_dalf_progress);
CREATE INDEX IF NOT EXISTS idx_tools_user_hsk_csca ON tools_user USING GIN (hsk_csca_progress);
CREATE INDEX IF NOT EXISTS idx_tools_user_ioai ON tools_user USING GIN (ioai_progress);
CREATE INDEX IF NOT EXISTS idx_tools_user_ielts_sat ON tools_user USING GIN (ielts_sat_progress);

-- Trigger to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_tools_user_updated_at
BEFORE UPDATE ON tools_user
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

-- Enable Row Level Security
ALTER TABLE tools_user ENABLE ROW LEVEL SECURITY;

-- Policies (Simplified for internal app use, normally would be more granular)
CREATE POLICY "Users can view their own data" ON tools_user
    FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update their own data" ON tools_user
    FOR UPDATE USING (auth.uid() = id);
