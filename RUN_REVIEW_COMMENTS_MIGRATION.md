# Database Migration Required: Review Comments

## ⚠️ Important: Run This Migration

A new migration has been created to store review comments from each approval stage.

### Migration File
`supabase/migrations/20250327000003_add_review_comments.sql`

### What It Does
- Adds `finance_comment` column (TEXT) to store Finance review comments
- Adds `cofounder_comment` column (TEXT) to store Co-Founder review comments
- Adds `founder_comment` column (TEXT) to store Founder review comments
- Creates index for better query performance

### How to Run

#### Option 1: Using Supabase CLI (Recommended)
```bash
npx supabase db push
```

#### Option 2: Manual SQL Execution
1. Go to your Supabase Dashboard
2. Navigate to **SQL Editor**
3. Copy and paste the contents of `supabase/migrations/20250327000003_add_review_comments.sql`
4. Click **Run**

### Migration SQL
```sql
-- Add comment columns for each review stage
ALTER TABLE workflow_submissions
ADD COLUMN finance_comment TEXT,
ADD COLUMN cofounder_comment TEXT,
ADD COLUMN founder_comment TEXT;

-- Add index for better query performance
CREATE INDEX IF NOT EXISTS idx_workflow_submissions_finance_comment ON workflow_submissions(finance_comment);

-- Update table comment
COMMENT ON COLUMN workflow_submissions.finance_comment IS 'Review comment from finance reviewer';
COMMENT ON COLUMN workflow_submissions.cofounder_comment IS 'Review comment from co-founder reviewer';
COMMENT ON COLUMN workflow_submissions.founder_comment IS 'Review comment from founder reviewer';
```

## ✅ After Running Migration

The workflow approval system now supports comment tracking:

### 1. **Comment Requirements**
- ✅ All reviewers MUST add a comment before approving or rejecting
- ✅ Comments are validated (cannot be empty)
- ✅ Comments are stored in the database for audit trail

### 2. **Comment Visibility**

#### Finance Review (`/finance-review`)
- Adds their own comment when approving/rejecting
- Comments are saved to `finance_comment` column

#### Co-Founder Approval (`/co-founder-approval`)
- **Sees Finance comment** in a blue callout box
- Adds their own comment when approving/rejecting
- Comments are saved to `cofounder_comment` column

#### Founder Approval (`/founder-approval`)
- **Sees Finance comment** in a blue callout box
- **Sees Co-Founder comment** in a purple callout box
- Adds their own comment when approving/rejecting
- Comments are saved to `founder_comment` column

#### Workflow Submissions (`/workflow-submissions`)
- **Shows all comments** from all reviewers
- Finance comment in blue
- Co-Founder comment in purple
- Founder comment in amber/gold

### 3. **Comment Display Format**

```
┌──────────────────────────────────────────────┐
│  💼 Finance Review Comment                   │
│  ────────────────────────────────────────    │
│  Approved after reviewing all documents.     │
│  Budget allocation is within limits.         │
│                                              │
│  Reviewed on 11/27/2025, 3:45 PM            │
└──────────────────────────────────────────────┘

┌──────────────────────────────────────────────┐
│  🛡️ Co-Founder Review Comment                │
│  ────────────────────────────────────────    │
│  Verified compliance with company policies.  │
│  Ready for founder approval.                 │
│                                              │
│  Reviewed on 11/27/2025, 4:30 PM            │
└──────────────────────────────────────────────┘
```

### 4. **Benefits**

✅ **Transparency**: All reviewers can see previous comments  
✅ **Accountability**: Comments are tracked with timestamps  
✅ **Context**: Next reviewer knows why it was approved  
✅ **Audit Trail**: Complete review history for compliance  
✅ **Better Decisions**: Informed decisions based on previous reviews  

### 5. **API Changes**

The API now accepts and saves comments:

```javascript
PATCH /api/workflow
{
  "id": "submission-id",
  "status": "finance_approved",
  "reviewer": "finance",
  "comment": "Approved after budget verification"
}
```

---

**Note**: Make sure to run this migration before testing the review comment feature, otherwise you will get database errors when trying to save comments.

