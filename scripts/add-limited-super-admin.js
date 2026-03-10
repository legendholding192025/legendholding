/**
 * Add a user as super_admin with limited visibility: only Jobs and Job Applications.
 * Usage: node scripts/add-limited-super-admin.js [email]
 * Default: najmur.rahman@legendholding.com
 */

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

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY
if (!supabaseUrl || !supabaseServiceKey) {
  console.error('Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY')
  process.exit(1)
}

const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey, {
  auth: { autoRefreshToken: false, persistSession: false }
})

const defaultEmail = 'najmur.rahman@legendholding.com'
const email = (process.argv[2] || defaultEmail).trim().toLowerCase()

// Super admin with visibility only: Dashboard, Jobs, Applications
const permissions = {
  dashboard: true,
  jobs: true,
  applications: true,
  submissions: false,
  news: false,
  newsletters: false,
  settings: false,
  customer_care: false,
  management_profiles: false,
  team_members: false
}

async function run() {
  try {
    console.log(`\nAdding limited super_admin: ${email}\n`)

    const { data: { users }, error: listError } = await supabaseAdmin.auth.admin.listUsers()
    if (listError) {
      console.error('Error listing users:', listError.message)
      process.exit(1)
    }

    const user = users?.find(u => u.email?.toLowerCase() === email)
    if (!user) {
      console.error(`User not found in Supabase Auth: ${email}`)
      console.error('Create the user first in Supabase Dashboard → Authentication → Users')
      process.exit(1)
    }
    console.log(`Found user: ${user.id}`)

    const { data: existing } = await supabaseAdmin
      .from('user_roles')
      .select('*')
      .eq('user_id', user.id)
      .single()

    const payload = {
      user_id: user.id,
      email,
      role: 'super_admin',
      permissions,
      updated_at: new Date().toISOString()
    }

    if (existing) {
      const { error: updateError } = await supabaseAdmin
        .from('user_roles')
        .update(payload)
        .eq('user_id', user.id)
      if (updateError) {
        console.error('Error updating:', updateError.message)
        process.exit(1)
      }
      console.log('Updated existing user_roles entry.')
    } else {
      const { error: insertError } = await supabaseAdmin
        .from('user_roles')
        .insert({ ...payload })
      if (insertError) {
        console.error('Error inserting:', insertError.message)
        process.exit(1)
      }
      console.log('Inserted user_roles entry.')
    }

    console.log('\n--- Done ---')
    console.log(`Email: ${email}`)
    console.log(`Role: super_admin (limited)`)
    console.log('Visible: Dashboard, Jobs Management, Job Applications only.\n')
  } catch (err) {
    console.error(err)
    process.exit(1)
  }
}

run()
