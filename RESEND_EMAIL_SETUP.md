# Resend Email Setup Guide

## ⚠️ Development Mode Limitation

Resend has a limitation in development/testing mode: **you can only send emails to your own verified email address**.

### Error You Might See:
```
You can only send testing emails to your own email address (mufeed.rahman@legendholding.com). 
To send emails to other recipients, please verify a domain at resend.com/domains, and change 
the `from` address to an email using this domain.
```

## ✅ Solution Implemented

The code now automatically handles this:

### Development Mode
- **Sends to**: Your verified email address (`mufeed.rahman@legendholding.com`)
- **Email body includes**: A yellow notice showing the actual recipient
- **Purpose**: Allows you to test email templates without domain verification

### Production Mode
- **Sends to**: Actual submitter's email address
- **No notice**: Clean email without development warnings
- **Requires**: Verified domain in Resend

## 🔧 Configuration

### Option 1: Use Default Verified Email (Recommended for Development)

The code automatically uses `mufeed.rahman@legendholding.com` in development mode. No configuration needed!

### Option 2: Set Custom Verified Email

Add to your `.env.local`:

```env
RESEND_VERIFIED_EMAIL=your-verified-email@legendholding.com
```

### Option 3: Verify Domain for Production

1. Go to [Resend Domains](https://resend.com/domains)
2. Add and verify your domain (`legendholding.com`)
3. Update `from` address in `lib/email.ts`:
   ```typescript
   const fromEmail = process.env.NODE_ENV === 'development' 
     ? 'onboarding@resend.dev'
     : 'no-reply@legendholding.com'; // Use your verified domain
   ```

## 📧 How It Works

### Development Mode Email Example:
```
┌──────────────────────────────────────────────┐
│  ⚠️ DEVELOPMENT MODE                          │
│  This email is being sent to the verified    │
│  test address.                                │
│  Actual Recipient: submitter@example.com     │
├──────────────────────────────────────────────┤
│  Dear John Doe,                               │
│  Your workflow submission has been approved... │
└──────────────────────────────────────────────┘
```

### Production Mode Email:
```
┌──────────────────────────────────────────────┐
│  Dear John Doe,                               │
│  Your workflow submission has been approved... │
│  (No development notice)                      │
└──────────────────────────────────────────────┘
```

## 🧪 Testing

### Test in Development:
1. Submit a workflow with any email address
2. Approve or reject it
3. Check your verified email (`mufeed.rahman@legendholding.com`)
4. You'll see the email with the actual recipient shown in the notice

### Test in Production:
1. Verify your domain in Resend
2. Update `from` address to use your domain
3. Emails will send directly to submitters

## 📝 Current Setup

- **Development From**: `onboarding@resend.dev`
- **Development To**: `mufeed.rahman@legendholding.com` (verified)
- **Production From**: `no-reply@legendholding.com` (needs domain verification)
- **Production To**: Actual submitter email

## ✅ Status

The email system is now working correctly! In development, emails will:
- ✅ Send successfully to your verified address
- ✅ Show the actual recipient in the email body
- ✅ Allow you to test all email templates
- ✅ Work seamlessly in production once domain is verified

---

**Note**: This is a Resend limitation, not a bug. Once you verify your domain in production, emails will send directly to submitters without any notices.

