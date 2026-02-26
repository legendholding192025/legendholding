# QA Checklist: Admin User Management System

## Pre-Production QA Checklist

### ✅ Step 1: Database Verification
Run the SQL verification script: `supabase/migrations/20250127000006_qa_verification.sql`

**Expected Results:**
- [ ] All 3 users exist in `auth.users` table
- [ ] All 3 users have entries in `user_roles` table
- [ ] All users have `role = 'admin'`
- [ ] All users have correct permissions JSON
- [ ] Trigger `trigger_auto_add_user_role` is active

**Users to verify:**
1. `farheen.nishat@legendmotorsuae.com`
2. `isha.gattani@legendholding.com`
3. `maricris.layagan@legendinvestment.com`

---

### ✅ Step 2: Login Testing

**Test each user login:**

1. **farheen.nishat@legendmotorsuae.com**
   - [ ] Can log in successfully
   - [ ] Redirects to `/admin/dashboard`
   - [ ] No console errors
   - [ ] Session persists on page refresh

2. **isha.gattani@legendholding.com**
   - [ ] Can log in successfully
   - [ ] Redirects to `/admin/dashboard`
   - [ ] No console errors
   - [ ] Session persists on page refresh

3. **maricris.layagan@legendinvestment.com**
   - [ ] Can log in successfully
   - [ ] Redirects to `/admin/dashboard`
   - [ ] No console errors
   - [ ] Session persists on page refresh

---

### ✅ Step 3: Permissions & Access Control

**For each admin user, verify:**

- [ ] **Dashboard Access**
  - [ ] Can access `/admin/dashboard`
  - [ ] Dashboard loads without errors
  - [ ] User role is displayed correctly (should show "Admin" not "Super Admin")

- [ ] **Jobs Management**
  - [ ] Can access `/admin/jobs`
  - [ ] Can create new jobs
  - [ ] Can edit own jobs
  - [ ] Can see only their own jobs (not other admins' jobs)
  - [ ] Cannot see super admin's jobs

- [ ] **Job Applications**
  - [ ] Can access `/admin/applications`
  - [ ] Can see applications for their own jobs
  - [ ] Cannot see applications for other admins' jobs
  - [ ] Can filter by job and status
  - [ ] Can update application status
  - [ ] Can download resumes

- [ ] **Restricted Access (Should NOT have access)**
  - [ ] Cannot access `/admin/submissions` (should not see in menu)
  - [ ] Cannot access `/admin/news` (should not see in menu)
  - [ ] Cannot access `/admin/newsletters` (should not see in menu)
  - [ ] Cannot access `/admin/customer-care` (should not see in menu)

---

### ✅ Step 4: Super Admin Verification

**Test with super admin account (`waseem.k@legendholding.com`):**

- [ ] Super admin can see all jobs (from all admins)
- [ ] Super admin can see all job applications
- [ ] Super admin has access to all menu items
- [ ] Super admin badge is displayed in sidebar

---

### ✅ Step 5: Trigger Functionality

**Test automatic role assignment:**

1. **Create a new test user in Supabase Dashboard:**
   - [ ] Go to Authentication → Users → Add User
   - [ ] Create user with email: `test.admin@legendholding.com`
   - [ ] User creation succeeds (no errors)
   - [ ] Check `user_roles` table - role should be automatically added
   - [ ] Role should be `admin` (not super_admin)
   - [ ] Permissions should be: `{"dashboard": true, "jobs": true, "applications": true}`

2. **Clean up test user:**
   - [ ] Delete test user from `auth.users`
   - [ ] Verify cascade delete removes from `user_roles`

---

### ✅ Step 6: Error Handling & Edge Cases

- [ ] **Invalid Login:**
  - [ ] Wrong password shows error message
  - [ ] Non-existent email shows error message
  - [ ] Error messages are user-friendly

- [ ] **Session Management:**
  - [ ] Logout works correctly
  - [ ] After logout, cannot access admin routes
  - [ ] Redirects to login page when session expires

- [ ] **Middleware Protection:**
  - [ ] Unauthenticated users redirected to login
  - [ ] Authenticated users redirected from login to dashboard
  - [ ] Direct URL access to protected routes requires authentication

---

### ✅ Step 7: Performance & Console Checks

**Open browser DevTools Console and check:**

- [ ] No JavaScript errors
- [ ] No React warnings
- [ ] No network errors (404s, 500s)
- [ ] No excessive console.log statements (should be minimal in production)
- [ ] Page load times are acceptable (< 3 seconds)

**Check Network Tab:**
- [ ] API calls complete successfully
- [ ] No failed requests to Supabase
- [ ] No timeout errors

---

### ✅ Step 8: Data Integrity

**Verify in Supabase Dashboard:**

- [ ] All users have unique emails
- [ ] All `user_roles.user_id` match `auth.users.id`
- [ ] No orphaned records in `user_roles`
- [ ] No duplicate entries in `user_roles` (UNIQUE constraint working)

---

### ✅ Step 9: UI/UX Verification

**For each admin user:**

- [ ] Sidebar navigation works correctly
- [ ] Menu items show/hide based on permissions
- [ ] User email/name displays correctly (if shown)
- [ ] Sign out button works
- [ ] Mobile responsive design works
- [ ] Loading states display correctly
- [ ] Error messages are clear and helpful

---

### ✅ Step 10: Production Readiness

**Before pushing to production:**

- [ ] All migrations have been run
- [ ] Trigger is active and working
- [ ] No test/development data in database
- [ ] Environment variables are set correctly
- [ ] No hardcoded credentials in code
- [ ] Console.log statements removed or minimized
- [ ] Error handling is comprehensive
- [ ] All QA tests pass

---

## Quick Test Commands

### Run SQL Verification:
```sql
-- Copy and paste contents of:
-- supabase/migrations/20250127000006_qa_verification.sql
-- into Supabase SQL Editor and run
```

### Test Login URLs:
- Admin Login: `https://your-domain.com/admin/login`
- Dashboard: `https://your-domain.com/admin/dashboard`

---

## Issues Found

Document any issues found during QA:

1. **Issue:** [Description]
   - **Severity:** [Critical/High/Medium/Low]
   - **Status:** [Open/Fixed/Deferred]

---

## Sign-off

- [ ] All critical tests passed
- [ ] All high-priority tests passed
- [ ] Ready for production deployment
- [ ] Reviewed by: ________________
- [ ] Date: ________________
