-- =============================================================================
-- Fix RLS Policies for Public Access - Run in Supabase SQL Editor
-- =============================================================================

-- 1. ENABLE RLS on required tables (if not already enabled)
-- =============================================================================
ALTER TABLE jobs ENABLE ROW LEVEL SECURITY;
ALTER TABLE job_applications ENABLE ROW LEVEL SECURITY;

-- 2. DROP ALL EXISTING POLICIES to start fresh
-- =============================================================================
DROP POLICY IF EXISTS "jobs_admin_select_policy" ON jobs;
DROP POLICY IF EXISTS "jobs_public_read_active" ON jobs;
DROP POLICY IF EXISTS "jobs_public_read_all_active" ON jobs;
DROP POLICY IF EXISTS "jobs_authenticated_non_admin_read_active" ON jobs;
DROP POLICY IF EXISTS "jobs_select_policy" ON jobs;
DROP POLICY IF EXISTS "jobs_insert_policy" ON jobs;
DROP POLICY IF EXISTS "jobs_update_policy" ON jobs;
DROP POLICY IF EXISTS "jobs_delete_policy" ON jobs;

DROP POLICY IF EXISTS "job_applications_admin_select_policy" ON job_applications;
DROP POLICY IF EXISTS "job_applications_select_policy" ON job_applications;
DROP POLICY IF EXISTS "job_applications_insert_policy" ON job_applications;
DROP POLICY IF EXISTS "job_applications_update_policy" ON job_applications;
DROP POLICY IF EXISTS "job_applications_delete_policy" ON job_applications;
DROP POLICY IF EXISTS "allow_all_users_all_operations" ON job_applications;

-- 3. CREATE JOBS TABLE POLICIES
-- =============================================================================

-- Allow public read access to active jobs (for careers page)
CREATE POLICY "jobs_public_read_active" ON jobs
    FOR SELECT 
    USING (status = 'active');

-- Allow authenticated admins to see all jobs (for admin dashboard)
CREATE POLICY "jobs_admin_select_all" ON jobs
    FOR SELECT 
    USING (
        auth.uid() IN (
            SELECT user_id FROM user_roles 
            WHERE role IN ('admin', 'super_admin')
        )
    );

-- Allow authenticated admins to insert jobs
CREATE POLICY "jobs_admin_insert" ON jobs
    FOR INSERT 
    WITH CHECK (
        auth.uid() IN (
            SELECT user_id FROM user_roles 
            WHERE role IN ('admin', 'super_admin')
        )
    );

-- Allow authenticated admins to update jobs
CREATE POLICY "jobs_admin_update" ON jobs
    FOR UPDATE 
    USING (
        auth.uid() IN (
            SELECT user_id FROM user_roles 
            WHERE role IN ('admin', 'super_admin')
        )
        AND (
            -- Super admins can update all jobs
            auth.uid() IN (
                SELECT user_id FROM user_roles 
                WHERE role = 'super_admin'
            )
            OR 
            -- Regular admins can only update their own jobs
            (
                auth.uid() IN (
                    SELECT user_id FROM user_roles 
                    WHERE role = 'admin'
                )
                AND created_by = auth.uid()
            )
        )
    )
    WITH CHECK (
        auth.uid() IN (
            SELECT user_id FROM user_roles 
            WHERE role IN ('admin', 'super_admin')
        )
    );

-- Allow authenticated admins to delete jobs
CREATE POLICY "jobs_admin_delete" ON jobs
    FOR DELETE 
    USING (
        auth.uid() IN (
            SELECT user_id FROM user_roles 
            WHERE role IN ('admin', 'super_admin')
        )
        AND (
            -- Super admins can delete all jobs
            auth.uid() IN (
                SELECT user_id FROM user_roles 
                WHERE role = 'super_admin'
            )
            OR 
            -- Regular admins can only delete their own jobs
            (
                auth.uid() IN (
                    SELECT user_id FROM user_roles 
                    WHERE role = 'admin'
                )
                AND created_by = auth.uid()
            )
        )
    );

-- 4. CREATE JOB APPLICATIONS TABLE POLICIES
-- =============================================================================

-- Allow public INSERT access (for job applications from careers page)
CREATE POLICY "job_applications_public_insert" ON job_applications
    FOR INSERT 
    WITH CHECK (true);

-- Allow authenticated admins to see applications
CREATE POLICY "job_applications_admin_select" ON job_applications
    FOR SELECT 
    USING (
        auth.uid() IN (
            SELECT user_id FROM user_roles 
            WHERE role IN ('admin', 'super_admin')
        )
        AND (
            -- Super admins can see all applications
            auth.uid() IN (
                SELECT user_id FROM user_roles 
                WHERE role = 'super_admin'
            )
            OR 
            -- Regular admins can only see applications for their own jobs
            (
                auth.uid() IN (
                    SELECT user_id FROM user_roles 
                    WHERE role = 'admin'
                )
                AND job_id IN (
                    SELECT id FROM jobs 
                    WHERE created_by = auth.uid()
                )
            )
        )
    );

