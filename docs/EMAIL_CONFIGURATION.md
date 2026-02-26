# Email Configuration Guide

## 📧 Contact Form Email Recipient

The contact form submissions are sent to a configurable email address.

### Current Setup

By default, contact form submissions are sent to: `info@legendholding.com`

### How to Change It

Add this to your `.env.local` file:

```env
CONTACT_FORM_RECIPIENT_EMAIL=your-email@legendholding.com
```

### Examples

```env
# Send to a specific person
CONTACT_FORM_RECIPIENT_EMAIL=mufeed.rahman@legendholding.com

# Send to a team email
CONTACT_FORM_RECIPIENT_EMAIL=info@legendholding.com

# Send to multiple recipients (comma-separated)
CONTACT_FORM_RECIPIENT_EMAIL=info@legendholding.com,support@legendholding.com
```

**Note**: For multiple recipients, make sure your Resend plan supports it.

## 📧 Workflow Email Recipients

Workflow emails (approval/rejection) are automatically sent to:
- **Recipient**: The submitter's email address (from the form)
- **From**: `no-reply@legendholding.com`

No configuration needed - these use the email address provided in the workflow submission form.

## 🔧 All Email Settings

### From Address
- **Contact Form**: `no-reply@legendholding.com`
- **Workflow Emails**: `no-reply@legendholding.com`

### To Addresses
- **Contact Form**: Configurable via `CONTACT_FORM_RECIPIENT_EMAIL` env variable
- **Workflow Emails**: Submitter's email (from form submission)

### Environment Variables Required

```env
# Required
RESEND_API_KEY=re_xxxxxxxxxxxxx

# Optional (for contact form)
CONTACT_FORM_RECIPIENT_EMAIL=info@legendholding.com
```

## ✅ Recommended Setup

For production, we recommend:

```env
RESEND_API_KEY=re_xxxxxxxxxxxxx
CONTACT_FORM_RECIPIENT_EMAIL=info@legendholding.com
```

This way:
- Contact form submissions → `info@legendholding.com`
- Workflow notifications → Submitter's email address
- All emails from → `no-reply@legendholding.com`

---

**Note**: Make sure the email addresses you use are verified in your Resend account or part of your verified domain.

