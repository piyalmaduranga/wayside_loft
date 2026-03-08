import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const secretKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const supabaseSchemaEnv = process.env.NEXT_PUBLIC_SUPABASE_SCHEMA_ENV ?? "public";

let client = null;

// USED TO BYPASS AUTH & RLS POLICIES
// Initialized lazily to avoid crashing if imported on the client side
export const getRiskySupabaseClient = () => {
  if (!client) {
    if (!supabaseUrl || !secretKey) {
      throw new Error("Missing Supabase URL or Service Role Key for risky client");
    }
    client = createClient(supabaseUrl, secretKey, {
      db: { schema: supabaseSchemaEnv },
    });
  }
  return client;
};

// For backward compatibility while we refactor, but it's safer to use the function
export const riskySupabaseClient = typeof window === "undefined" && supabaseUrl && secretKey
  ? createClient(supabaseUrl, secretKey, { db: { schema: supabaseSchemaEnv } })
  : null;
