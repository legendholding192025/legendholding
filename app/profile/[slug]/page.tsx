import { notFound } from "next/navigation";
import { DigitalBusinessCard } from "@/components/digital-business-card";
import { getProfileBySlug } from "@/lib/management-profiles-server";
import type { Metadata } from "next";

interface ProfilePageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({
  params,
}: ProfilePageProps): Promise<Metadata> {
  const { slug } = await params;
  const member = await getProfileBySlug(slug);
  if (!member) return { title: "Profile Not Found" };
  return {
    title: `${member.name} | ${member.designation} | Legend Holding Group`,
    description: `${member.name}, ${member.designation} at ${member.company}. Digital business card.`,
    openGraph: {
      title: `${member.name} | ${member.designation}`,
      description: `${member.company} - ${member.designation}`,
      images: [{ url: member.photo || "https://res.cloudinary.com/dzfhqvxnf/image/upload/v1769687716/icon_job_cgk6cp.png", width: 1200, height: 630, alt: member.name }],
    },
    robots: "index, follow",
  };
}

export default async function ProfilePage({ params }: ProfilePageProps) {
  const { slug } = await params;
  const member = await getProfileBySlug(slug);
  if (!member) notFound();
  return <DigitalBusinessCard member={member} />;
}
