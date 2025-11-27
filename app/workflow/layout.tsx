import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Workflow Document Submission | Legend Holding Group",
  description: "Submit your workflow documents securely to Legend Holding Group. Upload PDF, DOC, DOCX, XLS, and XLSX files.",
  keywords: "workflow, document submission, Legend Holding Group, upload documents",
}

export default function WorkflowLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}

