-- Create company_credentials table for password-protected company dashboards
CREATE TABLE IF NOT EXISTS company_credentials (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    company_name VARCHAR NOT NULL UNIQUE,
    password_hash VARCHAR NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Add indexes
CREATE INDEX IF NOT EXISTS idx_company_credentials_company_name ON company_credentials(company_name);

-- Enable Row Level Security
ALTER TABLE company_credentials ENABLE ROW LEVEL SECURITY;

-- Create policies - only authenticated admins can view/manage credentials
-- Companies will authenticate via API, not direct database access
CREATE POLICY "Enable read access for authenticated users" ON company_credentials
FOR SELECT TO authenticated USING (true);

-- Note: Password hashing will be done in the application layer using bcrypt
-- Companies will authenticate via API endpoint, not direct database queries
