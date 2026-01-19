-- Add reminder tracking fields to prevent duplicate emails
ALTER TABLE customer_care_complaints
ADD COLUMN IF NOT EXISTS last_reminder_sent_at TIMESTAMPTZ,
ADD COLUMN IF NOT EXISTS last_escalation_sent_at TIMESTAMPTZ;

-- Add indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_customer_care_complaints_last_reminder_sent_at ON customer_care_complaints(last_reminder_sent_at);
CREATE INDEX IF NOT EXISTS idx_customer_care_complaints_last_escalation_sent_at ON customer_care_complaints(last_escalation_sent_at);
