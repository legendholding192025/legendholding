-- Add reviewed_at column to track when complaint was reviewed
ALTER TABLE customer_care_complaints
ADD COLUMN IF NOT EXISTS reviewed_at TIMESTAMPTZ;

-- Add index for better query performance
CREATE INDEX IF NOT EXISTS idx_customer_care_complaints_reviewed_at ON customer_care_complaints(reviewed_at);

-- Update existing 'reviewed' status complaints to have reviewed_at set to created_at (approximation)
UPDATE customer_care_complaints
SET reviewed_at = created_at
WHERE status = 'reviewed' AND reviewed_at IS NULL;
