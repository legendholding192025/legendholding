-- Migration: Add roles for missing admin users
-- This will check and add roles for isha.gattani and maricris.layagan

DO $$
DECLARE
    v_user_id UUID;
    v_email TEXT;
    v_role TEXT := 'admin';
    v_permissions JSONB := '{"dashboard": true, "jobs": true, "applications": true}'::jsonb;
    v_emails TEXT[] := ARRAY['isha.gattani@legendholding.com', 'maricris.layagan@legendinvestment.com'];
    v_current_email TEXT;
BEGIN
    FOREACH v_current_email IN ARRAY v_emails
    LOOP
        RAISE NOTICE 'Processing user: %', v_current_email;
        
        -- Check if user exists in auth.users
        SELECT id INTO v_user_id
        FROM auth.users
        WHERE email = v_current_email;
        
        IF v_user_id IS NULL THEN
            RAISE WARNING 'User % does not exist in auth.users. Please create the user first in Supabase Dashboard → Authentication → Users', v_current_email;
            CONTINUE;
        END IF;
        
        RAISE NOTICE 'Found user: % (ID: %)', v_current_email, v_user_id;
        
        -- Check if role exists
        IF EXISTS (SELECT 1 FROM user_roles WHERE user_id = v_user_id) THEN
            RAISE NOTICE 'User % already has a role assigned', v_current_email;
            
            -- Show current role
            SELECT role, permissions INTO v_role, v_permissions
            FROM user_roles
            WHERE user_id = v_user_id;
            
            RAISE NOTICE 'Current role: %, Permissions: %', v_role, v_permissions::text;
        ELSE
            -- Add role if missing
            INSERT INTO user_roles (user_id, email, role, permissions, created_at, updated_at)
            VALUES (v_user_id, v_current_email, v_role, v_permissions, NOW(), NOW())
            ON CONFLICT (user_id, email) DO UPDATE SET
                role = EXCLUDED.role,
                permissions = EXCLUDED.permissions,
                updated_at = NOW();
            
            RAISE NOTICE '✅ User role added successfully for: %', v_current_email;
        END IF;
    END LOOP;
    
    RAISE NOTICE '========================================';
    RAISE NOTICE 'Migration completed';
    RAISE NOTICE '========================================';
END $$;

-- Show all admin users after migration
SELECT 
    ur.email,
    ur.role,
    ur.permissions,
    au.created_at as user_created_at,
    au.last_sign_in_at,
    CASE 
        WHEN au.id IS NULL THEN '❌ User not found'
        ELSE '✅ User exists'
    END as status
FROM user_roles ur
LEFT JOIN auth.users au ON ur.user_id = au.id
WHERE ur.email IN (
    'farheen.nishat@legendmotorsuae.com',
    'isha.gattani@legendholding.com',
    'maricris.layagan@legendinvestment.com'
)
ORDER BY ur.email;
