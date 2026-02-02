"use client";

import Image from "next/image";
import {
  Download,
  MapPin,
  Globe,
} from "lucide-react";

/** New LinkedIn logo (2021+) - rounded square with "in" */
function LinkedInIcon({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden>
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

function WhatsAppIcon({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden>
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}
import { Button } from "@/components/ui/button";

export interface TeamMember {
  name: string;
  designation: string;
  company: string;
  email?: string;
  phone?: string;
  photo: string;
  linkedin?: string;
  whatsapp?: string;
  location?: string;
  website?: string;
}

interface DigitalBusinessCardProps {
  member: TeamMember;
}

// Escape vCard 3.0 special characters: \ → \\ , ; → \;
function escapeVCardValue(value: string): string {
  return value.replace(/\\/g, "\\\\").replace(/;/g, "\\;").replace(/,/g, "\\,");
}

export function DigitalBusinessCard({ member }: DigitalBusinessCardProps) {
  const handleDownloadVCard = () => {
    const name = escapeVCardValue(member.name);
    const company = escapeVCardValue(member.company);
    const designation = escapeVCardValue(member.designation);
    const email = member.email || "info@legendholding.com";
    const phone = member.phone || "+971 4 XXX XXXX";
    const location = member.location ? escapeVCardValue(member.location) : "";

    // N: Family name;Given name;;; (for better contact app compatibility)
    const nameParts = member.name.trim().split(/\s+/);
    const givenName = nameParts[0] || member.name;
    const familyName = nameParts.length > 1 ? nameParts.slice(1).join(" ") : "";

    const vCard = `BEGIN:VCARD
VERSION:3.0
N:${escapeVCardValue(familyName)};${escapeVCardValue(givenName)};;;
FN:${name}
ORG:${company}
TITLE:${designation}
TEL;TYPE=WORK,VOICE:${phone}
EMAIL:${email}
${member.whatsapp ? `URL:https://wa.me/${member.whatsapp.replace(/\D/g, "")}` : ""}
${member.website ? `URL:${member.website}` : ""}
${location ? `ADR;TYPE=WORK:;;${location}` : ""}
NOTE:${escapeVCardValue(member.company)} - ${designation}
END:VCARD`;

    const blob = new Blob([vCard], { type: "text/vcard;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${member.name.replace(/\s+/g, "_")}.vcf`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen min-h-[100dvh] flex items-center justify-center p-0 md:p-4 bg-transparent">
      <div className="w-full max-w-md min-h-screen min-h-[100dvh] md:min-h-0 flex flex-col">
        {/* Card Container - full viewport on mobile, rounded card on desktop */}
        <div className="relative bg-[#2B1C48] flex-1 min-h-screen min-h-[100dvh] md:min-h-0 w-full rounded-none md:rounded-3xl overflow-visible shadow-2xl flex flex-col">
          {/* Logo - top right corner (same as header) */}
          <div className="absolute top-0 right-0 z-30 p-5 pointer-events-none">
            <Image
              src="/images/legend-logo.png"
              alt="Legend Holding Group"
              width={120}
              height={43}
              className="h-12 w-auto object-contain"
            />
          </div>

          {/* Scrollable middle: image + content - fills space so Powered by stays at bottom */}
          <div className="flex-1 min-h-0 flex flex-col overflow-visible">
          {/* Profile Photo - slightly taller than square */}
          <div className="relative aspect-[4/5] w-full block overflow-hidden leading-[0] shrink-0">
            <Image
              src={member.photo || "/placeholder.svg"}
              alt={member.name}
              fill
              className="object-cover object-[50%_40%] block outline-none align-bottom"
              sizes="(max-width: 448px) 100vw, 448px"
              priority
              style={{ outline: 'none', verticalAlign: 'bottom' }}
            />
            {/* Bottom gradient: smooth blend from image into card color, no hard edge */}
            <div
              className="absolute inset-x-0 bottom-0 top-1/2 pointer-events-none"
              style={{
                background: 'linear-gradient(to top, #2B1C48 0%, rgba(43,28,72,0.97) 8%, rgba(43,28,72,0.85) 18%, rgba(43,28,72,0.5) 35%, rgba(43,28,72,0.2) 55%, transparent 100%)',
              }}
            />
          </div>

          {/* Content - 1px overlap so no seam; gradient above blends image into this */}
          <div className="relative px-6 pt-4 pb-4 -mt-px border-0 bg-[#2B1C48] z-10 overflow-visible flex-1 min-h-0">
            {/* Background SVG - positioned at bottom-right of content area */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/bg.svg"
              alt=""
              width={840}
              height={855}
              className="absolute right-0 z-0 pointer-events-none"
              style={{ opacity: 0.35, bottom: '-100px' }}
            />

            {/* Content on top of background */}
            <div className="relative z-10">
            {/* Name & Title */}
            <div className="text-center mb-4">
              <h1 className="text-2xl font-bold text-white mb-1">
                {member.name}
              </h1>
              <p className="text-[#EE8900] font-medium mb-1 text-lg">
                {member.designation}
              </p>
              {member.company && (
                <p className="text-white/70 text-lg">{member.company}</p>
              )}
              {member.location && (
                <p className="text-white/60 text-sm mt-2 flex items-center justify-center gap-1">
                  <MapPin className="w-3 h-3" />
                  {member.location}
                </p>
              )}
            </div>

            {/* Divider with logo */}
            <div className="flex items-center gap-4 mb-4">
              <div className="flex-1 h-px bg-white" />
              <div className="relative w-6 h-6 shrink-0 flex items-center justify-center">
                <Image
                  src="/icon-white.svg"
                  alt=""
                  width={24}
                  height={24}
                  className="object-contain"
                />
              </div>
              <div className="flex-1 h-px bg-white" />
            </div>

            {/* Contact Info - Website only */}
            <div className="space-y-3 mb-4">
              {member.website && (
                <a
                  href={member.website.startsWith("http") ? member.website : `https://${member.website}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 p-3 rounded-xl bg-[#5D376E]/20 hover:bg-[#5D376E]/40 transition-colors"
                >
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-white">
                    <Globe className="h-5 w-5 text-[#EE8900]" />
                  </div>
                  <div className="flex min-h-11 flex-1 flex-col justify-center gap-0.5 overflow-hidden">
                    <span className="text-xs font-medium uppercase tracking-wider text-white/50">
                      Website
                    </span>
                    <span className="truncate text-sm text-white">
                      {member.website.replace(/^https?:\/\//, "")}
                    </span>
                  </div>
                </a>
              )}
            </div>

            {/* WhatsApp, LinkedIn & Web icons */}
            <div className="flex justify-center gap-4 mb-4">
              <a
                href={member.whatsapp ? `https://wa.me/${member.whatsapp.replace(/\D/g, "")}` : "https://wa.me/9714XXXXXXX"}
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 rounded-xl bg-[#5D376E]/20 hover:bg-[#5D376E]/40 border border-[#5D376E]/50 flex items-center justify-center transition-colors"
              >
                <WhatsAppIcon className="w-6 h-6 text-white" />
              </a>
              <a
                href={member.linkedin ?? "https://www.linkedin.com/company/legend-holding-group/"}
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 rounded-xl bg-[#5D376E]/20 hover:bg-[#5D376E]/40 border border-[#5D376E]/50 flex items-center justify-center transition-colors"
              >
                <LinkedInIcon className="w-6 h-6 text-white" />
              </a>
              <a
                href={member.website ? (member.website.startsWith("http") ? member.website : `https://${member.website}`) : "https://www.legendholding.com"}
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 rounded-xl bg-[#5D376E]/20 hover:bg-[#5D376E]/40 border border-[#5D376E]/50 flex items-center justify-center transition-colors"
              >
                <Globe className="w-6 h-6 text-white" />
              </a>
            </div>

            {/* Save Contact button - same width as the 3 icons above (3×w-12 + 2×gap-4) */}
            <div className="flex justify-center">
              <Button
                onClick={handleDownloadVCard}
                className="w-44 bg-[#EE8900] hover:bg-[#EE8900]/90 text-white font-semibold h-12 rounded-2xl"
              >
                <Download className="w-4 h-4 mr-2" />
                Save Contact
              </Button>
            </div>
            </div>
          </div>
          </div>

          <p className="text-center text-white/70 text-xs py-2 pb-3 flex-shrink-0">
            Powered by Legend Holding Group
          </p>
        </div>
      </div>
    </div>
  );
}
