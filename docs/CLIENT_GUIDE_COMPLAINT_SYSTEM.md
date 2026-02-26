# Customer Care Complaint System - Client Guide

**For:** Legend Holding Group  
**Version:** 1.0  
**Date:** March 2025

---

## Welcome

This guide explains the **Customer Care Complaint System** that has been implemented for Legend Holding Group. This system streamlines how customer complaints are received, managed, and resolved across all your companies.

---

## What is This System?

The Customer Care Complaint System is a centralized platform that:

✅ **Receives** customer complaints through a public form on your website  
✅ **Routes** complaints automatically to the relevant company  
✅ **Tracks** complaint status from submission to resolution  
✅ **Sends** automated reminders to ensure timely responses  
✅ **Escalates** unresolved complaints to business heads after 3 days  
✅ **Provides** dashboards for companies and administrators to manage complaints

---

## Who Uses This System?

### 1. **Customers**
- Anyone who visits your website and wants to file a complaint
- No login required - simple form submission

### 2. **Company Teams**
- Each company under Legend Holding Group has its own dashboard
- Teams can view, respond to, and resolve complaints for their company
- Password-protected access

### 3. **Administrators**
- Super admin dashboard to oversee all complaints across all companies
- Full visibility and management capabilities

---

## How It Works - Complete Flow

### Step 1: Customer Submits Complaint

**What Happens:**
1. Customer visits your website's "Customer Care" page
2. Fills out a form with:
   - Their name, email, and phone number
   - Which company the complaint is about (dropdown selection)
   - Complaint subject and detailed message
3. Clicks "Submit"

**What Happens Behind the Scenes:**
- Complaint is saved in the system
- **Email is automatically sent** to the company's designated email address
- Complaint appears immediately in the company's dashboard
- Customer sees a success message

**Status:** Complaint is now **"Sent"** to the company

---

### Step 2: Company Receives Notification

**What Happens:**
- Company receives an email notification about the new complaint
- Email includes:
  - Customer details
  - Complaint subject and message
  - Link to login to their dashboard

**What Company Should Do:**
- Log in to their company dashboard using their credentials
- View the complaint in their dashboard

---

### Step 3: Company Reviews Complaint

**What Happens:**
1. Company team member logs into their dashboard at `/company/login`
2. Sees list of all complaints for their company
3. Clicks "View" on a complaint to see full details

**Automatic Update:**
- When company views the complaint, status automatically changes to **"Reviewed"**
- System records the review timestamp

**Status:** Complaint is now **"Reviewed"**

---

### Step 4: Company Responds to Customer

**What Happens:**
1. Company clicks "Reply" button on the reviewed complaint
2. Types their response message
3. Clicks "Send Reply"

**What Happens Behind the Scenes:**
- **Email is automatically sent** to the customer
- Email is sent from `complaints@legendholding.com`
- Customer can reply directly, and their reply will go to the company
- `complaints@legendholding.com` is automatically included in CC for tracking

**Status:** Complaint is now **"Replied"**

---

### Step 5: Company Marks Complaint as Resolved

**What Happens:**
1. After customer is satisfied, company clicks "Mark as Resolved"
2. Company must enter a resolution comment (explaining how it was resolved)
3. Clicks "Resolve"

**What Happens Behind the Scenes:**
- Complaint is marked as **"Resolved"**
- Resolution comment is saved for admin review
- Complaint appears as resolved in all dashboards

**Status:** Complaint is now **"Resolved"**

---

## Automated Reminder System

The system automatically sends reminders to ensure complaints don't get forgotten.

### 48-Hour Reminders

**When:** If a complaint hasn't been reviewed or replied to within 48 hours

**What Happens:**
- **First Reminder (Not Reviewed):**
  - Sent if complaint status is still "Sent" after 48 hours
  - Reminds company to review the complaint
  - Includes warning about escalation

- **Second Reminder (Reviewed but Not Replied):**
  - Sent if complaint was reviewed but no reply sent after 48 hours
  - Urgent reminder to respond to customer
  - **Warns that complaint will escalate to business head if not resolved**

**Frequency:** Reminders are sent every 24 hours (if still needed) until action is taken

---

### 3-Day Escalation to Business Heads

**When:** If a complaint is still unresolved after 3 days

**What Happens:**
- **Automatic email sent** to the business head of that company
- Email includes:
  - Message: "Please note there is a complaint on [Company Name] that was assigned 3 days ago, and Not resolved, please let your team resolved it as soon as possible."
  - Full complaint details
  - Customer information

