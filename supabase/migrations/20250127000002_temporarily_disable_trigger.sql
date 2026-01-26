-- Migration: Temporarily disable trigger to allow user creation
-- Run this, create the user, then re-enable the trigger

-- Disable the trigger temporarily
ALTER TABLE auth.users DISABLE TRIGGER trigger_auto_add_user_role;

-- Note: After creating the user, run the next migration to re-enable the trigger
