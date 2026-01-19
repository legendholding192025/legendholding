-- Add email column to company_credentials table
ALTER TABLE company_credentials
ADD COLUMN IF NOT EXISTS email VARCHAR UNIQUE;

-- Add index for email
CREATE INDEX IF NOT EXISTS idx_company_credentials_email ON company_credentials(email);

-- Update the table to make email required (but allow existing rows)
COMMENT ON COLUMN company_credentials.email IS 'Email address used for login (unique per company)';
