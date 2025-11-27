import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Co-Founder Approval | Legend Holding Group",
  description: "Final approval for workflow document submissions.",
  keywords: "co-founder approval, document approval, Legend Holding Group",
}

export default function CoFounderApprovalLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}

