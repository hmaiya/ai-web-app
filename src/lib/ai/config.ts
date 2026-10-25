import "server-only";
import { readAIEnv } from "@/lib/env.server";

// Configuration only. Add a provider adapter when requirements are known.
export function getAIConfig() {
  const env = readAIEnv();

  return {
    apiKey: env.OPENAI_API_KEY,
    model: env.AI_MODEL,
  };
}
