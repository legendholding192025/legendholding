-- Fix Row Level Security policies for job_applications table
-- Run this script in your Supabase SQL editor

-- First, let's see what policies currently exist
SELECT schemaname, tablename, policyname, permissive, roles, cmd, qual 
FROM pg_policies 
WHERE tablename = 'job_applications';

-- Drop ALL existing policies on job_applications table to start fresh
DROP POLICY IF EXISTS "Allow users to submit applications" ON public.job_applications;
DROP POLICY IF EXISTS "Allow users to view their own applications" ON public.job_applications;
DROP POLICY IF EXISTS "Allow public to submit applications" ON public.job_applications;
DROP POLICY IF EXISTS "Allow authenticated users to view applications" ON public.job_applications;
DROP POLICY IF EXISTS "Allow authenticated users to update applications" ON public.job_applications;
DROP POLICY IF EXISTS "Allow authenticated users to delete applications" ON public.job_applications;
DROP POLICY IF EXISTS "Anyone can submit job applications" ON public.job_applications;
DROP POLICY IF EXISTS "Users can read their own applications" ON public.job_applications;
DROP POLICY IF EXISTS "Enable insert for all users" ON public.job_applications;
DROP POLICY IF EXISTS "Enable read/update/delete for authenticated users only" ON public.job_applications;

-- Disable RLS temporarily to clear any remaining policies
ALTER TABLE public.job_applications DISABLE ROW LEVEL SECURITY;

-- Re-enable RLS
ALTER TABLE public.job_applications ENABLE ROW LEVEL SECURITY;

-- Create simplified policies that work for public job applications
-- Allow anyone to submit job applications (public access)
CREATE POLICY "Allow public to submit applications" ON public.job_applications FOR
INSERT TO public WITH CHECK (true);

-- Allow authenticated users to view all applications (for admin purposes)
CREATE POLICY "Allow authenticated users to view applications" ON public.job_applications FOR
SELECT TO authenticated USING (true);

-- Allow authenticated users to update applications (for admin status changes)
CREATE POLICY "Allow authenticated users to update applications" ON public.job_applications FOR
UPDATE TO authenticated USING (true);

-- Allow authenticated users to delete applications (for admin cleanup)
CREATE POLICY "Allow authenticated users to delete applications" ON public.job_applications FOR
DELETE TO authenticated USING (true);

-- Verify the new policies are working
SELECT schemaname, tablename, policyname, permissive, roles, cmd, qual 
FROM pg_policies 
WHERE tablename = 'job_applications';

-- Test the insert policy by trying to insert a test record (will be rolled back)
BEGIN;
INSERT INTO public.job_applications (
    job_id, 
    full_name, 
    email, 
    phone, 
    resume_url, 
    cover_letter, 
    status
) VALUES (
    '00000000-0000-0000-0000-000000000000', -- dummy UUID
    'Test User',
    'test@example.com',
    '1234567890',
    'test-resume.pdf',
    'Test cover letter',
    'pending'
);
ROLLBACK;

-- If the above test succeeds, the policies are working correctly
SELECT 'RLS policies are working correctly' as status; 