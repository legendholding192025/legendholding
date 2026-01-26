-- Migration: Add Farheen Nishat as admin user
-- This migration adds the user directly to avoid trigger issues

-- First, check if user exists in auth.users and create if not
DO $$
DECLARE
    v_user_id UUID;
    v_email TEXT := 'farheen.nishat@legendmotorsuae.com';
    v_password TEXT := 'Farheen@LHG123';
    v_role TEXT := 'admin';
    v_permissions JSONB := '{"dashboard": true, "jobs": true, "applications": true}'::jsonb;
BEGIN
    -- Check if user already exists in auth.users
    SELECT id INTO v_user_id
    FROM auth.users
    WHERE email = v_email;

    -- If user doesn't exist, we need to create them
    -- Note: We can't create auth users directly in SQL, so this will need to be done via API
    -- But we can ensure the user_roles entry exists
    
    -- Check if user_roles entry exists
    IF v_user_id IS NOT NULL THEN
        -- User exists, check user_roles
        IF NOT EXISTS (SELECT 1 FROM user_roles WHERE user_id = v_user_id) THEN
            -- Insert user_roles entry
            INSERT INTO user_roles (user_id, email, role, permissions, created_at, updated_at)
            VALUES (v_user_id, v_email, v_role, v_permissions, NOW(), NOW())
            ON CONFLICT (user_id, email) DO UPDATE SET
                role = v_role,
                permissions = v_permissions,
                updated_at = NOW();
            
            RAISE NOTICE 'User role added/updated for existing user: %', v_email;
        ELSE
            -- Update existing role
            UPDATE user_roles
            SET role = v_role,
                permissions = v_permissions,
                updated_at = NOW()
            WHERE user_id = v_user_id;
            
            RAISE NOTICE 'User role updated for: %', v_email;
        END IF;
    ELSE
        RAISE NOTICE 'User does not exist in auth.users. Please create the user via Supabase Auth API first, then run this migration again.';
        RAISE NOTICE 'Or manually create user with email: % and password: %', v_email, v_password;
    END IF;
END $$;
