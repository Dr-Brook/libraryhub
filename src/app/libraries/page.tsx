import { Header } from '../../components/Header'
import { Footer } from '../../components/Footer'

const CATEGORIES = [
  { value: 'maker-tech-spaces', label: 'Maker & Tech Spaces', desc: '3D printers, laser cutters, and more', icon: '🔧' },
  { value: 'library-of-things', label: 'Library of Things', desc: 'Borrow tools, instruments, and gadgets', icon: '🎒' },
  { value: 'digital-streaming', label: 'Digital Streaming', desc: 'Free movies, music, and audiobooks', icon: '🎬' },
  { value: 'career-business', label: 'Career & Business', desc: 'Job help, resume reviews, coworking', icon: '💼' },
  { value: 'government-services', label: 'Government Services', desc: 'Passports, notary, tax assistance', icon: '🏛️' },
  { value: 'creative-maker', label: 'Creative Maker', desc: 'Studios, workshops, and crafting', icon: '🎨' },
  { value: 'historical-research', label: 'Historical Research', desc: 'Archives, genealogy, local history', icon: '📜' },
  { value: 'mobile-outreach', label: 'Mobile Outreach', desc: 'Bookmobiles and community programs', icon: '🚐' },
  { value: 'education-steam', label: 'Education & STEAM', desc: 'Coding, tutoring, and learning labs', icon: '📚' },
]

const STATES = ['DC', 'MD', 'VA']

async function getLibraries(searchParams: { [key: string]: string | string[] | undefined }) {
  const category = typeof searchParams.category === 'string' ? searchParams.category : ''
  const state = typeof searchParams.state === 'string' ? searchParams.state : ''
  const search = typeof searchParams.search === 'string' ? searchParams.search : ''

  let url = `${process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3003'}/api/libraries?limit=100`
  if (category) url += `&where[categories][equals]=${category}`
  if (state) url += `&where[state][equals]=${state}`
  if (search) url += `&where[name][contains]=${encodeURIComponent(search)}`

  try {
    const res = await fetch(url, { next: { revalidate: 60 } })
    if (!res.ok) return []
    const data = await res.json()
    return data.docs || []
  } catch {
    return []
  }
}

export default async function LibrariesPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const params = await searchParams
  const libraries = await getLibraries(params)
  const activeCategory = typeof params.category === 'string' ? params.category : ''
  const activeState = typeof params.state === 'string' ? params.state : ''

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        {/* Hero */}
        <section className="bg-navy-600 py-12 text-white">
          <div className="mx-auto max-w-6xl px-6 text-center">
            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Browse <span className="text-gold-500">Libraries</span>
            </h1>
            <p className="mt-3 text-lg text-navy-200">
              Discover unique programs and resources at libraries across the DMV region.
            </p>
          </div>
        </section>

        {/* Filters */}
        <section className="border-b border-navy-100 bg-white py-4">
          <div className="mx-auto max-w-6xl px-6">
            <form method="get" className="flex flex-wrap items-center gap-3">
              <input
                type="text"
                name="search"
                placeholder="Search libraries..."
                defaultValue={typeof params.search === 'string' ? params.search : ''}
                className="rounded-md border border-navy-200 px-4 py-2 text-sm focus:border-gold-500 focus:outline-none focus:ring-1 focus:ring-gold-500"
              />
              <select
                name="state"
                className="rounded-md border border-navy-200 px-4 py-2 text-sm focus:border-gold-500 focus:outline-none"
              >
                <option value="">All States</option>
                {STATES.map((s) => (
                  <option key={s} value={s} selected={activeState === s}>
                    {s}
                  </option>
                ))}
              </select>
              <button
                type="submit"
                className="rounded-md bg-gold-500 px-5 py-2 text-sm font-semibold text-navy-900 transition hover:bg-gold-400"
              >
                Filter
              </button>
              {(activeCategory || activeState || params.search) && (
                <a
                  href="/libraries"
                  className="text-sm text-navy-400 transition hover:text-gold-500"
                >
                  Clear filters
                </a>
              )}
            </form>
          </div>
        </section>

        {/* Category pills */}
        <section className="border-b border-navy-100 bg-navy-50 py-3">
          <div className="mx-auto max-w-6xl px-6">
            <div className="flex flex-wrap gap-2">
              <a
                href="/libraries"
                className={`rounded-full px-4 py-1.5 text-sm font-medium transition ${
                  !activeCategory
                    ? 'bg-navy-600 text-white'
                    : 'bg-white text-navy-600 hover:bg-navy-100'
                }`}
              >
                All
              </a>
              {CATEGORIES.map((cat) => (
                <a
                  key={cat.value}
                  href={`/libraries?category=${cat.value}`}
                  className={`rounded-full px-4 py-1.5 text-sm font-medium transition ${
                    activeCategory === cat.value
                      ? 'bg-navy-600 text-white'
                      : 'bg-white text-navy-600 hover:bg-navy-100'
                  }`}
                >
                  {cat.icon} {cat.label}
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* Library list */}
        <section className="py-12">
          <div className="mx-auto max-w-6xl px-6">
            {libraries.length === 0 ? (
              <div className="py-16 text-center">
                <p className="text-xl font-semibold text-navy-600">No libraries found</p>
                <p className="mt-2 text-navy-400">
                  Try adjusting your filters or check back soon — we&apos;re adding more libraries regularly.
                </p>
                <a
                  href="/libraries"
                  className="mt-4 inline-block rounded-md bg-gold-500 px-6 py-2 font-semibold text-navy-900 transition hover:bg-gold-400"
                >
                  Clear Filters
                </a>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                {libraries.map((lib: any) => (
                  <a
                    key={lib.id}
                    href={`/libraries/${lib.slug}`}
                    className="group rounded-lg border border-navy-100 bg-white p-6 transition hover:border-gold-500 hover:shadow-lg"
                  >
                    <div className="flex items-start justify-between">
                      <h3 className="text-lg font-semibold text-navy-600 group-hover:text-gold-500">
                        {lib.name}
                      </h3>
                      {lib.featured && (
                        <span className="rounded bg-gold-100 px-2 py-0.5 text-xs font-semibold text-gold-700">
                          Featured
                        </span>
                      )}
                    </div>
                    <p className="mt-1 text-sm text-navy-400">
                      {lib.city ? `${lib.city}, ` : ''}{lib.state}
                    </p>
                    {lib.categories && lib.categories.length > 0 && (
                      <div className="mt-3 flex flex-wrap gap-1.5">
                        {lib.categories.map((cat: string) => (
                          <span
                            key={cat}
                            className="rounded bg-navy-50 px-2 py-0.5 text-xs text-navy-500"
                          >
                            {CATEGORIES.find((c) => c.value === cat)?.label || cat}
                          </span>
                        ))}
                      </div>
                    )}
                  </a>
                ))}
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}