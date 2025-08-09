'use client';

import { useEffect } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import { trackPageView, PAGE_NAMES } from '@/lib/analytics';

interface PageTrackerProps {
  pageName?: string;
}

export default function PageTracker({ pageName }: PageTrackerProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    // Get the page name based on the current path
    const getPageNameFromPath = (path: string): string => {
      // Remove leading slash and split path
      const pathSegments = path.replace(/^\//, '').split('/');
      
      // Map paths to page names
      const pathToPageName: Record<string, string> = {
        '': PAGE_NAMES.HOME,
        'about': PAGE_NAMES.ABOUT,
        'contact': PAGE_NAMES.CONTACT,
        'careers': PAGE_NAMES.CAREERS,
        'careers/jobs': PAGE_NAMES.CAREERS_JOBS,
        'careers/thank-you': PAGE_NAMES.CAREERS_THANK_YOU,
        'news': PAGE_NAMES.NEWS,
        'sitemap': PAGE_NAMES.SITEMAP,
        'privacy-policy': PAGE_NAMES.PRIVACY_POLICY,
        'cookie-policy': PAGE_NAMES.COOKIE_POLICY,
        'who-we-are': PAGE_NAMES.WHO_WE_ARE,
        'who-we-are/our-foundation': PAGE_NAMES.OUR_FOUNDATION,
        'who-we-are/brand-story': PAGE_NAMES.BRAND_STORY,
        'who-we-are/journey': PAGE_NAMES.JOURNEY,
        'who-we-are/the-team': PAGE_NAMES.THE_TEAM,
        'who-we-are/partners': PAGE_NAMES.PARTNERS,
        'who-we-are/csr': PAGE_NAMES.CSR,
        'our-businesses': PAGE_NAMES.OUR_BRANDS,
        'our-businesses/legend-automobile-services': PAGE_NAMES.LEGEND_AUTOMOBILE_SERVICES,
        'our-businesses/legend-commercial-vehicles': PAGE_NAMES.LEGEND_COMMERCIAL_VEHICLES,
        'our-businesses/legend-global-media': PAGE_NAMES.LEGEND_GLOBAL_MEDIA,
        'our-businesses/legend-green-energy': PAGE_NAMES.LEGEND_GREEN_ENERGY,
        'our-businesses/legend-motorcycles': PAGE_NAMES.LEGEND_MOTORCYCLES,
        'our-businesses/legend-motors-dealership': PAGE_NAMES.LEGEND_MOTORS_DEALERSHIP,
        'our-businesses/legend-motors-trading': PAGE_NAMES.LEGEND_MOTORS_TRADING,
        'our-businesses/legend-autohub': PAGE_NAMES.LEGEND_AUTOHUB,
        'our-businesses/legend-technical-services': PAGE_NAMES.LEGEND_TECHNICAL_SERVICES,
        'our-businesses/legend-travel': PAGE_NAMES.LEGEND_TRAVEL,
        'our-businesses/legend-world-rent-a-car': PAGE_NAMES.LEGEND_WORLD_RENT_A_CAR,
        'our-businesses/zul-energy': PAGE_NAMES.ZUL_ENERGY,
        'admin': PAGE_NAMES.ADMIN_DASHBOARD,
        'admin/jobs': PAGE_NAMES.ADMIN_JOBS,
        'admin/news': PAGE_NAMES.ADMIN_NEWS,
        'admin/newsletters': PAGE_NAMES.ADMIN_NEWSLETTERS,
        'admin/submissions': PAGE_NAMES.ADMIN_SUBMISSIONS,
        'admin/applications': PAGE_NAMES.ADMIN_APPLICATIONS,
        'admin/settings': PAGE_NAMES.ADMIN_SETTINGS,
        'admin/login': PAGE_NAMES.ADMIN_LOGIN,
      };

      // Check for exact path match first
      if (pathToPageName[path]) {
        return pathToPageName[path];
      }

      // Check for dynamic routes (like news/[id], careers/[id], etc.)
      if (pathSegments[0] === 'news' && pathSegments[1]) {
        return PAGE_NAMES.NEWS_ARTICLE;
      }

      if (pathSegments[0] === 'careers' && pathSegments[1] && pathSegments[1] !== 'jobs' && pathSegments[1] !== 'thank-you') {
        return PAGE_NAMES.CAREERS_JOB_DETAIL;
      }

      if (pathSegments[0] === 'admin' && pathSegments[1] === 'applications' && pathSegments[2]) {
        return PAGE_NAMES.ADMIN_APPLICATIONS;
      }

      if (pathSegments[0] === 'admin' && pathSegments[1] === 'newsletters' && pathSegments[2]) {
        return PAGE_NAMES.ADMIN_NEWSLETTERS;
      }

      // Default fallback
      return document.title || 'Unknown Page';
    };

    // Track page view with the determined page name
    const currentPageName = pageName || getPageNameFromPath(pathname);
    trackPageView(currentPageName, pathname);

    // Additional tracking for specific page types
    if (pathname.includes('/our-businesses/')) {
      const brandName = pathname.split('/').pop()?.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
      if (brandName) {
        // Track brand page visits specifically
        if (typeof window !== 'undefined' && window.gtag) {
          try {
            window.gtag('event', 'brand_page_visit', {
              brand_name: brandName,
              page_path: pathname,
            });
          } catch (error) {
            console.debug('Brand page tracking failed:', error);
          }
        }
      }
    }

    // Track job detail pages
    if (pathname.includes('/careers/') && !pathname.includes('/jobs') && !pathname.includes('/thank-you')) {
      if (typeof window !== 'undefined' && window.gtag) {
        try {
          window.gtag('event', 'job_detail_view', {
            page_path: pathname,
          });
        } catch (error) {
          console.debug('Job detail tracking failed:', error);
        }
      }
    }

    // Track news article pages
    if (pathname.includes('/news/') && pathname.split('/').length > 2) {
      if (typeof window !== 'undefined' && window.gtag) {
        try {
          window.gtag('event', 'news_article_view', {
            page_path: pathname,
          });
        } catch (error) {
          console.debug('News article tracking failed:', error);
        }
      }
    }

  }, [pathname, searchParams, pageName]);

  // This component doesn't render anything
  return null;
} 