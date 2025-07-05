-- Alternative approach: Completely reset job_applications policies
-- Run this script in your Supabase SQL editor if the other script doesn't work

-- Step 1: Check current policies
SELECT 'Current policies:' as info;
SELECT schemaname, tablename, policyname, permissive, roles, cmd, qual 
FROM pg_policies 
WHERE tablename = 'job_applications';

-- Step 2: Disable RLS completely (this removes all policies)
ALTER TABLE public.job_applications DISABLE ROW LEVEL SECURITY;

-- Step 3: Re-enable RLS
ALTER TABLE public.job_applications ENABLE ROW LEVEL SECURITY;

-- Step 4: Create new clean policies
CREATE POLICY "job_applications_insert_policy" ON public.job_applications FOR
INSERT TO public WITH CHECK (true);

CREATE POLICY "job_applications_select_policy" ON public.job_applications FOR
SELECT TO authenticated USING (true);

CREATE POLICY "job_applications_update_policy" ON public.job_applications FOR
UPDATE TO authenticated USING (true);

CREATE POLICY "job_applications_delete_policy" ON public.job_applications FOR
DELETE TO authenticated USING (true);

-- Step 5: Verify new policies
SELECT 'New policies:' as info;
SELECT schemaname, tablename, policyname, permissive, roles, cmd, qual 
FROM pg_policies 
WHERE tablename = 'job_applications'; 