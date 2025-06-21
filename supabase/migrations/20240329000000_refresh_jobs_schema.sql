-- This migration adds a comment to the 'type' column on the 'jobs' table.
-- This is intended to force a schema cache reload in Supabase's API layer (PostgREST)
-- to resolve the "Could not find the 'type' column" error.

COMMENT ON COLUMN public.jobs.type IS 'The type of employment (e.g., Full-time, Part-time).'; 