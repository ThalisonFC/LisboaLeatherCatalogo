import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://vuyqojdbtfrfsnnsxvzs.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZ1eXFvamRidGZyZnNubnN4dnpzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzIxNDkzMDMsImV4cCI6MjA4NzcyNTMwM30.B2fp2kTPP3tRY7VHMCl4NO7PRMkkuFKxkwPNm5pF2k8';

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function testSupabase() {
    const { data, error } = await supabase.from('products').select('*');
    if (error) {
        console.error('Error fetching products:', error);
    } else {
        console.log('Products:', JSON.stringify(data));
    }

    const { data: users, error: errUsers } = await supabase.from('users').select('*');
    if (errUsers) {
        console.error('Error fetching users:', errUsers);
    } else {
        console.log('Users:', JSON.stringify(users));
    }
}

testSupabase();
