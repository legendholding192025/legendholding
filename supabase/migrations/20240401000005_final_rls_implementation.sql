-- Migration: Final RLS Implementation for Jobs and Job Applications
-- This migration implements complete role-based access control

-- =================
-- JOBS TABLE RLS
-- =================

-- Enable RLS on jobs table
ALTER TABLE jobs ENABLE ROW LEVEL SECURITY;

-- Drop all potentially conflicting policies
DROP POLICY IF EXISTS "Enable read access for all users" ON jobs;
DROP POLICY IF EXISTS "jobs_public_read" ON jobs;
DROP POLICY IF EXISTS "allow_all_users_all_operations" ON jobs;
DROP POLICY IF EXISTS "test_select_policy" ON jobs;
DROP POLICY IF EXISTS "jobs_role_based_select" ON jobs;
DROP POLICY IF EXISTS "jobs_role_based_insert" ON jobs;
DROP POLICY IF EXISTS "jobs_select_policy" ON jobs;
DROP POLICY IF EXISTS "jobs_insert_policy" ON jobs;
DROP POLICY IF EXISTS "jobs_update_policy" ON jobs;
DROP POLICY IF EXISTS "jobs_delete_policy" ON jobs;

-- Create comprehensive policies for jobs
-- 1. SELECT: Super admin sees all, regular admin sees only own jobs
CREATE POLICY "jobs_select_policy" ON jobs
    FOR SELECT 
    USING (
        -- Super admin can see all jobs
        EXISTS (
            SELECT 1 FROM user_roles ur 
            WHERE ur.user_id = auth.uid() 
            AND ur.role = 'super_admin'
        )
        OR
        -- Regular admin can only see their own jobs
        (
            created_by = auth.uid()
            AND EXISTS (
                SELECT 1 FROM user_roles ur 
                WHERE ur.user_id = auth.uid() 
                AND ur.role = 'admin'
            )
        )
    );

-- 2. INSERT: Only authenticated admins can create jobs
CREATE POLICY "jobs_insert_policy" ON jobs
    FOR INSERT 
    WITH CHECK (
        auth.uid() IS NOT NULL
        AND EXISTS (
            SELECT 1 FROM user_roles ur 
            WHERE ur.user_id = auth.uid() 
            AND ur.role IN ('admin', 'super_admin')
        )
        AND created_by = auth.uid()
    );

-- 3. UPDATE: Super admin can update all, regular admin can update own jobs
CREATE POLICY "jobs_update_policy" ON jobs
    FOR UPDATE 
    USING (
        -- Super admin can update all jobs
        EXISTS (
            SELECT 1 FROM user_roles ur 
            WHERE ur.user_id = auth.uid() 
            AND ur.role = 'super_admin'
        )
        OR
        -- Regular admin can only update their own jobs
        (
            created_by = auth.uid()
            AND EXISTS (
                SELECT 1 FROM user_roles ur 
                WHERE ur.user_id = auth.uid() 
                AND ur.role = 'admin'
            )
        )
    );

-- 4. DELETE: Super admin can delete all, regular admin can delete own jobs
CREATE POLICY "jobs_delete_policy" ON jobs
    FOR DELETE 
    USING (
        -- Super admin can delete all jobs
        EXISTS (
            SELECT 1 FROM user_roles ur 
            WHERE ur.user_id = auth.uid() 
            AND ur.role = 'super_admin'
        )
        OR
        -- Regular admin can only delete their own jobs
        (
            created_by = auth.uid()
            AND EXISTS (
                SELECT 1 FROM user_roles ur 
                WHERE ur.user_id = auth.uid() 
                AND ur.role = 'admin'
            )
        )
    );

-- =================
-- JOB APPLICATIONS TABLE RLS
-- =================

-- Enable RLS on job_applications table
ALTER TABLE job_applications ENABLE ROW LEVEL SECURITY;

-- Drop all potentially conflicting policies
DROP POLICY IF EXISTS "allow_all_users_all_operations" ON job_applications;
DROP POLICY IF EXISTS "Enable read access for all users" ON job_applications;
DROP POLICY IF EXISTS "applications_public_read" ON job_applications;
DROP POLICY IF EXISTS "applications_role_based_select" ON job_applications;
DROP POLICY IF EXISTS "applications_role_based_insert" ON job_applications;
DROP POLICY IF EXISTS "applications_role_based_update" ON job_applications;
DROP POLICY IF EXISTS "applications_simple_select" ON job_applications;
DROP POLICY IF EXISTS "job_applications_select_policy" ON job_applications;
DROP POLICY IF EXISTS "job_applications_insert_policy" ON job_applications;
DROP POLICY IF EXISTS "job_applications_update_policy" ON job_applications;
DROP POLICY IF EXISTS "job_applications_delete_policy" ON job_applications;

-- Create comprehensive policies for job applications
-- 1. SELECT: Super admin sees all, regular admin sees only applications for their jobs
CREATE POLICY "job_applications_select_policy" ON job_applications
    FOR SELECT 
    USING (
        -- Super admin can see all applications
        EXISTS (
            SELECT 1 FROM user_roles ur 
            WHERE ur.user_id = auth.uid() 
            AND ur.role = 'super_admin'
        )
        OR
        -- Regular admin can only see applications for jobs they created
        EXISTS (
            SELECT 1 FROM jobs j
            JOIN user_roles ur ON ur.user_id = auth.uid()
            WHERE j.id = job_applications.job_id
            AND j.created_by = auth.uid()
            AND ur.role = 'admin'
        )
    );

-- 2. INSERT: Anyone can submit applications (public access)
CREATE POLICY "job_applications_insert_policy" ON job_applications
    FOR INSERT 
    WITH CHECK (true);

-- 3. UPDATE: Only admins who own the job can update application status
CREATE POLICY "job_applications_update_policy" ON job_applications
    FOR UPDATE 
    USING (
        -- Super admin can update all applications
        EXISTS (
            SELECT 1 FROM user_roles ur 
            WHERE ur.user_id = auth.uid() 
            AND ur.role = 'super_admin'
        )
        OR
        -- Regular admin can only update applications for jobs they created
        EXISTS (
            SELECT 1 FROM jobs j
            JOIN user_roles ur ON ur.user_id = auth.uid()
            WHERE j.id = job_applications.job_id
            AND j.created_by = auth.uid()
            AND ur.role = 'admin'
        )
    );

-- 4. DELETE: Only admins who own the job can delete applications
CREATE POLICY "job_applications_delete_policy" ON job_applications
    FOR DELETE 
    USING (
        -- Super admin can delete all applications
        EXISTS (
            SELECT 1 FROM user_roles ur 
            WHERE ur.user_id = auth.uid() 
            AND ur.role = 'super_admin'
        )
        OR
        -- Regular admin can only delete applications for jobs they created
        EXISTS (
            SELECT 1 FROM jobs j
            JOIN user_roles ur ON ur.user_id = auth.uid()
            WHERE j.id = job_applications.job_id
            AND j.created_by = auth.uid()
            AND ur.role = 'admin'
        )
    );

-- =================
-- HELPER FUNCTIONS
-- =================

-- Function to test auth context (for debugging)
CREATE OR REPLACE FUNCTION test_auth_context()
RETURNS TABLE (
    current_user_id uuid,
    current_user_role text,
    current_user_email text
) AS $$
BEGIN
    RETURN QUERY
    SELECT 
        auth.uid(),
        ur.role,
        ur.email
    FROM user_roles ur
    WHERE ur.user_id = auth.uid();
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Grant execute permissions
GRANT EXECUTE ON FUNCTION test_auth_context() TO authenticated; 