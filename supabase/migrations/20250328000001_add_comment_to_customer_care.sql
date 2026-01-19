-- Add comment field to customer_care_complaints table
ALTER TABLE customer_care_complaints
ADD COLUMN IF NOT EXISTS admin_comment TEXT;

-- Add index for better query performance
CREATE INDEX IF NOT EXISTS idx_customer_care_complaints_status ON customer_care_complaints(status);
