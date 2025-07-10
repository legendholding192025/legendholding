'use client';

import Script from 'next/script';
import { useEffect, useState } from 'react';
import { ANALYTICS_CONFIG } from '@/lib/analytics';

interface GoogleTagManagerProps {
  gtmId?: string;
}

export default function GoogleTagManager({ gtmId }: GoogleTagManagerProps) {
  const gtmIdToUse = gtmId || ANALYTICS_CONFIG.GTM_ID;
  const [canLoadScripts, setCanLoadScripts] = useState(false);

  useEffect(() => {
    // In development, load scripts immediately
    if (process.env.NODE_ENV === 'development') {
      setCanLoadScripts(true);
      return;
    }

    // In production, wait for autoblocker to be ready
    const checkAutoblocker = () => {
      // Check if autoblocker is ready or if we're not using it
      if (typeof window !== 'undefined') {
        // Give autoblocker time to initialize (3 seconds max)
        setTimeout(() => {
          setCanLoadScripts(true);
        }, 3000);
      }
    };

    checkAutoblocker();

    // Initialize Google Tag Manager
    if (typeof window !== 'undefined' && window.dataLayer) {
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({
        'gtm.start': new Date().getTime(),
        event: 'gtm.js',
      });
    }
  }, []);

  return (
    <>
      {/* Google Tag Manager (noscript) */}
      <noscript>
        <iframe
          src={`https://www.googletagmanager.com/ns.html?id=${gtmIdToUse}`}
          height="0"
          width="0"
          style={{ display: 'none', visibility: 'hidden' }}
        />
      </noscript>

      {/* Only load tracking scripts when safe to do so */}
      {canLoadScripts && (
        <>
          {/* Google Tag Manager */}
          <Script
            id="gtm-script"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
              __html: `
                (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
                new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
                j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
                'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
                })(window,document,'script','dataLayer','${gtmIdToUse}');
              `,
            }}
          />

          {/* Google Analytics 4 */}
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${ANALYTICS_CONFIG.GA4_ID}`}
            strategy="afterInteractive"
          />

          {/* Google Analytics 4 Configuration */}
          <Script id="ga4-config" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${ANALYTICS_CONFIG.GA4_ID}', {
                page_title: document.title,
                page_location: window.location.href,
                send_page_view: true
              });
            `}
          </Script>

          {/* Google Ads */}
          <Script id="google-ads" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${ANALYTICS_CONFIG.GOOGLE_ADS_ID}');
            `}
          </Script>

          {/* Meta (Facebook) Pixel */}
          <Script id="meta-pixel" strategy="afterInteractive">
            {`
              !function(f,b,e,v,n,t,s)
              {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
              n.callMethod.apply(n,arguments):n.queue.push(arguments)};
              if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
              n.queue=[];t=b.createElement(e);t.async=!0;
              t.src=v;s=b.getElementsByTagName(e)[0];
              s.parentNode.insertBefore(t,s)}(window, document,'script',
              'https://connect.facebook.net/en_US/fbevents.js');
              fbq('init', '${ANALYTICS_CONFIG.META_PIXEL_ID}');
              fbq('track', 'PageView');
            `}
          </Script>

          {/* Meta Pixel Noscript */}
          <noscript>
            <img 
              height="1" 
              width="1" 
              style={{ display: 'none' }}
              src={`https://www.facebook.com/tr?id=${ANALYTICS_CONFIG.META_PIXEL_ID}&ev=PageView&noscript=1`}
              alt=""
            />
          </noscript>

          {/* X.com (Twitter) Pixel */}
          {ANALYTICS_CONFIG.X_PIXEL_ID !== 'XXXXXXXXXX' && (
            <Script id="x-pixel" strategy="afterInteractive">
              {`
                !function(e,t,n,s,u,a){e.twq||(s=e.twq=function(){s.exe?s.exe.apply(s,arguments):s.queue.push(arguments);
                },s.version='1.1',s.queue=[],u=t.createElement(n),u.async=!0,u.src='https://static.ads-twitter.com/uwt.js',
                a=t.getElementsByTagName(n)[0],a.parentNode.insertBefore(u,a))}(window,document,'script');
                twq('config','${ANALYTICS_CONFIG.X_PIXEL_ID}');
              `}
            </Script>
          )}

          {/* Snapchat Pixel */}
          {ANALYTICS_CONFIG.SNAPCHAT_PIXEL_ID !== 'XXXXXXXXXX' && (
            <Script id="snapchat-pixel" strategy="afterInteractive">
              {`
                (function(e,t,n){if(e.snaptr)return;var a=e.snaptr=function() {
                a.handleRequest?a.handleRequest.apply(a,arguments):a.queue.push(arguments)};
                a.queue=[];var s='script';r=t.createElement(s);r.async=!0;
                r.src=n;var u=t.getElementsByTagName(s)[0];
                u.parentNode.insertBefore(r,u);})(window,document,
                'https://sc-static.net/scevent.min.js');
                snaptr('init', '${ANALYTICS_CONFIG.SNAPCHAT_PIXEL_ID}');
                snaptr('track', 'PAGE_VIEW');
              `}
            </Script>
          )}

          {/* TikTok Pixel */}
          <Script id="tiktok-pixel" strategy="afterInteractive">
            {`
              !function (w, d, t) {
                w.TiktokAnalyticsObject=t;var ttq=w[t]=w[t]||[];ttq.methods=["page","track","identify","instances","debug","on","off","once","ready","alias","group","enableCookie","disableCookie","holdConsent","revokeConsent","grantConsent"],ttq.setAndDefer=function(t,e){t[e]=function(){t.push([e].concat(Array.prototype.slice.call(arguments,0)))}};for(var i=0;i<ttq.methods.length;i++)ttq.setAndDefer(ttq,ttq.methods[i]);ttq.instance=function(t){for( var e=ttq._i[t]||[],n=0;n<ttq.methods.length;n++)ttq.setAndDefer(e,ttq.methods[n]);return e},ttq.load=function(e,n){var r="https://analytics.tiktok.com/i18n/pixel/events.js",o=n&&n.partner;ttq._i=ttq._i||{},ttq._i[e]=[],ttq._i[e]._u=r,ttq._t=ttq._t||{},ttq._t[e]=+new Date,ttq._o=ttq._o||{},ttq._o[e]=n||{};n=document.createElement("script") ;n.type="text/javascript",n.async=!0,n.src=r+"?sdkid="+e+"&lib="+t;e=document.getElementsByTagName("script")[0];e.parentNode.insertBefore(n,e)};
                ttq.load('${ANALYTICS_CONFIG.TIKTOK_PIXEL_ID}');
                ttq.page();
              }(window, document, 'ttq');
            `}
          </Script>

          {/* YouTube Tracking */}
          <Script id="youtube-tracking" strategy="afterInteractive">
            {`
              // YouTube tracking for embedded videos
              function trackYouTubeVideo(videoId, action) {
                if (typeof gtag !== 'undefined') {
                  gtag('event', 'youtube_video_' + action, {
                    video_id: videoId,
                    channel_id: '${ANALYTICS_CONFIG.YOUTUBE_CHANNEL_ID}'
                  });
                }
              }
              
              // Track YouTube video interactions
              document.addEventListener('DOMContentLoaded', function() {
                const youtubeIframes = document.querySelectorAll('iframe[src*="youtube.com"]');
                youtubeIframes.forEach(function(iframe) {
                  const videoId = iframe.src.match(/embed\\/([a-zA-Z0-9_-]+)/)?.[1];
                  if (videoId) {
                    iframe.addEventListener('load', function() {
                      trackYouTubeVideo(videoId, 'load');
                    });
                  }
                });
              });
            `}
          </Script>

          {/* Enhanced E-commerce Tracking */}
          <Script id="enhanced-ecommerce" strategy="afterInteractive">
            {`
              // Enhanced e-commerce tracking for better conversion analysis
              function trackEnhancedEcommerce(action, data) {
                if (typeof gtag !== 'undefined') {
                  gtag('event', action, {
                    ecommerce: data
                  });
                }
              }
              
              // Track form submissions
              document.addEventListener('DOMContentLoaded', function() {
                const forms = document.querySelectorAll('form');
                forms.forEach(function(form) {
                  form.addEventListener('submit', function(e) {
                    const formName = form.getAttribute('data-form-name') || form.id || 'unknown';
                    const formType = form.getAttribute('data-form-type') || 'general';
                    
                    if (typeof gtag !== 'undefined') {
                      gtag('event', 'form_submit', {
                        form_name: formName,
                        form_type: formType
                      });
                    }
                    
                    if (typeof fbq !== 'undefined') {
                      fbq('track', 'Lead');
                    }
                  });
                });
              });
              
              // Track button clicks
              document.addEventListener('click', function(e) {
                if (e.target.tagName === 'BUTTON' || e.target.closest('button')) {
                  const button = e.target.tagName === 'BUTTON' ? e.target : e.target.closest('button');
                  const buttonText = button.textContent?.trim() || 'Unknown';
                  const buttonLocation = button.closest('[data-section]')?.getAttribute('data-section') || 'unknown';
                  
                  if (typeof gtag !== 'undefined') {
                    gtag('event', 'button_click', {
                      button_text: buttonText,
                      button_location: buttonLocation
                    });
                  }
                }
              });
            `}
          </Script>
        </>
      )}
    </>
  );
}

// Declare global types for dataLayer
declare global {
  interface Window {
    dataLayer: any[];
    gtag: (...args: any[]) => void;
    fbq: (...args: any[]) => void;
    snaptr: (...args: any[]) => void;
    ttq: {
      track: (eventName: string, parameters?: Record<string, any>) => void;
    };
    twq: {
      track: (eventName: string, parameters?: Record<string, any>) => void;
    };
  }
} 