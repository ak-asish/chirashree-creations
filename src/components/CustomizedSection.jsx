import { useEffect, useState } from "react"
import { ArrowUpRight, Sparkles } from "lucide-react"
import { Link } from "react-router-dom"

import {
  getFeaturedCustomizedProducts,
} from "../services/productService"

import { urlFor } from "../lib/image"

function CustomizedSection() {
  const [products, setProducts] = useState([])
  const [activeIndex, setActiveIndex] = useState(0)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadProducts() {
      try {
        const data = await getFeaturedCustomizedProducts()

        // console.log("CUSTOMIZED PRODUCTS:", data)

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

  /* Automatic image rotation */
  useEffect(() => {
    if (products.length <= 1) {
      return
    }

    const interval = setInterval(() => {
      setActiveIndex((current) =>
        (current + 1) % products.length
      )
    }, 4000)

    return () => clearInterval(interval)
  }, [products.length])

  const activeProduct = products[activeIndex]

  const imageUrl = activeProduct?.mainImage
    ? urlFor(activeProduct.mainImage)
        .width(900)
        .height(1100)
        .fit("crop")
        .auto("format")
        .url()
    : null

  return (
    <section className="overflow-hidden bg-[#4a3528] px-6 py-20 sm:px-8 lg:px-10 lg:py-28">
      <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-2 lg:gap-20">

        {/* Visual */}
        <div className="relative order-2 lg:order-1">

          <div className="relative mx-auto aspect-[4/5] max-w-lg overflow-hidden bg-[#d8b99f]">

            {/* Background */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#ead8c5] via-[#d3ad91] to-[#a87560]" />

            {/* Decorative frame */}
            <div className="absolute inset-[9%] border border-white/40 p-3 sm:p-4">

              <div className="relative h-full overflow-hidden border border-white/30">

                {loading ? (
                  <div className="h-full w-full animate-pulse bg-[#d3ad91]" />
                ) : products.length > 0 ? (

                  <>
                    {products.map((product, index) => {

                      const productImage = product.mainImage
                        ? urlFor(product.mainImage)
                            .width(900)
                            .height(1100)
                            .fit("crop")
                            .auto("format")
                            .url()
                        : null

                      return (
                        <div
                          key={product._id}
                          className={`absolute inset-0 transition-opacity duration-1000 ${
                            index === activeIndex
                              ? "opacity-100"
                              : "opacity-0"
                          }`}
                        >
                          {productImage ? (
                            <img
                              src={productImage}
                              alt={product.name}
                              className="h-full w-full object-cover"
                            />
                          ) : (
                            <div className="flex h-full w-full items-center justify-center bg-[#ead8c5] px-8 text-center">
                              <p className="font-serif text-4xl italic text-[#4a3528]">
                                Made
                                <br />
                                <span className="text-[#a85f4e]">
                                  for you
                                </span>
                              </p>
                            </div>
                          )}
                        </div>
                      )
                    })}

                    {/* Soft image overlay */}
                    <div className="pointer-events-none absolute inset-0 bg-[#4a3528]/5" />
                  </>

                ) : (

                  /* Fallback */
                  <div className="flex h-full items-center justify-center bg-[#ead8c5] px-8 text-center">

                    <div>
                      <p className="font-serif text-4xl italic text-[#4a3528] sm:text-5xl">
                        Made
                      </p>

                      <p className="font-serif text-4xl italic text-[#a85f4e] sm:text-5xl">
                        for you
                      </p>
                    </div>

                  </div>
                )}

              </div>

            </div>

            {/* Decorative elements */}
            <div className="absolute left-[12%] top-[12%] h-4 w-4 rounded-full bg-[#b9827a]" />

            <div className="absolute right-[13%] top-[25%] h-7 w-7 rounded-full border-2 border-[#a85f4e]/50" />

            <div className="absolute bottom-[15%] left-[18%] h-6 w-6 rounded-full border-2 border-[#b9827a]/60" />

          </div>

          {/* Product indicator dots */}
          {products.length > 1 && (
            <div className="absolute bottom-5 left-1/2 flex -translate-x-1/2 items-center gap-2 rounded-full bg-[#4a3528]/60 px-3 py-2 backdrop-blur-sm">

              {products.map((product, index) => (
                <button
                  key={product._id}
                  type="button"
                  onClick={() => setActiveIndex(index)}
                  aria-label={`Show ${product.name}`}
                  className={`h-1.5 rounded-full transition-all duration-500 ${
                    index === activeIndex
                      ? "w-6 bg-white"
                      : "w-1.5 bg-white/50"
                  }`}
                />
              ))}

            </div>
          )}

          {/* Floating label */}
          <div className="absolute -bottom-5 right-2 rounded-full bg-[#f8f4ed] px-5 py-3 shadow-xl sm:right-5">

            <div className="flex items-center gap-2">

              <Sparkles
                size={15}
                className="text-[#b9684f]"
              />

              <span className="text-xs font-medium text-[#4a3528]">
                Made for you
              </span>

            </div>

          </div>

        </div>


        {/* Content */}
        <div className="order-1 lg:order-2">

          <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-[#d29b89]">
            Made personal
          </p>

          <h2 className="mt-4 font-serif text-5xl leading-[0.95] tracking-[-0.02em] text-[#f8f4ed] sm:text-6xl lg:text-7xl">
            Your story,
            <br />

            <span className="italic text-[#d9a395]">
              stitched by hand.
            </span>
          </h2>

          <p className="mt-7 max-w-lg text-base leading-7 text-[#e2d2c4]">
            From names and dates to colors and little details,
            we can turn your idea into a one-of-a-kind
            embroidery piece made especially for you.
          </p>

          <Link
            to="/customized"
            className="mt-8 inline-flex items-center gap-3 rounded-full bg-[#f8f4ed] px-6 py-3.5 text-sm font-medium text-[#4a3528] transition hover:bg-white"
          >
            Explore Customization

            <ArrowUpRight
              size={16}
              strokeWidth={1.7}
            />
          </Link>

        </div>

      </div>
    </section>
  )
}

export default CustomizedSection