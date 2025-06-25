# Analytics Setup Guide for Legend Holding Group

This guide will help you set up comprehensive analytics tracking for your website including Google Tag Manager, Google Analytics, Google Ads, Meta Pixel, X.com Pixel, Snapchat Pixel, TikTok Pixel, and YouTube tracking.

## 🚀 Quick Setup

1. **Create Environment Variables**
   Create a `.env.local` file in your project root with the following variables:

```env
# Google Tag Manager
NEXT_PUBLIC_GTM_ID=GTM-XXXXXXX

# Google Analytics 4
NEXT_PUBLIC_GA4_ID=G-XXXXXXXXXX

# Google Ads
NEXT_PUBLIC_GOOGLE_ADS_ID=AW-XXXXXXXXXX

# Meta (Facebook) Pixel
NEXT_PUBLIC_META_PIXEL_ID=XXXXXXXXXX

# X.com (Twitter) Pixel
NEXT_PUBLIC_X_PIXEL_ID=XXXXXXXXXX

# Snapchat Pixel
NEXT_PUBLIC_SNAPCHAT_PIXEL_ID=XXXXXXXXXX

# TikTok Pixel
NEXT_PUBLIC_TIKTOK_PIXEL_ID=XXXXXXXXXX

# Google YouTube Channel ID
NEXT_PUBLIC_YOUTUBE_CHANNEL_ID=UCXXXXXXXXXX
```

## 📊 Tracking Platforms Setup

