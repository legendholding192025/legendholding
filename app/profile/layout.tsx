/**
 * Minimal layout for profile (business card) pages.
 * No header/footer so QR scans show only the digital business card.
 * No white background on mobile - transparent/dark so card stands alone.
 */
export default function ProfileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen min-h-[100dvh] bg-transparent md:bg-[#2B1C48]">
      {children}
    </div>
  );
}
