import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const supabaseUrl = process.env.SUPABASE_URL || 'https://moofrnuptxblogvfweac.supabase.co';
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1vb2ZybnVwdHhibG9ndmZ3ZWFjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODYyODE2MDcsImV4cCI6MjEwMTg1NzYwN30.H1KFnNtx5zIGm8-clt9S3WdPIrBSlcUfa0HAwJPafNo';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
