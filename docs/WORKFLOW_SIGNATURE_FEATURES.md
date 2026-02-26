# Workflow Signature Features

## Overview
The workflow system now implements digital signatures at two critical points:
1. **Submitter Signature**: Required when submitting a document (workflow form)
2. **Founder Signature**: Required for final approval (founder-approval page)

This ensures proper authentication and creates a complete audit trail for document submissions and approvals.

## Features

### 1. Signature Pad Component
- **Location**: `app/components/SignaturePad.tsx`
- **Input Methods**:
  - Mouse drawing (desktop)
  - Touch drawing (tablets/mobile)
- **Features**:
  - Responsive canvas that adjusts to device pixel ratio
  - Clear signature button
  - Visual indicator when empty ("Sign here" placeholder)
  - Saves signature as base64 PNG image

### 2. Submitter Signature Integration
- **Location**: `app/workflow/page.tsx`
- **Purpose**: Authenticates the document submitter
- **Requirements**:
  - Signature is mandatory for submissions (button disabled without signature)
  - Signature resets when form is submitted or reset
  - Appears after file upload section, before submit button
- **Database Column**: `submitter_signature` (TEXT type)
- **Migration**: `supabase/migrations/20250105000001_add_submitter_signature.sql`

### 3. Founder Signature Integration
- **Location**: `app/founder-approval/page.tsx`
- **Purpose**: Authenticates final approval
- **Requirements**:
  - Signature is mandatory for approvals (button disabled without signature)
  - Signature is not required for rejections
  - Signature resets when dialog closes or new submission is viewed
- **Database Column**: `founder_signature` (TEXT type)
- **Migration**: `supabase/migrations/20250105000000_add_founder_signature.sql`

## Usage

### For Submitters (Document Submission)
1. Fill out the workflow form with subject and message
2. Upload your documents
3. **Draw your signature** in the signature pad using:
   - Mouse (desktop)
   - Touch/stylus (mobile/tablet)
4. Click "Clear Signature" to redraw if needed
5. Click "Submit Documents" (disabled until signature is provided)

### For Founders (Final Approval)
1. Open a submission awaiting founder approval
2. Review the submission details
3. Add optional review comments
4. **Draw your signature** in the signature pad using:
   - Mouse (desktop)
   - Touch/stylus (mobile/tablet)
5. Click "Clear Signature" to redraw if needed
6. Click "Final Approve" (disabled until signature is provided)

### For Developers

#### Running the Migrations
```bash
# Apply the migrations to add both signature columns
supabase migration up

# Or if using a hosted instance, run the SQL directly in Supabase dashboard:
# ALTER TABLE workflow_submissions ADD COLUMN IF NOT EXISTS submitter_signature TEXT;
# ALTER TABLE workflow_submissions ADD COLUMN IF NOT EXISTS founder_signature TEXT;
```

#### Accessing Signatures
Signatures are stored as base64 data URLs and can be displayed directly:
```typescript
// Display submitter signature
{submission.submitter_signature && (
  <img 
    src={submission.submitter_signature} 
    alt="Submitter Signature" 
    className="w-full max-w-xs"
  />
)}

// Display founder signature
{submission.founder_signature && (
  <img 
    src={submission.founder_signature} 
    alt="Founder Signature" 
    className="w-full max-w-xs"
  />
)}
```

## Technical Details

### Signature Pad Component API
```typescript
interface SignaturePadProps {
  onSignatureChange: (signature: string | null) => void
  signature: string | null
}
```

### Canvas Configuration
- **Resolution**: Device pixel ratio adjusted for high-DPI displays
- **Line Style**: 2px black rounded caps
- **Output**: PNG format with transparent background
- **Size**: Full width, 192px height (h-48)

### API Changes

**POST Endpoint** (Submission):
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "subject": "Annual Plan 2026",
  "message": "Submission details...",
  "files": [...],
  "submitterSignature": "data:image/png;base64,..."  // Required
}
```

**PATCH Endpoint** (Approval):
```json
{
  "id": "submission-id",
  "status": "approved",
  "reviewer": "founder",
  "comment": "Optional comment",
  "signature": "data:image/png;base64,..."  // Required for approval
}
```

## Validation

### Client-Side (Submitter)
- Signature required before "Submit Documents" button is enabled
- Toast notification if user tries to submit without signature
- Visual feedback with disabled button state
- Form validation checks for signature presence

### Client-Side (Founder)
- Signature required before "Final Approve" button is enabled
- Toast notification if user tries to approve without signature
- Visual feedback with disabled button state

### Server-Side
- Submitter signature stored with every submission
- Founder signature is only stored when status is "approved"
- Founder signature is optional for rejections
- No specific validation on signature format (trusts client)

## Future Enhancements

Potential improvements:
1. **Signature verification**: Validate signature data format
2. **Signature display**: Show signatures in submission history/details/emails
3. **Multiple approval signatures**: Add co-founder signature requirement
4. **Signature metadata**: Store timestamp and IP address with each signature
5. **Signature quality**: Validate minimum strokes/data points
6. **Signature comparison**: Compare signature consistency across submissions
7. **PDF generation**: Include signatures in PDF exports of approved documents

## Browser Compatibility

- ✓ Chrome/Edge (desktop & mobile)
- ✓ Firefox (desktop & mobile)
- ✓ Safari (desktop & mobile)
- ✓ Touch-enabled devices (tablets, touch laptops)
- ✓ Stylus input (Surface, iPad with Apple Pencil, etc.)

## Security Considerations

1. **Data Size**: Signatures are base64 encoded (~50-100KB per signature)
2. **Storage**: TEXT columns can handle large base64 strings (both signatures)
3. **Privacy**: Signatures are stored server-side, not publicly accessible
4. **Audit Trail**: 
   - Submitter signature with `created_at` timestamp
   - Founder signature with `founder_reviewed_at` timestamp
   - Complete chain of custody for documents
5. **Authentication**: Signatures provide proof of who submitted and approved documents

## Testing Checklist

### Submitter Signature
- [ ] Draw signature with mouse on desktop
- [ ] Draw signature with touch on mobile/tablet
- [ ] Clear and redraw signature
- [ ] Verify submit button is disabled without signature
- [ ] Verify signature is saved in database after submission
- [ ] Verify signature resets after successful submission
- [ ] Test signature quality on different devices
- [ ] Verify canvas renders correctly on high-DPI displays

### Founder Signature
- [ ] Draw signature with mouse on desktop
- [ ] Draw signature with touch on mobile/tablet
- [ ] Clear and redraw signature
- [ ] Verify approve button is disabled without signature
- [ ] Verify signature is saved in database after approval
- [ ] Verify rejection works without signature
- [ ] Verify signature resets when dialog closes
- [ ] Test signature quality on different devices
- [ ] Verify canvas renders correctly on high-DPI displays

