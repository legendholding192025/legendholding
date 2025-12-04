export interface WorkflowUser {
  id: string
  name: string
  department: string
  email: string // Will be set based on company pattern or provided separately
}

export const WORKFLOW_USERS: WorkflowUser[] = [
  {
    id: 'nagaraj-p',
    name: 'Nagaraj P.',
    department: 'LMT',
    email: 'nagaraj.p@legendmotorsuae.com',
  },
  {
    id: 'thilak',
    name: 'Thilak',
    department: 'LMD',
    email: 'thilak.raju@skywell-uae.com',
  },
  {
    id: 'saif-akkary',
    name: 'Saif Akkary',
    department: 'LMD',
    email: 'saif.akkary@legendmotorsuae.com',
  },
  {
    id: 'cannon-wang',
    name: 'Cannon Wang',
    department: 'LMD',
    email: 'cannon.wang@legendmotorsuae.com',
  },
  {
    id: 'mohammed-baz',
    name: 'Mohammed Baz',
    department: 'Lifan',
    email: 'baz@legendholding.com',
  },
  {
    id: 'pawan-rathi',
    name: 'Pawan Rathi',
    department: 'LRAC',
    email: 'pawan.rathi@legendrentacar.com',
  },
  {
    id: 'ryan-dominguez',
    name: 'Ryan Dominguez',
    department: 'Admin',
    email: 'ryan.dominguez@legendholding.com',
  },
  {
    id: 'kaushik',
    name: 'Kaushik',
    department: 'LHG',
    email: 'kaushik.guha@legendholding.com',
  },
  {
    id: 'noha-shekib',
    name: 'Noha Shekib',
    department: 'LHG',
    email: 'noha.shekib@legendholding.com',
  },
  {
    id: 'yulin-luo',
    name: 'Yulin Luo',
    department: 'LMD',
    email: 'yulin.luo@legendmotorsuae.com',
  },
  {
    id: 'sonam',
    name: 'Sonam',
    department: 'LHG',
    email: 'sonam.lama@legendholding.com',
  },
  {
    id: 'yue-hua',
    name: 'Yue Hua',
    department: 'LCV',
    email: 'yue.hua@legendmotorsuae.com',
  },
  {
    id: 'tamer-khalil',
    name: 'Tamer Khalil',
    department: 'LWAS',
    email: 'tamer.khalil@legendmotorsuae.com',
  },
  {
    id: 'sky-martires',
    name: 'Sky Martires',
    department: 'LWTT',
    email: 'sky.martires@legendtravels.com',
  },
  {
    id: 'alisa-liu',
    name: 'Alisa Liu',
    department: 'LWTT',
    email: 'alisa.liu@legendtravels.com',
  },
  {
    id: 'ahmad-tayel',
    name: 'Ahmad Tayel',
    department: 'LMT',
    email: 'ahmad.tayel@legendmotorsuae.com',
  },
  {
    id: 'muhammad-zohaib',
    name: 'Muhammad Zohaib',
    department: 'LRAC',
    email: 'muhammad.zohaib@legendinvestment.com',
  },
  {
    id: 'mahmoud-sayed',
    name: 'Mahmoud Sayed',
    department: 'LHG',
    email: 'mahmoud.sayed@legendholding.com',
  },
  {
    id: 'mukhlis-x',
    name: 'Mukhlis X.',
    department: 'LHG - KSA',
    email: 'mukhlis@legendmotorsuae.com',
  },
  {
    id: 'waseem-khalayleh',
    name: 'Waseem Khalayleh',
    department: 'LHG',
    email: 'waseem.k@legendholding.com',
  },
]

// Helper function to get user by ID
export function getUserById(id: string): WorkflowUser | undefined {
  return WORKFLOW_USERS.find(user => user.id === id)
}

// Helper function to get user by email
export function getUserByEmail(email: string): WorkflowUser | undefined {
  return WORKFLOW_USERS.find(user => user.email.toLowerCase() === email.toLowerCase())
}

// Helper function to get all user IDs for generating links
export function getAllUserIds(): string[] {
  return WORKFLOW_USERS.map(user => user.id)
}

