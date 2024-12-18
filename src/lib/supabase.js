import { createClient } from '@supabase/supabase-js';

if (
  typeof process.env.NEXT_PUBLIC_SUPABASE_URL !== 'string' ||
  typeof process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY !== 'string'
) {
  throw new Error('Missing Supabase environment variables');
}

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

try {
  // Validate URL format
  new URL(supabaseUrl);
} catch (error) {
  console.error('Invalid Supabase URL format:', error);
  throw new Error('Invalid Supabase URL format. URL must start with https://');
}

export const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: {
    persistSession: false
  },
  db: {
    schema: 'public'
  }
}); 