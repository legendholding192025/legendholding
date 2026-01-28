-- Migration: Add job assignment functionality
-- This allows super admins to assign jobs to other admins

-- Add assigned_to column to jobs table
ALTER TABLE jobs ADD COLUMN IF NOT EXISTS assigned_to UUID REFERENCES auth.users(id);

-- Create index for better query performance
CREATE INDEX IF NOT EXISTS idx_jobs_assigned_to ON jobs(assigned_to);

-- Update RLS policies to include assigned jobs
-- First, drop existing policies
DROP POLICY IF EXISTS "jobs_select_policy" ON jobs;
DROP POLICY IF EXISTS "jobs_admin_select_policy" ON jobs;

-- Create new select policy that includes both created_by and assigned_to
CREATE POLICY "jobs_admin_select_policy" ON jobs
    FOR SELECT 
    USING (
        -- Super admin can see all jobs
        auth.uid() IN (
            SELECT user_id FROM user_roles 
            WHERE role = 'super_admin'
        )
        OR 
        -- Regular admin can see jobs they created OR are assigned to
        (
            auth.uid() IN (
                SELECT user_id FROM user_roles 
                WHERE role = 'admin'
            )
            AND (
                created_by = auth.uid() 
                OR assigned_to = auth.uid()
            )
        )
    );

-- Update policy for job applications to include assigned jobs
DROP POLICY IF EXISTS "job_applications_admin_select_policy" ON job_applications;

CREATE POLICY "job_applications_admin_select_policy" ON job_applications
    FOR SELECT 
    USING (
        -- Super admin can see all applications
        auth.uid() IN (
            SELECT user_id FROM user_roles 
            WHERE role = 'super_admin'
        )
        OR 
        -- Regular admin can see applications for jobs they created or are assigned to
        job_id IN (
            SELECT id FROM jobs 
            WHERE created_by = auth.uid() 
               OR assigned_to = auth.uid()
        )
    );

-- Comment for documentation
COMMENT ON COLUMN jobs.assigned_to IS 'The admin user this job is assigned to. Set by super admin.';
