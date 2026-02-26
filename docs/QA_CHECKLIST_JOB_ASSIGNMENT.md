# QA Checklist: Job Assignment Feature

## Pre-Production QA Checklist

### Database Migration
Run this migration in Supabase SQL Editor before testing:
- File: `supabase/migrations/20250127000009_add_job_assignment.sql`

**Migration includes:**
- [x] Add `assigned_to` column to jobs table
- [x] Create index for performance
- [x] Update RLS policies for jobs
- [x] Update RLS policies for job_applications

---

### Test Cases

#### 1. Super Admin - Assign Job
- [ ] Log in as super admin
- [ ] Go to Jobs Management
- [ ] Verify "Assigned To" column is visible
- [ ] Click assign icon (person with plus) on a job
- [ ] Verify dropdown shows all admin users (excluding admin@legendx.com)
- [ ] Select an admin from the dropdown
- [ ] Click "Assign Job"
- [ ] Verify success toast message
- [ ] Verify "Assigned To" column shows the assigned admin's email

#### 2. Super Admin - Unassign Job
- [ ] Click assign icon on a previously assigned job
- [ ] Verify "Unassign" option appears in dropdown
- [ ] Select "Unassign"
- [ ] Click "Assign Job"
- [ ] Verify success toast: "Job unassigned successfully"
- [ ] Verify "Assigned To" column shows "Not assigned"

#### 3. Admin - View Assigned Jobs
- [ ] Log in as an admin user
- [ ] Go to Jobs Management
- [ ] Verify assigned jobs appear in the list
- [ ] Verify jobs created by this admin also appear
- [ ] Verify admin cannot see "Assigned To" column (super admin only)
- [ ] Verify admin cannot see assign icon

#### 4. Admin - View Assigned Job Applications
- [ ] Go to Job Applications
- [ ] Verify applications for assigned jobs appear
- [ ] Verify applications for own created jobs appear
- [ ] Verify job filter dropdown includes assigned jobs
- [ ] Verify status counts include applications from assigned jobs

#### 5. Admin - After Unassignment
- [ ] Super admin unassigns a job from the admin
- [ ] Admin refreshes Jobs Management page
- [ ] Verify unassigned job no longer appears (unless they created it)
- [ ] Admin refreshes Job Applications page
- [ ] Verify applications for unassigned job no longer appear

#### 6. Edge Cases
- [ ] Assign same job to different admin - verify previous assignment is replaced
- [ ] Admin with no jobs (created or assigned) - verify empty state message
- [ ] Super admin assigns job they created - verify it works
- [ ] Verify pagination works with assigned jobs included

---

### Performance Checks
- [ ] Jobs Management loads within 3 seconds
- [ ] Job Applications loads within 3 seconds
- [ ] Assign dialog opens quickly
- [ ] No query timeout errors

---

### Console Checks
Open browser DevTools (F12) and check:
- [ ] No JavaScript errors
- [ ] No React warnings
- [ ] No failed network requests
- [ ] Minimal console.log output

---

### Users to Test With

**Super Admin:**
- waseem.k@legendholding.com

**Admin Users:**
- farheen.nishat@legendmotorsuae.com
- isha.gattani@legendholding.com
- maricris.layagan@legendinvestment.com

---

### Sign-off

- [ ] All test cases passed
- [ ] Database migration applied successfully
- [ ] No console errors
- [ ] Performance acceptable
- [ ] Ready for production deployment

**Reviewed by:** ________________
**Date:** ________________
