# Workflow Email Notifications

## 📧 Email Notification System

The workflow system now automatically sends email notifications to submitters when their submission status changes.

## ✅ Email Sending Logic

### **Approval Email** (Final Approval Only)
- **When**: Only sent when **Founder approves** the submission (status: `approved`)
- **Why**: This is the final approval stage, so the submitter should be notified
- **Content**: Includes approval confirmation and founder's review comment

### **Rejection Email** (Immediate)
- **When**: Sent immediately when **any reviewer rejects**:
  - Finance rejects (status: `finance_rejected`)
  - Co-Founder rejects (status: `cofounder_rejected`)
  - Founder rejects (status: `founder_rejected`)
- **Why**: Submitter should know immediately if their submission is rejected
- **Content**: Includes rejection notice, reviewer name, and review comment

### **No Email Sent For**
- Finance approves (status: `finance_approved`) - Intermediate stage
- Co-Founder approves (status: `cofounder_approved`) - Intermediate stage
- Pending status changes - No action needed

## 📋 Email Templates

### Approval Email
- **Subject**: `Workflow Submission Approved: [Subject]`
- **Design**: Green approval badge, professional layout
- **Includes**:
  - Submission subject
  - Approval confirmation
  - Founder's review comment (if provided)
  - Professional footer

### Rejection Email
- **Subject**: `Workflow Submission Update: [Subject]`
- **Design**: Red rejection badge, clear messaging
- **Includes**:
  - Submission subject
  - Rejection notice
  - Reviewer name (Finance Team / Co-Founder / Founder)
  - Review comment explaining rejection
  - Professional footer

## 🔧 Configuration

### Environment Variables Required

Make sure you have `RESEND_API_KEY` set in your `.env.local`:

```env
RESEND_API_KEY=re_xxxxxxxxxxxxx
```

### Email From Address

- **Development**: Uses `onboarding@resend.dev` (Resend's testing email)
- **Production**: Uses `no-reply@legendholding.com` (Update this to your verified domain)

To change the production email address, update `lib/email.ts`:

```typescript
const fromEmail = process.env.NODE_ENV === 'development' 
  ? 'onboarding@resend.dev'
  : 'no-reply@yourdomain.com'; // Update this
```

## 📧 Email Flow Examples

### Example 1: Finance Rejects
```
1. Finance reviews submission
2. Finance adds comment: "Budget exceeds limits"
3. Finance clicks "Reject"
4. ✅ Email sent immediately to submitter
5. Email subject: "Workflow Submission Update: Branding Budget"
6. Email shows: Rejected by Finance Team with comment
```

### Example 2: Full Approval Flow
```
1. Finance reviews → Approves (No email)
2. Co-Founder reviews → Approves (No email)
3. Founder reviews → Approves
4. ✅ Approval email sent to submitter
5. Email subject: "Workflow Submission Approved: Branding Budget"
6. Email shows: Fully approved with founder's comment
```

### Example 3: Co-Founder Rejects
```
1. Finance reviews → Approves (No email)
2. Co-Founder reviews → Rejects
3. ✅ Rejection email sent immediately to submitter
4. Email subject: "Workflow Submission Update: Branding Budget"
5. Email shows: Rejected by Co-Founder with comment
```

## 🎨 Email Design Features

### Approval Email
- ✅ Green approval badge
- ✅ Professional purple header (matches brand)
- ✅ Clear approval message
- ✅ Review comment displayed prominently
- ✅ Responsive design

### Rejection Email
- ✅ Red rejection badge
- ✅ Clear rejection message
- ✅ Reviewer information
- ✅ Review comment for feedback
- ✅ Encouragement to resubmit
- ✅ Responsive design

## 🔍 Error Handling

- **Email failures don't block status updates**: If email sending fails, the status update still succeeds
- **Errors are logged**: Check server logs for email sending issues
- **Graceful degradation**: System continues to work even if email service is down

## 🧪 Testing

### Development Testing
- Uses Resend's test email (`onboarding@resend.dev`)
- All emails are sent to actual recipient addresses
- Check Resend dashboard for email logs

### Production Testing
1. Make sure `RESEND_API_KEY` is set
2. Verify your domain in Resend dashboard
3. Test with a real submission
4. Check email delivery in Resend dashboard

## 📝 Notes

- **Email is sent asynchronously**: Status update happens first, then email is sent
- **Comments are included**: Both approval and rejection emails include reviewer comments
- **HTML formatted**: Emails are beautifully formatted with inline CSS
- **Mobile responsive**: Email templates work on all devices

## 🚀 Next Steps

1. ✅ Set up `RESEND_API_KEY` in environment variables
2. ✅ Verify your domain in Resend (for production)
3. ✅ Test email sending with a real submission
4. ✅ Monitor email delivery in Resend dashboard

---

**Note**: Email sending is non-blocking. If emails fail to send, the workflow status update will still succeed, but you should check your Resend API key and configuration.

