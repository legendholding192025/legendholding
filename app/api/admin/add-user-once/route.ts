import { createClient } from '@supabase/supabase-js'
import { NextResponse } from 'next/server'

// One-time endpoint to add a specific admin user
// This should be deleted after use for security
export async function POST(request: Request) {
  try {
    if (!process.env.SUPABASE_SERVICE_ROLE_KEY || !process.env.NEXT_PUBLIC_SUPABASE_URL) {
      return NextResponse.json({ error: 'Service configuration missing' }, { status: 500 })
    }

    const supabaseAdmin = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.SUPABASE_SERVICE_ROLE_KEY,
      {
        auth: {
          autoRefreshToken: false,
          persistSession: false
        }
      }
    )

    const email = 'farheen.nishat@legendmotorsuae.com'
    const password = 'Farheen@LHG123'
    const role = 'admin'

    // Check if user already exists
    const { data: { users: allUsers } } = await supabaseAdmin.auth.admin.listUsers()
    const existingUser = allUsers?.find(u => u.email?.toLowerCase() === email.toLowerCase())

    if (existingUser) {
      // Check if user_roles entry exists
      const { data: existingRole } = await supabaseAdmin
        .from('user_roles')
        .select('*')
        .eq('user_id', existingUser.id)
        .single()

      const permissions = { dashboard: true, jobs: true, applications: true }

      if (existingRole) {
        // Update existing role
        const { error: updateError } = await supabaseAdmin
          .from('user_roles')
          .update({
            role: role,
            permissions: permissions,
            updated_at: new Date().toISOString()
          })
          .eq('user_id', existingUser.id)

        if (updateError) {
          return NextResponse.json({ error: 'Failed to update user role', details: updateError.message }, { status: 500 })
        }

        return NextResponse.json({
          success: true,
          message: 'User already exists, role updated successfully',
          user: {
            id: existingUser.id,
            email: existingUser.email,
            role: role
          }
        })
      } else {
        // User exists in auth but not in user_roles
        const { error: insertError } = await supabaseAdmin
          .from('user_roles')
          .insert({
            user_id: existingUser.id,
            email: email.toLowerCase(),
            role: role,
            permissions: permissions
          })

        if (insertError) {
          return NextResponse.json({ error: 'Failed to add user role', details: insertError.message }, { status: 500 })
        }

        return NextResponse.json({
          success: true,
          message: 'User exists, role added successfully',
          user: {
            id: existingUser.id,
            email: existingUser.email,
            role: role
          }
        })
      }
    }

    // Create new user
    const { data: newUser, error: createError } = await supabaseAdmin.auth.admin.createUser({
      email: email.toLowerCase().trim(),
      password: password,
      email_confirm: true,
    })

    if (createError) {
      console.error('Error creating user:', createError)
      return NextResponse.json({ 
        error: 'Failed to create user', 
        details: createError.message || createError.code 
      }, { status: 500 })
    }

    if (!newUser.user) {
      return NextResponse.json({ error: 'Failed to create user - no user data returned' }, { status: 500 })
    }

    // Wait for trigger
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
      const { error: updateError } = await supabaseAdmin
        .from('user_roles')
        .update({
          role: role,
          permissions: permissions,
          updated_at: new Date().toISOString()
        })
        .eq('user_id', newUser.user.id)

      if (updateError) {
        await supabaseAdmin.auth.admin.deleteUser(newUser.user.id)
        return NextResponse.json({ error: 'Failed to update user role', details: updateError.message }, { status: 500 })
      }
    } else {
      // Insert role manually
      const { error: insertError } = await supabaseAdmin
        .from('user_roles')
        .insert({
          user_id: newUser.user.id,
          email: email.toLowerCase(),
          role: role,
          permissions: permissions
        })

      if (insertError) {
        await supabaseAdmin.auth.admin.deleteUser(newUser.user.id)
        return NextResponse.json({ error: 'Failed to add user role', details: insertError.message }, { status: 500 })
      }
    }

    return NextResponse.json({
      success: true,
      message: 'Admin user created successfully',
      user: {
        id: newUser.user.id,
        email: newUser.user.email,
        role: role
      }
    })

  } catch (error: any) {
    console.error('Error:', error)
    return NextResponse.json(
      { error: 'Failed to add user', details: error.message },
      { status: 500 }
    )
  }
}
