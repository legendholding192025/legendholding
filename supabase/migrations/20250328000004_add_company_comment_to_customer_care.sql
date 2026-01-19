-- Add company comment field to customer_care_complaints table
ALTER TABLE customer_care_complaints
ADD COLUMN IF NOT EXISTS company_comment TEXT;

-- Add comment to column
COMMENT ON COLUMN customer_care_complaints.company_comment IS 'Comment added by company when marking complaint as resolved';