**Purpose:** Ensures management is aware of unresolved complaints and can take action

**Frequency:** Escalation emails are sent every 24 hours (if still unresolved) until complaint is resolved

---

## Status Flow Explained

Here's how complaints move through the system:

```
┌──────────┐
│  Pending │  ← Customer submits complaint
└────┬─────┘
     │
     ▼
┌──────────┐
│   Sent   │  ← Email sent to company, appears in dashboard
└────┬─────┘
     │
     ▼
┌──────────┐
│ Reviewed │  ← Company views the complaint
└────┬─────┘
     │
     ▼
┌──────────┐
│  Replied │  ← Company sends response to customer
└────┬─────┘
     │
     ▼
┌──────────┐
│ Resolved │  ← Company marks as resolved with comment
└──────────┘
```

**Visual Indicators:**
- Each status has a color-coded badge in the dashboards
- Status flow is visible in admin dashboard
- Easy to see where each complaint is in the process

---

## Company Dashboard Features

When companies log in, they can:

### View Complaints
- See all complaints for their company
- Filter by status (All, Pending, Reviewed, Sent)
- Search by customer name, email, or subject
- View complaint details in a popup modal

### Take Actions
- **View:** Opens complaint details (auto-updates status to "Reviewed")
- **Reply:** Send response email to customer
- **Resolve:** Mark complaint as resolved with a comment

### Information Displayed
- Customer name, email, phone
- Complaint subject and message
- Submission date
- Current status
- Admin comments (if any)

---

## Admin Dashboard Features

Administrators can:

### Overview
- See **all complaints** from **all companies**
- View complaint statistics
- Monitor resolution times

### Management
- View detailed complaint information
- See status flow visualization
- View admin comments
- View company resolution comments
- Delete complaints (if needed)

### Status Tracking
- Visual status flow showing:
  - Pending (Yellow)
  - Sent (Blue)
  - Reviewed (Purple)
  - Replied (Orange)
  - Resolved (Green)

---

## Email Notifications

### Emails Sent to Companies

1. **New Complaint Notification**
   - Sent immediately when customer submits complaint
   - Includes all complaint details
   - Contains login link to dashboard

2. **48-Hour Reminder (Not Reviewed)**
   - Sent if complaint not reviewed within 48 hours
   - Reminder to take action

3. **48-Hour Reminder (Not Replied)**
   - Sent if reviewed but not replied within 48 hours
   - Urgent reminder with escalation warning

### Emails Sent to Customers

1. **Company Reply**
   - Sent when company responds to complaint
   - Includes company's response message
   - Customer can reply directly (goes to company + complaints@legendholding.com)

### Emails Sent to Business Heads

1. **3-Day Escalation**
   - Sent if complaint unresolved after 3 days
   - Includes full complaint details
   - Requests immediate action

---

## Access & Login

### For Companies

**Login URL:** `https://www.legendholding.com/company/login`

**Credentials:**
- **Username:** Company email address (as configured)
- **Password:** Set by administrator

**First Time Setup:**
- Administrator creates company credentials
- Company receives login information
- Company can change password if needed (future feature)

### For Administrators

**Access:** Use existing admin login system  
**Dashboard:** `/admin/customer-care`

---

## Key Features & Benefits

### ✅ Automated Workflow
- No manual routing needed - complaints go directly to the right company
- Automatic status updates
- Automatic email notifications

### ✅ Timely Response Management
- 48-hour reminders ensure complaints don't get forgotten
- 3-day escalation ensures management awareness
- Clear status tracking

### ✅ Professional Communication
- Branded email templates
- Professional customer communication
- Proper email tracking (CC to complaints@legendholding.com)

### ✅ Complete Visibility
- Companies see only their complaints
- Admins see all complaints
- Clear status indicators
- Resolution tracking

### ✅ Customer Satisfaction
- Fast response times
- Professional communication
- Easy complaint submission
- Clear resolution process

---

## Best Practices

### For Company Teams

1. **Check Dashboard Daily**
   - Log in each day to see new complaints
   - Respond within 24-48 hours when possible

2. **Review Before Replying**
   - Always view complaint details before responding
   - Ensure you understand the full issue

3. **Professional Responses**
   - Write clear, professional reply messages
   - Address all points in the customer's complaint
   - Be empathetic and solution-oriented

4. **Timely Resolution**
   - Mark complaints as resolved once customer is satisfied
   - Add meaningful resolution comments for admin review

5. **Monitor Reminders**
   - If you receive a reminder, prioritize that complaint
   - Reminders indicate the complaint needs attention

