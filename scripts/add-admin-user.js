/**
 * One-time script to add an admin user
 * Run with: node scripts/add-admin-user.js
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
            // Remove quotes if present
            if ((value.startsWith('"') && value.endsWith('"')) || 
                (value.startsWith("'") && value.endsWith("'"))) {
              value = value.slice(1, -1)
            }
            process.env[key] = value
          }
        }
      })
      break // Use first found file
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

async function addAdminUser() {
  const email = 'farheen.nishat@legendmotorsuae.com'
  const password = 'Farheen@LHG123'
  const role = 'admin'

  try {
    console.log(`Creating admin user: ${email}`)

    // Check if user already exists in user_roles first
    const { data: existingRoleByEmail } = await supabaseAdmin
      .from('user_roles')
      .select('*')
      .eq('email', email.toLowerCase())
      .single()

    if (existingRoleByEmail) {
      console.log('User already exists in user_roles table!')
      console.log('Updating role and permissions...')
      
      const permissions = { dashboard: true, jobs: true, applications: true }
      const { error: updateError } = await supabaseAdmin
        .from('user_roles')
        .update({
          role: role,
          permissions: permissions,
          updated_at: new Date().toISOString()
        })
        .eq('user_id', existingRoleByEmail.user_id)

      if (updateError) {
        console.error('Error updating user role:', updateError)
        process.exit(1)
      }
      
      console.log('✅ User role updated successfully!')
      console.log(`User ID: ${existingRoleByEmail.user_id}`)
      console.log(`Email: ${existingRoleByEmail.email}`)
      return
    }

    // Check if user already exists in auth
    console.log('Checking auth.users table...')
    const { data: { users: allUsers }, error: listError } = await supabaseAdmin.auth.admin.listUsers()
    
    if (listError) {
      console.error('Error listing users:', listError)
      // Continue anyway
    }
    
    const existingUser = allUsers?.find(u => u.email?.toLowerCase() === email.toLowerCase())

    if (existingUser) {
      console.log('User already exists in auth.users, checking user_roles...')
      
      // Check if user_roles entry exists
      const { data: existingRole } = await supabaseAdmin
        .from('user_roles')
        .select('*')
        .eq('user_id', existingUser.id)
        .single()

      if (existingRole) {
        console.log('User already exists in user_roles with role:', existingRole.role)
        console.log('Updating role and permissions...')
        
        const permissions = { dashboard: true, jobs: true, applications: true }
        const { error: updateError } = await supabaseAdmin
          .from('user_roles')
          .update({
            role: role,
            permissions: permissions,
            updated_at: new Date().toISOString()
          })
          .eq('user_id', existingUser.id)

        if (updateError) {
          console.error('Error updating user role:', updateError)
          process.exit(1)
        }
        
        console.log('✅ User role updated successfully!')
        return
      } else {
        // User exists in auth but not in user_roles
        console.log('User exists in auth but not in user_roles, adding role...')
        const permissions = { dashboard: true, jobs: true, applications: true }
        const { error: insertError } = await supabaseAdmin
          .from('user_roles')
          .insert({
            user_id: existingUser.id,
            email: email.toLowerCase(),
            role: role,
            permissions: permissions
          })

        if (insertError) {
          console.error('Error adding user role:', insertError)
          process.exit(1)
        }
        
        console.log('✅ User role added successfully!')
        return
      }
    }

    // Create new user
    console.log('Creating new user in auth...')
    let newUser
    let createError
    
    try {
      const result = await supabaseAdmin.auth.admin.createUser({
        email: email.toLowerCase().trim(),
        password: password,
        email_confirm: true,
      })
      newUser = result.data
      createError = result.error
    } catch (err) {
      createError = err
      console.error('Exception creating user:', err)
    }

    // Check if user was actually created despite the error
    if (createError) {
      console.log('Error reported, checking if user was created anyway...')
      const { data: { users: checkUsers } } = await supabaseAdmin.auth.admin.listUsers()
      const createdUser = checkUsers?.find(u => u.email?.toLowerCase() === email.toLowerCase())
      
      if (createdUser) {
        console.log('✅ User was created despite error! Continuing with role assignment...')
        newUser = { user: createdUser }
      } else {
        console.error('Error creating user:', createError)
        console.error('User was not created. Error details:', JSON.stringify(createError, null, 2))
        process.exit(1)
      }
    }

    if (!newUser?.user) {
      console.error('Failed to create user - no user data returned')
      process.exit(1)
    }

    console.log('User created in auth, waiting for trigger...')
    await new Promise(resolve => setTimeout(resolve, 1000))

    // Check if trigger created the role entry
    const { data: triggerRole } = await supabaseAdmin
      .from('user_roles')
      .select('*')
      .eq('user_id', newUser.user.id)
      .single()

    const permissions = { dashboard: true, jobs: true, applications: true }

    if (triggerRole) {
      // Update role from trigger
      console.log('Trigger created role entry, updating with correct role...')
      const { error: updateError } = await supabaseAdmin
        .from('user_roles')
        .update({
          role: role,
          permissions: permissions,
          updated_at: new Date().toISOString()
        })
        .eq('user_id', newUser.user.id)

      if (updateError) {
        console.error('Error updating user role:', updateError)
        await supabaseAdmin.auth.admin.deleteUser(newUser.user.id)
        process.exit(1)
      }
    } else {
      // Insert role manually
      console.log('No trigger entry found, inserting role manually...')
      const { error: insertError } = await supabaseAdmin
        .from('user_roles')
        .insert({
          user_id: newUser.user.id,
          email: email.toLowerCase(),
          role: role,
          permissions: permissions
        })

      if (insertError) {
        console.error('Error inserting user role:', insertError)
        await supabaseAdmin.auth.admin.deleteUser(newUser.user.id)
        process.exit(1)
      }
    }

    console.log('✅ Admin user created successfully!')
    console.log(`Email: ${email}`)
    console.log(`Role: ${role}`)
    console.log(`User ID: ${newUser.user.id}`)

  } catch (error) {
    console.error('Unexpected error:', error)
    process.exit(1)
  }
}

addAdminUser()
