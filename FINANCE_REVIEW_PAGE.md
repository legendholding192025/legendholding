# Finance Review Page

## Overview
A simple, user-friendly page at `/finance-review` where finance team members can review and approve/reject workflow document submissions without needing admin panel access.

## Features

### 📊 Dashboard Statistics
- **Total Submissions**: All workflow submissions
- **Pending Review**: Number of items awaiting review
- **Reviewed**: Number of approved/rejected items

### 📝 Submission Management

**Pending Review Section:**
- Shows all submissions with status "pending"
- Each submission displays:
  - Subject
  - Submission date
  - Message preview
  - File information (if attached)
  - Status badge
- Action buttons:
  - **View Details**: Opens detailed view with full message and file download
  - **Approve**: Instantly approve the submission
  - **Reject**: Instantly reject the submission

**Reviewed Submissions Section:**
- Shows all previously reviewed submissions
- Displays with reduced opacity to differentiate from pending items
- View-only mode (can still open details)
- Shows approval/rejection status

### 🔍 Detailed View Modal
When clicking "View Details":
- Full subject and message
- Submission date and time
- File attachment with download button
- Current status
- Approve/Reject buttons (for pending items)

### ✨ User Experience
- Clean, modern interface matching your site design
- Responsive layout for all devices
- Smooth animations
- Real-time updates after actions
- Toast notifications for success/error messages
- Loading states during operations

## Technical Details

### Files Created
- `app/finance-review/page.tsx` - Main page component
- `app/finance-review/layout.tsx` - Page layout and metadata

### API Integration
Uses existing `/api/workflow` endpoints:
- **GET**: Fetch all submissions
- **PATCH**: Update submission status (approve/reject)

### No Authentication Required
This page does not require admin login, making it accessible to any finance team member with the URL. If you need authentication, you can add it using the existing workflow auth system.

## Usage

### Access the Page
Navigate to: `http://localhost:3000/finance-review`

### Review Process
1. **View Pending Items**: All pending submissions appear at the top
2. **Check Details**: Click "View Details" to read full submission and download files
3. **Make Decision**: 
   - Click "Approve" (green button) to approve
   - Click "Reject" (red button) to reject
4. **Confirmation**: Toast notification confirms the action
5. **Auto-Refresh**: Page updates to show current status

### Quick Actions
For quick review, you can approve/reject directly from the card view without opening details.

## Customization

### Add Authentication
To restrict access, you can add authentication at the top of the page:

```typescript
// Add to app/finance-review/page.tsx
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { redirect } from "next/navigation"

// Inside component
useEffect(() => {
  const checkAuth = async () => {
    const { data: { session } } = await supabase.auth.getSession()
    if (!session) {
      redirect('/login') // or your login page
    }
  }
  checkAuth()
}, [])
```

### Change Colors
The page uses your brand colors:
- Primary: `#5D376E` (purple)
- Accent: `#EE8900` / `#F08900` (orange)
- Success: Green for approved
- Error: Red for rejected
- Warning: Yellow for pending

### Modify Layout
Edit `app/finance-review/page.tsx` to:
- Change card layout
- Add/remove fields
- Customize button placement
- Adjust responsive breakpoints

## Differences from Admin Page

| Feature | Admin Page | Finance Review Page |
|---------|-----------|---------------------|
| **Location** | `/admin/workflow-submissions` | `/finance-review` |
| **Authentication** | Required (admin login) | Optional |
| **Navigation** | Admin sidebar | Standalone with header/footer |
| **Delete Option** | Yes | No |
| **Export to Excel** | Yes | No |
| **Filtering Tabs** | Yes (All/Pending/Approved/Rejected) | No (Grouped sections) |
| **Layout** | Admin dashboard | Public-facing design |
| **Audience** | Super admins only | Finance team |

## Integration with Workflow System

This page integrates seamlessly with the workflow submission system:
- Uses same database table (`workflow_submissions`)
- Uses same API endpoints
- Status updates are immediately reflected across all interfaces
- Approvals/rejections are visible in admin panel

## Benefits

### For Finance Team
- No need for admin panel access
- Simple, focused interface
- Quick approval workflow
- Easy file downloads
- Mobile-friendly

### For Administrators
- Keep admin panel separate
- Maintain security boundaries
- Track all reviews in one database
- Export capabilities remain in admin panel

## Future Enhancements

Potential improvements:
- Add comments/notes to approvals/rejections
- Email notifications on status changes
- Bulk approve/reject functionality
- Filter by date range
- Search functionality
- User authentication
- Approval history/audit log
- Role-based access control

## Support

The page is fully functional and ready to use. All workflow submissions from `/workflow` will appear here for review.

For technical support or modifications, refer to:
- `WORKFLOW_SUBMISSION_GUIDE.md` for overall system documentation
- `app/api/workflow/route.ts` for API details
- `supabase/migrations/20250326000000_create_workflow_submissions.sql` for database schema

