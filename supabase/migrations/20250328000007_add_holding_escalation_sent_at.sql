-- Track when complaint was escalated to complaints@legendholding.com (6 days after business head email)
ALTER TABLE customer_care_complaints
ADD COLUMN IF NOT EXISTS holding_escalation_sent_at TIMESTAMPTZ;

CREATE INDEX IF NOT EXISTS idx_customer_care_complaints_holding_escalation_sent_at ON customer_care_complaints(holding_escalation_sent_at);
