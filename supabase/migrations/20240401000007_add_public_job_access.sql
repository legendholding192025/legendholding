-- Migration: Add public read access for active jobs
-- This allows the public careers page to show all active jobs

-- Add a public read policy for active jobs
-- This policy allows ANYONE (authenticated or not) to read active jobs
CREATE POLICY "jobs_public_read_active" ON jobs
    FOR SELECT 
    USING (status = 'active');

-- Note: This policy works alongside the existing admin policies
-- PostgreSQL RLS uses OR logic, so if ANY policy allows access, the user can see the data
-- 
-- Now we have:
-- 1. jobs_select_policy: Admins see their own jobs, super_admins see all jobs
-- 2. jobs_public_read_active: Everyone can see active jobs (NEW)
--
-- Result:
-- - Public users: Can see all active jobs (policy 2)
-- - Regular admins: Can see all active jobs (policy 2) + their own inactive jobs (policy 1)  
-- - Super admins: Can see all jobs active/inactive (policy 1)

-- Grant select permission on jobs table to anon (unauthenticated users)
GRANT SELECT ON jobs TO anon; 