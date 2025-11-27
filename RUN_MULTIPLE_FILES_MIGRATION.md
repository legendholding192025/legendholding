# Database Migration Required: Multiple Files Support

## ⚠️ Important: Run This Migration

A new migration has been created to support **multiple file uploads** in the workflow system.

### Migration File
`supabase/migrations/20250327000002_add_multiple_files_support.sql`

### What It Does
- Adds a new `files` column (JSONB array) to store multiple files
- Migrates existing single file data to the new array format
- Creates a GIN index for better query performance on the files column
- Preserves old single file columns for backward compatibility (optional removal)

### How to Run

#### Option 1: Using Supabase CLI (Recommended)
```bash
npx supabase db push
```

#### Option 2: Manual SQL Execution
1. Go to your Supabase Dashboard
2. Navigate to **SQL Editor**
3. Copy and paste the contents of `supabase/migrations/20250327000002_add_multiple_files_support.sql`
4. Click **Run**

### Migration SQL
```sql
-- Add files column to support multiple file uploads
ALTER TABLE workflow_submissions
ADD COLUMN files JSONB DEFAULT '[]'::jsonb;

-- Migrate existing single file data to the new files array format
UPDATE workflow_submissions
SET files = 
  CASE 
    WHEN file_name IS NOT NULL AND file_url IS NOT NULL THEN
      jsonb_build_array(
        jsonb_build_object(
          'fileName', file_name,
          'fileUrl', file_url,
          'fileType', file_type,
          'fileSize', file_size
        )
      )
    ELSE '[]'::jsonb
  END
WHERE file_name IS NOT NULL;

-- Add index for better query performance on files column
CREATE INDEX IF NOT EXISTS idx_workflow_submissions_files ON workflow_submissions USING GIN (files);
```

## ✅ After Running Migration

The workflow submission form now supports:
- **Multiple file uploads** - Users can select and upload multiple documents at once
- **File preview list** - Shows all selected files before submission
- **Individual file removal** - Remove specific files from the list
- **Validation per file** - Each file is validated separately (type, size)

### New Features

#### 1. **Frontend Form** (`/workflow`)
- ✅ Multiple file selection with `multiple` attribute
- ✅ File counter: "Upload Documents (3 files)"
- ✅ Individual file cards with remove buttons
- ✅ Supports PDF, DOC, DOCX, XLS, XLSX (max 10MB each)

#### 2. **Backend API** (`/api/workflow`)
- ✅ Handles multiple files via `formData.getAll('files')`
- ✅ Validates each file individually
- ✅ Stores files as JSONB array in database

#### 3. **Review Pages** (All approval stages)
- ✅ **Finance Review**: Displays all attached files
- ✅ **Co-Founder Approval**: Shows file count in cards, full list in details
- ✅ **Founder Approval**: Complete file list with individual download buttons
- ✅ **Workflow Submissions**: Table shows file count, detail view shows all files

### File Display Format

```
┌─────────────────────────────────────────────────┐
│  Attached Documents (3)                         │
├─────────────────────────────────────────────────┤
│  📄  Document1.pdf    (2.5 MB)    [Download]   │
│  📄  Spreadsheet.xlsx (1.2 MB)    [Download]   │
│  📄  Report.docx      (850 KB)    [Download]   │
└─────────────────────────────────────────────────┘
```

### Data Structure

Files are stored as JSONB array:
```json
[
  {
    "fileName": "document.pdf",
    "fileUrl": "data:application/pdf;base64,...",
    "fileType": "application/pdf",
    "fileSize": 2548576
  },
  {
    "fileName": "spreadsheet.xlsx",
    "fileUrl": "data:application/vnd...",
    "fileType": "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    "fileSize": 1258291
  }
]
```

---

**Note**: Make sure to run this migration before testing the multiple file upload feature, otherwise you will get database errors.

