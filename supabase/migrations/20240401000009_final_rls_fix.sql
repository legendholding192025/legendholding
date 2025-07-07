-- Final RLS fix: Admin-only policies for proper role-based access
-- Careers page now uses API endpoint with service role

-- Drop any existing conflicting policies
DROP POLICY IF EXISTS "jobs_public_read_active" ON jobs;
DROP POLICY IF EXISTS "jobs_public_read_all_active" ON jobs;
DROP POLICY IF EXISTS "jobs_authenticated_non_admin_read_active" ON jobs;

-- Keep only the admin policy for role-based access control
DROP POLICY IF EXISTS "jobs_admin_select_policy" ON jobs;
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

-- Update job applications policy to match
DROP POLICY IF EXISTS "job_applications_admin_select_policy" ON job_applications;
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

SELECT 'Final RLS policies applied successfully' as status; 