-- Fix user_roles table RLS policies to prevent infinite recursion
-- Disable RLS for user_roles table since we handle permissions in application layer

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Super admins can view all roles" ON user_roles;
DROP POLICY IF EXISTS "Users can view their own role" ON user_roles;
DROP POLICY IF EXISTS "Super admins can manage all roles" ON user_roles;

-- Disable Row Level Security for user_roles table
ALTER TABLE user_roles DISABLE ROW LEVEL SECURITY;

-- Ensure super admin user exists
INSERT INTO user_roles (user_id, email, role, permissions) 
VALUES (
    (SELECT id FROM auth.users WHERE email = 'waseem.k@legendholding.com' LIMIT 1),
    'waseem.k@legendholding.com',
    'super_admin',
    '{"dashboard": true, "submissions": true, "news": true, "jobs": true, "applications": true, "newsletters": true, "settings": true}'
) ON CONFLICT (user_id, email) DO UPDATE SET 
    role = EXCLUDED.role,
    permissions = EXCLUDED.permissions,
    updated_at = NOW(); 