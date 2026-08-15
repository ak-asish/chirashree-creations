import { useEffect, useRef, useState } from "react"
import { Heart, Menu, X } from "lucide-react"
import { FaInstagram } from "react-icons/fa"
import { Link, NavLink } from "react-router-dom"
import { useFavorites } from "../hooks/useFavorites"
import { useSiteSettings } from "../hooks/useSiteSettings"

const navigation = [
  { name: "Home", path: "/" },
  { name: "Shop", path: "/shop" },
  { name: "Customized", path: "/customized" },
  { name: "About", path: "/about" },
  { name: "Contact", path: "/contact" },
]

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isVisible, setIsVisible] = useState(true)

  const lastScrollY = useRef(0)

  const { favorites } = useFavorites()

  const { settings } = useSiteSettings()

  const instagramUsername =
    settings?.instagramUsername || ""

  const instagramUrl = instagramUsername
    ? `https://instagram.com/${instagramUsername}`
    : "#"

  useEffect(() => {
    lastScrollY.current = window.scrollY

    const handleScroll = () => {
      const currentScrollY = window.scrollY
      const previousScrollY = lastScrollY.current

      // Always show at the very top
      if (currentScrollY <= 5) {
        setIsVisible(true)
        lastScrollY.current = currentScrollY
        return
      }

      // Scrolling DOWN
      if (currentScrollY > previousScrollY) {
        setIsVisible(false)
        setIsMenuOpen(false)
      }

      // Scrolling UP
      else if (currentScrollY < previousScrollY) {
        setIsVisible(true)
      }

      lastScrollY.current = currentScrollY
    }

    window.addEventListener("scroll", handleScroll, {
      passive: true,
    })

    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  const closeMenu = () => {
    setIsMenuOpen(false)
  }

  return (
    <header
      className={`fixed left-0 right-0 top-0 z-50 border-b border-[#e5dcd0]/80 bg-[#f8f4ed]/95 backdrop-blur-md transition-transform duration-300 ease-out ${isVisible
        ? "translate-y-0"
        : "-translate-y-full"
        }`}
    >
      <nav className="mx-auto flex h-19 max-w-7xl items-center justify-between px-5 sm:px-8 lg:px-10">

        {/* Mobile menu button */}
        <button
          type="button"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="flex h-10 w-10 items-center justify-center rounded-full text-[#4a3528] transition hover:bg-[#efe7da] md:hidden"
          aria-label={
            isMenuOpen
              ? "Close menu"
              : "Open menu"
          }
          aria-expanded={isMenuOpen}
        >
          {isMenuOpen ? (
            <X
              size={21}
              strokeWidth={1.7}
            />
          ) : (
            <Menu
              size={21}
              strokeWidth={1.7}
            />
          )}
        </button>

        {/* Logo */}
        <Link
          to="/"
          onClick={closeMenu}
          className="absolute left-1/2 -translate-x-1/2 text-center md:static md:translate-x-0"
        >
          <div className="font-serif text-[25px] leading-none tracking-[-0.02em] text-[#4a3528] sm:text-[27px]">
            Chirashree
          </div>

          <div className="mt-1 text-[8px] font-medium tracking-[0.38em] text-[#b9684f]">
            CREATION
          </div>
        </Link>

        {/* Desktop navigation */}
        <div className="hidden items-center gap-7 md:flex lg:gap-9">
          {navigation.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `relative py-2 text-[13px] font-medium transition ${isActive
                  ? "text-[#b9684f]"
                  : "text-[#4a3528] hover:text-[#b9684f]"
                }`
              }
            >
              {item.name}
            </NavLink>
          ))}
        </div>

        {/* Desktop actions */}
        <div className="hidden items-center gap-2 sm:flex">

          {/* Favorites */}
          <Link
            to="/favorites"
            aria-label={`Favorites${favorites.length
              ? `, ${favorites.length} saved`
              : ""
              }`}
            className="relative flex h-10 w-10 items-center justify-center rounded-full text-[#4a3528] transition hover:bg-[#efe7da] hover:text-[#a85f4e]"
          >
            <Heart
              size={18}
              strokeWidth={1.5}
              fill={
                favorites.length > 0
                  ? "currentColor"
                  : "none"
              }
            />

            {favorites.length > 0 && (
              <span className="absolute right-0 top-0 flex h-4 min-w-4 items-center justify-center rounded-full bg-[#a85f4e] px-1 text-[8px] font-semibold leading-none text-white">
                {favorites.length > 9
                  ? "9+"
                  : favorites.length}
              </span>
            )}
          </Link>

          {/* Instagram */}
          <a
            href={instagramUrl}
            target="_blank"
            rel="noreferrer"
            aria-label="Instagram"
            className="inline-flex h-10 flex-row items-center justify-center gap-2 whitespace-nowrap rounded-full border border-[#4a3528] px-5 text-[12px] font-medium leading-none text-[#4a3528] transition hover:bg-[#4a3528] hover:text-white"
          >
            <FaInstagram
              size={18}
              className="shrink-0"
            />

            <span className="whitespace-nowrap">
              Instagram
            </span>
          </a>

        </div>

        {/* Mobile right-side actions */}
        <div className="flex items-center gap-1 sm:hidden">

          {/* Mobile Favorites */}
          <Link
            to="/favorites"
            onClick={closeMenu}
            aria-label={`Favorites${favorites.length
              ? `, ${favorites.length} saved`
              : ""
              }`}
            className="relative flex h-10 w-10 items-center justify-center rounded-full text-[#4a3528] transition hover:bg-[#efe7da]"
          >
            <Heart
              size={18}
              strokeWidth={1.5}
              fill={
                favorites.length > 0
                  ? "currentColor"
                  : "none"
              }
            />

            {favorites.length > 0 && (
              <span className="absolute right-0 top-0 flex h-4 min-w-4 items-center justify-center rounded-full bg-[#a85f4e] px-1 text-[8px] font-semibold leading-none text-white">
                {favorites.length > 9
                  ? "9+"
                  : favorites.length}
              </span>
            )}
          </Link>

          {/* Mobile Instagram */}
          <a
            href={instagramUrl}
            target="_blank"
            rel="noreferrer"
            aria-label="Instagram"
            className="flex h-10 w-10 items-center justify-center rounded-full text-[#4a3528] transition hover:bg-[#efe7da]"
          >
            <FaInstagram size={18} />
          </a>

        </div>

      </nav>

      {/* Mobile menu */}
      <div
        className={`overflow-hidden border-t border-[#e5dcd0]/70 bg-[#f8f4ed] transition-all duration-300 md:hidden ${isMenuOpen
          ? "max-h-96 opacity-100"
          : "max-h-0 opacity-0"
          }`}
      >
        <div className="px-5 pb-5 pt-3">

          {navigation.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              onClick={closeMenu}
              className={({ isActive }) =>
                `block border-b border-[#e5dcd0]/70 py-4 text-sm font-medium ${isActive
                  ? "text-[#b9684f]"
                  : "text-[#4a3528]"
                }`
              }
            >
              {item.name}
            </NavLink>
          ))}

          {/* Mobile Favorites menu item */}
          <NavLink
            to="/favorites"
            onClick={closeMenu}
            className={({ isActive }) =>
              `flex items-center justify-between border-b border-[#e5dcd0]/70 py-4 text-sm font-medium ${isActive
                ? "text-[#b9684f]"
                : "text-[#4a3528]"
              }`
            }
          >
            <span className="flex items-center gap-2">
              <Heart
                size={17}
                strokeWidth={1.5}
                fill={
                  favorites.length > 0
                    ? "currentColor"
                    : "none"
                }
              />

              Favorites
            </span>

            {favorites.length > 0 && (
              <span className="rounded-full bg-[#a85f4e] px-2 py-1 text-[9px] font-semibold text-white">
                {favorites.length}
              </span>
            )}
          </NavLink>

        </div>
      </div>
    </header>
  )
}

export default Navbar