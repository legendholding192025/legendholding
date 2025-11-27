# Workflow Approval System

## Overview
A complete two-stage approval workflow for document submissions at Legend Holding Group. Documents submitted through `/workflow` must be reviewed and approved by both Finance and Co-Founder teams before final approval.

## Workflow Stages

```
┌─────────────────┐
│ User Submits    │ → /workflow
│ Document        │
└────────┬────────┘
         │ status: 'pending'
         ▼
┌─────────────────┐
│ Finance Review  │ → /finance-review
│                 │
└────────┬────────┘
         │
    ┌────┴────┐
    │         │
    ▼         ▼
┌─────┐   ┌─────┐
│REJECT│   │APPROVE│
└─────┘   └───┬─┘
    │         │ status: 'finance_approved'
    │         ▼
    │    ┌─────────────────┐
    │    │ Co-Founder      │ → /co-founder-approval
    │    │ Review          │
    │    └────────┬────────┘
    │         │
    │    ┌────┴────┐
    │    │         │
    │    ▼         ▼
    │  ┌─────┐   ┌─────┐
    └─→│REJECT│   │APPROVE│
       └─────┘   └───┬─┘
                     │ status: 'approved'
                     ▼
                   DONE ✓
```

## Status Values

### 1. `pending`
- **Initial state** when user submits document
- **Visible to**: Finance Review page
- **Next actions**: Finance can approve or reject

### 2. `finance_rejected`
- **State**: Rejected by finance team
- **Workflow**: ENDS (no further approval needed)
- **Visible to**: All review pages (as completed)

### 3. `finance_approved`
- **State**: Approved by finance, awaiting co-founder
- **Visible to**: Co-Founder Approval page
- **Next actions**: Co-founder can approve or reject

### 4. `approved`
- **Final state**: Fully approved by both finance and co-founder
- **Workflow**: COMPLETE ✓
- **Visible to**: All review pages (as completed)

### 5. `cofounder_rejected`
- **State**: Rejected by co-founder after finance approval
- **Workflow**: ENDS
- **Visible to**: All review pages (as completed)

## Pages

### 1. Document Submission (`/workflow`)
**Purpose**: Public submission form for workflow documents

**Features**:
- Subject and message fields (required)
- File upload (PDF, DOC, DOCX, XLS, XLSX - max 10MB)
- Success confirmation
- Submissions start with status: `pending`

**Access**: Public (no login required)

---

### 2. Finance Review (`/finance-review`)
**Purpose**: Finance team reviews and approves/rejects submissions

**What They See**:
- Submissions with status: `pending`
- Previously reviewed items (`finance_approved`, `finance_rejected`)

**Actions**:
- **Approve** → Changes status to `finance_approved` → Sends to co-founder
- **Reject** → Changes status to `finance_rejected` → Workflow ends

**Features**:
- Dashboard statistics
- View submission details
- Download attached files
- One-click approve/reject
- Toast notifications

**Access**: Finance team (no authentication required in current setup)

---

### 3. Co-Founder Approval (`/co-founder-approval`)
**Purpose**: Co-founder provides final approval for finance-approved documents

**What They See**:
- Submissions with status: `finance_approved` (awaiting approval)
- Previously reviewed items (`approved`, `cofounder_rejected`)
- Finance approval timestamp

**Actions**:
- **Approve** → Changes status to `approved` → Workflow complete ✓
- **Reject** → Changes status to `cofounder_rejected` → Workflow ends

**Features**:
- Dashboard statistics
- View submission details with finance approval info
- Download attached files
- Shield icon indicating final approval authority
- One-click approve/reject

**Access**: Co-founder (no authentication required in current setup)

---

### 4. All Submissions View (`/workflow-submissions`)
**Purpose**: Super admin view of all submissions across all stages

**Features**:
- View all submissions (all statuses)
- Filter by status tabs
- Export to Excel
- Delete submissions
- Full audit trail
- Statistics dashboard

**Access**: Public (no login required)

## Database Schema

### Table: `workflow_submissions`

```sql
CREATE TABLE workflow_submissions (
  id UUID PRIMARY KEY,
  subject TEXT NOT NULL,
  message TEXT NOT NULL,
  file_name TEXT,
  file_url TEXT,                    -- Base64 encoded file
  file_type TEXT,
  file_size INTEGER,
  status TEXT DEFAULT 'pending',
  finance_reviewed_at TIMESTAMPTZ,   -- Timestamp of finance review
  cofounder_reviewed_at TIMESTAMPTZ, -- Timestamp of co-founder review
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
```

## API Endpoints

### POST `/api/workflow`
Submit a new workflow document

**Request**:
```javascript
const formData = new FormData()
formData.append('subject', 'Document Subject')
formData.append('message', 'Document message')
formData.append('file', fileObject) // optional
```

**Response**:
```json
{
  "message": "Workflow document submitted successfully",
  "data": { /* submission object */ }
}
```

---

### GET `/api/workflow`
Retrieve all workflow submissions

