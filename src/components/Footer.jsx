import { Link } from "react-router-dom"
import { useSiteSettings } from "../hooks/useSiteSettings"

function Footer() {
  const { settings } = useSiteSettings()

  const instagramUsername =
    settings?.instagramUsername || ""

  const email =
    settings?.email || ""

  const brandName =
    settings?.brandName || "Chirashree Creation"

  const instagramUrl = instagramUsername
    ? `https://instagram.com/${instagramUsername}`
    : "#"

  return (
    <footer className="bg-[#30251f] text-[#f8f4ed]">

      <div className="mx-auto max-w-7xl px-6 py-14 sm:px-8 lg:px-10 lg:py-16">

        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-4">

          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-2">
            <Link to="/" className="inline-block">

              <div className="font-serif text-3xl">
                {brandName.replace(" Creation", "")}
              </div>

              <div className="mt-1 text-[8px] tracking-[0.4em] text-[#d29b89]">
                CREATION
              </div>

            </Link>

            <p className="mt-5 max-w-sm text-sm leading-6 text-[#cdbfb4]">
              Handmade embroidery creations and personalized
              pieces made for life's meaningful moments.
            </p>
          </div>

          {/* Explore */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-[#d29b89]">
              Explore
            </h3>

            <div className="mt-5 space-y-3">

              <Link
                to="/shop"
                className="block text-sm text-[#cdbfb4] transition hover:text-white"
              >
                Shop
              </Link>

              <Link
                to="/customized"
                className="block text-sm text-[#cdbfb4] transition hover:text-white"
              >
                Customized
              </Link>

              <Link
                to="/about"
                className="block text-sm text-[#cdbfb4] transition hover:text-white"
              >
                About
              </Link>

              <Link
                to="/contact"
                className="block text-sm text-[#cdbfb4] transition hover:text-white"
              >
                Contact
              </Link>

            </div>
          </div>

          {/* Connect */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-[#d29b89]">
              Connect
            </h3>

            <div className="mt-5 space-y-3">

              {instagramUsername && (
                <a
                  href={instagramUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="block text-sm text-[#cdbfb4] transition hover:text-white"
                >
                  Instagram
                </a>
              )}

              {email && (
                <a
                  href={`mailto:${email}`}
                  className="block break-all text-sm text-[#cdbfb4] transition hover:text-white"
                >
                  {email}
                </a>
              )}

            </div>
          </div>

        </div>

        <div className="mt-12 border-t border-white/10 pt-6">

          <p className="text-xs text-[#9e8e83]">
            © {new Date().getFullYear()} {brandName}.
            All rights reserved.
          </p>

        </div>

      </div>

    </footer>
  )
}

export default Footer