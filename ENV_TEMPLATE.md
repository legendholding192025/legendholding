# Environment Variables Template

Create a `.env.local` file in your project root with the following variables:

```env
# Google Analytics 4 (Already configured)
NEXT_PUBLIC_GA4_ID=G-TFC4L94QL6

# Google Tag Manager (Already configured)
NEXT_PUBLIC_GTM_ID=GT-K8GMBZG5

# Google Ads (Add your Google Ads ID)
NEXT_PUBLIC_GOOGLE_ADS_ID=AW-XXXXXXXXXX

# Meta (Facebook) Pixel (Add your Meta Pixel ID)
NEXT_PUBLIC_META_PIXEL_ID=XXXXXXXXXX

# X.com (Twitter) Pixel (Add your X.com Pixel ID)
NEXT_PUBLIC_X_PIXEL_ID=XXXXXXXXXX

# Snapchat Pixel (Add your Snapchat Pixel ID)
NEXT_PUBLIC_SNAPCHAT_PIXEL_ID=XXXXXXXXXX

# TikTok Pixel (Add your TikTok Pixel ID)
NEXT_PUBLIC_TIKTOK_PIXEL_ID=XXXXXXXXXX

# Google YouTube Channel ID (Add your YouTube Channel ID)
NEXT_PUBLIC_YOUTUBE_CHANNEL_ID=UCXXXXXXXXXX
```

## Current Status

✅ **Google Analytics 4**: Already configured with ID `G-TFC4L94QL6`
✅ **Google Tag Manager**: Already configured with ID `GT-K8GMBZG5`
⏳ **Other platforms**: Need to add your tracking IDs

## Additional GTM ID

You also have another Google Tag Manager ID: `GT-TBV3SHGV`
- This might be for a different environment (staging, development, etc.)
- You can use it by setting `NEXT_PUBLIC_GTM_ID=GT-TBV3SHGV` in your `.env.local` file

## Next Steps

1. **Google Analytics 4** is already working with ID `G-TFC4L94QL6`
2. **Google Tag Manager** is already working with ID `GT-K8GMBZG5`
3. Add the other tracking IDs as needed
4. Test the implementation by running `npm run dev` or `pnpm dev`
5. Check browser developer tools to verify tracking is working

## Testing Analytics

To verify tracking is working:
1. Open your website in a browser
2. Open Developer Tools (F12)
3. Go to Network tab
4. Look for requests to:
   - `google-analytics.com` (GA4: G-TFC4L94QL6)
   - `googletagmanager.com` (GTM: GT-K8GMBZG5)
5. You should see requests with your tracking IDs 