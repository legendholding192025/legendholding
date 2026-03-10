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

const email = (process.argv[2] || '').trim().toLowerCase()
if (!email) { console.error('Usage: node scripts/remove-admin.js <email>'); process.exit(1) }

async function run() {
  console.log(`\nRemoving admin: ${email}\n`)

  // Find user
  const { data: { users }, error: listErr } = await supabase.auth.admin.listUsers()
  if (listErr) { console.error(listErr); process.exit(1) }
  const user = users?.find(u => u.email?.toLowerCase() === email)
  if (!user) { console.error(`User not found in auth: ${email}`); process.exit(1) }

  // Remove from user_roles
  const { error: delErr } = await supabase.from('user_roles').delete().eq('user_id', user.id)
  if (delErr) { console.error('Error removing from user_roles:', delErr.message); process.exit(1) }
  console.log('Removed from user_roles.')

  // Delete auth user
  const { error: authErr } = await supabase.auth.admin.deleteUser(user.id)
  if (authErr) { console.error('Error deleting auth user:', authErr.message); process.exit(1) }
  console.log('Deleted from Supabase Auth.')

  console.log(`\nDone. ${email} has been fully removed.\n`)
}

run()
