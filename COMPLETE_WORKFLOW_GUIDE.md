# Complete Three-Stage Workflow Approval System

## Overview
A comprehensive three-stage approval workflow for document submissions at Legend Holding Group. Documents must pass through Finance → Co-Founder → Founder approval before being finalized.

## Workflow Diagram

```
┌─────────────────┐
│   User          │
│   Submits       │ → /workflow
│   Document      │
└────────┬────────┘
         │
         │ status: 'pending'
         ▼
┌─────────────────────────────┐
│   STAGE 1: Finance Review   │ → /finance-review
└─────────────┬───────────────┘
              │
         ┌────┴────┐
         │         │
         ▼         ▼
     REJECT     APPROVE
         │         │
         │         │ status: 'finance_approved'
         │         ▼
         │    ┌─────────────────────────────┐
         │    │   STAGE 2: Co-Founder       │ → /co-founder-approval
         │    └─────────────┬───────────────┘
         │                  │
         │             ┌────┴────┐
         │             │         │
         │             ▼         ▼
         │         REJECT     APPROVE
         │             │         │
         │             │         │ status: 'cofounder_approved'
         │             │         ▼
         │             │    ┌─────────────────────────────┐
         │             │    │   STAGE 3: Founder          │ → /founder-approval
         │             │    │   (Final Authority)         │
         │             │    └─────────────┬───────────────┘
         │             │                  │
         │             │             ┌────┴────┐
         │             │             │         │
         │             │             ▼         ▼
         │             │         REJECT     APPROVE
         │             │             │         │
         └─────────────┴─────────────┴─────────┤
                                               │ status: 'approved'
                                               ▼
                                            COMPLETE ✓
```

## Status Flow

| Status | Description | Location | Next Action |
|--------|-------------|----------|-------------|
| `pending` | Initial submission | Finance Review | Finance approve/reject |
| `finance_rejected` | Rejected by finance | All (completed) | WORKFLOW ENDS |
| `finance_approved` | Approved by finance | Co-Founder Approval | Co-Founder approve/reject |
| `cofounder_rejected` | Rejected by co-founder | All (completed) | WORKFLOW ENDS |
| `cofounder_approved` | Approved by co-founder | Founder Approval | Founder approve/reject |
| `founder_rejected` | Rejected by founder | All (completed) | WORKFLOW ENDS |
| `approved` | **Final approval by founder** | All (completed) | WORKFLOW COMPLETE ✓ |

## Pages Overview

### 1. Document Submission (`/workflow`)
**Purpose**: Public form for document submission

**Status**: Creates submission with `pending`

**Features**:
- Subject (required)
- Message (required)
- File upload (optional - PDF, DOC, DOCX, XLS, XLSX, max 10MB)
- Success confirmation
- File validation

**Access**: Public (no login required)

---

### 2. Finance Review (`/finance-review`)
**Purpose**: First approval stage - Finance team reviews

**Views**: 
- Submissions with status: `pending`
- Previously reviewed: `finance_approved`, `finance_rejected`

**Actions**:
- **Approve** → Status: `finance_approved` → Sends to Co-Founder
- **Reject** → Status: `finance_rejected` → Workflow ends

**Message on Approve**: "Approved and sent to co-founder for final approval"

**Features**:
- 3 statistics cards (Total, Pending, Reviewed)
- View details modal
- File download
- One-click actions

---

### 3. Co-Founder Approval (`/co-founder-approval`)
**Purpose**: Second approval stage - Co-Founder reviews finance-approved items

**Views**:
- Submissions with status: `finance_approved`
- Previously reviewed: `cofounder_approved`, `cofounder_rejected`, `approved`, `founder_rejected`

**Actions**:
- **Approve** → Status: `cofounder_approved` → Sends to Founder
- **Reject** → Status: `cofounder_rejected` → Workflow ends

**Message on Approve**: "Approved and sent to founder for final approval"

**Features**:
- Shield icon indicating authority
- Finance approval timestamp
- "Finance Approved ✓" badge
- 3 statistics cards
- View details with approval history

---

### 4. Founder Approval (`/founder-approval`) ⭐ NEW
**Purpose**: Final approval stage - Founder provides ultimate authority

**Views**:
- Submissions with status: `cofounder_approved`
- Previously reviewed: `approved`, `founder_rejected`

**Actions**:
- **Approve** → Status: `approved` → Workflow complete ✓
- **Reject** → Status: `founder_rejected` → Workflow ends

**Message on Approve**: "Submission fully approved! Workflow complete."

**Features**:
- Crown icon indicating final authority
- Shows Finance AND Co-Founder approval timestamps
- "✓ Finance" and "✓ Co-Founder" badges
- 3 statistics cards with border accents
- Final approval authority messaging

---

