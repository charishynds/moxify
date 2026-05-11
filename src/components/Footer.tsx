const links = [
  { label: 'Approach', href: '#approach' },
  { label: 'Services', href: '#services' },
  { label: 'Contact', href: '#contact' },
]

export function Footer() {
  return (
    <footer className="border-t border-border py-12">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
        <a href="#" aria-label="Moxify, return to top" className="font-display font-bold text-lg tracking-tight">
          <span className="text-foreground">MOX</span>
          <span className="text-primary">IFY</span>
        </a>

        <nav aria-label="Footer navigation" className="flex flex-wrap justify-center gap-6">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} Moxify Ltd. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
