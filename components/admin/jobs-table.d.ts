import { ReactElement } from 'react'

interface Job {
  id: string
  title: string
  description: string
  requirements: string
  location: string
  job_type: string
  experience_level: string
  salary_range: string
  department: string
  posted_at: string
  deadline: string
  is_active: boolean
  created_at: string
  updated_at: string
}

interface JobsTableProps {
  jobs: Job[]
  loading: boolean
  onEdit: (job: Job) => void
  onDelete: (id: string) => void
}

export declare function JobsTable(props: JobsTableProps): ReactElement 