### 5. All Submissions View (`/workflow-submissions`)
**Purpose**: Complete oversight of all workflow stages

**Views**: All submissions across all statuses

**Features**:
- 6 statistics cards:
  - Total
  - Pending Finance
  - Awaiting Co-Founder
  - Awaiting Founder
  - Approved
  - Rejected
- 6 filter tabs matching stats
- Complete audit trail
- Export to Excel
- Delete submissions
- View all review timestamps

**Access**: Public (no login required)

---

## Database Schema

```sql
CREATE TABLE workflow_submissions (
  id UUID PRIMARY KEY,
  subject TEXT NOT NULL,
  message TEXT NOT NULL,
  file_name TEXT,
  file_url TEXT,                     -- Base64 encoded file
  file_type TEXT,
  file_size INTEGER,
  status TEXT DEFAULT 'pending',
  finance_reviewed_at TIMESTAMPTZ,   -- Finance decision timestamp
  cofounder_reviewed_at TIMESTAMPTZ, -- Co-Founder decision timestamp  
  founder_reviewed_at TIMESTAMPTZ,   -- Founder decision timestamp (final)
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
```

## API Endpoints

### POST `/api/workflow`
Submit new document

**Request**: FormData with subject, message, file (optional)

**Response**: Creates submission with status `pending`

---

### GET `/api/workflow`
Retrieve submissions

**Query**: `?status=pending` (optional filter)

**Response**: Array of submissions

---

### PATCH `/api/workflow`
Update submission status

**Request**:
```json
{
  "id": "submission-uuid",
  "status": "finance_approved",
  "reviewer": "finance" // "finance", "cofounder", or "founder"
}
```

**Valid Transitions**:
- **Finance**: `pending` → `finance_approved` or `finance_rejected`
- **Co-Founder**: `finance_approved` → `cofounder_approved` or `cofounder_rejected`
- **Founder**: `cofounder_approved` → `approved` or `founder_rejected`

**Auto-timestamps**: Sets appropriate `*_reviewed_at` field based on reviewer

---

### DELETE `/api/workflow?id=xxx`
Delete submission (admin only)

---

## Complete Workflow Example

### Successful Approval Path

1. **User** submits document
   - Status: `pending`
   - Visible: Finance Review

2. **Finance** approves
   - Status: `finance_approved`
   - Timestamp: `finance_reviewed_at`
   - Visible: Co-Founder Approval
   - Notification: "Sent to Co-Founder"

3. **Co-Founder** approves
   - Status: `cofounder_approved`
   - Timestamp: `cofounder_reviewed_at`
   - Visible: Founder Approval
   - Notification: "Sent to Founder"

4. **Founder** approves
   - Status: `approved`
   - Timestamp: `founder_reviewed_at`
   - Notification: "Fully approved! Workflow complete ✓"
   - **COMPLETE**

### Rejection Scenarios

**Rejected at Finance**:
- Status: `finance_rejected`
- Timestamp: `finance_reviewed_at`
- Workflow ENDS

**Rejected at Co-Founder**:
- Status: `cofounder_rejected`
- Timestamp: `cofounder_reviewed_at`
- Workflow ENDS

**Rejected at Founder**:
- Status: `founder_rejected`
- Timestamp: `founder_reviewed_at`
- Workflow ENDS

---

## Setup Instructions

### 1. Run Database Migration

**Option A - Supabase Dashboard**:
1. Navigate to SQL Editor
2. Open `supabase/migrations/20250326000000_create_workflow_submissions.sql`
3. Copy and run the entire migration

**Option B - Supabase CLI**:
```bash
supabase db push
```

### 2. Environment Variables

Ensure these exist in `.env.local`:
```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_key
```

### 3. Test Complete Workflow

1. Submit: `http://localhost:3000/workflow`
2. Finance Review: `http://localhost:3000/finance-review` → Approve
3. Co-Founder Review: `http://localhost:3000/co-founder-approval` → Approve
4. Founder Review: `http://localhost:3000/founder-approval` → Final Approve
5. Verify: `http://localhost:3000/admin/workflow-submissions`

---

## Access URLs

| Page | URL | Access |
|------|-----|--------|
| Submit | `/workflow` | Public |
| Finance | `/finance-review` | Finance Team |
| Co-Founder | `/co-founder-approval` | Co-Founder |
| Founder | `/founder-approval` | Founder |
| All Submissions | `/workflow-submissions` | Public |

---

## Visual Design

### Icon System
- 📄 **FileText**: General documents
- 🛡️ **Shield**: Co-Founder authority
- 👑 **Crown**: Founder ultimate authority
- ✓ **CheckCircle**: Approvals
- ✗ **XCircle**: Rejections

### Color Scheme
- **Yellow**: Pending review
- **Blue**: Awaiting next stage
- **Green**: Approved
- **Red**: Rejected
- **Purple** (Founder): Final authority indicator

