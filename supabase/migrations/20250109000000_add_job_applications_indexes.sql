-- Add indexes to job_applications table for better query performance
-- This will significantly improve the speed of queries that order by created_at
-- and filter by job_id or status

-- Index on created_at for sorting (descending order for most recent first)
CREATE INDEX IF NOT EXISTS idx_job_applications_created_at 
ON job_applications (created_at DESC);

-- Index on job_id for filtering by job
CREATE INDEX IF NOT EXISTS idx_job_applications_job_id 
ON job_applications (job_id);

-- Index on status for filtering by application status
CREATE INDEX IF NOT EXISTS idx_job_applications_status 
ON job_applications (status);

-- Composite index for common query pattern (job_id + created_at)
CREATE INDEX IF NOT EXISTS idx_job_applications_job_created 
ON job_applications (job_id, created_at DESC);

-- Composite index for status filtering with sorting
CREATE INDEX IF NOT EXISTS idx_job_applications_status_created 
ON job_applications (status, created_at DESC);

-- Add comment explaining the indexes
COMMENT ON INDEX idx_job_applications_created_at IS 'Index for sorting applications by creation date';
COMMENT ON INDEX idx_job_applications_job_id IS 'Index for filtering applications by job';
COMMENT ON INDEX idx_job_applications_status IS 'Index for filtering applications by status';
COMMENT ON INDEX idx_job_applications_job_created IS 'Composite index for job-specific application queries';
COMMENT ON INDEX idx_job_applications_status_created IS 'Composite index for status-filtered application queries';

