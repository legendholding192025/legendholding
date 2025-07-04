# Admin Role-Based Access Control

This document describes the role-based access control system implemented for the Legend Holding Group admin portal.

## Overview

The admin portal now supports two user roles:

1. **Super Admin** - Full access to all admin features
2. **Admin** - Limited access to specific features (jobs and applications by default)

## Super Admin

- **Email**: `waseem.k@legendholding.com`
- **Access**: All admin dashboard features
- **Permissions**: 
  - Dashboard overview
  - Contact submissions management
  - News & media management
  - Jobs management
  - Job applications management
  - Newsletter management
  - Settings

## Regular Admin

- **Default Access**: Jobs management and job applications only
- **Permissions**: Can be customized per user
- **Default Permissions**:
  - Jobs management: ✅
  - Job applications: ✅
  - Dashboard: ❌
  - Contact submissions: ❌
  - News & media: ❌
  - Newsletter: ❌
  - Settings: ❌

## Database Schema

### User Roles Table

```sql
CREATE TABLE user_roles (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    email VARCHAR NOT NULL,
    role VARCHAR(20) NOT NULL CHECK (role IN ('super_admin', 'admin')),
    permissions JSONB DEFAULT '{}',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(user_id, email)
);
```

### Permissions Structure

```json
{
  "dashboard": true,
  "submissions": true,
  "news": true,
  "jobs": true,
  "applications": true,
  "newsletters": true,
  "settings": true
}
```

## Implementation Details

### 1. Permission Hook

The `useAdminPermissions` hook manages user permissions:

```typescript
const { userRole, isLoading, isSuperAdmin, hasPermission, canAccess } = useAdminPermissions()
```

### 2. Route Protection

Each admin page checks permissions before rendering:

```typescript
if (!hasPermission('dashboard')) {
  return <UnauthorizedAccess requiredPermission="dashboard" />
}
```

### 3. Menu Filtering

The sidebar menu automatically filters based on user permissions:

```typescript
const hasAccess = hasPermission(item.permission)
if (!hasAccess) return null
```

### 4. Middleware Protection

The middleware redirects users to appropriate pages based on their permissions.

## Adding New Users

### For Super Admin Access

1. User must be registered in Supabase Auth
2. Insert into `user_roles` table with `role = 'super_admin'`
3. Set all permissions to `true`

### For Regular Admin Access

1. User must be registered in Supabase Auth
2. Insert into `user_roles` table with `role = 'admin'`
3. Set specific permissions as needed

Example SQL for new admin user:

```sql
INSERT INTO user_roles (user_id, email, role, permissions) 
VALUES (
    'user-uuid-from-auth',
    'user@example.com',
    'admin',
    '{"jobs": true, "applications": true}'
);
```

## Security Features

1. **Row Level Security**: Database policies ensure users can only access their own role information
2. **Client-side Protection**: UI components check permissions before rendering
3. **Server-side Protection**: Middleware validates access to protected routes
4. **Automatic Role Creation**: New users get default admin role with limited permissions

## Migration

The system automatically creates default roles for existing users. New users will be assigned the 'admin' role with jobs and applications permissions only.

## Troubleshooting

### User Can't Access Expected Features

1. Check if user exists in `user_roles` table
2. Verify permissions JSON structure
3. Ensure user is authenticated in Supabase Auth

### Super Admin Not Working

1. Verify `waseem.k@legendholding.com` exists in auth.users
2. Check user_roles table for correct role assignment
3. Ensure all permissions are set to `true`

### Adding Custom Permissions

1. Update the `UserRole` interface in `use-admin-permissions.ts`
2. Add permission check in relevant components
3. Update database migration if needed 