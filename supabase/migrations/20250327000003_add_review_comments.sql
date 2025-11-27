-- Add comment columns for each review stage
ALTER TABLE workflow_submissions
ADD COLUMN finance_comment TEXT,
ADD COLUMN cofounder_comment TEXT,
ADD COLUMN founder_comment TEXT;

-- Add index for better query performance
CREATE INDEX IF NOT EXISTS idx_workflow_submissions_finance_comment ON workflow_submissions(finance_comment);

-- Update table comment
COMMENT ON COLUMN workflow_submissions.finance_comment IS 'Review comment from finance reviewer';
COMMENT ON COLUMN workflow_submissions.cofounder_comment IS 'Review comment from co-founder reviewer';
COMMENT ON COLUMN workflow_submissions.founder_comment IS 'Review comment from founder reviewer';

