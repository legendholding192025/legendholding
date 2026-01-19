import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { cookies } from 'next/headers';

export async function GET(request: Request) {
  try {
    if (!process.env.SUPABASE_SERVICE_ROLE_KEY || !process.env.NEXT_PUBLIC_SUPABASE_URL) {
      return NextResponse.json({ error: 'Server configuration error' }, { status: 500 });
    }

    const cookieStore = await cookies();
    const sessionToken = cookieStore.get('company_session')?.value;

    if (!sessionToken) {
      return NextResponse.json({ authenticated: false }, { status: 401 });
    }

    // Decode session token to get company ID
    try {
      const decoded = Buffer.from(sessionToken, 'base64').toString('utf-8');
      const [companyId] = decoded.split(':');

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

      // Verify company exists
      const { data: company, error } = await supabase
        .from('company_credentials')
        .select('id, company_name, email')
        .eq('id', companyId)
        .single();

      if (error || !company) {
        return NextResponse.json({ authenticated: false }, { status: 401 });
      }

      return NextResponse.json({
        authenticated: true,
        company: {
          id: company.id,
          companyName: company.company_name,
          email: company.email,
        },
      });
    } catch (decodeError) {
      return NextResponse.json({ authenticated: false }, { status: 401 });
    }
  } catch (error: any) {
    console.error('Session verification error:', error);
    return NextResponse.json({ authenticated: false }, { status: 500 });
  }
}