### For Administrators

1. **Regular Monitoring**
   - Check admin dashboard regularly
   - Monitor complaint volumes by company
   - Review resolution times

2. **Follow Up on Escalations**
   - When business heads receive escalations, ensure action is taken
   - Track which companies have frequent escalations

3. **Review Resolution Comments**
   - Check company resolution comments
   - Ensure complaints are truly resolved

---

## Important Email Addresses

### System Emails

- **From Address (Initial Notifications):** `no-reply@legendholding.com`
  - Customers cannot reply to this address
  - Used for initial complaint notifications to companies

- **From Address (Replies & Reminders):** `complaints@legendholding.com`
  - Used for company replies to customers
  - Used for reminder emails
  - Used for escalation emails
  - **Always included in CC** for customer replies

### Customer Replies

When customers reply to company emails:
- Reply goes to: Company's email address
- CC automatically includes: `complaints@legendholding.com`
- This ensures all communication is tracked

---

## Timeline & Deadlines

### Response Times

**Recommended:**
- **Review:** Within 24 hours
- **Reply:** Within 48 hours of review
- **Resolution:** As soon as customer is satisfied

**Automated Reminders:**
- **48 hours:** First reminder if not reviewed
- **48 hours:** Reminder if reviewed but not replied
- **3 days:** Escalation to business head

**System Expectations:**
- Companies should aim to review within 24 hours
- Companies should reply within 48 hours of review
- Complaints should be resolved within 3-5 days ideally

---

## Troubleshooting

### "I Can't Log In"

**Check:**
- Email address is correct (must match exactly)
- Password is correct
- Contact administrator if credentials don't work

### "I Don't See My Complaint"

**Check:**
- Complaint was submitted successfully (customer should see success message)
- You're logged into the correct company dashboard
- Complaint status is "sent", "reviewed", "replied", or "resolved" (pending complaints don't show)

### "I'm Getting Too Many Reminders"

**Solution:**
- Review and reply to the complaint
- Once you take action, reminders will stop
- Reminders only stop when complaint is resolved

### "Customer Says They Didn't Receive My Reply"

**Check:**
- Email was sent successfully (check dashboard for status)
- Customer's email address is correct
- Check spam/junk folder
- Verify email was sent from `complaints@legendholding.com`

---

## Support & Questions

### For Technical Issues
- Contact your system administrator
- Check this guide first for common solutions

### For Process Questions
- Refer to this guide
- Contact Legend Holding Group management

### For Login Issues
- Contact administrator to reset credentials
- Verify email address matches company records

---

## System Overview Summary

**What Customers Do:**
1. Visit website → Fill form → Submit complaint
2. Receive email reply from company
3. Issue gets resolved

**What Companies Do:**
1. Receive email notification
2. Log into dashboard
3. Review complaint
4. Reply to customer
5. Mark as resolved

**What System Does Automatically:**
1. Routes complaints to right company
2. Sends email notifications
3. Tracks status changes
4. Sends reminders after 48 hours
5. Escalates to business heads after 3 days
6. Prevents duplicate reminders

**What Admins Can Do:**
1. View all complaints
2. Monitor status and resolution times
3. See company resolution comments
4. Manage complaints across all companies

---

## Quick Reference

### Complaint Statuses
- **Pending:** Just submitted (brief moment)
- **Sent:** Email sent to company, in company dashboard
- **Reviewed:** Company has viewed the complaint
- **Replied:** Company has sent response to customer
- **Resolved:** Complaint is closed with resolution comment

### Important URLs
- **Customer Form:** `https://www.legendholding.com/customer-care`
- **Company Login:** `https://www.legendholding.com/company/login`
- **Admin Dashboard:** `https://www.legendholding.com/admin/customer-care`

### Key Email Addresses
- **System Emails From:** `complaints@legendholding.com`
- **Initial Notifications From:** `no-reply@legendholding.com`
- **Tracking CC:** `complaints@legendholding.com` (always included)

---

## Conclusion

The Customer Care Complaint System provides a streamlined, professional way to manage customer complaints across all Legend Holding Group companies. With automated notifications, reminders, and escalations, it ensures no complaint goes unnoticed and all customers receive timely, professional responses.

**Remember:**
- Check your dashboard regularly
- Respond within 48 hours
- Mark complaints as resolved when complete
- Use professional, empathetic language in replies

Thank you for using the Customer Care Complaint System!

---

**Document Version:** 1.0  
**Last Updated:** March 2025  
**For:** Legend Holding Group