### 1. Google Tag Manager (GTM)
- Go to [Google Tag Manager](https://tagmanager.google.com/)
- Create a new account or use existing
- Create a new container for your website
- Copy the GTM container ID (format: GTM-XXXXXXX)
- Add it to `NEXT_PUBLIC_GTM_ID`

### 2. Google Analytics 4 (GA4)
- Go to [Google Analytics](https://analytics.google.com/)
- Create a new property or use existing
- Set up a web data stream
- Copy the Measurement ID (format: G-XXXXXXXXXX)
- Add it to `NEXT_PUBLIC_GA4_ID`

### 3. Google Ads
- Go to [Google Ads](https://ads.google.com/)
- Navigate to Tools & Settings > Setup > Conversions
- Create a new conversion action
- Copy the conversion ID (format: AW-XXXXXXXXXX)
- Add it to `NEXT_PUBLIC_GOOGLE_ADS_ID`

### 4. Meta (Facebook) Pixel
- Go to [Facebook Business Manager](https://business.facebook.com/)
- Navigate to Events Manager
- Create a new data source (Web)
- Copy the Pixel ID
- Add it to `NEXT_PUBLIC_META_PIXEL_ID`

### 5. X.com (Twitter) Pixel
- Go to [Twitter Ads](https://ads.twitter.com/)
- Navigate to Tools > Conversion tracking
- Create a new website tag
- Copy the Pixel ID
- Add it to `NEXT_PUBLIC_X_PIXEL_ID`

### 6. Snapchat Pixel
- Go to [Snapchat Ads Manager](https://ads.snapchat.com/)
- Navigate to Events Manager
- Create a new Pixel
- Copy the Pixel ID
- Add it to `NEXT_PUBLIC_SNAPCHAT_PIXEL_ID`

### 7. TikTok Pixel
- Go to [TikTok Ads Manager](https://ads.tiktok.com/)
- Navigate to Assets > Events
- Create a new Pixel
- Copy the Pixel ID
- Add it to `NEXT_PUBLIC_TIKTOK_PIXEL_ID`

### 8. YouTube Channel ID
- Go to your YouTube channel
- Copy the Channel ID from the URL (format: UCXXXXXXXXXX)
- Add it to `NEXT_PUBLIC_YOUTUBE_CHANNEL_ID`

## 📄 Page Names for Analytics Clarity

The following page names are automatically tracked for better analytics clarity:

### Main Pages
- **Home** - `/`
- **About Us** - `/about`
- **Contact Us** - `/contact`
- **Careers** - `/careers`
- **News** - `/news`
- **Sitemap** - `/sitemap`
- **Privacy Policy** - `/privacy-policy`
- **Cookie Policy** - `/cookie-policy`

### Who We Are Section
- **Who We Are** - `/who-we-are`
- **About Us** - `/who-we-are/about-us`
- **Brand Story** - `/who-we-are/brand-story`
- **Our Journey** - `/who-we-are/journey`
- **The Team** - `/who-we-are/the-team`
- **Partners** - `/who-we-are/partners`
- **Corporate Social Responsibility** - `/who-we-are/csr`

### Our Brands Section
- **Our Brands** - `/our-brands`
- **Legend Automobile Services** - `/our-brands/legend-automobile-services`
- **Legend Commercial Vehicles** - `/our-brands/legend-commercial-vehicles`
- **Legend Global Media** - `/our-brands/legend-global-media`
- **Legend Green Energy** - `/our-brands/legend-green-energy`
- **Legend Motorcycles** - `/our-brands/legend-motorcycles`
- **Legend Motors Dealership** - `/our-brands/legend-motors-dealership`
- **Legend Motors Trading** - `/our-brands/legend-motors-trading`
- **Legend Pre-Owned Vehicles** - `/our-brands/legend-pre-owned-vehicles`
- **Legend Technical Services** - `/our-brands/legend-technical-services`
- **Legend Travel** - `/our-brands/legend-travel`
- **Legend World Rent-A-Car** - `/our-brands/legend-world-rent-a-car`
- **Zul Energy** - `/our-brands/zul-energy`

### Careers Section
- **Available Jobs** - `/careers/jobs`
- **Job Details** - `/careers/[id]`
- **Application Submitted** - `/careers/thank-you`

### News Section
- **News Article** - `/news/[id]`

### Admin Section
- **Admin Dashboard** - `/admin`
- **Admin Jobs** - `/admin/jobs`
- **Admin News** - `/admin/news`
- **Admin Newsletters** - `/admin/newsletters`
- **Admin Submissions** - `/admin/submissions`
- **Admin Applications** - `/admin/applications`
- **Admin Settings** - `/admin/settings`
- **Admin Login** - `/admin/login`

## 🎯 Event Tracking

The following events are automatically tracked:

### Form Submissions
- Contact forms
- Job applications
- Newsletter subscriptions
- All other forms

### Button Clicks
- All button interactions
- CTA buttons
- Navigation buttons

### Page Views
- All page visits
- Dynamic route changes
- Brand page visits (special tracking)

### Conversions
- Job applications
- Contact form submissions
- Newsletter signups

### Video Interactions
- YouTube video plays
- Video loads

### Social Media
- Social media link clicks
- Platform-specific interactions

## 🔧 Custom Event Tracking

You can use the tracking functions in your components:

```typescript
import { 
  trackEvent, 
  trackPageView, 
  trackConversion, 
  trackFormSubmission,
  trackButtonClick,
  trackLinkClick,
  trackJobApplication,
  trackContactForm,
  trackNewsletterSubscription,
  trackVideoPlay,
  trackSocialMediaClick,
  trackBrandPageVisit,
  trackSearch,
  trackFileDownload
} from '@/lib/analytics';

// Example usage
trackJobApplication('Software Engineer', 'job-123');
trackContactForm('general-inquiry');
trackNewsletterSubscription('footer');
```

## 🧪 Testing

1. **Install the project dependencies:**
   ```bash
   npm install
   # or
   pnpm install
   ```

2. **Start the development server:**
   ```bash
   npm run dev
   # or
   pnpm dev
   ```

3. **Test tracking:**
   - Open browser developer tools
   - Check the Network tab for tracking requests
   - Use browser extensions like:
     - Google Tag Assistant
     - Facebook Pixel Helper
     - TikTok Pixel Helper

## 📈 Analytics Dashboard Setup

### Google Analytics 4
1. Set up custom dimensions for:
   - Page Name
   - Brand Name
   - Form Type
   - Button Location

2. Create custom reports for:
   - Brand page performance
   - Form conversion rates
   - Job application funnel
   - User journey analysis

### Google Tag Manager
1. Set up triggers for:
   - Page views
   - Form submissions
   - Button clicks
   - Video interactions

2. Create variables for:
   - Page path
   - Page title
   - User type
   - Conversion value

## 🔒 Privacy Compliance

The tracking implementation includes:
- Cookie consent integration
- GDPR compliance considerations
- Privacy policy integration
- Data anonymization options

## 🚨 Troubleshooting

### Common Issues:
1. **Tracking not working:**
   - Check environment variables are set correctly
   - Verify tracking IDs are valid
   - Check browser console for errors

2. **Duplicate tracking:**
   - Ensure GTM is not loading GA4 separately
   - Check for multiple script tags

3. **Missing events:**
   - Verify event names match across platforms
   - Check data layer implementation

### Debug Mode:
Add `?debug=true` to any URL to enable debug logging in the console.

## 📞 Support

For technical support or questions about the analytics implementation, please refer to the individual platform documentation or contact your development team.

---

**Note:** Replace all placeholder values (XXXXXXX, G-XXXXXXXXXX, etc.) with your actual tracking IDs before deploying to production. 