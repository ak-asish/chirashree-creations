import { Heart, Hand, Sparkles } from "lucide-react"

import floralImage from "../assets/about/embroidery-floral.jpg"
import togetherImage from "../assets/about/embroidery-together.jpg"
import initialsImage from "../assets/about/embroidery-initials.jpg"
import weddingImage from "../assets/about/embroidery-wedding.jpg"
import rakhiImage from "../assets/about/embroidery-rakhi.jpg"
import handsImage from "../assets/about/embroidery-hands.jpg"

import SEO from "../components/SEO"

const values = [
  {
    icon: Hand,
    title: "Made by Hand",
    description:
      "Every piece is carefully embroidered by hand, giving each creation its own character and warmth.",
  },
  {
    icon: Heart,
    title: "Made with Meaning",
    description:
      "We create pieces for the moments people want to remember — weddings, celebrations, milestones and thoughtful gifts.",
  },
  {
    icon: Sparkles,
    title: "Made for You",
    description:
      "Our customized creations let you add the names, dates, colors and details that make a piece uniquely yours.",
  },
]

const embroideryImages = [
  {
    src: floralImage,
    alt: "Floral handmade embroidery",
    position:
      "left-[3%] top-[4%] w-[38%] -rotate-6 sm:left-[5%] sm:top-[5%] sm:w-[36%]",
  },
  {
    src: togetherImage,
    alt: "Hand embroidered meaningful message",
    position:
      "right-[3%] top-[5%] w-[38%] rotate-5 sm:right-[5%] sm:top-[5%] sm:w-[36%]",
  },
  {
    src: initialsImage,
    alt: "Personalized initial embroidery",
    position:
      "left-[-2%] top-[38%] w-[34%] -rotate-3 sm:left-[2%] sm:top-[39%] sm:w-[33%]",
  },
  {
    src: weddingImage,
    alt: "Personalized wedding embroidery",
    position:
      "right-[-2%] top-[39%] w-[35%] rotate-4 sm:right-[2%] sm:top-[39%] sm:w-[33%]",
  },
  {
    src: rakhiImage,
    alt: "Handmade Rakhi embroidery",
    position:
      "left-[7%] bottom-[3%] w-[36%] rotate-5 sm:left-[10%] sm:bottom-[4%] sm:w-[34%]",
  },
  {
    src: handsImage,
    alt: "Hand embroidered personalized design",
    position:
      "right-[7%] bottom-[3%] w-[36%] -rotate-5 sm:right-[10%] sm:bottom-[4%] sm:w-[34%]",
  },
]

