# Customer Care Complaint System - Complete Documentation

**Version:** 1.0  
**Last Updated:** March 2025  
**Status:** Production Ready

---

## Table of Contents

1. [System Overview](#system-overview)
2. [Architecture](#architecture)
3. [Database Schema](#database-schema)
4. [User Roles & Access](#user-roles--access)
5. [User Flows](#user-flows)
6. [API Endpoints](#api-endpoints)
7. [Email System](#email-system)
8. [Reminder & Escalation System](#reminder--escalation-system)
9. [Setup & Configuration](#setup--configuration)
10. [Deployment](#deployment)
11. [Troubleshooting](#troubleshooting)
12. [Maintenance](#maintenance)

---

## System Overview

The Customer Care Complaint System is a comprehensive solution for managing customer complaints across multiple companies under the Legend Holding Group. The system enables:

- **Customers** to submit complaints through a public form
- **Companies** to review, respond to, and resolve complaints via a password-protected dashboard
- **Admins** to monitor and manage all complaints across all companies
- **Automated reminders** and **escalations** to ensure timely resolution

### Key Features

- ✅ Public complaint submission form
- ✅ Company-specific dashboards with authentication
- ✅ Admin dashboard for oversight
- ✅ Automated email notifications
- ✅ 48-hour reminder system
- ✅ 3-day escalation to business heads
- ✅ Status tracking and workflow management
- ✅ Outlook-compatible email templates

---

## Architecture

### Technology Stack

- **Frontend:** Next.js 15, React 19, TypeScript, Tailwind CSS
- **Backend:** Next.js API Routes
- **Database:** Supabase (PostgreSQL)
- **Email Service:** Resend
- **Authentication:** Cookie-based sessions with bcryptjs
- **Deployment:** Vercel
- **Cron Jobs:** Vercel Cron

### System Components

```
┌─────────────────┐
│  Customer Form  │
│  (Public Page)  │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  API: POST      │
│  /customer-care │
└────────┬────────┘
         │
    ┌────┴────┐
    │         │
    ▼         ▼
┌────────┐ ┌──────────────┐
│Database│ │ Email Service│
│(Supabase│ │  (Resend)    │
└────┬───┘ └──────────────┘
     │
     │
┌────┴─────────────────────┐
│   Company Dashboard       │
│   (Password Protected)    │
└────┬──────────────────────┘
     │
     │
┌────┴─────────────────────┐
│   Admin Dashboard         │
│   (Full Access)          │
└──────────────────────────┘
```

---

## Database Schema

### Table: `customer_care_complaints`

| Column | Type | Description |
|--------|------|-------------|
| `id` | UUID | Primary key (auto-generated) |
| `created_at` | TIMESTAMPTZ | Complaint submission timestamp |
| `name` | VARCHAR | Customer name |
| `email` | VARCHAR | Customer email |
| `phone` | VARCHAR | Customer phone number |
| `company` | VARCHAR | Company name (must match COMPANY_EMAIL_MAP) |
| `subject` | VARCHAR | Complaint subject |
| `message` | TEXT | Complaint message |
| `status` | VARCHAR | Current status: `pending`, `sent`, `reviewed`, `replied` |
| `resolved` | BOOLEAN | Whether complaint is resolved (default: false) |
| `admin_comment` | TEXT | Admin's internal comment |
| `company_comment` | TEXT | Company's resolution comment |
| `reviewed_at` | TIMESTAMPTZ | When company reviewed the complaint |
| `last_reminder_sent_at` | TIMESTAMPTZ | Last 48-hour reminder timestamp |
| `last_escalation_sent_at` | TIMESTAMPTZ | Last 3-day escalation timestamp |

### Table: `company_credentials`

| Column | Type | Description |
|--------|------|-------------|
| `id` | UUID | Primary key (auto-generated) |
| `company_name` | VARCHAR | Company name (must match complaint company) |
| `email` | VARCHAR | Company email (used as username) |
| `password_hash` | VARCHAR | Hashed password (bcryptjs) |
| `created_at` | TIMESTAMPTZ | Credential creation timestamp |

### Indexes

- `idx_customer_care_complaints_created_at` - For sorting by date
- `idx_customer_care_complaints_email` - For customer lookup
- `idx_customer_care_complaints_status` - For status filtering
- `idx_customer_care_complaints_resolved` - For resolved filtering
- `idx_customer_care_complaints_company` - For company filtering
- `idx_customer_care_complaints_reviewed_at` - For reminder queries
- `idx_customer_care_complaints_last_reminder_sent_at` - For duplicate prevention
- `idx_customer_care_complaints_last_escalation_sent_at` - For duplicate prevention

### Migrations

All migrations are located in `supabase/migrations/`:

1. `20250328000000_create_customer_care_complaints.sql` - Base table
2. `20250328000001_add_comment_to_customer_care.sql` - Admin comment field
3. `20250328000002_create_company_credentials.sql` - Company authentication
4. `20250328000003_add_email_to_company_credentials.sql` - Email field
5. `20250328000004_add_company_comment_to_customer_care.sql` - Company comment
6. `20250328000005_add_reviewed_at_to_customer_care.sql` - Review timestamp
7. `20250328000006_add_reminder_tracking_fields.sql` - Reminder tracking

---

## User Roles & Access

### 1. Customer (Public)
- **Access:** Public complaint form (`/customer-care`)
- **Permissions:**
  - Submit complaints
  - View success/error messages
- **No authentication required**

### 2. Company User
- **Access:** Company dashboard (`/company/dashboard`)
- **Login:** `/company/login`
- **Permissions:**
  - View only their company's complaints
  - Review complaints (auto-updates status to 'reviewed')
  - Reply to customers
  - Mark complaints as resolved with comment
- **Authentication:** Email + Password (stored in `company_credentials`)

### 3. Admin/Super Admin
- **Access:** Admin dashboard (`/admin/customer-care`)
- **Permissions:**
  - View all complaints from all companies
  - View complaint details
  - Delete complaints
  - View status flow
  - See admin and company comments
- **Authentication:** Supabase authentication (existing admin system)

---

## User Flows

### Flow 1: Customer Submits Complaint

```
1. Customer visits /customer-care
2. Fills out complaint form:
   - Name, Email, Phone
   - Company (dropdown)
   - Subject, Message
3. Submits form
4. System:
   - Validates input
   - Saves to database (status: 'sent')
   - Sends email to company immediately
   - Shows success modal to customer
5. Complaint appears in company dashboard
```

### Flow 2: Company Reviews & Responds

```
1. Company logs in at /company/login
2. Views complaint list in dashboard
3. Clicks "View" on a complaint
   → Status auto-updates to 'reviewed'
   → reviewed_at timestamp set
4. Company clicks "Reply"
5. Enters reply message
6. System:
   - Sends email to customer
   - Updates status to 'replied'
   - Sets Reply-To to company email + complaints@legendholding.com
7. Customer receives reply email
```

### Flow 3: Company Resolves Complaint

```
1. Company views replied complaint
2. Clicks "Mark as Resolved"
3. Enters resolution comment (required)
4. System:
   - Sets resolved = true
   - Saves company_comment
   - Status remains 'replied' but resolved flag shows in UI
5. Complaint shows as "Resolved" in all dashboards
```

### Flow 4: Reminder System (Automated)

```
Every 6 hours (Vercel Cron):
1. System checks for complaints needing reminders:
   - Status 'sent' + created > 48 hours ago → Send reminder
   - Status 'reviewed' + reviewed_at > 48 hours ago → Send reminder
   - Created > 3 days ago + not resolved → Escalate to business head
2. Checks last_reminder_sent_at / last_escalation_sent_at
3. If not sent in last 24 hours, sends email
4. Updates tracking timestamps
```

---

## API Endpoints

### Customer Complaint Submission

**POST** `/api/customer-care`

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "+1234567890",
  "company": "Legend Motors",
  "subject": "Issue with service",
  "message": "Detailed complaint message..."
}
```

**Response:**
```json
{
  "message": "Customer care complaint submitted successfully",
  "data": {
    "id": "uuid",
    "status": "sent",
    "created_at": "2025-03-28T10:00:00Z"
  }
}
```

**Status Codes:**
- `200` - Success
- `400` - Validation error
- `500` - Server error

---

### Company Authentication

#### Login
**POST** `/api/company-auth/login`

**Request Body:**
```json
{
  "email": "support@legendmotorsglobal.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "success": true,
  "company": {
    "id": "uuid",
    "companyName": "Legend Motors"
  }
}
```

#### Verify Session
**GET** `/api/company-auth/verify`

**Response:**
```json
{
  "authenticated": true,
  "company": {
    "id": "uuid",
    "companyName": "Legend Motors"
  }
}
```

#### Logout
**POST** `/api/company-auth/logout`

**Response:**
```json
{
  "success": true
}
```

---

### Company Complaint Actions

#### Review Complaint
**POST** `/api/company/complaints/[id]/review`

**Headers:** Cookie with `company_session`

**Response:**
```json
{
  "success": true,
  "message": "Complaint marked as reviewed"
}
```

**Side Effects:**
- Updates `status` to `'reviewed'`
- Sets `reviewed_at` timestamp

---

#### Reply to Customer
**POST** `/api/company/complaints/[id]/reply`

**Headers:** Cookie with `company_session`

**Request Body:**
```json
{
  "replyMessage": "Thank you for your complaint. We will investigate..."
}
```

**Response:**
```json
{
  "success": true,
  "message": "Reply sent successfully"
}
```

**Side Effects:**
- Sends email to customer
- Updates `status` to `'replied'`
- Email sent from `complaints@legendholding.com`
- Reply-To includes company email + `complaints@legendholding.com`

**Prerequisites:**
- Complaint status must be `'reviewed'`

---

#### Mark as Resolved
**POST** `/api/company/complaints/[id]/resolve`

**Headers:** Cookie with `company_session`

**Request Body:**
```json
{
  "companyComment": "Issue resolved. Customer satisfied."
}
```

**Response:**
```json
{
  "success": true,
  "message": "Complaint marked as resolved"
}
```

**Side Effects:**
- Sets `resolved` to `true`
- Saves `company_comment`

**Prerequisites:**
- Complaint status must be `'replied'`
- `companyComment` is required

---

### Reminder System

**GET** `/api/customer-care/send-reminders`

**Description:** Automated endpoint called by Vercel Cron every 6 hours

**Response:**
```json
{
  "message": "Reminder and escalation check completed",
  "remindersSent": 5,
  "escalationsSent": 2,
  "errors": 0,
  "details": {
    "reminders": ["uuid1", "uuid2", ...],
    "escalations": ["uuid3", "uuid4", ...],
    "errors": []
  }
}
```

**Logic:**
1. Finds complaints with status `'sent'` created > 48 hours ago
2. Finds complaints with status `'reviewed'` reviewed > 48 hours ago
3. Finds complaints created > 3 days ago and not resolved
4. Checks `last_reminder_sent_at` / `last_escalation_sent_at` (24-hour cooldown)
5. Sends appropriate emails
6. Updates tracking timestamps

---

## Email System

### Email Configuration

**File:** `lib/company-email-map.ts`

Contains mappings for:
- Company emails (where complaints are sent)
- Business head emails (for escalations)

### Email Templates

All emails use table-based layouts with inline styles for Outlook compatibility.

#### 1. Initial Complaint Notification (to Company)

**From:** `no-reply@legendholding.com`  
**To:** Company email (from `COMPANY_EMAIL_MAP`)  
**Subject:** `Customer Care Complaint - Action Required`

**Content:**
- Complaint details (customer name, email, phone, subject, message)
- Login link to company dashboard
- Note: Customer cannot reply to this email

**Template Location:** `lib/email.ts` - `sendCustomerCareComplaintEmail()`

---

#### 2. Company Reply (to Customer)

**From:** `complaints@legendholding.com`  
**To:** Customer email  
**Reply-To:** Company email + `complaints@legendholding.com`  
**Subject:** `Re: [Complaint Subject]`

**Content:**
- Personalized greeting
- Company's reply message
- Company name and signature
- Warning to CC `complaints@legendholding.com` when replying

**Template Location:** `app/api/company/complaints/[id]/reply/route.ts`

---

#### 3. 48-Hour Reminder - Not Reviewed

**From:** `complaints@legendholding.com`  
**To:** Company email  
**Subject:** `Reminder: Action Required - Customer Complaint Review`

**Content:**
- Warning that complaint is > 48 hours old
- Complaint details
- Login link
- Warning about escalation

**Template Location:** `app/api/customer-care/send-reminders/route.ts`

---

#### 4. 48-Hour Reminder - Reviewed but Not Replied

**From:** `complaints@legendholding.com`  
**To:** Company email  
**Subject:** `Urgent Reminder: Customer Complaint Requires Response`

**Content:**
- Warning that complaint was reviewed > 48 hours ago
- Complaint details
- Login link
- **Critical warning:** Will escalate to business head if not resolved

**Template Location:** `app/api/customer-care/send-reminders/route.ts`

---

#### 5. 3-Day Escalation (to Business Head)

**From:** `complaints@legendholding.com`  
**To:** Business head email (from `BUSINESS_HEAD_EMAIL_MAP`)  
**Subject:** `Urgent: Unresolved Customer Complaint - [Company Name]`

**Content:**
- Message: "Please note there is a complaint on [Company Name] that was assigned 3 days ago, and Not resolved, please let your team resolved it as soon as possible."
- Full complaint details
- Warning box

**Template Location:** `app/api/customer-care/send-reminders/route.ts`

---

## Reminder & Escalation System

### Reminder Logic

**Schedule:** Every 6 hours (Vercel Cron)  
**Endpoint:** `/api/customer-care/send-reminders`

#### 48-Hour Reminders

**Trigger Conditions:**
1. **Not Reviewed:**
   - Status = `'sent'`
   - `created_at` < 48 hours ago
   - `resolved` = false
   - `last_reminder_sent_at` is null OR > 24 hours ago

2. **Reviewed but Not Replied:**
   - Status = `'reviewed'`
   - `reviewed_at` < 48 hours ago
   - `resolved` = false
   - `last_reminder_sent_at` is null OR > 24 hours ago

**Action:** Send reminder email to company

---

#### 3-Day Escalation

**Trigger Conditions:**
- `created_at` < 3 days ago
- `resolved` = false
- `last_escalation_sent_at` is null OR > 24 hours ago

**Action:** Send escalation email to business head

---

### Duplicate Prevention

The system prevents duplicate reminders/escalations using:

1. **Tracking Fields:**
   - `last_reminder_sent_at` - Updated after each reminder
   - `last_escalation_sent_at` - Updated after each escalation

2. **24-Hour Cooldown:**
   - Reminders/escalations only sent if last sent > 24 hours ago
   - Prevents spam if cron runs multiple times

---

## Setup & Configuration

### Environment Variables

**Required:**

```env
# Supabase
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co

# Resend Email
RESEND_API_KEY=re_xxxxxxxxxxxxx

# Optional
CONTACT_FORM_RECIPIENT_EMAIL=info@legendholding.com
```

### Company Email Mapping

**File:** `lib/company-email-map.ts`

Update `COMPANY_EMAIL_MAP` with company emails:
```typescript
export const COMPANY_EMAIL_MAP: Record<string, string> = {
  "Legend Motors": "support@legendmotorsglobal.com",
  // ... add all companies
};
```

### Business Head Email Mapping

**File:** `lib/company-email-map.ts`

Update `BUSINESS_HEAD_EMAIL_MAP` with business head emails:
```typescript
export const BUSINESS_HEAD_EMAIL_MAP: Record<string, string> = {
  "Legend Motors": "business.head@legendmotorsglobal.com",
  // ... add all companies
};
```

### Database Setup

1. **Run Migrations:**
   ```bash
   # Apply all migrations in order
   supabase migration up
   ```

2. **Verify Tables:**
   - `customer_care_complaints`
   - `company_credentials`

3. **Create Company Credentials:**
   - Use admin API or direct database insert
   - Password must be hashed with bcryptjs

### Vercel Cron Configuration

**File:** `vercel.json`

```json
{
  "crons": [
    {
      "path": "/api/customer-care/send-reminders",
      "schedule": "0 */6 * * *"
    }
  ]
}
```

**Schedule:** Every 6 hours (at 00:00, 06:00, 12:00, 18:00 UTC)

---

## Deployment

### Pre-Deployment Checklist

- [ ] All environment variables set in Vercel
- [ ] Database migrations applied
- [ ] Company emails configured
- [ ] Business head emails configured
- [ ] Vercel cron job configured
- [ ] Email domain verified in Resend
- [ ] Test complaint submission
- [ ] Test company login
- [ ] Test reminder system

### Deployment Steps

1. **Commit Changes:**
   ```bash
   git add .
   git commit -m "Deploy complaint system"
   git push origin master
   ```

2. **Vercel Auto-Deploy:**
   - Vercel automatically deploys on push
   - Monitor deployment logs

3. **Verify Deployment:**
   - Test complaint form
   - Test company login
   - Check cron job execution

### Post-Deployment

1. **Monitor Logs:**
   - Vercel function logs
   - Email delivery logs (Resend dashboard)

2. **Test Reminder System:**
   - Manually call `/api/customer-care/send-reminders`
   - Verify emails are sent
   - Check duplicate prevention

---

## Troubleshooting

### Common Issues

#### 1. Emails Not Sending

**Symptoms:** Complaints saved but no email received

**Solutions:**
- Check `RESEND_API_KEY` is set correctly
- Verify email domain in Resend
- Check Resend dashboard for errors
- Verify company email exists in `COMPANY_EMAIL_MAP`

---

#### 2. Company Cannot Login

**Symptoms:** "Invalid credentials" error

**Solutions:**
- Verify email matches `company_credentials.email`
- Check password hash is correct (bcryptjs)
- Verify company exists in `company_credentials` table
- Check session cookie is being set

---

#### 3. Reminders Not Sending

**Symptoms:** No reminder emails received

**Solutions:**
- Check Vercel cron job is active
- Verify cron schedule in `vercel.json`
- Manually test endpoint: `GET /api/customer-care/send-reminders`
- Check `last_reminder_sent_at` timestamps
- Verify complaints meet reminder criteria

---

#### 4. Status Not Updating

**Symptoms:** Status stuck at 'sent' or 'reviewed'

**Solutions:**
- Check API route is being called correctly
- Verify authentication/session
- Check database update queries
- Review browser console for errors

---

#### 5. Duplicate Reminders

**Symptoms:** Multiple reminder emails for same complaint

**Solutions:**
- Verify `last_reminder_sent_at` is being updated
- Check 24-hour cooldown logic
- Ensure migration `20250328000006` is applied
- Check cron job isn't running too frequently

---

### Debug Endpoints

**Test Reminder System:**
```bash
curl https://your-domain.com/api/customer-care/send-reminders
```

**Check Company Session:**
```bash
curl https://your-domain.com/api/company-auth/verify \
  -H "Cookie: company_session=..."
```

---

## Maintenance

### Regular Tasks

#### Weekly
- Review complaint resolution times
- Check reminder system logs
- Monitor email delivery rates

#### Monthly
- Review business head escalation frequency
- Analyze complaint patterns by company
- Update company/business head emails if needed

### Database Maintenance

**Clean Old Complaints (Optional):**
```sql
-- Archive resolved complaints older than 1 year
-- (Create archive table first)
INSERT INTO customer_care_complaints_archive
SELECT * FROM customer_care_complaints
WHERE resolved = true
AND created_at < NOW() - INTERVAL '1 year';

DELETE FROM customer_care_complaints
WHERE resolved = true
AND created_at < NOW() - INTERVAL '1 year';
```

### Updating Company Credentials

**Via API (Recommended):**
```typescript
// POST /api/admin/company-credentials/create
{
  "email": "new-email@company.com",
  "companyName": "Legend Motors",
  "password": "new-password"
}
```

**Via Database (Direct):**
```sql
UPDATE company_credentials
SET password_hash = '$2a$10$...' -- bcrypt hash
WHERE email = 'company@email.com';
```

### Monitoring

**Key Metrics to Track:**
- Complaint submission rate
- Average resolution time
- Reminder frequency
- Escalation frequency
- Email delivery success rate

**Logs to Monitor:**
- Vercel function logs
- Resend email logs
- Database query performance
- API error rates

---

## Security Considerations

### Authentication
- Company passwords hashed with bcryptjs (10 rounds)
- Session tokens base64 encoded (consider upgrading to JWT)
- Session cookies httpOnly (configure in middleware)

### Data Protection
- Row Level Security (RLS) enabled on Supabase
- Companies can only access their own complaints
- Input validation on all API endpoints
- HTML escaping in email templates (XSS prevention)

### Email Security
- No sensitive data in email subjects
- Reply-To properly configured
- CC tracking for customer replies

---

## Support & Contact

For issues or questions:
- **Technical Issues:** Check troubleshooting section
- **Feature Requests:** Document requirements
- **Emergency:** Check Vercel logs and Resend dashboard

---

## Changelog

### Version 1.0 (March 2025)
- Initial release
- Customer complaint submission
- Company dashboard with authentication
- Admin dashboard
- Automated reminder system
- 3-day escalation to business heads
- Duplicate reminder prevention
- Outlook-compatible email templates

---

**Document End**
