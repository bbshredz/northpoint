import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://vpxlgtgavjmftbdsajtk.supabase.co';
const SUPABASE_KEY = 'sb_publishable_xrH6NCenOJGh84f9NTf3WQ_xL8cmp3a';

export const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);
