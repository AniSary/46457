import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://krlbdnitwvodvycsegrz.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtybGJkbml0d3ZvZHZ5Y3NlZ3J6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDc5MDk1NzksImV4cCI6MjA2MzQ4NTU3OX0.7XFSIIKEut3DSK0RPNnuh6m1j5QSM-cdaQASwUk2vts';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
