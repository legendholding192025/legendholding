# Company Dashboard Setup Guide

## Overview

Each company has a password-protected dashboard where they can view complaints assigned to their company. The system is reusable for all companies.

## Database Setup

Run the migration to create the company credentials table:

```sql
-- File: supabase/migrations/20250328000002_create_company_credentials.sql
```

## Creating Company Credentials

### Option 1: Using API Endpoint (Recommended)

Use the admin API endpoint to create company credentials:

```bash
POST /api/admin/company-credentials/create
Content-Type: application/json

{
  "companyName": "Legend Motors",
  "password": "securepassword123"
}
```

**Note**: Company name must match exactly with the company name in the customer care form dropdown.

### Option 2: Direct Database Insert (For Initial Setup)

You can also insert credentials directly into the database:

```sql
-- Hash the password first (use bcrypt with 10 salt rounds)
-- Example: password "test123" hashed = $2a$10$...

INSERT INTO company_credentials (company_name, password_hash)
VALUES ('Legend Motors', '$2a$10$...hashed_password...');
```

## Company Login

Companies can access their dashboard at:
- **URL**: `/company/login`
- **Login with**: Company Name + Password

## Dashboard Features

Once logged in, companies can:
- View all complaints assigned to their company
- See complaint details (customer info, subject, message)
- View admin comments (if any)
- See complaint status (Pending, Reviewed, Sent)
- View statistics (Total, Pending, Reviewed)

## Company List

The following companies are configured:
- Legend Motors
- 212
- Kaiyi
- Skywell
- Legend Commercial Vehicles
- Legend AutoHub
- Legend Motorcycles - Lifan
- Legend Rent a Car
- Legend Auto Services
- Legend Travel and Tourism
- Legend Green Energy Solutions
- Legend X
- Zul Energy

## Security

- Passwords are hashed using bcrypt (10 salt rounds)
- Session tokens stored in HttpOnly cookies
- Each company can only see their own complaints
- Sessions expire after 24 hours

## API Endpoints

### Company Authentication
- `POST /api/company-auth/login` - Company login
- `GET /api/company-auth/verify` - Verify session
- `POST /api/company-auth/logout` - Logout

### Admin Management
- `POST /api/admin/company-credentials/create` - Create company credentials (admin only)

## Troubleshooting

### Company cannot login
1. Verify company name matches exactly (case-sensitive)
2. Check if credentials exist in database
3. Verify password is correct

### Company sees no complaints
1. Verify company name in complaint matches exactly
2. Check if complaints exist for that company
3. Verify company is logged in with correct account