-- Allow authenticated admins to update applications
CREATE POLICY "job_applications_admin_update" ON job_applications
    FOR UPDATE 
    USING (
        auth.uid() IN (
            SELECT user_id FROM user_roles 
            WHERE role IN ('admin', 'super_admin')
        )
        AND (
            -- Super admins can update all applications
            auth.uid() IN (
                SELECT user_id FROM user_roles 
                WHERE role = 'super_admin'
            )
            OR 
            -- Regular admins can only update applications for their own jobs
            (
                auth.uid() IN (
                    SELECT user_id FROM user_roles 
                    WHERE role = 'admin'
                )
                AND job_id IN (
                    SELECT id FROM jobs 
                    WHERE created_by = auth.uid()
                )
            )
        )
    )
    WITH CHECK (
        auth.uid() IN (
            SELECT user_id FROM user_roles 
            WHERE role IN ('admin', 'super_admin')
        )
    );

-- Allow authenticated admins to delete applications
CREATE POLICY "job_applications_admin_delete" ON job_applications
    FOR DELETE 
    USING (
        auth.uid() IN (
            SELECT user_id FROM user_roles 
            WHERE role IN ('admin', 'super_admin')
        )
        AND (
            -- Super admins can delete all applications
            auth.uid() IN (
                SELECT user_id FROM user_roles 
                WHERE role = 'super_admin'
            )
            OR 
            -- Regular admins can only delete applications for their own jobs
            (
                auth.uid() IN (
                    SELECT user_id FROM user_roles 
                    WHERE role = 'admin'
                )
                AND job_id IN (
                    SELECT id FROM jobs 
                    WHERE created_by = auth.uid()
                )
            )
        )
    );

-- 5. DROP EXISTING STORAGE POLICIES to start fresh
-- =============================================================================
DROP POLICY IF EXISTS "public_resume_upload" ON storage.objects;
DROP POLICY IF EXISTS "public_resume_download" ON storage.objects;
DROP POLICY IF EXISTS "admin_resume_delete" ON storage.objects;
DROP POLICY IF EXISTS "public_cv_upload" ON storage.objects;
DROP POLICY IF EXISTS "public_cv_download" ON storage.objects;
DROP POLICY IF EXISTS "admin_cv_delete" ON storage.objects;

-- 6. CREATE STORAGE POLICIES FOR RESUME UPLOADS
-- =============================================================================

-- Allow public uploads to resume bucket
INSERT INTO storage.buckets (id, name, public) 
VALUES ('resumes', 'resumes', false) 
ON CONFLICT (id) DO NOTHING;

-- Allow public to upload resumes
CREATE POLICY "public_resume_upload" ON storage.objects
    FOR INSERT 
    WITH CHECK (bucket_id = 'resumes');

-- Allow public to read resumes (for downloads)
CREATE POLICY "public_resume_download" ON storage.objects
    FOR SELECT 
    USING (bucket_id = 'resumes');

-- Allow authenticated admins to delete resumes
CREATE POLICY "admin_resume_delete" ON storage.objects
    FOR DELETE 
    USING (
        bucket_id = 'resumes' 
        AND auth.uid() IN (
            SELECT user_id FROM user_roles 
            WHERE role IN ('admin', 'super_admin')
        )
    );

-- 7. ENSURE CV BUCKET ALSO HAS PROPER POLICIES
-- =============================================================================

-- Allow public uploads to cv bucket (legacy support)
INSERT INTO storage.buckets (id, name, public) 
VALUES ('cvs', 'cvs', false) 
ON CONFLICT (id) DO NOTHING;

-- Allow public to upload CVs
CREATE POLICY "public_cv_upload" ON storage.objects
    FOR INSERT 
    WITH CHECK (bucket_id = 'cvs');

-- Allow public to read CVs (for downloads)
CREATE POLICY "public_cv_download" ON storage.objects
    FOR SELECT 
    USING (bucket_id = 'cvs');

-- Allow authenticated admins to delete CVs
CREATE POLICY "admin_cv_delete" ON storage.objects
    FOR DELETE 
    USING (
        bucket_id = 'cvs' 
        AND auth.uid() IN (
            SELECT user_id FROM user_roles 
            WHERE role IN ('admin', 'super_admin')
        )
    );

-- 8. VERIFY POLICIES ARE CREATED
-- =============================================================================
SELECT 
    schemaname,
    tablename,
    policyname,
    permissive,
    roles,
    cmd,
    qual,
    with_check
FROM pg_policies 
WHERE schemaname = 'public' 
  AND tablename IN ('jobs', 'job_applications')
ORDER BY tablename, policyname;

-- 9. SHOW STORAGE POLICIES
-- =============================================================================
SELECT 
    name,
    bucket_id,
    definition
FROM storage.policies
WHERE bucket_id IN ('resumes', 'cvs')
ORDER BY bucket_id, name;

-- SUCCESS MESSAGE
SELECT 'RLS policies have been successfully updated for public access!' as status; 