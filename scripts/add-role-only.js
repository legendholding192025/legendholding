/**
 * Script to add admin role to existing user
 * Run this AFTER creating the user manually in Supabase Dashboard
 * Run with: node scripts/add-role-only.js
 */

const { createClient } = require('@supabase/supabase-js')
const fs = require('fs')
const path = require('path')

// Read .env or .env.local file manually
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
            if ((value.startsWith('"') && value.endsWith('"')) || 
                (value.startsWith("'") && value.endsWith("'"))) {
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
  console.error('Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY in environment variables')
  process.exit(1)
}

const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
})

async function addRole() {
  const email = 'farheen.nishat@legendmotorsuae.com'
  const role = 'admin'
  const permissions = { dashboard: true, jobs: true, applications: true }

  try {
    console.log(`Adding admin role for: ${email}`)

    // Find user in auth.users
    const { data: { users: allUsers }, error: listError } = await supabaseAdmin.auth.admin.listUsers()
    
    if (listError) {
      console.error('Error listing users:', listError)
      process.exit(1)
    }
    
    const user = allUsers?.find(u => u.email?.toLowerCase() === email.toLowerCase())

    if (!user) {
      console.error(`❌ User with email ${email} not found in auth.users`)
      console.error('Please create the user manually in Supabase Dashboard first:')
      console.error('1. Go to Supabase Dashboard → Authentication → Users')
      console.error('2. Click "Add User"')
      console.error(`3. Email: ${email}`)
      console.error('4. Password: Farheen@LHG123')
      console.error('5. Auto Confirm User: ON')
      console.error('6. Then run this script again')
      process.exit(1)
    }

    console.log(`✅ Found user: ${user.id}`)

    // Check if user_roles entry exists
    const { data: existingRole } = await supabaseAdmin
      .from('user_roles')
      .select('*')
      .eq('user_id', user.id)
      .single()

    if (existingRole) {
      console.log('User already has a role entry, updating...')
      const { error: updateError } = await supabaseAdmin
        .from('user_roles')
        .update({
          role: role,
          permissions: permissions,
          updated_at: new Date().toISOString()
        })
        .eq('user_id', user.id)

      if (updateError) {
        console.error('Error updating user role:', updateError)
        process.exit(1)
      }
      
      console.log('✅ User role updated successfully!')
    } else {
      console.log('Adding user role...')
      const { error: insertError } = await supabaseAdmin
        .from('user_roles')
        .insert({
          user_id: user.id,
          email: email.toLowerCase(),
          role: role,
          permissions: permissions
        })

      if (insertError) {
        console.error('Error adding user role:', insertError)
        process.exit(1)
      }
      
      console.log('✅ User role added successfully!')
    }

    console.log('\n✅ Complete!')
    console.log(`Email: ${email}`)
    console.log(`Role: ${role}`)
    console.log(`User ID: ${user.id}`)

  } catch (error) {
    console.error('Unexpected error:', error)
    process.exit(1)
  }
}

addRole()
