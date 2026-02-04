import type { TeamMember } from "@/components/digital-business-card";

/**
 * Management profiles for QR-code business cards.
 * Add email, phone, linkedin, whatsapp, location, website as needed for each person.
 * Slug is used in URL: /profile/[slug]
 * Replace each "photo" dummy link with the original image URL when ready.
 */
export const MANAGEMENT_PROFILES: (TeamMember & { slug: string })[] = [
  {
    slug: "kai-zheng",
    name: "Kai Zheng",
    designation: "Founder & Chairman",
    company: "Legend Holding Group",
    photo: "https://res.cloudinary.com/dzfhqvxnf/image/upload/v1770205702/KAI_u2nbdv.png",
  },
  {
    slug: "mira-wu",
    name: "Mira Wu",
    designation: "Co-Founder & Vice Chairman",
    company: "Legend Holding Group",
    photo: "https://res.cloudinary.com/dzfhqvxnf/image/upload/v1770108401/%D9%84%D8%A7%D9%89_nqk2ki.png",
  },
  {
    slug: "cannon-wang",
    name: "Cannon Wang",
    designation: "VP Dealership & Strategy of LHG",
    company: "Legend Holding Group",
    photo: "https://res.cloudinary.com/dzfhqvxnf/image/upload/v1770205702/3_k6nv6n.png",
  },
  {
    slug: "jonathan-stretton",
    name: "Jonathan Stretton",
    designation: "Chief Operating Officer",
    company: "Legend Holding Group",
    photo: "https://res.cloudinary.com/dzfhqvxnf/image/upload/v1770205701/4_jqudjk.png",
  },
  {
    slug: "nagaraj-ponnada",
    name: "Nagaraj Ponnada",
    designation: "General Manager",
    company: "Legend Holding Group",
    photo: "https://res.cloudinary.com/dzfhqvxnf/image/upload/v1770205702/2_p7whcx.png",
  },
  {
    slug: "rejeesh-raveendran",
    name: "Rejeesh Raveendran",
    designation: "Group Finance Director",
    company: "Legend Holding Group",
    photo: "https://res.cloudinary.com/dzfhqvxnf/image/upload/v1770205701/1_twihoy.png",
  },
  {
    slug: "waseem-khalayleh",
    name: "Waseem Khalayleh",
    designation: "Head of Brand",
    company: "Legend Holding Group",
    photo: "https://res.cloudinary.com/dzfhqvxnf/image/upload/v1770205703/5_ohvtkk.png",
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