**Query Parameters**:
- `status` (optional): Filter by status value

**Response**:
```json
{
  "data": [
    {
      "id": "uuid",
      "subject": "string",
      "message": "string",
      "status": "pending",
      "created_at": "timestamp",
      // ... other fields
    }
  ]
}
```

---

### PATCH `/api/workflow`
Update submission status (approve/reject)

**Request**:
```json
{
  "id": "submission-uuid",
  "status": "finance_approved",
  "reviewer": "finance" // or "cofounder"
}
```

**Valid Status Transitions**:
- Finance: `pending` → `finance_approved` or `finance_rejected`
- Co-founder: `finance_approved` → `approved` or `cofounder_rejected`

**Response**:
```json
{
  "message": "Workflow submission updated successfully",
  "data": { /* updated submission */ }
}
```

---

### DELETE `/api/workflow?id=xxx`
Delete a submission (admin only)

**Response**:
```json
{
  "message": "Workflow submission deleted successfully"
}
```

## Usage Examples

### Finance Team Workflow

1. Access `/finance-review`
2. See pending submissions
3. Click "View Details" to review
4. Download and review attached file
5. Decision:
   - **Approve**: Document goes to co-founder
   - **Reject**: Workflow ends

### Co-Founder Workflow

1. Access `/co-founder-approval`
2. See finance-approved submissions
3. Review submission with finance approval timestamp
4. Download and review attached file
5. Final decision:
   - **Approve**: Document fully approved ✓
   - **Reject**: Document rejected

### Admin Monitoring

1. Login to admin panel
2. Navigate to "Workflow Submissions"
3. View all submissions across all stages
4. Export data to Excel
5. Monitor approval bottlenecks
6. Delete obsolete submissions

## Setup Instructions

### 1. Run Database Migration

```bash
# Using Supabase Dashboard:
# 1. Go to SQL Editor
# 2. Copy contents of: supabase/migrations/20250326000000_create_workflow_submissions.sql
# 3. Run the query

# Or using Supabase CLI:
supabase db push
```

### 2. Verify Environment Variables

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_key
```

### 3. Test the Workflow

1. Submit test document at `/workflow`
2. Review at `/finance-review` → Approve
3. Final approval at `/co-founder-approval`
4. Verify in admin panel at `/admin/workflow-submissions`

## Security Considerations

### Current Setup
- **Public submission**: Anyone can submit documents
- **Review pages**: No authentication (URL-based access)
- **Admin panel**: Requires super admin login

### Recommended Additions

1. **Add Authentication**:
```typescript
// Example for finance-review
useEffect(() => {
  const checkAuth = async () => {
    const { data: { session } } = await supabase.auth.getSession()
    if (!session || session.user.role !== 'finance') {
      redirect('/login')
    }
  }
  checkAuth()
}, [])
```

2. **Email Notifications**:
- Notify finance when new submission arrives
- Notify co-founder when finance approves
- Notify submitter of final decision

3. **Audit Logging**:
- Log who approved/rejected
- Track IP addresses
- Record decision timestamps

## Benefits

### For Users
- Simple submission process
- Clear workflow stages
- File attachment support
- Success confirmations

### For Finance Team
- Dedicated review interface
- Quick approve/reject actions
- File download capability
- Clear pending queue

### For Co-Founder
- Final approval authority
- See finance team's decisions
- Review only pre-approved items
- Shield against low-quality submissions

### For Administrators
- Complete oversight
- Export capabilities
- Statistics and analytics
- Management tools

## Customization

### Change Approval Stages

To add/modify stages, update:
1. Status values in migration
2. API validation in `route.ts`
3. Create new review pages
4. Update workflow logic

### Add Email Notifications

```typescript
// In API route after status update
if (status === 'finance_approved') {
  await sendEmail({
    to: 'cofounder@company.com',
    subject: 'New Document Awaiting Your Approval',
    body: `Document "${subject}" has been approved by finance...`
  })
}
```

### Add Comments/Notes

Update schema:
```sql
ALTER TABLE workflow_submissions 
ADD COLUMN finance_comment TEXT,
ADD COLUMN cofounder_comment TEXT;
```

## Troubleshooting

### Submissions not appearing
- Check database connection
- Verify RLS policies
- Check status filter logic

### Approval not working
- Check API endpoint logs
- Verify status transition logic
- Confirm reviewer parameter

### Files not downloading
- Check base64 encoding
- Verify file size limits
- Test in different browsers

## Files Reference

- `app/workflow/page.tsx` - Submission form
- `app/finance-review/page.tsx` - Finance review
- `app/co-founder-approval/page.tsx` - Co-founder approval
- `app/workflow-submissions/page.tsx` - All submissions view
- `app/api/workflow/route.ts` - API endpoints
- `supabase/migrations/20250326000000_create_workflow_submissions.sql` - Database

## Support

For questions or issues:
1. Check this documentation
2. Review API logs
3. Check database policies
4. Verify environment variables

