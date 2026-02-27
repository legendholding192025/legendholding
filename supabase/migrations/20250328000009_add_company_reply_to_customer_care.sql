-- Store the company's reply message so it can be displayed on dashboards
ALTER TABLE customer_care_complaints
ADD COLUMN IF NOT EXISTS company_reply TEXT;
