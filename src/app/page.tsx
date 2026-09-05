import { Header } from '../components/Header'
import { Footer } from '../components/Footer'

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-navy-600 py-20 text-white">
          <div className="mx-auto max-w-4xl px-6 text-center">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
              Discover What Your Library <span className="text-gold-500">Actually Offers</span>
            </h1>
            <p className="mt-4 text-lg text-navy-200">
              From maker spaces to streaming services, explore unique programs and resources at libraries across DC, Maryland, and Virginia.
            </p>
            <div className="mt-8 flex justify-center gap-4">
              <a
                href="/libraries"
                className="rounded-md bg-gold-500 px-6 py-3 font-semibold text-navy-900 transition hover:bg-gold-400"
              >
                Browse Libraries
              </a>
              <a
                href="/search"
                className="rounded-md border border-gold-500 px-6 py-3 font-semibold text-gold-500 transition hover:bg-gold-500/10"
              >
                Search Offerings
              </a>
            </div>
          </div>
        </section>

        {/* Categories Section */}
        <section className="py-16">
          <div className="mx-auto max-w-6xl px-6">
            <h2 className="text-center text-2xl font-bold text-navy-600">
              Explore by Category
            </h2>
            <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
              {[
                { label: 'Maker & Tech Spaces', value: 'maker-tech-spaces', desc: '3D printers, laser cutters, and more' },
                { label: 'Library of Things', value: 'library-of-things', desc: 'Borrow tools, instruments, and gadgets' },
                { label: 'Digital Streaming', value: 'digital-streaming', desc: 'Free movies, music, and audiobooks' },
                { label: 'Career & Business', value: 'career-business', desc: 'Job help, resume reviews, coworking' },
                { label: 'Education & STEAM', value: 'education-steam', desc: 'Coding, tutoring, and learning labs' },
                { label: 'Historical Research', value: 'historical-research', desc: 'Archives, genealogy, local history' },
              ].map((cat) => (
                <a
                  key={cat.value}
                  href={`/libraries?category=${cat.value}`}
                  className="rounded-lg border border-navy-100 p-5 transition hover:border-gold-500 hover:shadow-md"
                >
                  <h3 className="font-semibold text-navy-600">{cat.label}</h3>
                  <p className="mt-1 text-sm text-navy-400">{cat.desc}</p>
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* Placeholder for featured libraries */}
        <section className="bg-navy-50 py-16">
          <div className="mx-auto max-w-6xl px-6 text-center">
            <h2 className="text-2xl font-bold text-navy-600">Featured Libraries</h2>
            <p className="mt-2 text-navy-400">Coming soon — curated picks from across the DMV.</p>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}