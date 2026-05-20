-- reset_database.sql
-- This script drops all portfolio tables to reset the database.

DROP TABLE IF EXISTS experience CASCADE;
DROP TABLE IF EXISTS certificates CASCADE;
DROP TABLE IF EXISTS achievements CASCADE;
DROP TABLE IF EXISTS projects CASCADE;
DROP TABLE IF EXISTS skills CASCADE;
DROP TABLE IF EXISTS settings CASCADE;
DROP TABLE IF EXISTS public_projects CASCADE;
DROP TABLE IF EXISTS blogs CASCADE;
DROP TABLE IF EXISTS shortener CASCADE;
