'use client'
export default function ContentError({reset}: {error: Error; reset: () => void}) {
  return <section className="mx-auto max-w-3xl px-6 py-40 text-center"><h1 className="mb-4 text-3xl font-semibold">This page is temporarily unavailable</h1><p className="mb-6">Please try again in a moment.</p><button className="rounded bg-sky-600 px-6 py-3 text-white" onClick={reset}>Try again</button></section>
}
