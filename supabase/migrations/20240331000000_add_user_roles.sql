-- Add role column to admin_profiles table
ALTER TABLE admin_profiles ADD COLUMN IF NOT EXISTS role VARCHAR(20) DEFAULT 'admin' CHECK (role IN ('super_admin', 'admin'));

-- Create user_roles table for more granular role management
CREATE TABLE IF NOT EXISTS user_roles (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    email VARCHAR NOT NULL,
    role VARCHAR(20) NOT NULL CHECK (role IN ('super_admin', 'admin')),
    permissions JSONB DEFAULT '{}',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(user_id, email)
);

-- Add indexes
CREATE INDEX IF NOT EXISTS idx_user_roles_user_id ON user_roles(user_id);
CREATE INDEX IF NOT EXISTS idx_user_roles_email ON user_roles(email);
CREATE INDEX IF NOT EXISTS idx_user_roles_role ON user_roles(role);

-- Disable Row Level Security for user_roles table to avoid infinite recursion
-- We'll handle permissions in the application layer instead
ALTER TABLE user_roles DISABLE ROW LEVEL SECURITY;

-- Insert the super admin user
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

-- Update admin_profiles for super admin
UPDATE admin_profiles 
SET role = 'super_admin' 
WHERE user_id = (SELECT id FROM auth.users WHERE email = 'waseem.k@legendholding.com' LIMIT 1); 