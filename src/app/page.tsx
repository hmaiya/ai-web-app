export default function HomePage() {
  return (
    <main className="mx-auto flex min-h-screen max-w-2xl flex-col justify-center gap-4 px-6">
      <p className="text-sm font-medium text-slate-500">Project scaffold</p>
      <h1 className="text-4xl font-semibold tracking-tight">Ready to build.</h1>
      <p className="leading-relaxed text-slate-600">
        Next.js, TypeScript, Tailwind, and Supabase foundations are in place.
        Add your requirements and start with the first feature.
      </p>
      <p className="text-sm text-slate-500">
        No AI provider or database connection is required to run this page.
      </p>
    </main>
  );
}
