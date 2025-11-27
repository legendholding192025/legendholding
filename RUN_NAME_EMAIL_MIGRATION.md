# Database Migration Required: Add Name and Email Fields

## ⚠️ Important: Run This Migration

A new migration has been created to add `name` and `email` fields to the `workflow_submissions` table.

### Migration File
`supabase/migrations/20250327000001_add_name_email_to_workflow.sql`

### What It Does
- Adds `name` column (TEXT, required)
- Adds `email` column (TEXT, required)
- Creates an index on `email` for better query performance

### How to Run

#### Option 1: Using Supabase CLI (Recommended)
```bash
npx supabase db push
```

#### Option 2: Manual SQL Execution
1. Go to your Supabase Dashboard
2. Navigate to **SQL Editor**
3. Copy and paste the contents of `supabase/migrations/20250327000001_add_name_email_to_workflow.sql`
4. Click **Run**

### Migration SQL
```sql
-- Add name and email columns to workflow_submissions table
ALTER TABLE workflow_submissions
ADD COLUMN name TEXT NOT NULL DEFAULT '',
ADD COLUMN email TEXT NOT NULL DEFAULT '';

-- Remove default values after adding columns
ALTER TABLE workflow_submissions
ALTER COLUMN name DROP DEFAULT,
ALTER COLUMN email DROP DEFAULT;

-- Add index for email for better query performance
CREATE INDEX IF NOT EXISTS idx_workflow_submissions_email ON workflow_submissions(email);

-- Update the insert policy comment to reflect new required fields
COMMENT ON TABLE workflow_submissions IS 'Stores workflow document submissions with user information (name, email), subject, message, and optional file attachments';
```

## ✅ After Running Migration

The workflow submission form now includes:
- **Name** field (required) - with red asterisk
- **Email** field (required) - with email format validation and red asterisk
- **Subject** field (required) - with red asterisk
- **Message** field (required) - with red asterisk
- **File Upload** (optional)

### Validation Features
✅ All required fields must be filled
✅ Email format validation (user@domain.com)
✅ Real-time error messages with red borders
✅ Red asterisk (*) indicates required fields
✅ Form submission blocked if validation fails

---

**Note**: Make sure to run this migration before submitting any new workflow documents, otherwise you will get database errors.

