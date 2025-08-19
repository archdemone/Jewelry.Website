export default function AboutPage() {
  // This page should never be reached due to middleware redirect
  // But keeping it as a fallback
  return (
    <main className="container py-10">
      <div className="text-center">
        <h1>Redirecting...</h1>
        <p>If you're not redirected automatically, <a href="/about-artisan" className="text-primary underline">click here</a>.</p>
      </div>
    </main>
  );
}
