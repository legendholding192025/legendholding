# How to Create Company Credentials - Simple Guide

## What Are Company Credentials?

Company credentials are like a username and password that allow each company to log into their own dashboard to see complaints that were sent to them.

Think of it like this:
- **Company Name** = Username (e.g., "Legend Motors")
- **Password** = Password (e.g., "MySecurePass123")

---

## Method 1: Using the Admin Dashboard (Easiest Way) ✅

### Step-by-Step Instructions:

1. **Log into Admin Dashboard**
   - Go to: `/admin/login`
   - Log in with your admin account

2. **Go to Company Credentials Page**
   - In the left menu, click on **"Company Credentials"**
   - Or go directly to: `/admin/company-credentials`

3. **Fill in the Form**
   - **Select Company**: Choose the company name from the dropdown list
   - **Enter Password**: Type a password (must be at least 6 characters)
   - **Confirm Password**: Type the same password again

4. **Click "Create Credentials"**
   - Wait for the success message
   - Done! The company can now log in

5. **Share with the Company**
   - Tell them their **Company Name** (the exact name from the dropdown)
   - Tell them their **Password**
   - Tell them to go to: `/company/login`

---

## Method 2: Using a Code Tool (For Developers)

If you're comfortable with code, you can use this method:

1. **Open a tool that can send API requests** (like Postman, or use your browser's developer console)

2. **Send a POST request** to: `/api/admin/company-credentials/create`

3. **Include this information in the request:**
   ```json
   {
     "companyName": "Legend Motors",
     "password": "MySecurePassword123"
   }
   ```

4. **You'll get a success message** if it worked

---

## Important Notes:

### ✅ DO:
- Use strong passwords (at least 6 characters, mix of letters and numbers)
- Share passwords securely (email, phone call, or secure messaging)
- Use the exact company name as it appears in the dropdown
- Keep a record of which passwords you created

### ❌ DON'T:
- Use simple passwords like "123456" or "password"
- Share passwords in public places
- Create duplicate credentials for the same company
- Forget to tell the company their login information

---

## What Happens After Creating Credentials?

1. **The company can now log in** at `/company/login`
2. **They will see only their complaints** - each company only sees complaints assigned to them
3. **They can view:**
   - All complaints sent to their company
   - Customer information
   - Complaint details
   - Admin comments (if any)
   - Complaint status

---

## Example Scenario:

**You want to create credentials for "Legend Motors":**

1. Go to Admin Dashboard → Company Credentials
2. Select "Legend Motors" from dropdown
3. Enter password: "LegendMotors2024!"
4. Confirm password: "LegendMotors2024!"
5. Click "Create Credentials"
6. Success! ✅

**Then tell Legend Motors:**
- "Your company name is: Legend Motors"
- "Your password is: LegendMotors2024!"
- "Go to: /company/login to access your dashboard"

---

## Troubleshooting:

### "Company credentials already exist"
- This company already has credentials
- You can't create duplicate credentials
- If you forgot the password, you'll need to reset it (contact developer)

### "Password must be at least 6 characters"
- Make your password longer
- Use at least 6 characters

### "Passwords do not match"
- Make sure both password fields have the exact same text
- Check for typos or extra spaces

---

## Available Companies:

You can create credentials for any of these companies:
- Legend Motors
- 212
- Kaiyi
- Skywell
- Legend Commercial Vehicles
- Legend AutoHub
- Legend Motorcycles - Lifan
- Legend Rent a Car
- Legend Auto Services
- Legend Travel and Tourism
- Legend Green Energy Solutions
- Legend X
- Zul Energy

---

## Need Help?

If you're stuck, contact your developer or IT support person. They can help you create credentials or troubleshoot any issues.
