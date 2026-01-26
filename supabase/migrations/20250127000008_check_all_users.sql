-- Quick check: See all users in auth.users matching the email pattern
-- This helps identify if users exist but with different emails

SELECT 
    email,
    id,
    created_at,
    email_confirmed_at,
    last_sign_in_at
FROM auth.users
WHERE email LIKE '%isha.gattani%'
   OR email LIKE '%maricris.layagan%'
   OR email LIKE '%gattani%'
   OR email LIKE '%layagan%'
ORDER BY email;

-- Also check if they exist with exact emails
SELECT 
    CASE 
        WHEN EXISTS (SELECT 1 FROM auth.users WHERE email = 'isha.gattani@legendholding.com') 
        THEN '✅ isha.gattani@legendholding.com EXISTS'
        ELSE '❌ isha.gattani@legendholding.com NOT FOUND'
    END as isha_status,
    CASE 
        WHEN EXISTS (SELECT 1 FROM auth.users WHERE email = 'maricris.layagan@legendinvestment.com') 
        THEN '✅ maricris.layagan@legendinvestment.com EXISTS'
        ELSE '❌ maricris.layagan@legendinvestment.com NOT FOUND'
    END as maricris_status;
