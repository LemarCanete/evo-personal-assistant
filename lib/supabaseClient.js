
import { createClient } from '@supabase/supabase-js'
const supabaseUrl = 'https://agiqzhzythpftpvpqbej.supabase.co'
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFnaXF6aHp5dGhwZnRwdnBxYmVqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDA0MTgzMDYsImV4cCI6MjA1NTk5NDMwNn0.FcpYO7T255T0J_WOeqK3RI3VG18JxqGOjThFIlxv5V4"
const supabase = createClient(supabaseUrl, supabaseKey)


export default supabase