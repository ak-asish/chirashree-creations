import { useEffect, useState } from "react"
import { ArrowUpRight } from "lucide-react"
import { Link } from "react-router-dom"

import { getCategories } from "../services/productService"
import { urlFor } from "../lib/image"
import SectionHeading from "./SectionHeading"

function CollectionGrid() {
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadCategories() {
      try {
        const data = await getCategories()

        setCategories(data || [])
      } catch (error) {
        console.error("Failed to load categories:", error)
      } finally {
        setLoading(false)
      }
    }

    loadCategories()
  }, [])

  return (
    <section className="bg-[#f8f4ed] px-6 py-20 sm:px-8 lg:px-10 lg:py-28">
      <div className="mx-auto max-w-7xl">

        <SectionHeading
          eyebrow="Browse Collections"
          title="Find the Perfect Piece"
          description="Explore handcrafted creations designed for life's most meaningful moments."
        />

        {/* Loading */}
        {loading ? (
          <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-6 lg:mt-14 lg:gap-8">
            {[1, 2, 3, 4, 5, 6].map((item) => (
              <div key={item}>

                <div className="aspect-[0.9] animate-pulse rounded-[4px] bg-[#efe7da]" />

                <div className="mx-auto mt-4 h-5 w-24 animate-pulse rounded bg-[#efe7da]" />

                <div className="mx-auto mt-2 h-3 w-16 animate-pulse rounded bg-[#efe7da]" />

              </div>
            ))}
          </div>
        ) : categories.length > 0 ? (

          <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-6 lg:mt-14 lg:gap-8">

            {categories.map((category) => {

              const imageUrl = category.image
                ? urlFor(category.image)
                    .width(800)
                    .height(800)
                    .fit("crop")
                    .auto("format")
                    .url()
                : null

              return (
                <Link
                  key={category._id}
                  to={`/category/${category.slug.current}`}
                  className="group"
                >

                  {/* Artwork Card */}
                  <div className="relative aspect-[0.9] overflow-hidden rounded-[4px] bg-[#ead9c8] p-4 shadow-sm transition duration-500 group-hover:-translate-y-1 group-hover:shadow-lg sm:p-6">

                    {/* Soft background */}
                    <div className="absolute inset-0 bg-gradient-to-br from-[#f4e7d8] via-[#dfc9b3] to-[#cda88e]" />

                    {/* Decorative outer frame */}
                    <div className="absolute left-1/2 top-1/2 aspect-square w-[82%] -translate-x-1/2 -translate-y-1/2 rounded-full border-[5px] border-[#c49a76]/70 bg-[#f5eadc]/50 shadow-inner transition duration-700 group-hover:scale-[1.03] sm:border-[7px]">

                      {/* Inner frame */}
                      <div className="absolute inset-3 overflow-hidden rounded-full border border-[#a85f4e]/30 bg-[#efe0d0] sm:inset-4">

                        {imageUrl ? (
                          <img
                            src={imageUrl}
                            alt={category.name}
                            loading="lazy"
                            className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                          />
                        ) : (
                          <div className="flex h-full w-full items-center justify-center px-6 text-center">
                            <span className="font-serif text-2xl italic text-[#765c4a]">
                              {category.name}
                            </span>
                          </div>
                        )}

                      </div>
                    </div>

                    {/* Decorative dots */}
                    <div className="absolute left-[12%] top-[14%] h-3 w-3 rounded-full bg-[#b9827a]/60 sm:h-4 sm:w-4" />

                    <div className="absolute right-[13%] top-[20%] h-5 w-5 rounded-full border border-[#b9684f]/50 sm:h-7 sm:w-7" />

                    <div className="absolute bottom-[14%] left-[14%] h-5 w-5 rounded-full border border-[#b9827a]/50 sm:h-6 sm:w-6" />

                    {/* Hover overlay */}
                    <div className="absolute inset-0 bg-[#4a3528]/0 transition duration-500 group-hover:bg-[#4a3528]/5" />

                    {/* Arrow */}
                    <div className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-white/85 text-[#4a3528] opacity-0 shadow-sm backdrop-blur-sm transition duration-300 group-hover:opacity-100">
                      <ArrowUpRight
                        size={16}
                        strokeWidth={1.6}
                      />
                    </div>

                  </div>

                  {/* Category Information */}
                  <div className="mt-4 text-center">

                    <h3 className="font-serif text-xl text-[#4a3528] transition-colors duration-300 group-hover:text-[#a85f4e] sm:text-2xl">
                      {category.name}
                    </h3>

                    {category.description && (
                      <p className="mx-auto mt-1 line-clamp-1 max-w-[180px] text-[10px] uppercase tracking-[0.12em] text-[#a58e7c]">
                        {category.description}
                      </p>
                    )}

                  </div>

                </Link>
              )
            })}

          </div>

        ) : (

          /* Empty state */
          <div className="mt-12 rounded-lg border border-[#e5dcd0] bg-[#fcfaf6] px-6 py-12 text-center">

            <p className="font-serif text-2xl text-[#4a3528]">
              Collections coming soon
            </p>

            <p className="mt-2 text-sm text-[#765c4a]">
              New handmade creations will be added shortly.
            </p>

          </div>
        )}

        {/* View All */}
        <div className="mt-10 flex justify-center">

          <Link
            to="/shop"
            className="inline-flex items-center rounded-full bg-[#4a3528] px-7 py-3 text-sm font-medium text-white transition hover:bg-[#30251f]"
          >
            View All Products
          </Link>

        </div>

      </div>
    </section>
  )
}

export default CollectionGrid