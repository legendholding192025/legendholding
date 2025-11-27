-- Create workflow_submissions table
CREATE TABLE IF NOT EXISTS workflow_submissions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  subject TEXT NOT NULL,
  message TEXT NOT NULL,
  file_name TEXT,
  file_url TEXT,
  file_type TEXT,
  file_size INTEGER,
  status TEXT DEFAULT 'pending',
  finance_reviewed_at TIMESTAMPTZ,
  cofounder_reviewed_at TIMESTAMPTZ,
  founder_reviewed_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Status values:
-- 'pending' - Initial submission, awaiting finance review
-- 'finance_rejected' - Rejected by finance team
-- 'finance_approved' - Approved by finance, awaiting co-founder approval
-- 'cofounder_rejected' - Rejected by co-founder
-- 'cofounder_approved' - Approved by co-founder, awaiting founder approval
-- 'approved' - Fully approved by founder (final)
-- 'founder_rejected' - Rejected by founder

-- Enable RLS
ALTER TABLE workflow_submissions ENABLE ROW LEVEL SECURITY;

-- Create policies
-- Allow anyone to insert (submit)
CREATE POLICY "Allow public to submit workflow documents"
  ON workflow_submissions
  FOR INSERT
  TO public
  WITH CHECK (true);

-- Allow authenticated users to view their own submissions
CREATE POLICY "Allow users to view all submissions"
  ON workflow_submissions
  FOR SELECT
  TO authenticated
  USING (true);

-- Allow authenticated users to update submissions
CREATE POLICY "Allow authenticated users to update submissions"
  ON workflow_submissions
  FOR UPDATE
  TO authenticated
  USING (true);

-- Create index for better query performance
CREATE INDEX IF NOT EXISTS idx_workflow_submissions_created_at ON workflow_submissions(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_workflow_submissions_status ON workflow_submissions(status);

-- Create updated_at trigger
CREATE OR REPLACE FUNCTION update_workflow_submissions_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER workflow_submissions_updated_at
  BEFORE UPDATE ON workflow_submissions
  FOR EACH ROW
  EXECUTE FUNCTION update_workflow_submissions_updated_at();

