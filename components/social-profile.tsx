'use client';

import type { JSX } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

type IconProps = {
  className?: string;
};

type SocialLink = {
  label: string;
  href: string;
  Icon: (props: IconProps) => JSX.Element;
};

const logoSrc = "/images/legend-logo.png";

const companyDescription =
  "Connecting you with every Legend Holding Group channel in one tap.";

const FacebookIcon = ({ className = "h-6 w-6" }: IconProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
    aria-hidden="true"
  >
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
  </svg>
);

const TwitterIcon = ({ className = "h-6 w-6" }: IconProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
    aria-hidden="true"
  >
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

const InstagramIcon = ({ className = "h-6 w-6" }: IconProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
    aria-hidden="true"
  >
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
  </svg>
);

const LinkedInIcon = ({ className = "h-6 w-6" }: IconProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
    aria-hidden="true"
  >
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
);

const YoutubeIcon = ({ className = "h-6 w-6" }: IconProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
    aria-hidden="true"
  >
    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
  </svg>
);

const TikTokIcon = ({ className = "h-6 w-6" }: IconProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
    aria-hidden="true"
  >
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
  </svg>
);

const YoutubeIconFilled = YoutubeIcon;

const socialLinks: SocialLink[] = [
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/company/legend-holding-group/",
    Icon: LinkedInIcon,
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/legendholdinggroup?igsh=MTk3Z3NqOXB4b2gzZQ==",
    Icon: InstagramIcon,
  },
  {
    label: "Facebook",
    href: "https://www.facebook.com/share/1XndETdEkF/",
    Icon: FacebookIcon,
  },
  {
    label: "YouTube",
    href: "https://youtube.com/@legendholdinggroup?si=h_xMStdscyQv_LdW",
    Icon: YoutubeIconFilled,
  },
  {
    label: "TikTok",
    href: "https://www.tiktok.com/@legendholdinggroup",
    Icon: TikTokIcon,
  },
  {
    label: "X (Twitter)",
    href: "https://x.com/Legendholding1?s=09",
    Icon: TwitterIcon,
  },
];

export default function SocialProfile() {
  return (
    <main
      className="min-h-screen bg-white text-[#2B1C48]"
      style={{ fontFamily: "var(--body-font)" }}
    >
      <header className="flex flex-col items-center gap-4 rounded-b-[36px] bg-[#2B1C48] px-6 py-8 text-center text-white shadow-[0_25px_60px_-30px_rgba(26,35,126,0.7)] sm:px-10">
        <div className="relative flex h-28 w-28 items-center justify-center sm:h-32 sm:w-32">
          <div className="absolute inset-0 rounded-full bg-white/20 shadow-inner" />
          <div className="relative flex h-24 w-24 items-center justify-center rounded-full border-4 border-secondary bg-white shadow-lg sm:h-28 sm:w-28">
            <div className="relative h-20 w-20 sm:h-24 sm:w-24">
              <Image
                src={logoSrc || "/placeholder.svg"}
                alt="Legend Holding Group logo"
                fill
                sizes="110px"
                className="object-contain"
                priority
              />
            </div>
          </div>
        </div>
        <p className="px-4 text-lg font-medium tracking-wide text-white sm:px-0 sm:text-xl md:tracking-wider lg:text-2xl">
          Together We Grow
        </p>
        <p className="max-w-md text-sm text-white/80 sm:text-base">
          {companyDescription}
        </p>
      </header>

      <div className="px-4 py-12">
        <div className="mx-auto flex w-full max-w-xl flex-col items-center gap-10">
          <section className="w-full rounded-[36px] border border-primary/10 bg-white p-6 shadow-[0_20px_45px_-25px_rgba(30,30,60,0.45)]">
            <div className="flex flex-col gap-3">
              {socialLinks.map(({ label, href, Icon }, index) => (
                <motion.div
                  key={label}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.07, duration: 0.4, ease: "easeOut" }}
                  className="w-full"
                >
                  <Link
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center justify-between rounded-[36px] bg-primary px-4 py-2.5 text-base font-semibold text-primary-foreground transition-all duration-200 hover:scale-[1.02] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary focus-visible:ring-offset-2 focus-visible:ring-offset-white sm:px-5 sm:py-3"
                  >
                    <span className="flex items-center gap-4">
                      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#EE8900] text-white transition group-hover:opacity-90">
                        <Icon className="h-5 w-5" />
                      </span>
                      <span>{label}</span>
                    </span>
                    <motion.span
                      className="text-lg"
                      animate={{ x: [0, 6, 0] }}
                      transition={{ repeat: Infinity, duration: 1.2, ease: "easeInOut" }}
                    >
                      →
                    </motion.span>
                  </Link>
                </motion.div>
              ))}
            </div>
          </section>
        </div>
      </div>
      <footer className="mt-10 w-full">
        <div className="relative h-10 w-full sm:h-14">
          <Image
            src="/profile-footer.svg"
            alt="Legend Holding Group"
            fill
            className="object-contain object-right-bottom"
            priority={false}
            sizes="100vw"
          />
        </div>
      </footer>
    </main>
  );
}

