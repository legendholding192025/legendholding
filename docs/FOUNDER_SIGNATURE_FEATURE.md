# Workflow Signature Features

## Overview
The workflow system now implements a dual-signature approval process in the founder-approval page:
1. **Submitter Signature**: Captured during final approval (in founder-approval page)
2. **Founder Signature**: Captured during final approval (in founder-approval page)

Both the document submitter and the founder must be present to sign together during the final approval process. This ensures proper authentication and creates a complete audit trail for document approvals.

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

### 2. Dual Signature Integration in Founder Approval
- **Location**: `app/founder-approval/page.tsx`
- **Purpose**: Authenticates both the document submitter and the founder during final approval
- **Workflow**:
  1. Document is submitted without signature (via workflow form)
  2. Document goes through finance and co-founder approval
  3. When ready for final approval, both submitter and founder must be present
  4. Submitter signs first (in the approval dialog)
  5. Founder signs second (in the approval dialog)
  6. Both signatures are captured and stored together
- **Requirements**:
  - Both signatures are mandatory for approvals (button disabled without both)
  - Signatures are not required for rejections
  - Signatures reset when dialog closes or new submission is viewed
- **Database Columns**: 
  - `submitter_signature` (TEXT type) - Migration: `supabase/migrations/20250105000001_add_submitter_signature.sql`
  - `founder_signature` (TEXT type) - Migration: `supabase/migrations/20250105000000_add_founder_signature.sql`

## Usage

### For Submitters (Document Submission)
1. Fill out the workflow form with subject and message
2. Upload your documents
3. Click "Submit Documents"
4. **Note**: No signature is required at this stage

### For Final Approval (Submitter + Founder Together)
When a document reaches the founder-approval stage, both the submitter and founder must be present:

1. **Founder** opens the submission in the founder-approval page
2. Both parties review the submission details and previous approval comments
3. **Founder** adds optional review comments
4. **Submitter signs first**:
   - Draw signature in the "Submitter Signature" pad using mouse or touch
   - Can click "Clear Signature" to redraw if needed
5. **Founder signs second**:
   - Draw signature in the "Founder Signature" pad using mouse or touch
   - Can click "Clear Signature" to redraw if needed
6. Click "Final Approve" (disabled until both signatures are provided)

This dual-signature process ensures both parties are present and agree to the approval.

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
  "files": [...]
}
```
Note: No signatures are required during submission.

**PATCH Endpoint** (Final Approval):
```json
{
  "id": "submission-id",
  "status": "approved",
  "reviewer": "founder",
  "comment": "Optional comment",
  "submitterSignature": "data:image/png;base64,...",  // Required for approval
  "founderSignature": "data:image/png;base64,..."      // Required for approval
}
```
Both signatures are captured and sent together during the final approval process.

## Validation

### Client-Side (Final Approval)
- Both submitter and founder signatures required before "Final Approve" button is enabled
- Toast notification if user tries to approve without submitter's signature
- Toast notification if user tries to approve without founder's signature
- Visual feedback with disabled button state
- Neither signature is required for rejections

### Server-Side
- Both signatures are only stored when status is "approved"
- Signatures are optional for rejections
- No specific validation on signature format (trusts client)

## Future Enhancements

Potential improvements:
1. **Signature verification**: Validate signature data format
2. **Signature display**: Show signatures in submission history/details/emails
3. **Multiple approval signatures**: Add finance and co-founder signature requirements
4. **Signature metadata**: Store timestamp and IP address with each signature
5. **Signature quality**: Validate minimum strokes/data points
6. **Signature comparison**: Compare signature consistency across submissions
7. **PDF generation**: Include both signatures in PDF exports of approved documents
8. **Video recording**: Record the signing ceremony for additional verification

## Browser Compatibility

- ✓ Chrome/Edge (desktop & mobile)
- ✓ Firefox (desktop & mobile)
- ✓ Safari (desktop & mobile)
- ✓ Touch-enabled devices (tablets, touch laptops)
- ✓ Stylus input (Surface, iPad with Apple Pencil, etc.)

## Security Considerations

1. **Data Size**: Signatures are base64 encoded (~50-100KB per signature, ~100-200KB total)
2. **Storage**: TEXT columns can handle large base64 strings (both signatures)
3. **Privacy**: Signatures are stored server-side, not publicly accessible
4. **Audit Trail**: 
   - Both signatures captured at `founder_reviewed_at` timestamp
   - Complete chain of custody for documents
   - Proves both parties were present during final approval
5. **Authentication**: Dual signature provides proof that both submitter and founder approved the document together
6. **Physical Presence**: The workflow requires both parties to be present, adding an extra layer of verification

## Testing Checklist

### Dual Signature Process
- [ ] Submit a document without signatures (should work)
- [ ] Navigate to founder-approval page after finance and co-founder approval
- [ ] Verify two signature pads are displayed (submitter first, founder second)
- [ ] Draw submitter signature with mouse on desktop
- [ ] Draw founder signature with mouse on desktop
- [ ] Verify approve button is disabled until both signatures are provided
- [ ] Clear and redraw submitter signature
- [ ] Clear and redraw founder signature
- [ ] Verify both signatures are saved in database after approval
- [ ] Verify rejection works without any signatures
- [ ] Verify signatures reset when dialog closes
- [ ] Test both signature pads with touch on mobile/tablet
- [ ] Test signature quality on different devices
- [ ] Verify canvases render correctly on high-DPI displays
- [ ] Verify appropriate error messages for missing signatures
- [ ] Test the complete workflow: submit → finance → co-founder → founder dual-signature approval

