# AI integration boundary

Keep provider SDKs and AI calls in this server-only directory. `config.ts`
validates configuration only when called; no SDK or inference endpoint is
implemented. OpenAI variable names are a starting convention, not a provider
commitment.

Before exposing an AI endpoint, implement authentication, input/output
validation, request size limits, per-user rate limits, token/cost budgets,
timeouts, cancellation, and safe errors. Do not log keys, private prompts, or
user content. Treat model output as untrusted, especially before tool execution.

Keep versioned prompt templates in `prompts/` and synthetic evaluation fixtures
in `tests/evals/`. Add retrieval, embeddings, streaming, or background jobs only
if the requirements call for them.
