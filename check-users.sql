-- Check what users exist in auth.users
SELECT id, email, created_at FROM auth.users;

-- Check what roles exist
SELECT * FROM user_roles;

-- Check if waseem.k@legendholding.com exists
SELECT id, email, created_at FROM auth.users WHERE email = 'waseem.k@legendholding.com';

-- Check if the user has a role assigned
SELECT ur.*, au.email as auth_email 
FROM user_roles ur 
JOIN auth.users au ON ur.user_id = au.id; 