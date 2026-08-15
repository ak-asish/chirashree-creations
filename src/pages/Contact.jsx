import { Mail, MessageCircle } from "lucide-react"
import { Link } from "react-router-dom"
import { useSiteSettings } from "../hooks/useSiteSettings"

function Contact() {
  const { settings } = useSiteSettings()

  const instagramUsername =
    settings?.instagramUsername || ""

  const email =
    settings?.email || ""

  const instagramUrl = instagramUsername
    ? `https://instagram.com/${instagramUsername}`
    : "#"

  return (
    <div className="bg-[#f8f4ed]">

      {/* Header */}
      <section className="px-6 py-16 text-center sm:px-8 lg:px-10 lg:py-24">
        <div className="mx-auto max-w-3xl">

          <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-[#b9684f]">
            Get in touch
          </p>

          <h1 className="mt-4 font-serif text-5xl leading-none text-[#4a3528] sm:text-6xl">
            Let's create something
            <span className="italic text-[#a85f4e]">
              {" "}special.
            </span>
          </h1>

          <p className="mx-auto mt-6 max-w-xl text-base leading-7 text-[#765c4a]">
            Have a question, want to customize a piece, or
            simply want to know more? We'd love to hear from you.
          </p>

        </div>
      </section>

      {/* Contact options */}
      <section className="border-y border-[#e5dcd0] bg-[#fcfaf6] px-6 py-16 sm:px-8 lg:px-10 lg:py-20">
        <div className="mx-auto grid max-w-5xl gap-5 md:grid-cols-3">

          {/* Instagram */}
          <a
            href={instagramUrl}
            target="_blank"
            rel="noreferrer"
            className="group bg-[#efe7da] p-7 transition hover:-translate-y-1"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#f8f4ed] text-[#a85f4e]">
              <span className="text-lg">◎</span>
            </div>

            <h2 className="mt-6 font-serif text-2xl text-[#4a3528]">
              Instagram
            </h2>

            <p className="mt-2 text-sm leading-6 text-[#765c4a]">
              Message us about products, customizations and
              orders.
            </p>

            {instagramUsername && (
              <p className="mt-3 text-xs font-medium text-[#a85f4e]">
                @{instagramUsername}
              </p>
            )}

            <span className="mt-5 inline-block text-xs font-medium text-[#a85f4e] underline underline-offset-4">
              Message us →
            </span>
          </a>

          {/* Email */}
          <a
            href={email ? `mailto:${email}` : "#"}
            className="group bg-[#efe7da] p-7 transition hover:-translate-y-1"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#f8f4ed] text-[#a85f4e]">
              <Mail
                size={20}
                strokeWidth={1.5}
              />
            </div>

            <h2 className="mt-6 font-serif text-2xl text-[#4a3528]">
              Email
            </h2>

            <p className="mt-2 break-all text-sm leading-6 text-[#765c4a]">
              {email || "Email coming soon"}
            </p>

            <span className="mt-5 inline-block text-xs font-medium text-[#a85f4e] underline underline-offset-4">
              Send an email →
            </span>
          </a>

          {/* Customization */}
          <Link
            to="/customized"
            className="group bg-[#efe7da] p-7 transition hover:-translate-y-1"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#f8f4ed] text-[#a85f4e]">
              <MessageCircle
                size={20}
                strokeWidth={1.5}
              />
            </div>

            <h2 className="mt-6 font-serif text-2xl text-[#4a3528]">
              Custom Creation
            </h2>

            <p className="mt-2 text-sm leading-6 text-[#765c4a]">
              Have an idea? Tell us what you'd like to create.
            </p>

            <span className="mt-5 inline-block text-xs font-medium text-[#a85f4e] underline underline-offset-4">
              Explore customization →
            </span>
          </Link>

        </div>
      </section>

      {/* Closing CTA */}
      <section className="px-6 py-16 text-center sm:px-8 lg:px-10 lg:py-24">
        <div className="mx-auto max-w-2xl">

          <h2 className="font-serif text-4xl text-[#4a3528] sm:text-5xl">
            Looking for something unique?
          </h2>

          <p className="mt-4 text-sm leading-6 text-[#765c4a]">
            Tell us your idea and let's see what we can create
            together.
          </p>

          <a
            href={instagramUrl}
            target="_blank"
            rel="noreferrer"
            className="mt-7 inline-flex rounded-full bg-[#4a3528] px-7 py-3.5 text-sm font-medium text-white transition hover:bg-[#30251f]"
          >
            Start a Conversation
          </a>

        </div>
      </section>

    </div>
  )
}

export default Contact