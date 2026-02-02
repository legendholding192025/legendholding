import { notFound } from "next/navigation";
import { getProfileBySlug, getAllSlugs } from "@/lib/management-profiles";
import { DigitalBusinessCard } from "@/components/digital-business-card";
import type { Metadata } from "next";

interface ProfilePageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: ProfilePageProps): Promise<Metadata> {
  const { slug } = await params;
  const member = getProfileBySlug(slug);
  if (!member) return { title: "Profile Not Found" };
  return {
    title: `${member.name} | ${member.designation} | Legend Holding Group`,
    description: `${member.name}, ${member.designation} at ${member.company}. Digital business card.`,
    openGraph: {
      title: `${member.name} | ${member.designation}`,
      description: `${member.company} - ${member.designation}`,
      images: member.photo ? [{ url: member.photo, alt: member.name }] : [],
    },
    robots: "index, follow",
  };
}

export default async function ProfilePage({ params }: ProfilePageProps) {
  const { slug } = await params;
  const member = getProfileBySlug(slug);
  if (!member) notFound();
  return <DigitalBusinessCard member={member} />;
}
