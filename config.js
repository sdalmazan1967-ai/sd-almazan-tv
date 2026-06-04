// Configuración de Supabase — SD Almázán TV
const SUPABASE_URL = 'https://sdscrqjyzvavreschiba.supabase.co';
const SUPABASE_KEY = 'sb_publishable_QvazS7O_bpqhu8kEHYYYRw_vE_SG628';
const ADMIN_EMAIL = 'sdalmazan1967@gmail.com';

if (!window._supabaseClient) {
  window._supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY);
}
const supabase = window._supabaseClient;
