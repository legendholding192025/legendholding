# Workflow Document Submission Feature

## Overview
This feature allows users to submit workflow documents through a dedicated page at `/workflow`. Users can provide a subject, message, and upload document files (PDF, DOC, DOCX, XLS, XLSX).

## Features
- **Subject & Message**: Required fields for document context
- **File Upload**: Support for PDF, DOC, DOCX, XLS, and XLSX files (max 10MB)
- **File Validation**: Automatic file type and size validation
- **Secure Storage**: Files are converted to base64 and stored securely in the database
- **Success Feedback**: Visual confirmation after successful submission
- **Responsive Design**: Works seamlessly on all devices

## Files Created

### 1. Database Migration
**File**: `supabase/migrations/20250326000000_create_workflow_submissions.sql`

Creates the `workflow_submissions` table with the following schema:
- `id` (UUID): Primary key
- `subject` (TEXT): Document subject (required)
- `message` (TEXT): Document message/description (required)
- `file_name` (TEXT): Original filename
- `file_url` (TEXT): Base64-encoded file data
- `file_type` (TEXT): MIME type of the file
- `file_size` (INTEGER): File size in bytes
- `status` (TEXT): Submission status (default: 'pending')
- `created_at` (TIMESTAMPTZ): Timestamp of creation
- `updated_at` (TIMESTAMPTZ): Timestamp of last update

### 2. API Route
**File**: `app/api/workflow/route.ts`

Provides two endpoints:
- **POST**: Submit a workflow document
  - Validates required fields (subject, message)
  - Validates file type and size
  - Converts file to base64 for storage
  - Stores submission in database
  
- **GET**: Retrieve workflow submissions (for admin)
  - Optional `status` query parameter for filtering
  - Returns submissions ordered by creation date

### 3. Frontend Page
**File**: `app/workflow/page.tsx`

Features:
- Clean, modern UI matching the site design
- Form with subject and message fields
- File upload with drag-and-drop support (visual only, click to upload)
- File preview with size display
- Real-time validation
- Loading states during submission
- Success confirmation page
- Responsive design for all screen sizes

### 4. Layout & Metadata
**File**: `app/workflow/layout.tsx`

Provides SEO metadata for the workflow page.

### 5. Admin Review Page
**File**: `app/admin/workflow-submissions/page.tsx`

Admin interface to manage workflow submissions:
- View all submissions with filtering (All, Pending, Approved, Rejected)
- Statistics dashboard showing totals
- Detailed view of each submission
- Download attached files
- Approve or reject submissions
- Delete submissions
- Export data to Excel

### 6. Updated Admin Navigation
**File**: `components/admin/dashboard-layout.tsx`

Added "Workflow Submissions" menu item to admin sidebar navigation (super admin only).

## Setup Instructions

### 1. Run Database Migration

You need to run the migration to create the `workflow_submissions` table in your Supabase database.

**Option A: Using Supabase CLI** (Recommended)
```bash
# If you have Supabase CLI installed
supabase db push
```

**Option B: Using Supabase Dashboard**
1. Go to your Supabase project dashboard
2. Navigate to SQL Editor
3. Copy the contents of `supabase/migrations/20250326000000_create_workflow_submissions.sql`
4. Paste and run the SQL query

### 2. Environment Variables

Ensure these environment variables are set in your `.env.local`:
```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
```

### 3. Start Development Server

```bash
npm run dev
# or
pnpm dev
```

### 4. Access the Page

Navigate to `http://localhost:3000/workflow` in your browser.

## Usage

### For Users
1. Visit `/workflow` page
2. Fill in the subject field (required)
3. Enter your message or description (required)
4. (Optional) Upload a document file:
   - Click the upload area to select a file
   - Supported formats: PDF, DOC, DOCX, XLS, XLSX
   - Maximum file size: 10MB
5. Click "Submit Document"
6. Receive confirmation of successful submission

