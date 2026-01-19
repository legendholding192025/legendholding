-- Create customer_care_complaints table
CREATE TABLE IF NOT EXISTS customer_care_complaints (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    name VARCHAR NOT NULL,
    email VARCHAR NOT NULL,
    phone VARCHAR NOT NULL,
    company VARCHAR NOT NULL,
    subject VARCHAR NOT NULL,
    message TEXT NOT NULL,
    status VARCHAR DEFAULT 'pending',
    resolved BOOLEAN DEFAULT FALSE
);

-- Add indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_customer_care_complaints_created_at ON customer_care_complaints(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_customer_care_complaints_email ON customer_care_complaints(email);
CREATE INDEX IF NOT EXISTS idx_customer_care_complaints_status ON customer_care_complaints(status);
CREATE INDEX IF NOT EXISTS idx_customer_care_complaints_resolved ON customer_care_complaints(resolved);
CREATE INDEX IF NOT EXISTS idx_customer_care_complaints_company ON customer_care_complaints(company);

-- Enable Row Level Security
ALTER TABLE customer_care_complaints ENABLE ROW LEVEL SECURITY;

-- Create policies
-- Allow anyone to insert (submit complaints)
CREATE POLICY "Enable insert access for all users" ON customer_care_complaints
FOR INSERT WITH CHECK (true);

-- Allow authenticated users to read all complaints (for admin dashboard)
CREATE POLICY "Enable read access for authenticated users" ON customer_care_complaints
FOR SELECT TO authenticated USING (true);

-- Allow authenticated users to update complaints
CREATE POLICY "Enable update for authenticated users" ON customer_care_complaints
FOR UPDATE TO authenticated USING (true) WITH CHECK (true);

-- Allow authenticated users to delete complaints
CREATE POLICY "Enable delete for authenticated users" ON customer_care_complaints
FOR DELETE TO authenticated USING (true);

-- Add comment to table
COMMENT ON TABLE customer_care_complaints IS 'Stores customer care complaints and incident reports submitted through the customer care form';

