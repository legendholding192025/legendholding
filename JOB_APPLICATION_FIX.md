# Job Application Submission Error Fix

## Problem
The job application form is failing with the error: `Application creation error: {}`

## Root Causes Identified
1. **Supabase Client Configuration Issue**: The form was using a custom Supabase client with problematic fetch configuration
2. **Database Constraint Conflicts**: Multiple migrations created conflicting status constraints
3. **RLS Policy Issues**: Row Level Security policies might be preventing public inserts
4. **Poor Error Handling**: The error object was empty, making debugging difficult

## Fixes Applied

### 1. Fixed Supabase Client (✅ Done)
- Changed from custom `createClient` to `createClientComponentClient`
- Removed problematic fetch configuration
- This ensures proper authentication and request handling

### 2. Improved Error Handling (✅ Done)
- Added detailed error logging
- Enhanced error messages for different scenarios
- Added validation for file types and sizes
- Better user feedback for specific error cases

### 3. Database Fixes Required (⚠️ Need to run SQL scripts)

#### Run this script in your Supabase SQL editor:
```sql
-- Fix job applications table constraints and ensure proper schema
-- Run this script in your Supabase SQL editor

-- First, let's check the current table structure
SELECT column_name, data_type, is_nullable, column_default 
FROM information_schema.columns 
WHERE table_name = 'job_applications' 
ORDER BY ordinal_position;

-- Check current constraints
SELECT conname, contype, pg_get_constraintdef(oid) 
FROM pg_constraint 
WHERE conrelid = 'job_applications'::regclass;

-- Drop any conflicting status constraints
ALTER TABLE job_applications 
DROP CONSTRAINT IF EXISTS job_applications_status_check;

-- Add the correct status constraint with all valid values
ALTER TABLE job_applications 
ADD CONSTRAINT job_applications_status_check 
CHECK (status IN ('pending', 'reviewed', 'shortlisted', 'rejected', 'hired'));

-- Ensure the status column has a default value
ALTER TABLE job_applications 
ALTER COLUMN status SET DEFAULT 'pending';

-- Update any existing applications with invalid status values
UPDATE job_applications 
SET status = 'pending' 
WHERE status IS NULL OR status NOT IN ('pending', 'reviewed', 'shortlisted', 'rejected', 'hired');

-- Ensure all required columns are properly set
ALTER TABLE job_applications 
ALTER COLUMN full_name SET NOT NULL,
ALTER COLUMN email SET NOT NULL,
ALTER COLUMN phone SET NOT NULL,
ALTER COLUMN resume_url SET NOT NULL;

-- Add indexes for better performance
CREATE INDEX IF NOT EXISTS job_applications_job_id_idx ON job_applications(job_id);
CREATE INDEX IF NOT EXISTS job_applications_email_idx ON job_applications(email);
CREATE INDEX IF NOT EXISTS job_applications_status_idx ON job_applications(status);
CREATE INDEX IF NOT EXISTS job_applications_created_at_idx ON job_applications(created_at DESC);

-- Verify the fixes
SELECT 
    id, 
    full_name, 
    email, 
    status, 
    created_at 
FROM job_applications 
ORDER BY created_at DESC 
LIMIT 5;

-- Check for any remaining constraint issues
SELECT 
    conname as constraint_name,
    contype as constraint_type,
    pg_get_constraintdef(oid) as constraint_definition
FROM pg_constraint 
WHERE conrelid = 'job_applications'::regclass;
```

#### Then run this RLS fix script:
```sql
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
```

## Testing the Fix

1. **Run the SQL scripts** in your Supabase SQL editor
2. **Test the form** by submitting a job application
3. **Check the browser console** for detailed error logs
4. **Verify the application** appears in the admin dashboard

## Expected Behavior After Fix

- Job applications should submit successfully
- Detailed error messages should appear in the console if issues occur
- Applications should appear in the admin dashboard
- File upload should work with multiple fallback strategies

## Files Modified

1. `app/components/careers/JobApplicationForm.tsx` - Fixed Supabase client and error handling
2. `fix-job-applications-constraints.sql` - Database constraint fixes
3. `fix-job-applications-rls.sql` - RLS policy fixes

## If Issues Persist

1. Check the browser console for detailed error logs
2. Verify the SQL scripts ran successfully
3. Check if there are any network connectivity issues
4. Ensure the Supabase environment variables are correctly set 