import "server-only";
import { z } from "zod";

const aiEnvSchema = z.object({
  OPENAI_API_KEY: z.string().trim().min(1),
  AI_MODEL: z.string().trim().min(1),
});

export function readAIEnv(
  source: Record<string, string | undefined> = process.env,
) {
  const result = aiEnvSchema.safeParse(source);

  if (!result.success) {
    throw new Error(
      "AI is not configured. Set OPENAI_API_KEY and AI_MODEL in .env.local.",
    );
  }

  return result.data;
}
