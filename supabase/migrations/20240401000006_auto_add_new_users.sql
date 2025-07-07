-- Migration: Auto-add new users to user_roles table
-- This ensures all users who sign up get proper roles assigned

-- Create a function to automatically add users to user_roles table
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
            -- Add other super admin emails here if needed
            -- ELSIF NEW.email = 'another.superadmin@legendholding.com' THEN
            --     user_role := 'super_admin';
            ELSE
                user_role := 'admin';
            END IF;

            -- Insert the new user role
            INSERT INTO user_roles (user_id, email, role, permissions, created_at, updated_at)
            VALUES (
                NEW.id,
                NEW.email,
                user_role,
                CASE 
                    WHEN user_role = 'super_admin' THEN 
                        '{"dashboard": true, "submissions": true, "news": true, "jobs": true, "applications": true, "newsletters": true, "settings": true}'::jsonb
                    ELSE 
                        '{"dashboard": true, "submissions": false, "news": false, "jobs": true, "applications": true, "newsletters": false, "settings": false}'::jsonb
                END,
                NOW(),
                NOW()
            );
        END;
    END IF;
    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger that fires when a new user is inserted into auth.users
CREATE OR REPLACE TRIGGER trigger_auto_add_user_role
    AFTER INSERT ON auth.users
    FOR EACH ROW
    EXECUTE FUNCTION auto_add_user_role();

-- Also create a function to manually add missing users (for existing users)
CREATE OR REPLACE FUNCTION add_missing_user_roles()
RETURNS TABLE (
    added_users_count INTEGER,
    user_emails TEXT[]
) AS $$
DECLARE
    added_count INTEGER := 0;
    added_emails TEXT[] := '{}';
    user_record RECORD;
BEGIN
    -- Loop through auth.users who don't have roles
    FOR user_record IN 
        SELECT au.id, au.email 
        FROM auth.users au 
        LEFT JOIN user_roles ur ON au.id = ur.user_id 
        WHERE ur.user_id IS NULL
    LOOP
        -- Determine role
        DECLARE
            user_role TEXT := 'admin';
        BEGIN
            IF user_record.email = 'waseem.k@legendholding.com' THEN
                user_role := 'super_admin';
            END IF;

            -- Insert the missing user role
            INSERT INTO user_roles (user_id, email, role, permissions, created_at, updated_at)
            VALUES (
                user_record.id,
                user_record.email,
                user_role,
                CASE 
                    WHEN user_role = 'super_admin' THEN 
                        '{"dashboard": true, "submissions": true, "news": true, "jobs": true, "applications": true, "newsletters": true, "settings": true}'::jsonb
                    ELSE 
                        '{"dashboard": true, "submissions": false, "news": false, "jobs": true, "applications": true, "newsletters": false, "settings": false}'::jsonb
                END,
                NOW(),
                NOW()
            );

            added_count := added_count + 1;
            added_emails := array_append(added_emails, user_record.email);
        END;
    END LOOP;

    RETURN QUERY SELECT added_count, added_emails;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Grant permissions
GRANT EXECUTE ON FUNCTION add_missing_user_roles() TO authenticated;

-- Run the function to add any existing users who are missing roles
SELECT * FROM add_missing_user_roles(); 