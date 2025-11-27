import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Finance Review | Legend Holding Group",
  description: "Review and approve workflow document submissions.",
  keywords: "finance review, document approval, Legend Holding Group",
}

export default function FinanceReviewLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}

