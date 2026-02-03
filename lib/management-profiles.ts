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
    photo: "https://placehold.co/400x500/2B1C48/FFFFFF?text=Kai+Zheng",
  },
  {
    slug: "mira-wu",
    name: "Mira Wu",
    designation: "Co-Founder & Vice Chairman",
    company: "Legend Holding Group",
    photo: "https://res.cloudinary.com/dzfhqvxnf/image/upload/v1770108401/%D9%84%D8%A7%D9%89_nqk2ki.png",
  },
  {
    slug: "jonathan-stretton",
    name: "Jonathan Stretton",
    designation: "Chief Operating Officer",
    company: "Legend Holding Group",
    photo: "https://placehold.co/400x500/2B1C48/FFFFFF?text=Jonathan+Stretton",
  },
  {
    slug: "cannon-wang",
    name: "Cannon Wang",
    designation: "VP Dealership & Strategy of LHG",
    company: "Legend Holding Group",
    photo: "https://placehold.co/400x500/2B1C48/FFFFFF?text=Cannon+Wang",
  },
  {
    slug: "rejeesh-raveendran",
    name: "Rejeesh Raveendran",
    designation: "Group Finance Director",
    company: "Legend Holding Group",
    photo: "https://placehold.co/400x500/2B1C48/FFFFFF?text=Rejeesh+Raveendran",
  },
  {
    slug: "nagaraj-ponnada",
    name: "Nagaraj Ponnada",
    designation: "General Manager",
    company: "Legend Holding Group",
    photo: "https://placehold.co/400x500/2B1C48/FFFFFF?text=Nagaraj+Ponnada",
  },
  {
    slug: "sonam-lama",
    name: "Sonam Lama",
    designation: "Group HR Director",
    company: "Legend Holding Group",
    photo: "https://placehold.co/400x500/2B1C48/FFFFFF?text=Sonam+Lama",
  },
  {
    slug: "noha-shekib",
    name: "Noha Shekib",
    designation: "Chief Technology Officer",
    company: "Legend Holding Group",
    photo: "https://placehold.co/400x500/2B1C48/FFFFFF?text=Noha+Shekib",
  },
  {
    slug: "waseem-khalayleh",
    name: "Waseem Khalayleh",
    designation: "Head of Brand",
    company: "Legend Holding Group",
    photo: "https://placehold.co/400x500/2B1C48/FFFFFF?text=Waseem+Khalayleh",
  },
  {
    slug: "jade-li",
    name: "Jade Li",
    designation: "Managing Director",
    company: "Zul Energy",
    photo: "https://placehold.co/400x500/2B1C48/FFFFFF?text=Jade+Li",
  },
  {
    slug: "george-hua",
    name: "George Hua",
    designation: "Head of Commercial Vehicles",
    company: "Legend Commercial Vehicles",
    photo: "https://placehold.co/400x500/2B1C48/FFFFFF?text=George+Hua",
  },
  {
    slug: "tamer-khalil",
    name: "Tamer Khalil",
    designation: "Head of After Sales",
    company: "Legend Auto Services",
    photo: "https://placehold.co/400x500/2B1C48/FFFFFF?text=Tamer+Khalil",
  },
  {
    slug: "sun-bo",
    name: "Sun Bo",
    designation: "Business Development Manager",
    company: "Legend Holding Group",
    photo: "https://placehold.co/400x500/2B1C48/FFFFFF?text=Sun+Bo",
  },
  {
    slug: "pawan-rathi",
    name: "Pawan Rathi",
    designation: "General Manager",
    company: "Legend Rent a Car",
    photo: "https://placehold.co/400x500/2B1C48/FFFFFF?text=Pawan+Rathi",
  },
  {
    slug: "mohamed-baz",
    name: "Mohamed Baz",
    designation: "Head of Motorcycles",
    company: "Legend Motorcycles",
    photo: "https://placehold.co/400x500/2B1C48/FFFFFF?text=Mohamed+Baz",
  },
  {
    slug: "shameel-wohadally",
    name: "Shameel Wohadally",
    designation: "Head of Internal Audit",
    company: "Legend Holding Group",
    photo: "https://placehold.co/400x500/2B1C48/FFFFFF?text=Shameel+Wohadally",
  },
  {
    slug: "adrees-khan",
    name: "Adrees Khan",
    designation: "Corporate Tax Manager",
    company: "Legend Holding Group",
    photo: "https://placehold.co/400x500/2B1C48/FFFFFF?text=Adrees+Khan",
  },
  {
    slug: "xiaolong-ma",
    name: "Xiaolong Ma",
    designation: "Branch Manager",
    company: "Legend Holding Group - KSA",
    photo: "https://placehold.co/400x500/2B1C48/FFFFFF?text=Xiaolong+Ma",
  },
  {
    slug: "turki-altalhi",
    name: "Turki Altalhi",
    designation: "HR & Admin Manager",
    company: "Legend Holding Group - KSA",
    photo: "https://placehold.co/400x500/2B1C48/FFFFFF?text=Turki+Altalhi",
  },
  {
    slug: "junfu-gao",
    name: "Junfu Gao",
    designation: "General Manager of China Branch",
    company: "Legend Holding Group",
    photo: "https://placehold.co/400x500/2B1C48/FFFFFF?text=Junfu+Gao",
  },
  {
    slug: "xiaoya-zhao",
    name: "Xiaoya Zhao",
    designation: "Deputy General Manager of China Branch",
    company: "Legend Holding Group",
    photo: "https://placehold.co/400x500/2B1C48/FFFFFF?text=Xiaoya+Zhao",
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
