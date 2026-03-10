const { createClient } = require('@supabase/supabase-js')
const fs = require('fs')
const path = require('path')

function loadEnvFile() {
  const rootDir = path.join(__dirname, '..')
  for (const envFile of ['.env.local', '.env']) {
    const envPath = path.join(rootDir, envFile)
    if (fs.existsSync(envPath)) {
      const envContent = fs.readFileSync(envPath, 'utf8')
      envContent.split('\n').forEach(line => {
        const trimmed = line.trim()
        if (trimmed && !trimmed.startsWith('#')) {
          const match = trimmed.match(/^([^=:#]+)=(.*)$/)
          if (match) {
            let value = (match[2] || '').trim()
            if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'")))
              value = value.slice(1, -1)
            process.env[match[1].trim()] = value
          }
        }
      })
      break
    }
  }
}

loadEnvFile()

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY, {
  auth: { autoRefreshToken: false, persistSession: false }
})

const OLD_EMAIL = 'waseem.k@legendholding.com'
const NEW_EMAIL = 'mufeed.rahman@legendholding.com'
const NEW_PASSWORD = 'Mufeed@LHG1925'

async function run() {
  console.log(`\nUpdating super admin: ${OLD_EMAIL} -> ${NEW_EMAIL}\n`)

  // Find user
  const { data: { users }, error: listErr } = await supabase.auth.admin.listUsers()
  if (listErr) { console.error(listErr); process.exit(1) }
  const user = users?.find(u => u.email?.toLowerCase() === OLD_EMAIL.toLowerCase())
  if (!user) { console.error(`User not found: ${OLD_EMAIL}`); process.exit(1) }
  console.log(`Found user: ${user.id}`)

  // Update email and password in Auth
  const { error: authErr } = await supabase.auth.admin.updateUserById(user.id, {
    email: NEW_EMAIL,
    password: NEW_PASSWORD,
    email_confirm: true
  })
  if (authErr) { console.error('Auth update error:', authErr.message); process.exit(1) }
  console.log('Updated email and password in Supabase Auth.')

  // Update user_roles table
  const { error: roleErr } = await supabase
    .from('user_roles')
    .update({ email: NEW_EMAIL, updated_at: new Date().toISOString() })
    .eq('user_id', user.id)
  if (roleErr) { console.error('user_roles update error:', roleErr.message); process.exit(1) }
  console.log('Updated email in user_roles.')

  // Update admin_profiles if exists
  const { error: profErr } = await supabase
    .from('admin_profiles')
    .update({ email: NEW_EMAIL })
    .eq('user_id', user.id)
  if (!profErr) console.log('Updated email in admin_profiles (if row existed).')

  console.log(`\nDone!`)
  console.log(`Email:    ${NEW_EMAIL}`)
  console.log(`Password: ${NEW_PASSWORD}`)
  console.log(`Role:     super_admin\n`)
}

run()
