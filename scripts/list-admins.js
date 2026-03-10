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

async function run() {
  const { data, error } = await supabase.from('user_roles').select('*').order('email')
  if (error) { console.error(error); process.exit(1) }
  console.log('\nAll admin users:\n')
  data.forEach(u => {
    console.log(`  ${u.email}  |  role: ${u.role}  |  user_id: ${u.user_id}`)
  })
  console.log(`\nTotal: ${data.length}`)
}

run()
