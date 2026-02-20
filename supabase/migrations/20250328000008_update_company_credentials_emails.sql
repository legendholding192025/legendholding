-- Update company_credentials email to match complaint delivery emails for 212 and Legend Motors
-- Companies use this email as their login username for the dashboard

UPDATE company_credentials
SET email = 'info@212uae.com', updated_at = NOW()
WHERE company_name = '212';

UPDATE company_credentials
SET email = 'support@legendmotorsuae.com', updated_at = NOW()
WHERE company_name = 'Legend Motors';
