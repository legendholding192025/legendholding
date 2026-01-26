-- QA Verification Script
-- Run this to verify all 3 admin users are set up correctly

-- 1. Check if all users exist in auth.users
SELECT 
    email,
    id,
    created_at,
    email_confirmed_at,
    last_sign_in_at
FROM auth.users
WHERE email IN (
    'farheen.nishat@legendmotorsuae.com',
    'isha.gattani@legendholding.com',
    'maricris.layagan@legendinvestment.com'
)
ORDER BY email;

-- 2. Check if all users have roles in user_roles table
SELECT 
    ur.email,
    ur.role,
    ur.permissions,
    ur.created_at as role_created_at,
    ur.updated_at as role_updated_at,
    CASE 
        WHEN au.id IS NULL THEN '❌ User not found in auth.users'
        ELSE '✅ User exists'
    END as user_status
FROM user_roles ur
LEFT JOIN auth.users au ON ur.user_id = au.id
WHERE ur.email IN (
    'farheen.nishat@legendmotorsuae.com',
    'isha.gattani@legendholding.com',
    'maricris.layagan@legendinvestment.com'
)
ORDER BY ur.email;

-- 3. Verify trigger is active
SELECT 
    trigger_name,
    event_manipulation,
    event_object_table,
    action_statement,
    action_timing
FROM information_schema.triggers
WHERE trigger_name = 'trigger_auto_add_user_role'
AND event_object_table = 'users'
AND event_object_schema = 'auth';

-- 4. Check permissions structure for all admins
SELECT 
    ur.email,
    ur.role,
    jsonb_pretty(ur.permissions) as permissions_json
FROM user_roles ur
WHERE ur.email IN (
    'farheen.nishat@legendmotorsuae.com',
    'isha.gattani@legendholding.com',
    'maricris.layagan@legendinvestment.com'
)
ORDER BY ur.email;

-- 5. Summary report
DO $$
DECLARE
    v_user_count INTEGER;
    v_role_count INTEGER;
    v_missing_roles TEXT[];
BEGIN
    -- Count users
    SELECT COUNT(*) INTO v_user_count
    FROM auth.users
    WHERE email IN (
        'farheen.nishat@legendmotorsuae.com',
        'isha.gattani@legendholding.com',
        'maricris.layagan@legendinvestment.com'
    );
    
    -- Count roles
    SELECT COUNT(*) INTO v_role_count
    FROM user_roles
    WHERE email IN (
        'farheen.nishat@legendmotorsuae.com',
        'isha.gattani@legendholding.com',
        'maricris.layagan@legendinvestment.com'
    );
    
    -- Find missing roles
    SELECT ARRAY_AGG(au.email) INTO v_missing_roles
    FROM auth.users au
    WHERE au.email IN (
        'farheen.nishat@legendmotorsuae.com',
        'isha.gattani@legendholding.com',
        'maricris.layagan@legendinvestment.com'
    )
    AND NOT EXISTS (
        SELECT 1 FROM user_roles ur WHERE ur.user_id = au.id
    );
    
    RAISE NOTICE '========================================';
    RAISE NOTICE 'QA VERIFICATION SUMMARY';
    RAISE NOTICE '========================================';
    RAISE NOTICE 'Users found in auth.users: %', v_user_count;
    RAISE NOTICE 'Users with roles in user_roles: %', v_role_count;
    
    IF v_missing_roles IS NOT NULL AND array_length(v_missing_roles, 1) > 0 THEN
        RAISE WARNING 'Missing roles for users: %', array_to_string(v_missing_roles, ', ');
    ELSE
        RAISE NOTICE '✅ All users have roles assigned';
    END IF;
    
    IF v_user_count = 3 AND v_role_count = 3 THEN
        RAISE NOTICE '✅ QA PASSED: All 3 users are set up correctly';
    ELSE
        RAISE WARNING '⚠️  QA ISSUE: Expected 3 users and 3 roles, found % users and % roles', v_user_count, v_role_count;
    END IF;
    RAISE NOTICE '========================================';
END $$;
