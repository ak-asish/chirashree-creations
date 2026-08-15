import { useEffect, useState } from "react"
import {
  ArrowUpRight,
  Check,
  MessageCircle,
  Palette,
  Sparkles,
} from "lucide-react"
import { Link } from "react-router-dom"

import Button from "../components/Button"

import { useSiteSettings } from "../hooks/useSiteSettings"

import {
  getFeaturedCustomizedProducts,
} from "../services/productService"

import { urlFor } from "../lib/image"

function Customized() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const { settings } = useSiteSettings()
  const instagramUsername = settings?.instagramUsername || ""

  const instagramUrl = instagramUsername
    ? `https://instagram.com/${instagramUsername}`
    : "https://instagram.com/"

  useEffect(() => {
    async function loadProducts() {
      try {
        const data = await getFeaturedCustomizedProducts()

        setProducts(data || [])
      } catch (error) {
        console.error(
          "Failed to load customized products:",
          error
        )
      } finally {
        setLoading(false)
      }
    }

    loadProducts()
  }, [])

  const steps = [
    {
      number: "01",
      icon: MessageCircle,
      title: "Tell us your idea",
      text: "Send us your idea, reference photo, occasion and any details you'd like included.",
    },
    {
      number: "02",
      icon: Palette,
      title: "Choose the details",
      text: "We'll discuss colors, names, dates, sizes and other personalization options with you.",
    },
    {
      number: "03",
      icon: Sparkles,
      title: "We create it",
      text: "Once everything is finalized, we'll handcraft your piece with care.",
    },
  ]

  const customizationOptions = [
    "Names and initials",
    "Important dates",
    "Personal messages",
    "Colors and themes",
    "Occasion-specific designs",
    "Your own design idea",
  ]

  return (
    <div className="bg-[#f8f4ed]">

      {/* =====================================================
          HERO
      ====================================================== */}
      <section className="px-6 py-16 sm:px-8 lg:px-10 lg:py-24">
        <div className="mx-auto max-w-4xl text-center">

          <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-[#b9684f]">
            Made especially for you
          </p>

          <h1 className="mt-4 font-serif text-5xl leading-[0.95] text-[#4a3528] sm:text-6xl lg:text-7xl">
            Turn your idea into
            <span className="italic text-[#a85f4e]">
              {" "}something unforgettable.
            </span>
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-[#765c4a] sm:text-lg">
            Choose a design or bring us your idea. We can
            personalize names, dates, colors and details to
            create an embroidery piece that is truly yours.
          </p>

          <div className="mt-8 flex justify-center">
            <Button href={instagramUrl}>
              Discuss Your Idea on Instagram
            </Button>
          </div>

          <p className="mt-4 text-[11px] text-[#8a7666]">
            Tell us what you'd like to create and we'll guide
            you through the process.
          </p>

        </div>
      </section>


      {/* =====================================================
          CUSTOMIZED PRODUCT GALLERY
      ====================================================== */}
      <section className="border-y border-[#e5dcd0] bg-[#fcfaf6] px-6 py-16 sm:px-8 lg:px-10 lg:py-24">
        <div className="mx-auto max-w-7xl">

          {/* Section heading */}
          <div className="flex items-start justify-between gap-5">

            <div className="max-w-2xl">
              <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-[#b9684f]">
                Real creations
              </p>

              <h2 className="mt-3 font-serif text-4xl text-[#4a3528] sm:text-5xl">
                Made just for someone
              </h2>

              <p className="mt-4 text-sm leading-6 text-[#765c4a] sm:text-base">
                A few personalized creations to inspire your own idea.
              </p>
            </div>

            <Link
              to="/shop"
              className="mt-1 inline-flex shrink-0 items-center gap-2 text-sm font-medium text-[#4a3528] underline decoration-[#b9827a] underline-offset-4 transition hover:text-[#a85f4e]"
            >
              View All
              <ArrowUpRight
                size={15}
                strokeWidth={1.6}
              />
            </Link>

          </div>


          {/* Loading */}
          {loading ? (

            <div className="mt-14 grid grid-cols-3 gap-x-3 gap-y-10 sm:gap-x-5 sm:gap-y-12 lg:gap-x-8 lg:gap-y-14">

              {[1, 2, 3, 4, 5, 6].map((item) => (
                <div key={item}>

                  <div className="relative aspect-[0.9] overflow-hidden rounded-[6px] bg-[#efe7da]">

                    <div className="absolute inset-[8%] animate-pulse rounded-[3px] bg-[#e5dcd0]" />

                  </div>

                  <div className="mx-auto mt-4 h-5 w-28 animate-pulse rounded bg-[#efe7da]" />

                  <div className="mx-auto mt-2 h-3 w-20 animate-pulse rounded bg-[#efe7da]" />

                </div>
              ))}

            </div>

          ) : products.length > 0 ? (

            <div className="mt-14 grid grid-cols-3 gap-x-3 gap-y-10 sm:gap-x-5 sm:gap-y-12 lg:gap-x-8 lg:gap-y-14">

              {products.slice(0, 6).map((product, index) => {

                const imageUrl = product.mainImage
                  ? urlFor(product.mainImage)
                      .width(900)
                      .height(900)
                      .fit("crop")
                      .auto("format")
                      .url()
                  : null

                const productPath = product.slug?.current
                  ? `/product/${product.slug.current}`
                  : null

                /*
                 * Different decorative backgrounds make the
                 * gallery feel handcrafted rather than repetitive.
                 */
                const decorations = [
                  {
                    outer: "bg-[#ead9c8]",
                    frame: "border-[#c79b73]",
                    circle: "bg-[#b9827a]/20",
                  },
                  {
                    outer: "bg-[#ead4cf]",
                    frame: "border-[#b9684f]/60",
                    circle: "bg-[#d29b89]/20",
                  },
                  {
                    outer: "bg-[#e4ddd2]",
                    frame: "border-[#b8a18d]/70",
                    circle: "bg-[#b8a18d]/20",
                  },
                  {
                    outer: "bg-[#e8d9cf]",
                    frame: "border-[#c98a78]/60",
                    circle: "bg-[#c98a78]/20",
                  },
                  {
                    outer: "bg-[#e8dfd4]",
                    frame: "border-[#b58c68]/60",
                    circle: "bg-[#b58c68]/20",
                  },
                  {
                    outer: "bg-[#ddd5ca]",
                    frame: "border-[#a9907b]/60",
                    circle: "bg-[#a9907b]/20",
                  },
                ]

                const decoration =
                  decorations[index % decorations.length]

                const cardContent = (
                  <>
                    {/* Decorative image area */}
                    <div
                      className={`
                        relative aspect-[0.9]
                        overflow-hidden
                        rounded-[5px]
                        ${decoration.outer}
                      `}
                    >

                      {/* Large soft decorative circle */}
                      <div
                        className={`
                          absolute
                          left-1/2
                          top-1/2
                          aspect-square
                          w-[78%]
                          -translate-x-1/2
                          -translate-y-1/2
                          rounded-full
                          ${decoration.circle}
                          transition duration-700
                          group-hover:scale-105
                        `}
                      />

                      {/* Outer frame */}
                      <div
                        className={`
                          absolute
                          inset-[7%]
                          rounded-[3px]
                          border
                          ${decoration.frame}
                          bg-white/20
                          p-[5%]
                          shadow-sm
                        `}
                      >

                        {/* Inner frame */}
                        <div
                          className="
                            relative
                            flex
                            h-full
                            w-full
                            items-center
                            justify-center
                            overflow-hidden
                            border
                            border-white/60
                            bg-[#f8f4ed]/70
                            p-[7%]
                          "
                        >

                          {/* Product image */}
                          {imageUrl ? (
                            <img
                              src={imageUrl}
                              alt={product.name}
                              loading="lazy"
                              className="
                                h-full
                                w-full
                                object-contain
                                drop-shadow-[0_12px_18px_rgba(74,53,40,0.18)]
                                transition
                                duration-700
                                ease-out
                                group-hover:scale-[1.04]
                              "
                            />
                          ) : (
                            <span className="px-5 text-center font-serif text-xl italic text-[#765c4a]">
                              {product.name}
                            </span>
                          )}

                          {/* Personalized badge */}
                          <div className="absolute left-3 top-3 rounded-full bg-[#f8f4ed]/90 px-2.5 py-1 text-[8px] font-semibold uppercase tracking-[0.12em] text-[#9f5845] shadow-sm backdrop-blur-sm">
                            Personalized
                          </div>

                          {/* Arrow */}
                          <div
                            className="
                              absolute
                              bottom-3
                              right-3
                              flex
                              h-9
                              w-9
                              items-center
                              justify-center
                              rounded-full
                              bg-[#4a3528]/90
                              text-white
                              opacity-0
                              shadow-md
                              transition
                              duration-300
                              group-hover:opacity-100
                            "
                          >
                            <ArrowUpRight
                              size={16}
                              strokeWidth={1.6}
                            />
                          </div>

                        </div>
                      </div>

                      {/* Decorative dots */}
                      <div className="absolute left-[9%] top-[12%] h-3 w-3 rounded-full bg-[#b9827a]/60" />

                      <div className="absolute right-[11%] top-[17%] h-5 w-5 rounded-full border border-[#b9684f]/40" />

                      <div className="absolute bottom-[12%] left-[13%] h-4 w-4 rounded-full border border-[#b9827a]/50" />

                    </div>


                    {/* Product information */}
                    <div className="mt-4 text-center">

                      <p className="text-[9px] font-semibold uppercase tracking-[0.18em] text-[#b9684f]">
                        {product.category?.name || "Customized"}
                      </p>

                      <h3 className="mt-1 font-serif text-xl leading-tight text-[#4a3528] transition duration-300 group-hover:text-[#a85f4e]">
                        {product.name}
                      </h3>

                      {product.shortDescription && (
                        <p className="mx-auto mt-1.5 max-w-[220px] line-clamp-2 text-xs leading-5 text-[#8a7666]">
                          {product.shortDescription}
                        </p>
                      )}

                    </div>
                  </>
                )

                return productPath ? (
                  <Link
                    key={product._id}
                    to={productPath}
                    className="group block"
                  >
                    {cardContent}
                  </Link>
                ) : (
                  <div
                    key={product._id}
                    className="group block"
                  >
                    {cardContent}
                  </div>
                )
              })}

            </div>

          ) : (

            <div className="mx-auto mt-14 max-w-2xl border border-[#e5dcd0] bg-[#f8f4ed] px-6 py-14 text-center">

              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#efe7da] text-[#a85f4e]">
                <Sparkles
                  size={22}
                  strokeWidth={1.5}
                />
              </div>

              <p className="mt-5 font-serif text-2xl text-[#4a3528]">
                Beautiful custom creations are coming soon.
              </p>

              <p className="mt-2 text-sm leading-6 text-[#765c4a]">
                Contact us to discuss your own personalized piece.
              </p>

            </div>

          )}

        </div>
      </section>


      {/* =====================================================
          WHAT CAN BE CUSTOMIZED
      ====================================================== */}
      <section className="px-6 py-16 sm:px-8 lg:px-10 lg:py-20">
        <div className="mx-auto max-w-6xl">

          <div className="mx-auto max-w-2xl text-center">

            <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-[#b9684f]">
              Make it personal
            </p>

            <h2 className="mt-3 font-serif text-4xl text-[#4a3528] sm:text-5xl">
              What can we customize?
            </h2>

            <p className="mt-4 text-sm leading-6 text-[#765c4a] sm:text-base">
              Small details can turn a beautiful piece into
              something that means much more.
            </p>

          </div>


          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">

            {customizationOptions.map((item) => (
              <div
                key={item}
                className="
                  flex
                  items-center
                  gap-4
                  border
                  border-[#e5dcd0]
                  bg-[#fcfaf6]
                  px-5
                  py-5
                  transition
                  duration-300
                  hover:-translate-y-1
                  hover:shadow-sm
                "
              >

                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#efe0d8] text-[#a85f4e]">
                  <Check
                    size={16}
                    strokeWidth={1.8}
                  />
                </div>

                <span className="text-sm font-medium text-[#4a3528]">
                  {item}
                </span>

              </div>
            ))}

          </div>

        </div>
      </section>


      {/* =====================================================
          PROCESS
      ====================================================== */}
      <section className="border-t border-[#e5dcd0] bg-[#fcfaf6] px-6 py-16 sm:px-8 lg:px-10 lg:py-24">
        <div className="mx-auto max-w-7xl">

          <div className="mx-auto max-w-2xl text-center">

            <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-[#b9684f]">
              Simple & personal
            </p>

            <h2 className="mt-3 font-serif text-4xl text-[#4a3528] sm:text-5xl">
              How custom orders work
            </h2>

            <p className="mt-4 text-sm leading-6 text-[#765c4a] sm:text-base">
              From your first message to the finished creation,
              we'll work with you along the way.
            </p>

          </div>


          <div className="mt-14 grid gap-8 md:grid-cols-3 md:gap-6">

            {steps.map((step) => {
              const Icon = step.icon

              return (
                <div
                  key={step.number}
                  className="
                    border-t
                    border-[#d8cbbd]
                    pt-7
                    transition
                    duration-300
                    hover:-translate-y-1
                  "
                >

                  <div className="flex items-start justify-between">

                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#efe7da] text-[#a85f4e]">
                      <Icon
                        size={21}
                        strokeWidth={1.5}
                      />
                    </div>

                    <span className="font-serif text-3xl text-[#d8cbbd]">
                      {step.number}
                    </span>

                  </div>

                  <h3 className="mt-6 font-serif text-2xl text-[#4a3528]">
                    {step.title}
                  </h3>

                  <p className="mt-2 text-sm leading-6 text-[#765c4a]">
                    {step.text}
                  </p>

                </div>
              )
            })}

          </div>

        </div>
      </section>


      {/* =====================================================
          CONTACT CTA
      ====================================================== */}
      <section className="bg-[#4a3528] px-6 py-16 sm:px-8 lg:px-10 lg:py-20">
        <div className="mx-auto max-w-4xl text-center">

          <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-[#d29b89]">
            Ready to start?
          </p>

          <h2 className="mt-3 font-serif text-4xl text-[#f8f4ed] sm:text-5xl">
            Let's create something meaningful.
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-sm leading-6 text-[#e2d2c4]">
            Send us your idea on Instagram and we'll help
            turn it into a handmade creation.
          </p>

          <a
            href={instagramUrl}
            target="_blank"
            rel="noreferrer"
            className="
              mt-8
              inline-flex
              items-center
              gap-3
              rounded-full
              bg-[#f8f4ed]
              px-7
              py-3.5
              text-sm
              font-medium
              text-[#4a3528]
              transition
              hover:bg-white
              hover:shadow-lg
            "
          >
            Start a Conversation

            <ArrowUpRight
              size={16}
              strokeWidth={1.7}
            />
          </a>

        </div>
      </section>

    </div>
  )
}

export default Customized