-- Migration: Fix auto_add_user_role trigger to handle errors gracefully
-- This prevents trigger errors from blocking user creation

-- Drop and recreate the trigger function with proper error handling
CREATE OR REPLACE FUNCTION auto_add_user_role()
RETURNS TRIGGER AS $$
BEGIN
    -- Only add to user_roles if user doesn't already exist there
    IF NOT EXISTS (SELECT 1 FROM user_roles WHERE user_id = NEW.id) THEN
        -- Determine role based on email domain or specific emails
        DECLARE
            user_role TEXT := 'admin'; -- Default role
        BEGIN
            -- Check if this is a super admin
            IF NEW.email = 'waseem.k@legendholding.com' THEN
                user_role := 'super_admin';
            ELSE
                user_role := 'admin';
            END IF;

            -- Insert the new user role with error handling and conflict resolution
            BEGIN
                INSERT INTO user_roles (user_id, email, role, permissions, created_at, updated_at)
                VALUES (
                    NEW.id,
                    COALESCE(NEW.email, ''),
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
            EXCEPTION
                WHEN OTHERS THEN
                    -- Log the error but don't fail the user creation
                    -- The error will be visible in PostgreSQL logs
                    RAISE WARNING 'Failed to auto-add user role for %: %', COALESCE(NEW.email, 'unknown'), SQLERRM;
                    -- Continue - user creation should succeed even if role insertion fails
            END;
        END;
    END IF;
    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- The trigger should already exist, but ensure it's properly set up
DROP TRIGGER IF EXISTS trigger_auto_add_user_role ON auth.users;

CREATE TRIGGER trigger_auto_add_user_role
    AFTER INSERT ON auth.users
    FOR EACH ROW
    EXECUTE FUNCTION auto_add_user_role();
