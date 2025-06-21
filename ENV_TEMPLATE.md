# Environment Variables Template

Create a `.env.local` file in your project root with the following variables:

```env
# Google Analytics 4 (Already configured)
NEXT_PUBLIC_GA4_ID=G-JN8TMP89PM

# Google Tag Manager (Add your GTM ID)
NEXT_PUBLIC_GTM_ID=GTM-XXXXXXX

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

✅ **Google Analytics 4**: Already configured with ID `G-JN8TMP89PM`
⏳ **Other platforms**: Need to add your tracking IDs

## Next Steps

1. **Google Analytics 4** is already working with your ID `G-JN8TMP89PM`
2. Add the other tracking IDs as needed
3. Test the implementation by running `npm run dev` or `pnpm dev`
4. Check browser developer tools to verify tracking is working

## Testing Google Analytics

To verify Google Analytics is working:
1. Open your website in a browser
2. Open Developer Tools (F12)
3. Go to Network tab
4. Look for requests to `google-analytics.com` or `googletagmanager.com`
5. You should see requests with your GA4 ID `G-JN8TMP89PM` 