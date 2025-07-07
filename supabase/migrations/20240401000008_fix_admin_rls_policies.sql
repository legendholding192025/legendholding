-- Migration: Fix RLS policies to maintain role-based access for admins
-- Issue: The public policy is allowing admins to see all active jobs
-- Solution: Modify policies to distinguish between admin and public access

-- First, drop the existing policies that are causing conflicts
DROP POLICY IF EXISTS "jobs_select_policy" ON jobs;
DROP POLICY IF EXISTS "jobs_public_read_active" ON jobs;

-- Create a new policy for public access (non-admin users)
-- This allows unauthenticated users and users without admin roles to see active jobs
CREATE POLICY "jobs_public_read_active" ON jobs
    FOR SELECT 
    USING (
        status = 'active' 
        AND (
            auth.uid() IS NULL  -- Unauthenticated users
            OR 
            auth.uid() NOT IN (
                SELECT user_id FROM user_roles 
                WHERE role IN ('admin', 'super_admin')
            )  -- Authenticated users who are not admins
        )
    );

-- Create a separate policy for admin users with role-based access
CREATE POLICY "jobs_admin_select_policy" ON jobs
    FOR SELECT 
    USING (
        auth.uid() IN (
            SELECT user_id FROM user_roles 
            WHERE role IN ('admin', 'super_admin')
        )
        AND (
            -- Super admins can see all jobs
            auth.uid() IN (
                SELECT user_id FROM user_roles 
                WHERE role = 'super_admin'
            )
            OR 
            -- Regular admins can only see their own jobs
            (
                auth.uid() IN (
                    SELECT user_id FROM user_roles 
                    WHERE role = 'admin'
                )
                AND created_by = auth.uid()
            )
        )
    );

-- Update the job applications policy to match the new job access pattern
DROP POLICY IF EXISTS "job_applications_select_policy" ON job_applications;

-- Create policy for job applications - admins can see applications for jobs they have access to
CREATE POLICY "job_applications_admin_select_policy" ON job_applications
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

-- Ensure the policies are properly applied
SELECT 'RLS policies updated successfully for role-based access control' as status; 