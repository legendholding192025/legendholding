# Admin ImageUpload Component

## Overview

The `ImageUpload` component provides a user-friendly interface for admins to upload images directly to the Legend Holding Group CDN (`https://cdn.legendholding.com/upload.php`). This component replaces manual URL input with a drag-and-drop upload interface.

## Features

- **Drag & Drop**: Users can drag images directly onto the upload area
- **Click to Upload**: Traditional file picker interface
- **Image Preview**: Shows uploaded image with hover effects
- **File Validation**: Checks file type and size before upload
- **Progress Indication**: Loading spinner during upload
- **Error Handling**: User-friendly error messages
- **Responsive Design**: Works on all device sizes

## Usage

### Basic Usage

```tsx
import { ImageUpload } from "@/components/admin/ImageUpload"

<ImageUpload
  value={imageUrl}
  onChange={(url) => setImageUrl(url)}
  placeholder="Upload an image"
/>
```

### Advanced Usage

```tsx
<ImageUpload
  value={formData.image_url}
  onChange={(url) => {
    const newFormData = { ...formData, image_url: url }
    setFormData(newFormData)
  }}
  placeholder="Upload banner image"
  showPreview={true}
  maxSize={10} // 10MB
  accept="image/*"
/>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `value` | `string` | - | Current image URL (required) |
| `onChange` | `(url: string) => void` | - | Callback when image URL changes (required) |
| `onRemove` | `() => void` | - | Optional callback when image is removed |
| `placeholder` | `string` | "Upload an image" | Text shown in upload area |
| `className` | `string` | "" | Additional CSS classes |
| `showPreview` | `boolean` | `true` | Whether to show image preview |
| `accept` | `string` | "image/*" | File types to accept |
| `maxSize` | `number` | `10` | Maximum file size in MB |

## CDN Integration

The component automatically uploads images to `https://cdn.legendholding.com/upload.php` and expects a JSON response with the following structure:

```json
{
  "success": true,
  "url": "https://cdn.legendholding.com/images/uploaded-image.jpg"
}
```

### Error Response Format

```json
{
  "success": false,
  "message": "Error description"
}
```

## File Requirements

- **Supported Formats**: JPG, PNG, GIF, WebP
- **Maximum Size**: Configurable (default: 10MB)
- **File Type Validation**: Automatic MIME type checking

## Styling

The component uses Tailwind CSS classes and follows the Legend Holding Group design system:

- **Primary Color**: `#5E366D` (purple)
- **Hover States**: Smooth transitions and color changes
- **Border Styles**: Dashed borders for upload areas
- **Responsive**: Adapts to different screen sizes

## Integration Examples

### News Articles

```tsx
// In news admin form
<ImageUpload
  value={image.image_url}
  onChange={(url) => {
    const newImages = [...formData.images]
    newImages[index].image_url = url
    setFormData({ ...formData, images: newImages })
  }}
  placeholder={`Upload ${image.image_type} image`}
  showPreview={true}
  maxSize={10}
/>
```



## Error Handling

The component handles various error scenarios:

- **Invalid File Type**: Shows error message for non-image files
- **File Too Large**: Displays size limit exceeded message
- **Upload Failures**: Shows server error messages
- **Network Issues**: Handles connection problems gracefully

## Performance

- **Optimized Uploads**: Uses FormData for efficient file transfer
- **Memory Management**: Proper cleanup of file references
- **Loading States**: Prevents multiple simultaneous uploads
- **Error Recovery**: Allows retry on failed uploads

## Browser Support

- **Modern Browsers**: Full support for drag & drop
- **Mobile Devices**: Touch-friendly interface
- **Fallbacks**: Graceful degradation for older browsers

## Security

- **File Validation**: Client-side file type and size checking
- **Server Validation**: CDN endpoint validates uploads
- **No Local Storage**: Files are uploaded directly to CDN
- **Secure Endpoint**: Uses HTTPS for all uploads
