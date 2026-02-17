import type { TeamMember } from "@/components/digital-business-card";

/**
 * Management profiles for QR-code business cards.
 * Slug is used in URL: /profile/[slug]
 *
 * Email: included in the saved vCard. Leave "" for fallback (info@legendholding.com).
 * WhatsApp: full number with country code (e.g. "971501234567"). Also used as phone in vCard.
 * LinkedIn: full profile URL. Shows as social profile in vCard.
 * Website: company/personal website URL. Shows as homepage in vCard.
 */
export const MANAGEMENT_PROFILES: (TeamMember & { slug: string })[] = [
  {
    slug: "kai-zheng",
    name: "Kai Zheng",
    designation: "Founder & Chairman",
    company: "Legend Holding Group",
    photo: "https://res.cloudinary.com/dzfhqvxnf/image/upload/v1770205702/KAI_u2nbdv.png",
    email: "kai@legendholding.com",
    whatsapp: "971504837940",
    linkedin: "https://www.linkedin.com/in/kai-zheng-96087698/",
    website: "https://www.legendholding.com",
  },
  {
    slug: "mira-wu",
    name: "Mira Wu",
    designation: "Co-Founder & Vice Chairman",
    company: "Legend Holding Group",
    photo: "https://res.cloudinary.com/dzfhqvxnf/image/upload/v1770108401/%D9%84%D8%A7%D9%89_nqk2ki.png",
    email: "mira.wu@legendholding.com",
    whatsapp: "971566501676",
    linkedin: "https://www.linkedin.com/in/mira-wu-7497001b2/",
    website: "https://www.legendholding.com",
  },
  {
    slug: "cannon-wang",
    name: "Cannon Wang",
    designation: "VP Dealership & Strategy of LHG",
    company: "Legend Holding Group",
    photo: "https://res.cloudinary.com/dzfhqvxnf/image/upload/v1770205702/3_k6nv6n.png",
    email: "cannon.wang@legendmotorsuae.com",
    whatsapp: "971501451556",
    linkedin: "https://www.linkedin.com/in/cannon-wang-55649b118/",
    website: "https://www.legendholding.com",
  },
  {
    slug: "jonathan-stretton",
    name: "Jonathan Stretton",
    designation: "Chief Operating Officer",
    company: "Legend Holding Group",
    photo: "https://res.cloudinary.com/dzfhqvxnf/image/upload/v1770205701/4_jqudjk.png",
    email: "jonathan.stretton@legendholding.com",
    whatsapp: "97156881623",
    linkedin: "https://www.linkedin.com/in/jonathan-stretton-aa370a48/",
    website: "https://www.legendholding.com",
  },
  {
    slug: "nagaraj-ponnada",
    name: "Nagaraj Ponnada",
    designation: "General Manager",
    company: "Legend Holding Group",
    photo: "https://res.cloudinary.com/dzfhqvxnf/image/upload/v1770205702/2_p7whcx.png",
    email: "nagaraj.p@legendmotorsuae.com",
    whatsapp: "971506720814",
    linkedin: "https://www.linkedin.com/in/nagarajforgrowth/",
    website: "https://www.legendholding.com",
  },
  {
    slug: "rejeesh-raveendran",
    name: "Rejeesh Raveendran",
    designation: "Group Finance Director",
    company: "Legend Holding Group",
    photo: "https://res.cloudinary.com/dzfhqvxnf/image/upload/v1770205701/1_twihoy.png",
    email: "rejeesh.pillai@legendholding.com",
    whatsapp: "971564802082",
    linkedin: "https://www.linkedin.com/in/rejeesh-r-pillai-820b4423b/",
    website: "https://www.legendholding.com",
  },
  {
    slug: "waseem-khalayleh",
    name: "Waseem Khalayleh",
    designation: "Head of Brand",
    company: "Legend Holding Group",
    photo: "https://res.cloudinary.com/dzfhqvxnf/image/upload/v1770205703/5_ohvtkk.png",
    email: "waseem.k@legendholding.com",
    whatsapp: "971549964549",
    linkedin: "https://www.linkedin.com/in/waseem-khalayleh-96b8a780/",
    website: "https://www.legendholding.com",
  },
];

const slugToProfile = new Map(
  MANAGEMENT_PROFILES.map((p) => [p.slug, p])
);

export function getProfileBySlug(slug: string): TeamMember | null {
  const profile = slugToProfile.get(slug);
  if (!profile) return null;
  const { slug: _s, ...member } = profile;
  return member;
}

export function getAllSlugs(): string[] {
  return MANAGEMENT_PROFILES.map((p) => p.slug);
}
