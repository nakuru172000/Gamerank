import { createClient } from "@supabase/supabase-js";


const supabaseUrl='https://wokuyycbkbucquexbefz.supabase.co'

const supabaseKey='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Indva3V5eWNia2J1Y3F1ZXhiZWZ6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTA4NTE3ODEsImV4cCI6MjA2NjQyNzc4MX0.UMwRapFXvLhp2dGH59k1Fj8CgGbb95LrWVFFAaJF7RM'
export const supabase = createClient(supabaseUrl, supabaseKey);