import { Header } from '../components/Header'
import { Footer } from '../components/Footer'

export default function AboutPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        {/* Hero */}
        <section className="bg-navy-600 py-16 text-white">
          <div className="mx-auto max-w-4xl px-6 text-center">
            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
              About <span className="text-gold-500">LibraryHub</span>
            </h1>
            <p className="mt-4 text-lg text-navy-200">
              Discover the hidden gems at libraries across the DMV region.
            </p>
          </div>
        </section>

        {/* Mission */}
        <section className="py-16">
          <div className="mx-auto max-w-4xl px-6">
            <h2 className="text-2xl font-bold text-navy-600">Our Mission</h2>
            <p className="mt-4 text-navy-500 leading-relaxed">
              Most people think of libraries as just books. But across DC, Maryland, and Virginia,
              libraries offer so much more — 3D printers, laser cutters, streaming services,
              career coaching, maker spaces, tool lending libraries, and more. LibraryHub makes
              it easy to discover these unique offerings in one place.
            </p>
          </div>
        </section>

        {/* What you'll find */}
        <section className="bg-navy-50 py-16">
          <div className="mx-auto max-w-4xl px-6">
            <h2 className="text-2xl font-bold text-navy-600">What You&apos;ll Find</h2>
            <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2">
              {[
                { icon: '🔧', title: 'Maker & Tech Spaces', desc: '3D printers, laser cutters, CNC machines, and recording studios.' },
                { icon: '🎒', title: 'Library of Things', desc: 'Borrow tools, musical instruments, telescopes, and more.' },
                { icon: '🎬', title: 'Digital Streaming', desc: 'Free access to movies, music, audiobooks, and e-books.' },
                { icon: '💼', title: 'Career & Business', desc: 'Resume help, job search workshops, and coworking spaces.' },
                { icon: '📚', title: 'Education & STEAM', desc: 'Coding bootcamps, tutoring, homework help, and language classes.' },
                { icon: '📜', title: 'Historical Research', desc: 'Archives, genealogy resources, and local history collections.' },
              ].map((item) => (
                <div key={item.title} className="rounded-lg border border-navy-100 bg-white p-6">
                  <span className="text-2xl">{item.icon}</span>
                  <h3 className="mt-2 font-semibold text-navy-600">{item.title}</h3>
                  <p className="mt-1 text-sm text-navy-400">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Coverage */}
        <section className="py-16">
          <div className="mx-auto max-w-4xl px-6 text-center">
            <h2 className="text-2xl font-bold text-navy-600">Coverage Area</h2>
            <p className="mt-4 text-navy-500">
              LibraryHub covers public library systems across the DMV region —
              <strong> Washington, DC</strong>, <strong>Maryland</strong> (Montgomery, Prince George&apos;s,
              Howard, Anne Arundel, Baltimore, and more counties), and <strong>Virginia</strong>{' '}
              (Fairfax, Arlington, Loudoun, Prince William, and more).
            </p>
            <div className="mt-8 flex justify-center gap-8">
              <div className="rounded-lg bg-navy-600 px-8 py-4 text-center text-white">
                <div className="text-3xl font-bold">DC</div>
                <div className="text-sm text-navy-200">District of Columbia</div>
              </div>
              <div className="rounded-lg bg-navy-600 px-8 py-4 text-center text-white">
                <div className="text-3xl font-bold">MD</div>
                <div className="text-sm text-navy-200">Maryland</div>
              </div>
              <div className="rounded-lg bg-navy-600 px-8 py-4 text-center text-white">
                <div className="text-3xl font-bold">VA</div>
                <div className="text-sm text-navy-200">Virginia</div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="bg-gold-500 py-12">
          <div className="mx-auto max-w-4xl px-6 text-center">
            <h2 className="text-2xl font-bold text-navy-900">Ready to Explore?</h2>
            <p className="mt-2 text-navy-700">
              Browse libraries or search for specific programs and services.
            </p>
            <div className="mt-6 flex justify-center gap-4">
              <a
                href="/libraries"
                className="rounded-md bg-navy-600 px-6 py-3 font-semibold text-white transition hover:bg-navy-700"
              >
                Browse Libraries
              </a>
              <a
                href="/search"
                className="rounded-md border-2 border-navy-600 px-6 py-3 font-semibold text-navy-900 transition hover:bg-navy-600 hover:text-white"
              >
                Search Offerings
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}