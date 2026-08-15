import { ArrowUpRight } from "lucide-react"
import { useSiteSettings } from "../hooks/useSiteSettings"

function InstagramCTA() {
  const { settings } = useSiteSettings()

  const instagramUsername =
    settings?.instagramUsername || ""

  const instagramUrl = instagramUsername
    ? `https://instagram.com/${instagramUsername}`
    : "#"

  return (
    <section className="bg-[#efe7da] px-6 py-16 sm:px-8 lg:px-10 lg:py-20">
      <div className="mx-auto max-w-4xl text-center">

        <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-[#b9684f]">
          Follow our journey
        </p>

        <h2 className="mt-3 font-serif text-4xl leading-none text-[#4a3528] sm:text-5xl">
          See what's being stitched
        </h2>

        <p className="mx-auto mt-4 max-w-xl text-sm leading-6 text-[#765c4a] sm:text-base">
          Discover new designs, behind-the-scenes moments and
          freshly finished creations on Instagram.
        </p>

        {instagramUsername && (
          <a
            href={instagramUrl}
            target="_blank"
            rel="noreferrer"
            className="mt-7 inline-flex items-center gap-3 rounded-full bg-[#4a3528] px-6 py-3.5 text-sm font-medium text-white transition hover:bg-[#30251f]"
          >
            <span className="text-base">◎</span>

            Follow us on Instagram

            <ArrowUpRight
              size={15}
              strokeWidth={1.7}
            />
          </a>
        )}

      </div>
    </section>
  )
}

export default InstagramCTA