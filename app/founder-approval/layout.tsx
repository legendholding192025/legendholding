import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Founder Final Approval | Legend Holding Group",
  description: "Final approval authority for workflow document submissions.",
  keywords: "founder approval, final approval, document approval, Legend Holding Group",
}

export default function FounderApprovalLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}

