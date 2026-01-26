-- Migration: Re-enable the trigger after user creation
-- Run this AFTER you've successfully created the user

-- Re-enable the trigger
ALTER TABLE auth.users ENABLE TRIGGER trigger_auto_add_user_role;