### Status Badges
- Pending Finance: Yellow
- Awaiting Co-Founder: Blue
- Awaiting Founder: Blue/Purple
- Fully Approved: Green with ✓
- Rejected: Red

---

## Security & Access Control

### Current Implementation
- **Public submission**: Anyone can submit
- **Review pages**: No authentication (URL-based)
- **Admin panel**: Requires super admin login

### Recommended Enhancements

1. **Add Role-Based Authentication**:
```typescript
// Protect finance-review
if (user.role !== 'finance') redirect('/unauthorized')

// Protect co-founder-approval
if (user.role !== 'cofounder') redirect('/unauthorized')

// Protect founder-approval
if (user.role !== 'founder') redirect('/unauthorized')
```

2. **Email Notifications**:
- Finance team when submission arrives
- Co-Founder when finance approves
- Founder when co-founder approves
- Submitter on final decision

3. **Audit Trail**:
- Log reviewer identity
- IP addresses
- Decision reasons/comments

---

## Benefits

### For Finance Team
- First line of review
- Filter out inappropriate submissions
- Quick approve/reject workflow
- File download for detailed review

### For Co-Founder
- Pre-screened by finance
- Shield authority level
- Can see finance approval timestamp
- Review only vetted submissions

### For Founder
- Ultimate approval authority
- Crown icon signifies final decision
- Complete approval history visible
- Only reviews twice-approved items
- Final quality gate

### For Organization
- Three-tier quality control
- Clear approval chain
- Complete audit trail
- Timestamps for all decisions
- Rejection at any stage ends workflow
- Only best submissions reach founder

---

## Statistics & Reporting

### Finance Dashboard
- Total submissions
- Pending review
- Previously reviewed

### Co-Founder Dashboard
- Awaiting approval (from finance)
- Sent to founder
- Rejected

### Founder Dashboard
- Awaiting final approval (from co-founder)
- Fully approved (by founder)
- Rejected (by founder)

### Admin Dashboard
- Complete overview
- 6 stage statistics
- Filter by any status
- Export capabilities
- Full audit trail

---

## Customization Options

### Add Comments/Notes
Update schema to include decision reasons:
```sql
ALTER TABLE workflow_submissions 
ADD COLUMN finance_comment TEXT,
ADD COLUMN cofounder_comment TEXT,
ADD COLUMN founder_comment TEXT;
```

### Add More Approval Stages
To add additional stages (e.g., CFO):
1. Add new status values
2. Add timestamp field
3. Create new review page
4. Update API validations
5. Update admin dashboard

### Change Reviewer Titles
Easily rename "Co-Founder" to "VP", "Director", etc. in page titles and messaging.

---

## Troubleshooting

### Document Not Appearing
- Check database connection
- Verify status matches page filter
- Check RLS policies

### Approval Not Working
- Verify status transition logic
- Check reviewer parameter
- Validate status values

### Wrong Stage Visible
- Check status filter in page
- Verify API response
- Review query logic

---

## Files Reference

| File | Purpose |
|------|---------|
| `app/workflow/page.tsx` | Submission form |
| `app/finance-review/page.tsx` | Stage 1 - Finance |
| `app/co-founder-approval/page.tsx` | Stage 2 - Co-Founder |
| `app/founder-approval/page.tsx` | Stage 3 - Founder (Final) |
| `app/admin/workflow-submissions/page.tsx` | Admin oversight |
| `app/api/workflow/route.ts` | API endpoints |
| `supabase/migrations/20250326000000_create_workflow_submissions.sql` | Database |

---

## Success Metrics

### Approval Rate
- % reaching finance_approved
- % reaching cofounder_approved
- % reaching final approved
- Rejection rate at each stage

### Processing Time
- Average time at each stage
- Total workflow duration
- Bottleneck identification

### Volume
- Submissions per day/week
- Stage completion rates
- Final approval rates

---

## Support

For implementation help:
1. Review this complete guide
2. Check API endpoint logs
3. Verify database schema
4. Test status transitions
5. Review browser console for errors

---

## Summary

**Three-Stage Workflow**: Finance → Co-Founder → Founder

**Seven Possible Status Values**:
1. `pending` - Awaiting finance
2. `finance_rejected` - Rejected at stage 1
3. `finance_approved` - Passed stage 1
4. `cofounder_rejected` - Rejected at stage 2
5. `cofounder_approved` - Passed stage 2
6. `founder_rejected` - Rejected at stage 3 (final)
7. `approved` - **FULLY APPROVED** ✓

**Quality Gates**: Three levels of review ensure only the best submissions receive final approval.

**Complete Audit Trail**: All decisions timestamped and tracked.

**Ultimate Authority**: Founder has final say with crown icon and special messaging.

