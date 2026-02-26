# 🚨 URGENT: Run This Migration to Fix the Error

## Error You're Seeing
```
Could not find the 'finance_reviewed_at' column of 'workflow_submissions' in the schema cache
```

## Quick Fix

### Step 1: Copy the SQL Migration

Open the file: `supabase/migrations/20250327000000_add_review_timestamps.sql`

Copy ALL the contents.

### Step 2: Run in Supabase Dashboard

1. Go to https://supabase.com/dashboard
2. Select your project
3. Click **SQL Editor** in the left sidebar
4. Click **New Query**
5. Paste the SQL migration
6. Click **Run** button

### Step 3: Verify It Worked

After running the migration, try approving/rejecting a document in the finance-review page again. The error should be gone!

## What This Does

This migration adds three new timestamp columns to your `workflow_submissions` table:
- `finance_reviewed_at` - Records when finance reviews
- `cofounder_reviewed_at` - Records when co-founder reviews  
- `founder_reviewed_at` - Records when founder reviews

These columns are used to track the approval workflow and display approval history.

## Alternative: Use Supabase CLI

If you have Supabase CLI installed:

```bash
supabase db push
```

This will apply all pending migrations.

## After Migration

Once the migration is complete:
1. Refresh your browser
2. Go to `/finance-review`
3. Try approving or rejecting - it should work!

## Need Help?

If the error persists after running the migration:
1. Check the SQL Editor for any error messages
2. Verify the columns were added by running:
   ```sql
   SELECT column_name, data_type 
   FROM information_schema.columns 
   WHERE table_name = 'workflow_submissions';
   ```
3. You should see all three new timestamp columns listed

