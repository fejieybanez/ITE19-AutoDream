import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://imgzjyvjqnolwvvfgbop.supabase.co' 
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImltZ3pqeXZqcW5vbHd2dmZnYm9wIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDU1NDUxMDAsImV4cCI6MjAyMTEyMTEwMH0.djn4IH4CJgCE5bywCp-nUtJsq20FW7kKSgvEQt3QlOs'

const supabase = createClient(supabaseUrl, supabaseAnonKey)

export default supabase;