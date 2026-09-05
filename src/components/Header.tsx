import { Logo } from '../components/Logo'

const navLinks = [
  { label: 'Libraries', href: '/libraries' },
  { label: 'Search', href: '/search' },
  { label: 'About', href: '/about' },
]

export function Header() {
  return (
    <header className="border-b border-navy-100 bg-white">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <a href="/" className="flex items-center gap-2">
          <Logo size={32} />
          <span className="text-xl font-bold text-navy-600">LibraryHub</span>
        </a>
        <nav className="flex items-center gap-6">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-navy-500 transition hover:text-gold-500"
            >
              {link.label}
            </a>
          ))}
        </nav>
      </div>
    </header>
  )
}