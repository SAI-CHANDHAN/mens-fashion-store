import { Link, NavLink } from 'react-router-dom'
import clientConfig from '../config'

function Navbar({ adminMode = false, onLogout, isLoggingOut = false }) {
  const navLinkClass = ({ isActive }) =>
    `rounded-full px-4 py-2 text-sm font-semibold transition ${
      isActive
        ? 'bg-white text-black shadow-soft'
        : 'text-white/85 hover:bg-white/10 hover:text-white'
    }`

  return (
    <header className="sticky top-0 z-50 border-b border-white/15 bg-black/95 text-white backdrop-blur-md">
      <div className="mx-auto flex w-full max-w-[1200px] items-center justify-between gap-3 px-4 py-3 md:px-6 md:py-4">
        <Link to="/" className="inline-flex items-center gap-3">
          <img
            src={clientConfig.logoPath}
            alt={clientConfig.shopName}
            className="h-11 w-11 rounded-full border border-white/25 object-cover shadow-soft md:h-12 md:w-12"
            decoding="async"
            onError={(event) => {
              event.currentTarget.style.display = 'none'
            }}
          />
          <div className="leading-tight">
            <p className="font-display text-lg tracking-wide text-white md:text-xl">
              {clientConfig.shopName}
            </p>
            <p className="hidden text-[0.62rem] uppercase tracking-[0.18em] text-white/60 md:block">
              {clientConfig.tagline}
            </p>
          </div>
        </Link>

        <nav className="flex items-center gap-2 md:gap-3">
          <a
            href={clientConfig.instagramLink}
            target="_blank"
            rel="noreferrer"
            className="rounded-full border border-white/30 px-3 py-2 text-xs font-semibold uppercase tracking-[0.14em] text-white transition hover:bg-white/10 md:px-4"
          >
            Instagram
          </a>

          <NavLink to="/" end className={navLinkClass}>
            Shop
          </NavLink>

          {!adminMode && (
            <NavLink to="/login" className={navLinkClass}>
              Admin
            </NavLink>
          )}

          {adminMode && (
            <>
              <NavLink to="/admin" className={navLinkClass}>
                Dashboard
              </NavLink>
              <button
                type="button"
                onClick={onLogout}
                disabled={isLoggingOut}
                className="rounded-full border border-white/30 px-4 py-2 text-sm font-semibold text-white transition hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-70"
              >
                {isLoggingOut ? 'Signing Out...' : 'Logout'}
              </button>
            </>
          )}
        </nav>
      </div>
    </header>
  )
}

export default Navbar