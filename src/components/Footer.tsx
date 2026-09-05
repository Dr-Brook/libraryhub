export function Footer() {
  return (
    <footer className="border-t border-navy-100 bg-navy-600 py-8 text-white">
      <div className="mx-auto max-w-6xl px-6">
        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          <p className="text-sm text-navy-200">
            &copy; {new Date().getFullYear()} LibraryHub — Discover DMV Library Offerings
          </p>
          <div className="flex gap-4">
            <a href="/about" className="text-sm text-navy-300 transition hover:text-gold-500">
              About
            </a>
            <a href="/privacy" className="text-sm text-navy-300 transition hover:text-gold-500">
              Privacy
            </a>
            <a href="/contact" className="text-sm text-navy-300 transition hover:text-gold-500">
              Contact
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}