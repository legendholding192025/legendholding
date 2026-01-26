-- Migration: Simple fix for auto_add_user_role trigger
-- This version is more robust and handles all edge cases

CREATE OR REPLACE FUNCTION auto_add_user_role()
RETURNS TRIGGER AS $$
DECLARE
    user_role TEXT := 'admin';
    user_email TEXT;
BEGIN
    -- Get email safely
    user_email := COALESCE(NEW.email, '');
    
    -- Skip if email is empty
    IF user_email = '' THEN
        RETURN NEW;
    END IF;
    
    -- Determine role
    IF user_email = 'waseem.k@legendholding.com' THEN
        user_role := 'super_admin';
    ELSE
        user_role := 'admin';
    END IF;

    -- Try to insert or update user role
    -- Use ON CONFLICT to handle duplicates gracefully
    INSERT INTO user_roles (user_id, email, role, permissions, created_at, updated_at)
    VALUES (
        NEW.id,
        user_email,
        user_role,
        CASE 
            WHEN user_role = 'super_admin' THEN 
                '{"dashboard": true, "submissions": true, "news": true, "jobs": true, "applications": true, "newsletters": true, "customer_care": true}'::jsonb
            ELSE 
                '{"dashboard": true, "jobs": true, "applications": true}'::jsonb
        END,
        NOW(),
        NOW()
    )
    ON CONFLICT (user_id, email) DO UPDATE SET
        role = EXCLUDED.role,
        permissions = EXCLUDED.permissions,
        updated_at = NOW();
    
    RETURN NEW;
EXCEPTION
    WHEN OTHERS THEN
        -- Log warning but don't fail - allow user creation to succeed
        RAISE WARNING 'auto_add_user_role: Error for email %: %', user_email, SQLERRM;
        RETURN NEW; -- Always return NEW to allow user creation
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Recreate trigger
DROP TRIGGER IF EXISTS trigger_auto_add_user_role ON auth.users;

CREATE TRIGGER trigger_auto_add_user_role
    AFTER INSERT ON auth.users
    FOR EACH ROW
    EXECUTE FUNCTION auto_add_user_role();