function About() {
  return (
    <div className="bg-[#f8f4ed]">

      <SEO
        title="Our Story | Chirashree Creation"
        description="Discover the story behind Chirashree Creation and our love for handmade embroidery, meaningful details and personalized creations."
        path="/about"
      />

      {/* Hero */}
      <section className="px-6 py-16 sm:px-8 lg:px-10 lg:py-24">
        <div className="mx-auto max-w-4xl text-center">

          <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-[#b9684f]">
            Our Story
          </p>

          <h1 className="mt-4 font-serif text-5xl leading-[0.95] tracking-[-0.02em] text-[#4a3528] sm:text-6xl lg:text-7xl">
            Little stitches,
            <br />
            <span className="italic text-[#a85f4e]">
              meaningful stories.
            </span>
          </h1>

          <p className="mx-auto mt-7 max-w-2xl text-base leading-8 text-[#765c4a]">
            Chirashree Creation is built around a simple idea:
            handmade things feel different. Every stitch carries
            time, care and a little piece of the person who made it.
          </p>

        </div>
      </section>


      {/* Story */}
      <section className="bg-[#fcfaf6] px-6 py-16 sm:px-8 lg:px-10 lg:py-24">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-2 lg:items-center lg:gap-20">

          {/* Embroidery collage */}
          <div className="relative mx-auto aspect-[4/5] w-full max-w-lg">

            {/* Soft background */}
            <div className="absolute inset-[4%] rounded-[4px] bg-[#ead9c8] shadow-[0_25px_60px_rgba(74,53,40,0.12)]" />

            {/* Decorative border */}
            <div className="absolute inset-[7%] border border-[#c99d82]/50" />

            {/* Small decorative corners */}
            <div className="absolute left-[7%] top-[7%] h-7 w-7 border-l border-t border-[#c99d82]/60" />
            <div className="absolute right-[7%] top-[7%] h-7 w-7 border-r border-t border-[#c99d82]/60" />
            <div className="absolute bottom-[7%] left-[7%] h-7 w-7 border-b border-l border-[#c99d82]/60" />
            <div className="absolute bottom-[7%] right-[7%] h-7 w-7 border-b border-r border-[#c99d82]/60" />


            {/* Surrounding embroidery images */}
            {embroideryImages.map((image, index) => (
              <div
                key={index}
                className={`absolute z-10 overflow-hidden rounded-[3px] border-[5px] border-[#fcfaf6] bg-white shadow-[0_12px_28px_rgba(74,53,40,0.16)] transition duration-500 hover:z-30 hover:scale-105 hover:shadow-[0_18px_36px_rgba(74,53,40,0.22)] ${image.position}`}
              >
                <img
                  src={image.src}
                  alt={image.alt}
                  className="aspect-[4/3] h-full w-full object-cover"
                />
              </div>
            ))}


            {/* Center Crafted with care */}
            <div className="absolute left-1/2 top-1/2 z-20 w-[52%] -translate-x-1/2 -translate-y-1/2">

              <div className="bg-[#f8f4ed] p-2 shadow-[0_18px_45px_rgba(74,53,40,0.2)] sm:p-3">

                <div className="border border-[#a87560]/60 p-3 sm:p-5">

                  <div className="border border-[#c99d82]/50 px-3 py-8 text-center sm:px-5 sm:py-10">

                    <p className="font-serif text-3xl italic leading-none text-[#4a3528] sm:text-4xl lg:text-5xl">
                      Crafted
                    </p>

                    <p className="mt-1 font-serif text-3xl italic leading-none text-[#a85f4e] sm:text-4xl lg:text-5xl">
                      with care
                    </p>

                    <div className="mx-auto mt-5 flex items-center justify-center gap-2">
                      <span className="h-px w-7 bg-[#b9827a]" />
                      <span className="text-xs text-[#a85f4e]">
                        ✦
                      </span>
                      <span className="h-px w-7 bg-[#b9827a]" />
                    </div>

                  </div>

                </div>

              </div>

            </div>


            {/* Floating handmade label */}
            <div className="absolute bottom-[7%] left-1/2 z-30 -translate-x-1/2 rounded-full bg-[#f8f4ed]/95 px-4 py-2 shadow-lg backdrop-blur-sm sm:px-5">
              <div className="flex items-center gap-2 whitespace-nowrap">
                <Hand
                  size={13}
                  strokeWidth={1.5}
                  className="text-[#a85f4e]"
                />

                <span className="text-[8px] font-semibold uppercase tracking-[0.16em] text-[#4a3528] sm:text-[9px]">
                  Made by hand
                </span>
              </div>
            </div>

          </div>


          {/* Story text */}
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-[#b9684f]">
              Why Chirashree Creation
            </p>

            <h2 className="mt-4 font-serif text-4xl leading-tight text-[#4a3528] sm:text-5xl">
              Handmade pieces deserve to be remembered.
            </h2>

            <div className="mt-6 space-y-5 text-sm leading-7 text-[#765c4a] sm:text-base">
              <p>
                In a world filled with things made in seconds,
                embroidery gives us a reason to slow down.
              </p>

              <p>
                Chirashree Creation brings together traditional
                handmade craft and personal stories to create
                pieces that feel special long after the occasion
                has passed.
              </p>

              <p>
                Whether it is a wedding frame carrying two names,
                a thoughtful Rakhi or a personalized gift, every
                creation is made with attention to the little
                details that matter.
              </p>
            </div>
          </div>

        </div>
      </section>


      {/* Values */}
      <section className="px-6 py-16 sm:px-8 lg:px-10 lg:py-24">
        <div className="mx-auto max-w-7xl">

          <div className="mx-auto max-w-2xl text-center">
            <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-[#b9684f]">
              What matters to us
            </p>

            <h2 className="mt-3 font-serif text-4xl text-[#4a3528] sm:text-5xl">
              Made differently
            </h2>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {values.map((value) => {
              const Icon = value.icon

              return (
                <div
                  key={value.title}
                  className="group border border-[#e5dcd0] bg-[#efe7da] p-7 transition duration-300 hover:-translate-y-1 hover:shadow-[0_12px_30px_rgba(74,53,40,0.08)] sm:p-8"
                >
                  <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#f8f4ed] text-[#a85f4e] transition duration-300 group-hover:scale-110">
                    <Icon size={20} strokeWidth={1.5} />
                  </div>

                  <h3 className="mt-6 font-serif text-2xl text-[#4a3528]">
                    {value.title}
                  </h3>

                  <p className="mt-3 text-sm leading-6 text-[#765c4a]">
                    {value.description}
                  </p>
                </div>
              )
            })}
          </div>

        </div>
      </section>


      {/* Closing CTA */}
      <section className="border-t border-[#e5dcd0] bg-[#fcfaf6] px-6 py-16 text-center sm:px-8 lg:px-10 lg:py-20">
        <div className="mx-auto max-w-2xl">

          <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-[#b9684f]">
            Every stitch has a story
          </p>

          <h2 className="mt-3 font-serif text-4xl leading-tight text-[#4a3528] sm:text-5xl">
            Made for moments
            <span className="italic text-[#a85f4e]">
              {" "}worth remembering.
            </span>
          </h2>

          <p className="mx-auto mt-4 max-w-lg text-sm leading-7 text-[#765c4a] sm:text-base">
            Discover a handmade creation or turn your own
            idea into something uniquely yours.
          </p>

          <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">

            <a
              href="/shop"
              className="inline-flex items-center justify-center rounded-full bg-[#4a3528] px-6 py-3.5 text-sm font-medium text-white transition hover:bg-[#36251d]"
            >
              Explore Collection
            </a>

            <a
              href="/customized"
              className="inline-flex items-center justify-center rounded-full border border-[#cdb8a7] bg-[#f8f4ed] px-6 py-3.5 text-sm font-medium text-[#4a3528] transition hover:border-[#a85f4e] hover:text-[#a85f4e]"
            >
              Create Something Custom
            </a>

          </div>

        </div>
      </section>

    </div>
  )
}

export default About