### For Administrators

#### Admin Dashboard Access

1. **Login to Admin Panel**:
   - Navigate to `/admin/login`
   - Login with super admin credentials

2. **Access Workflow Submissions**:
   - Click "Workflow Submissions" in the admin sidebar
   - Or navigate to `/admin/workflow-submissions`

#### Admin Features

1. **View Submissions**:
   - See all submissions in a table format
   - View statistics (Total, Pending, Approved, Rejected)
   - Filter by status using tabs

2. **Review Submission**:
   - Click the eye icon to view full details
   - Read subject and message
   - Download attached file

3. **Approve/Reject**:
   - For pending submissions, click the green checkmark to approve
   - Click the red X to reject
   - Or use the buttons in the detail view

4. **Delete Submission**:
   - Click the trash icon to delete
   - Confirm deletion in the dialog

5. **Export Data**:
   - Click "Export to Excel" button
   - Download all submissions as Excel file

#### API Endpoints (for custom integrations)

1. **GET `/api/workflow`**: Retrieve submissions
   ```javascript
   // Get all submissions
   fetch('/api/workflow')
   
   // Get submissions by status
   fetch('/api/workflow?status=pending')
   ```

2. **PATCH `/api/workflow`**: Update submission status
   ```javascript
   fetch('/api/workflow', {
     method: 'PATCH',
     headers: { 'Content-Type': 'application/json' },
     body: JSON.stringify({ id: 'submission-id', status: 'approved' })
   })
   ```

3. **DELETE `/api/workflow?id=xxx`**: Delete submission
   ```javascript
   fetch('/api/workflow?id=submission-id', {
     method: 'DELETE'
   })
   ```

4. **Via Supabase Dashboard**: 
   - Navigate to Table Editor
   - Select `workflow_submissions` table
   - View and manage submissions

## File Storage

Files are stored as base64-encoded strings in the database. This approach:
- Eliminates the need for separate file storage configuration
- Ensures files are backed up with the database
- Works with files up to 10MB
- Maintains file integrity

To download a file from the database:
```javascript
// The file_url contains the full base64 data URL
// Example: "data:application/pdf;base64,JVBERi0xLj..."

// To download in browser:
const link = document.createElement('a');
link.href = submission.file_url;
link.download = submission.file_name;
link.click();
```

## Security

- **RLS Policies**: Row-level security is enabled
  - Public users can INSERT (submit)
  - Authenticated users can SELECT and UPDATE
- **File Validation**: Client and server-side validation
- **File Size Limit**: 10MB maximum
- **File Type Restriction**: Only document types allowed

## Customization

### Change Maximum File Size
Edit the `maxSize` variable in:
- `app/workflow/page.tsx` (line ~50)
- `app/api/workflow/route.ts` (line ~48)

### Add More File Types
Update the `allowedTypes` array in:
- `app/workflow/page.tsx` (line ~26-31)
- `app/api/workflow/route.ts` (line ~31-36)

### Modify Styling
The page uses Tailwind CSS classes. Key color scheme:
- Primary: `#5D376E` (purple)
- Accent: `#EE8900` / `#F08900` (orange)
- Matches existing site design

## Troubleshooting

### Migration Not Applied
- Ensure you have run the migration file
- Check Supabase dashboard for table existence
- Verify RLS policies are in place

### File Upload Fails
- Check file size (must be under 10MB)
- Verify file type is supported
- Check browser console for errors
- Ensure `SUPABASE_SERVICE_ROLE_KEY` is set

### API Returns 500 Error
- Check environment variables
- Verify Supabase connection
- Check server logs for detailed error messages

## Future Enhancements

Potential improvements:
- Admin dashboard to view and manage submissions
- Email notifications on new submissions
- File storage in Supabase Storage bucket (alternative to base64)
- Document preview before upload
- Bulk download of submissions
- Status tracking and updates
- User submission history page

