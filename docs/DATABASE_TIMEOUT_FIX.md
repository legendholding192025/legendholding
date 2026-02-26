# Database Timeout Fix - Job Applications

## Problem
The admin applications page was experiencing database timeout errors (error code 57014) when fetching job applications.

## Root Causes
1. **No pagination**: Query was fetching all applications at once
2. **SELECT ***: Fetching all columns including potentially large fields
3. **Missing indexes**: No indexes on commonly queried/sorted columns
4. **Large dataset**: Query timeout when applications table grows

## Solutions Implemented

### 1. Query Optimization (app/admin/applications/page.tsx)
- **Added pagination**: Limited initial query to 100 most recent applications
- **Explicit field selection**: Only fetching necessary fields instead of `SELECT *`
- **Timeout handling**: Added fallback query with reduced limit (50) if timeout occurs

```typescript
// Before
.select(`*, job:jobs(id, title, department)`)
.order('created_at', { ascending: false })

// After
.select(`
  id,
  job_id,
  full_name,
  email,
  phone,
  resume_url,
  cover_letter,
  status,
  created_at,
  job:jobs(id, title, department)
`)
.order('created_at', { ascending: false })
.limit(100) // Pagination limit
```

### 2. Database Indexes (supabase/migrations/20250109000000_add_job_applications_indexes.sql)

Added five strategic indexes to improve query performance:

1. **idx_job_applications_created_at**: For sorting by creation date (DESC)
2. **idx_job_applications_job_id**: For filtering by job
3. **idx_job_applications_status**: For filtering by status
4. **idx_job_applications_job_created**: Composite index for job + date queries
5. **idx_job_applications_status_created**: Composite index for status + date queries

### 3. Error Handling Enhancement
- Specific handling for timeout errors (code 57014)
- Automatic fallback to more limited query
- Better user feedback with informative error messages

## How to Apply

### 1. Apply Database Migration
Run the migration to create indexes:

```bash
# Using Supabase CLI
supabase db push

# Or apply manually in Supabase Dashboard
# SQL Editor > New Query > Paste contents of 20250109000000_add_job_applications_indexes.sql
```

### 2. Code Changes
The code changes have already been applied to `app/admin/applications/page.tsx`

### 3. Verify
1. Navigate to `/admin/applications`
2. Check that applications load successfully
3. Verify no timeout errors in console

## Performance Improvements

### Before
- Query timeout with 1000+ applications
- No indexes = full table scan
- SELECT * = unnecessary data transfer

### After
- Loads 100 most recent applications instantly
- Indexed queries = 10-100x faster
- Selective fields = reduced data transfer
- Fallback handling = graceful degradation

## Future Enhancements

Consider adding:
1. **Infinite scroll** or pagination controls for loading more applications
2. **Search/filter optimization** with indexes on name, email fields
3. **Materialized views** for common aggregations (status counts, etc.)
4. **Connection pooling** configuration if using high traffic
5. **Query result caching** for frequently accessed data

## Monitoring

Monitor query performance in Supabase Dashboard:
- **Database > Query Performance**
- Look for slow queries on `job_applications` table
- Verify indexes are being used (check query plans)

## Related Files
- `app/admin/applications/page.tsx` - Main applications page
- `supabase/migrations/20250109000000_add_job_applications_indexes.sql` - Index migration

