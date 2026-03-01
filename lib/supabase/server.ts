/**
 * Supabase client — SERVER ONLY (service_role).
 * Never import this file from client components.
 * The service_role key bypasses RLS — use only in Route Handlers.
 */
import { createClient } from "@supabase/supabase-js";

export function createServerClient() {
  const url  = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key  = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !key) {
    throw new Error(
      "Supabase env vars manquantes: NEXT_PUBLIC_SUPABASE_URL et/ou SUPABASE_SERVICE_ROLE_KEY"
    );
  }

  return createClient(url, key, {
    auth: {
      autoRefreshToken: false,
      persistSession:   false,
    },
  });
}
