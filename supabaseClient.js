// Shared Supabase client, loaded as a classic (non-module) script so the
// existing pages can keep using global functions in inline onclick handlers.
// Requires the Supabase UMD bundle <script> tag to run first.
const SUPABASE_URL = "https://fybjtyffzcmnxstrlnfj.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "sb_publishable_1bpPWlzWAnvRsxgegb3TVw_2KoIKTmM";

// No declaration keyword: the Supabase UMD bundle already declares a global
// `supabase` namespace object; this overwrites it with the actual client.
supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);

// escapeHtml now lives in cartStore.js (loaded on every page, including the
// 3 pages — cart/contact/brand — that never load this file at all), so it's
// always defined regardless of which page is rendering. See the comment
// there for why.
