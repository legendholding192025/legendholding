import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Workflow Submissions | Legend Holding Group",
  description: "View and manage all workflow document submissions.",
  keywords: "workflow submissions, document management, Legend Holding Group",
}

export default function WorkflowSubmissionsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}

