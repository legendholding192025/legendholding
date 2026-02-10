/**
 * Verify and add admin role for a user (e.g. abhinav.joshi@legendholding.com).
 * Run after creating the user in Supabase Authentication.
 * Usage: node scripts/verify-and-add-admin.js [email]
 * Default email: abhinav.joshi@legendholding.com
 */

const { createClient } = require('@supabase/supabase-js')
const fs = require('fs')
const path = require('path')

function loadEnvFile() {
  const rootDir = path.join(__dirname, '..')
  const envFiles = ['.env.local', '.env']
  for (const envFile of envFiles) {
    const envPath = path.join(rootDir, envFile)
    if (fs.existsSync(envPath)) {
      console.log(`Loading environment from ${envFile}`)
      const envContent = fs.readFileSync(envPath, 'utf8')
      envContent.split('\n').forEach(line => {
        const trimmed = line.trim()
        if (trimmed && !trimmed.startsWith('#')) {
          const match = trimmed.match(/^([^=:#]+)=(.*)$/)
          if (match) {
            const key = match[1].trim()
            let value = match[2].trim()
            if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) {
              value = value.slice(1, -1)
            }
            process.env[key] = value
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
  console.error('Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY in .env.local')
  process.exit(1)
}

const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey, {
  auth: { autoRefreshToken: false, persistSession: false }
})

const defaultEmail = 'abhinav.joshi@legendholding.com'
const email = (process.argv[2] || defaultEmail).trim().toLowerCase()
const role = 'admin'
const permissions = { dashboard: true, jobs: true, applications: true }

async function verifyAndAddAdmin() {
  try {
    console.log(`\nChecking access for: ${email}\n`)

    const { data: { users: allUsers }, error: listError } = await supabaseAdmin.auth.admin.listUsers()
    if (listError) {
      console.error('Error listing users:', listError.message)
      process.exit(1)
    }

    const user = allUsers?.find(u => u.email?.toLowerCase() === email)
    if (!user) {
      console.error(`❌ User not found in Supabase Authentication.`)
      console.error(`   No user with email: ${email}`)
      console.error(`   Create the user first: Supabase Dashboard → Authentication → Users → Add User`)
      process.exit(1)
    }
    console.log(`✅ User found in Auth (id: ${user.id})`)

    const { data: existingRole, error: roleErr } = await supabaseAdmin
      .from('user_roles')
      .select('*')
      .eq('user_id', user.id)
      .single()

    if (roleErr && roleErr.code !== 'PGRST116') {
      console.error('Error reading user_roles:', roleErr.message)
      process.exit(1)
    }

    if (existingRole) {
      const { error: updateError } = await supabaseAdmin
        .from('user_roles')
        .update({
          role,
          permissions,
          email: email,
          updated_at: new Date().toISOString()
        })
        .eq('user_id', user.id)

      if (updateError) {
        console.error('Error updating role:', updateError.message)
        process.exit(1)
      }
      console.log(`✅ user_roles entry updated (role: ${role})`)
    } else {
      const { error: insertError } = await supabaseAdmin
        .from('user_roles')
        .insert({
          user_id: user.id,
          email,
          role,
          permissions
        })
      if (insertError) {
        console.error('Error adding role:', insertError.message)
        process.exit(1)
      }
      console.log(`✅ user_roles entry added (role: ${role})`)
    }

    console.log('\n--- Access confirmed ---')
    console.log(`Email:    ${email}`)
    console.log(`Role:     ${role}`)
    console.log(`User ID:  ${user.id}`)
    console.log('Permissions: dashboard, jobs, applications')
    console.log('\nThis user can log in at /admin/login and access Dashboard, Jobs, and Applications.\n')
  } catch (err) {
    console.error('Unexpected error:', err)
    process.exit(1)
  }
}

verifyAndAddAdmin()
