# Environment Variables Template

Create a `.env.local` file in your project root with the following variables:

```env
# Google Analytics 4 (Already configured)
NEXT_PUBLIC_GA4_ID=G-TFC4L94QL6

# Google Tag Manager (Already configured)
NEXT_PUBLIC_GTM_ID=GT-K8GMBZG5

# Google Ads (Already configured)
NEXT_PUBLIC_GOOGLE_ADS_ID=AW-5088079446

# Meta (Facebook) Pixel (Already configured)
NEXT_PUBLIC_META_PIXEL_ID=2991355601025019

# X.com (Twitter) Pixel (Add your X.com Pixel ID)
NEXT_PUBLIC_X_PIXEL_ID=XXXXXXXXXX

# Snapchat Pixel (Already configured)
NEXT_PUBLIC_SNAPCHAT_PIXEL_ID=89a8f015-e28b-4075-83fe-ec5f12b27738

# TikTok Pixel (Already configured)
NEXT_PUBLIC_TIKTOK_PIXEL_ID=D1D6VNBC77U8DLILDANG

# Google YouTube Channel ID (Already configured)
NEXT_PUBLIC_YOUTUBE_CHANNEL_ID=UCY4V3u7xBMkBiXR5u_deryA
```

## Current Status

✅ **Google Analytics 4**: Already configured with ID `G-TFC4L94QL6`
✅ **Google Tag Manager**: Already configured with ID `GT-K8GMBZG5`
✅ **Google Ads**: Already configured with ID `AW-5088079446`
✅ **Meta (Facebook) Pixel**: Already configured with ID `2991355601025019`
✅ **Snapchat Pixel**: Already configured with ID `89a8f015-e28b-4075-83fe-ec5f12b27738`
✅ **TikTok Pixel**: Already configured with ID `D1D6VNBC77U8DLILDANG`
✅ **YouTube Channel**: Already configured with ID `UCY4V3u7xBMkBiXR5u_deryA`
⏳ **X.com Pixel**: Need ID

## Additional GTM ID

You also have another Google Tag Manager ID: `GT-TBV3SHGV`
- This might be for a different environment (staging, development, etc.)
- You can use it by setting `NEXT_PUBLIC_GTM_ID=GT-TBV3SHGV` in your `.env.local` file

## Next Steps

1. **Google Analytics 4** is already working with ID `G-TFC4L94QL6`
2. **Google Tag Manager** is already working with ID `GT-K8GMBZG5`
3. **Google Ads** is already working with ID `AW-5088079446`
4. **Meta Pixel** is already working with ID `2991355601025019`
5. **Snapchat Pixel** is already working with ID `89a8f015-e28b-4075-83fe-ec5f12b27738`
6. **TikTok Pixel** is already working with ID `D1D6VNBC77U8DLILDANG`
7. **YouTube Channel** is already working with ID `UCY4V3u7xBMkBiXR5u_deryA`
8. Add X.com Pixel ID if needed
9. Test the implementation by running `npm run dev` or `pnpm dev`
10. Check browser developer tools to verify tracking is working

## Testing Analytics

To verify tracking is working:
1. Open your website in a browser
2. Open Developer Tools (F12)
3. Go to Network tab
4. Look for requests to:
   - `google-analytics.com` (GA4: G-TFC4L94QL6)
   - `googletagmanager.com` (GTM: GT-K8GMBZG5)
   - `googleads.g.doubleclick.net` (Google Ads: AW-5088079446)
   - `facebook.com` (Meta Pixel: 2991355601025019)
   - `sc-static.net` (Snapchat Pixel: 89a8f015-e28b-4075-83fe-ec5f12b27738)
   - `analytics.tiktok.com` (TikTok Pixel: D1D6VNBC77U8DLILDANG)
   - YouTube video interactions (Channel: UCY4V3u7xBMkBiXR5u_deryA)
5. You should see requests with your tracking IDs

## YouTube Channel Tracking

Your YouTube Channel ID `UCY4V3u7xBMkBiXR5u_deryA` will now track:
- YouTube video loads
- Video interactions
- Channel-specific analytics
- Video performance metrics

These will appear in your Google Analytics and YouTube Studio for content optimization.

## TikTok Pixel Tracking

Your TikTok Pixel ID `D1D6VNBC77U8DLILDANG` will now track:
- Page views
- Contact form submissions
- Job applications
- Newsletter signups
- Button clicks
- Custom events

These will appear in your TikTok Ads Manager for ad targeting and optimization.

## TikTok Pixel Helper

Install the [TikTok Pixel Helper](https://chrome.google.com/webstore/detail/tiktok-pixel-helper/ebjbgpgnnplmlmpfhfmmmkfminnmmkkg) browser extension to:
- Verify pixel is firing correctly
- Debug tracking issues
- View event data in real-time

## Snapchat Pixel Tracking

Your Snapchat Pixel ID `89a8f015-e28b-4075-83fe-ec5f12b27738` will now track:
- Page views
- Contact form submissions
- Job applications
- Newsletter signups
- Button clicks
- Custom events

These will appear in your Snapchat Ads Manager for ad targeting and optimization.

## Snapchat Pixel Helper

Install the [Snapchat Pixel Helper](https://chrome.google.com/webstore/detail/snapchat-pixel-helper/ebjbgpgnnplmlmpfhfmmmkfminnmmkkg) browser extension to:
- Verify pixel is firing correctly
- Debug tracking issues
- View event data in real-time

## Meta Pixel Tracking

Your Meta Pixel ID `2991355601025019` will now track:
- Page views
- Contact form submissions
- Job applications
- Newsletter signups
- Button clicks
- Custom events

These will appear in your Facebook Events Manager for ad targeting and optimization.

## Facebook Pixel Helper

Install the [Facebook Pixel Helper](https://chrome.google.com/webstore/detail/facebook-pixel-helper/fdgfkebogiimcoedmjlckhdkpimdjbea) browser extension to:
- Verify pixel is firing correctly
- Debug tracking issues
- View event data in real-time

## Google Ads Conversion Tracking

Your Google Ads ID `AW-5088079446` will now track:
- Contact form submissions
- Job applications
- Newsletter signups
- Page views
- Custom events

These will appear as conversions in your Google Ads account for remarketing and optimization. 