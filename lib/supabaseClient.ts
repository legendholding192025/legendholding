import { createClient } from '@supabase/supabase-js';

if (!process.env.NEXT_PUBLIC_SUPABASE_URL) {
  console.error('Missing environment variable: NEXT_PUBLIC_SUPABASE_URL');
}

if (!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
  console.error('Missing environment variable: NEXT_PUBLIC_SUPABASE_ANON_KEY');
}

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

export const supabase = supabaseUrl && supabaseAnonKey 
  ? createClient(supabaseUrl, supabaseAnonKey, {
      auth: {
        persistSession: false,
        autoRefreshToken: false
      },
      global: {
        headers: {
          'x-client-info': 'legend-holding-website'
        }
      },
      db: {
        schema: 'public'
      },
      realtime: {
        params: {
          eventsPerSecond: 2
        }
      }
    })
  : null;

// Connection health check utility
export const checkSupabaseConnection = async (): Promise<boolean> => {
  if (!supabase) {
    console.error('Supabase client not configured')
    return false
  }
  
  try {
    const { error } = await supabase.from('news_articles').select('id').limit(1)
    if (error) {
      console.warn('Supabase connection check failed:', error.message)
      return false
    }
    return true
  } catch (error) {
    console.warn('Supabase connection check failed:', error instanceof Error ? error.message : 'Unknown error')
    return false
  }
} 