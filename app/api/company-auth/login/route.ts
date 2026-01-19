import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import * as bcrypt from 'bcryptjs';

export async function POST(request: Request) {
  try {
    if (!process.env.SUPABASE_SERVICE_ROLE_KEY || !process.env.NEXT_PUBLIC_SUPABASE_URL) {
      return NextResponse.json({ error: 'Server configuration error' }, { status: 500 });
    }

    const body = await request.json();
    const { email, password } = body;

    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email and password are required' },
        { status: 400 }
      );
    }

    // Create Supabase client
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.SUPABASE_SERVICE_ROLE_KEY,
      {
        auth: {
          autoRefreshToken: false,
          persistSession: false
        }
      }
    );

    // Fetch company credentials by email
    const { data: company, error: fetchError } = await supabase
      .from('company_credentials')
      .select('*')
      .eq('email', email.toLowerCase().trim())
      .single();

    if (fetchError || !company) {
      return NextResponse.json(
        { error: 'Invalid email or password' },
        { status: 401 }
      );
    }

    // Verify password
    const isValidPassword = await bcrypt.compare(password, company.password_hash);

    if (!isValidPassword) {
      return NextResponse.json(
        { error: 'Invalid email or password' },
        { status: 401 }
      );
    }

    // Create a simple session token (in production, use JWT or proper session management)
    // For now, we'll return company name and use it for session management
    const sessionToken = Buffer.from(`${company.id}:${Date.now()}`).toString('base64');

    // Return success with company info (password hash excluded)
    return NextResponse.json(
      {
        success: true,
        company: {
          id: company.id,
          companyName: company.company_name,
          email: company.email,
        },
        sessionToken: sessionToken,
      },
      {
        status: 200,
        headers: {
          'Set-Cookie': `company_session=${sessionToken}; Path=/; HttpOnly; SameSite=Lax; Max-Age=86400`, // 24 hours
        },
      }
    );
  } catch (error: any) {
    console.error('Company login error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to authenticate' },
      { status: 500 }
    );
  }
}
