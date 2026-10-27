import { ArrowUpRight } from 'lucide-react'

export function SiteNavigation() {
  return (
    <header className="site-header">
      <div className="site-nav">
        <a className="brand-link" href="#top" aria-label="Smart Class home">
          <span className="brand-mark" aria-hidden="true">
            <span className="brand-mark-core" />
          </span>
          <span className="brand-name">SMART CLASS</span>
        </a>

        <nav className="nav-links" aria-label="Primary navigation">
          <a className="nav-link" href="#showcase">
            Project
          </a>
          <span className="nav-link nav-link-placeholder">Technology</span>
          <a className="nav-explore" href="#showcase">
            Explore
            <ArrowUpRight aria-hidden="true" size={14} strokeWidth={1.8} />
          </a>
        </nav>
      </div>
    </header>
  )
}
