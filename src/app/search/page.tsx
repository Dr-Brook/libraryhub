import { Header } from '../components/Header'
import { Footer } from '../components/Footer'

const CATEGORIES = [
  { value: 'maker-tech-spaces', label: 'Maker & Tech Spaces', icon: '🔧' },
  { value: 'library-of-things', label: 'Library of Things', icon: '🎒' },
  { value: 'digital-streaming', label: 'Digital Streaming', icon: '🎬' },
  { value: 'career-business', label: 'Career & Business', icon: '💼' },
  { value: 'government-services', label: 'Government Services', icon: '🏛️' },
  { value: 'creative-maker', label: 'Creative Maker', icon: '🎨' },
  { value: 'historical-research', label: 'Historical Research', icon: '📜' },
  { value: 'mobile-outreach', label: 'Mobile Outreach', icon: '🚐' },
  { value: 'education-steam', label: 'Education & STEAM', icon: '📚' },
]

async function searchOfferings(query: string, category: string) {
  const baseUrl = process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3003'
  let url = `${baseUrl}/api/offerings?limit=50&depth=1`
  if (query) url += `&where[title][contains]=${encodeURIComponent(query)}`
  if (category) url += `&where[category][equals]=${category}`

  try {
    const res = await fetch(url, { next: { revalidate: 60 } })
    if (!res.ok) return []
    const data = await res.json()
    return data.docs || []
  } catch {
    return []
  }
}

async function searchLibraries(query: string) {
  const baseUrl = process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3003'
  let url = `${baseUrl}/api/libraries?limit=50&depth=1`
  if (query) url += `&where[name][contains]=${encodeURIComponent(query)}`

  try {
    const res = await fetch(url, { next: { revalidate: 60 } })
    if (!res.ok) return []
    const data = await res.json()
    return data.docs || []
  } catch {
    return []
  }
}

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const params = await searchParams
  const query = typeof params.q === 'string' ? params.q : ''
  const category = typeof params.category === 'string' ? params.category : ''

  const [offerings, libraries] = await Promise.all([
    searchOfferings(query, category),
    searchLibraries(query),
  ])

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        {/* Search hero */}
        <section className="bg-navy-600 py-12 text-white">
          <div className="mx-auto max-w-4xl px-6 text-center">
            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Search <span className="text-gold-500">Offerings</span>
            </h1>
            <p className="mt-3 text-lg text-navy-200">
              Find unique programs, services, and resources at DMV libraries.
            </p>
          </div>
        </section>

        {/* Search form */}
        <section className="border-b border-navy-100 bg-white py-6">
          <div className="mx-auto max-w-4xl px-6">
            <form method="get" className="flex flex-col gap-4">
              <div className="flex gap-3">
                <input
                  type="text"
                  name="q"
                  placeholder="Search for maker spaces, streaming, tools..."
                  defaultValue={query}
                  className="flex-1 rounded-md border border-navy-200 px-4 py-3 text-sm focus:border-gold-500 focus:outline-none focus:ring-1 focus:ring-gold-500"
                />
                <button
                  type="submit"
                  className="rounded-md bg-gold-500 px-6 py-3 font-semibold text-navy-900 transition hover:bg-gold-400"
                >
                  Search
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                <a
                  href="/search"
                  className={`rounded-full px-4 py-1.5 text-sm font-medium transition ${
                    !category
                      ? 'bg-navy-600 text-white'
                      : 'bg-navy-50 text-navy-600 hover:bg-navy-100'
                  }`}
                >
                  All
                </a>
                {CATEGORIES.map((cat) => (
                  <a
                    key={cat.value}
                    href={`/search?category=${cat.value}`}
                    className={`rounded-full px-4 py-1.5 text-sm font-medium transition ${
                      category === cat.value
                        ? 'bg-navy-600 text-white'
                        : 'bg-navy-50 text-navy-600 hover:bg-navy-100'
                    }`}
                  >
                    {cat.icon} {cat.label}
                  </a>
                ))}
              </div>
            </form>
          </div>
        </section>

        {/* Results */}
        <section className="py-12">
          <div className="mx-auto max-w-6xl px-6">
            {!query && !category ? (
              <div className="py-12 text-center">
                <p className="text-xl font-semibold text-navy-600">
                  What are you looking for?
                </p>
                <p className="mt-2 text-navy-400">
                  Search by keyword or browse by category above.
                </p>
              </div>
            ) : (
              <>
                {/* Offerings */}
                {offerings.length > 0 && (
                  <div>
                    <h2 className="mb-6 text-xl font-bold text-navy-600">
                      Programs &amp; Services ({offerings.length})
                    </h2>
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                      {offerings.map((offering: any) => (
                        <a
                          key={offering.id}
                          href={offering.url || `/libraries/${offering.library?.slug || ''}`}
                          className="group rounded-lg border border-navy-100 bg-white p-5 transition hover:border-gold-500 hover:shadow-lg"
                        >
                          <span className="inline-block rounded bg-navy-50 px-2 py-0.5 text-xs font-medium text-navy-500">
                            {CATEGORIES.find((c) => c.value === offering.category)?.label || offering.category}
                          </span>
                          <h3 className="mt-2 font-semibold text-navy-600 group-hover:text-gold-500">
                            {offering.title}
                          </h3>
                          {offering.library && (
                            <p className="mt-1 text-sm text-navy-400">
                              {typeof offering.library === 'object' ? offering.library.name : 'Library'}
                            </p>
                          )}
                        </a>
                      ))}
                    </div>
                  </div>
                )}

                {/* Libraries */}
                {libraries.length > 0 && (
                  <div className={offerings.length > 0 ? 'mt-12' : ''}>
                    <h2 className="mb-6 text-xl font-bold text-navy-600">
                      Libraries ({libraries.length})
                    </h2>
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                      {libraries.map((lib: any) => (
                        <a
                          key={lib.id}
                          href={`/libraries/${lib.slug}`}
                          className="group rounded-lg border border-navy-100 bg-white p-5 transition hover:border-gold-500 hover:shadow-lg"
                        >
                          <h3 className="font-semibold text-navy-600 group-hover:text-gold-500">
                            {lib.name}
                          </h3>
                          <p className="mt-1 text-sm text-navy-400">
                            {lib.city ? `${lib.city}, ` : ''}{lib.state}
                          </p>
                        </a>
                      ))}
                    </div>
                  </div>
                )}

                {offerings.length === 0 && libraries.length === 0 && (
                  <div className="py-12 text-center">
                    <p className="text-xl font-semibold text-navy-600">No results found</p>
                    <p className="mt-2 text-navy-400">
                      Try a different search term or browse by category.
                    </p>
                  </div>
                )}
              </>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}