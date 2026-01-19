import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import * as bcrypt from 'bcryptjs';

export async function POST(request: Request) {
  try {
    if (!process.env.SUPABASE_SERVICE_ROLE_KEY || !process.env.NEXT_PUBLIC_SUPABASE_URL) {
      return NextResponse.json({ error: 'Server configuration error' }, { status: 500 });
    }

    const body = await request.json();
    const { companyName, email, password } = body;

    if (!companyName || !email || !password) {
      return NextResponse.json(
        { error: 'Company name, email, and password are required' },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Please provide a valid email address' },
        { status: 400 }
      );
    }

    if (password.length < 6) {
      return NextResponse.json(
        { error: 'Password must be at least 6 characters long' },
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

    // Check if company already exists
    const { data: existingCompany } = await supabase
      .from('company_credentials')
      .select('id')
      .eq('company_name', companyName)
      .single();

    if (existingCompany) {
      return NextResponse.json(
        { error: 'Company credentials already exist for this company' },
        { status: 400 }
      );
    }

    // Check if email already exists
    const { data: existingEmail } = await supabase
      .from('company_credentials')
      .select('id')
      .eq('email', email.toLowerCase().trim())
      .single();

    if (existingEmail) {
      return NextResponse.json(
        { error: 'This email is already registered' },
        { status: 400 }
      );
    }

    // Hash password
    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(password, saltRounds);

    // Insert company credentials
    const { data, error } = await supabase
      .from('company_credentials')
      .insert([
        {
          company_name: companyName,
          email: email.toLowerCase().trim(),
          password_hash: passwordHash,
        }
      ])
      .select('id, company_name, email')
      .single();

    if (error) {
      console.error('Error creating company credentials:', error);
      return NextResponse.json(
        { error: 'Failed to create company credentials' },
        { status: 500 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        company: {
          id: data.id,
          companyName: data.company_name,
          email: data.email,
        },
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error('Create company credentials error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to create company credentials' },
      { status: 500 }
    );
  }
}
