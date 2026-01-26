-- Migration: Verify user exists and add role if missing
-- Run this after creating a user to ensure the role is set correctly

DO $$
DECLARE
    v_user_id UUID;
    v_email TEXT := 'farheen.nishat@legendmotorsuae.com';
    v_role TEXT := 'admin';
    v_permissions JSONB := '{"dashboard": true, "jobs": true, "applications": true}'::jsonb;
BEGIN
    -- Check if user exists in auth.users
    SELECT id INTO v_user_id
    FROM auth.users
    WHERE email = v_email;
    
    IF v_user_id IS NULL THEN
        RAISE NOTICE 'User with email % does not exist in auth.users. Please create the user first.', v_email;
        RETURN;
    END IF;
    
    RAISE NOTICE 'Found user: % (ID: %)', v_email, v_user_id;
    
    -- Check if role exists
    IF EXISTS (SELECT 1 FROM user_roles WHERE user_id = v_user_id) THEN
        SELECT role, permissions INTO v_role, v_permissions
        FROM user_roles
        WHERE user_id = v_user_id;
        RAISE NOTICE 'User role already exists. Role: %, Permissions: %', v_role, v_permissions::text;
    ELSE
        -- Add role if missing
        INSERT INTO user_roles (user_id, email, role, permissions, created_at, updated_at)
        VALUES (v_user_id, v_email, v_role, v_permissions, NOW(), NOW())
        ON CONFLICT (user_id, email) DO UPDATE SET
            role = EXCLUDED.role,
            permissions = EXCLUDED.permissions,
            updated_at = NOW();
        
        RAISE NOTICE 'User role added successfully: %', v_email;
    END IF;
END $$;

-- Show all admin users
SELECT 
    ur.email,
    ur.role,
    ur.permissions,
    au.created_at as user_created_at,
    au.last_sign_in_at
FROM user_roles ur
JOIN auth.users au ON ur.user_id = au.id
ORDER BY ur.created_at DESC;
