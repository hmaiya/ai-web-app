import "server-only";
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { readPublicEnv } from "@/lib/env";
import type { Database } from "@/types/database";

export async function createClient(responseHeaders?: Headers) {
  const env = readPublicEnv();
  const cookieStore = await cookies();

  return createServerClient<Database>(
    env.NEXT_PUBLIC_SUPABASE_URL,
    env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet, headers) {
          try {
            cookiesToSet.forEach(({ name, value, options }) => {
              cookieStore.set(name, value, options);
            });
          } catch {
            // Server Components cannot write cookies. Add session refresh
            // proxy before implementing authenticated pages.
          }
          Object.entries(headers).forEach(([name, value]) => {
            responseHeaders?.set(name, value);
          });
        },
      },
    },
  );
}
