import { useEffect, useState } from "react"
import { ArrowLeft, ArrowUpRight } from "lucide-react"
import { Link, useParams } from "react-router-dom"

import SEO from "../components/SEO"

import {
  getCategoryBySlug,
  getProductsByCategory,
} from "../services/productService"

import { urlFor } from "../lib/image"
import { useFavorites } from "../hooks/useFavorites"

function Category() {
  const { slug } = useParams()

  const [category, setCategory] = useState(null)
  const [products, setProducts] = useState([])

  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  const { isFavorite, toggleFavorite } = useFavorites()

  useEffect(() => {
    async function loadCategory() {
      setLoading(true)
      setError(false)

      try {
        const [categoryData, productData] =
          await Promise.all([
            getCategoryBySlug(slug),
            getProductsByCategory(slug),
          ])

        if (!categoryData) {
          setError(true)
          setCategory(null)
          setProducts([])
          return
        }

        setCategory(categoryData)
        setProducts(productData || [])
      } catch (error) {
        console.error(
          "Failed to load category:",
          error
        )

        setError(true)
      } finally {
        setLoading(false)
      }
    }

    if (slug) {
      loadCategory()
    }
  }, [slug])

  /* ---------------- Loading ---------------- */

  if (loading) {
    return (
      <div className="min-h-screen bg-[#f8f4ed]">

        <div className="mx-auto max-w-7xl px-6 py-8 sm:px-8 lg:px-10">

          <div className="h-4 w-36 animate-pulse rounded bg-[#efe7da]" />

          <div className="mt-10 grid gap-10 lg:grid-cols-2">

            <div className="aspect-[1.1] animate-pulse rounded bg-[#efe7da]" />

            <div className="flex flex-col justify-center space-y-5">

              <div className="h-3 w-24 animate-pulse rounded bg-[#efe7da]" />

              <div className="h-12 w-3/4 animate-pulse rounded bg-[#efe7da]" />

              <div className="h-20 w-full animate-pulse rounded bg-[#efe7da]" />

            </div>

          </div>

        </div>

      </div>
    )
  }

  /* ---------------- Error ---------------- */

  if (error || !category) {
    return (
      <div className="flex min-h-[70vh] items-center justify-center bg-[#f8f4ed] px-6 text-center">

        <div>

          <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-[#b9684f]">
            Collection not found
          </p>

          <h1 className="mt-4 font-serif text-4xl text-[#4a3528] sm:text-5xl">
            This collection isn't available
          </h1>

          <p className="mx-auto mt-4 max-w-md text-sm leading-6 text-[#765c4a]">
            The collection may have been removed or
            is currently unavailable.
          </p>

          <Link
            to="/shop"
            className="mt-7 inline-flex items-center gap-2 rounded-full bg-[#4a3528] px-6 py-3 text-sm font-medium text-white transition hover:bg-[#30251f]"
          >
            <ArrowLeft size={15} />
            Back to Shop
          </Link>

        </div>

      </div>
    )
  }

  /* ---------------- Category Image ---------------- */

  const categoryImage = category.image
    ? urlFor(category.image)
      .width(1200)
      .height(1000)
      .fit("crop")
      .auto("format")
      .url()
    : null

  const categoryDescription =
    category.description ||
    `Explore ${category.name} handmade creations from Chirashree Creation.`

  const seoDescription =
    categoryDescription.length > 160
      ? categoryDescription.slice(0, 157) + "..."
      : categoryDescription

  return (

    <>

      <SEO
        title={`${category.name} | Chirashree Creation`}
        description={seoDescription}
        path={`/category/${slug}`}
      />
      <div className="min-h-screen bg-[#f8f4ed]">

        {/* Breadcrumb */}
        <div className="mx-auto max-w-7xl px-6 pt-8 sm:px-8 lg:px-10">

          <div className="flex items-center gap-2 text-xs text-[#8a7666]">

            <Link
              to="/"
              className="transition hover:text-[#a85f4e]"
            >
              Home
            </Link>

            <span>/</span>

            <Link
              to="/shop"
              className="transition hover:text-[#a85f4e]"
            >
              Collections
            </Link>

            <span>/</span>

            <span className="text-[#4a3528]">
              {category.name}
            </span>

          </div>

        </div>


        {/* Category Hero */}
        <section className="mx-auto max-w-7xl px-6 py-10 sm:px-8 lg:px-10 lg:py-14">

          <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">

            {/* Image */}
            <div className="relative">

              <div className="relative aspect-[1.05] overflow-hidden rounded-[4px] bg-[#ead9c8] p-6 sm:p-10">

                {/* Background */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#f4e7d8] via-[#dfc9b3] to-[#cda88e]" />

                {/* Decorative frame */}
                <div className="absolute left-1/2 top-1/2 aspect-square w-[78%] -translate-x-1/2 -translate-y-1/2 rounded-full border-[8px] border-[#c49a76]/70 bg-[#f5eadc]/50 p-3 shadow-inner sm:p-4">

                  <div className="h-full w-full overflow-hidden rounded-full border border-[#a85f4e]/30">

                    {categoryImage ? (
                      <img
                        src={categoryImage}
                        alt={category.name}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <div className="flex h-full items-center justify-center bg-[#efe0d0] px-8 text-center">
                        <span className="font-serif text-3xl italic text-[#765c4a]">
                          {category.name}
                        </span>
                      </div>
                    )}

                  </div>

                </div>

                {/* Decorative details */}
                <div className="absolute left-[10%] top-[14%] h-4 w-4 rounded-full bg-[#b9827a]/60" />

                <div className="absolute right-[12%] top-[18%] h-7 w-7 rounded-full border-2 border-[#b9684f]/40" />

                <div className="absolute bottom-[13%] left-[13%] h-6 w-6 rounded-full border-2 border-[#b9827a]/50" />

              </div>

            </div>


            {/* Information */}
            <div>

              <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-[#b9684f]">
                Collection
              </p>

              <h1 className="mt-4 font-serif text-5xl leading-[0.95] tracking-[-0.02em] text-[#4a3528] sm:text-6xl lg:text-7xl">
                {category.name}
              </h1>

              {category.description && (
                <p className="mt-6 max-w-xl text-base leading-7 text-[#765c4a] sm:text-lg">
                  {category.description}
                </p>
              )}

              <div className="mt-7 flex items-center gap-3">

                <span className="rounded-full bg-[#efe0d8] px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.15em] text-[#9f5845]">
                  {products.length}{" "}
                  {products.length === 1
                    ? "Creation"
                    : "Creations"}
                </span>

              </div>

            </div>

          </div>

        </section>


        {/* Products */}
        <section className="border-t border-[#e5dcd0] bg-[#fcfaf6] px-6 py-16 sm:px-8 lg:px-10 lg:py-20">

          <div className="mx-auto max-w-7xl">

            <div className="flex items-end justify-between gap-6">

              <div>

                <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-[#b9684f]">
                  Explore the collection
                </p>

                <h2 className="mt-2 font-serif text-3xl text-[#4a3528] sm:text-4xl">
                  {category.name} Creations
                </h2>

              </div>

              <Link
                to="/shop"
                className="hidden text-xs font-medium text-[#765c4a] underline underline-offset-4 transition hover:text-[#a85f4e] sm:block"
              >
                View all products
              </Link>

            </div>


            {products.length > 0 ? (

              <div className="mt-10 grid grid-cols-2 gap-x-4 gap-y-10 sm:grid-cols-3 sm:gap-x-6 lg:grid-cols-4 lg:gap-x-7">

                {products.map((product) => {

                  const imageUrl = product.mainImage
                    ? urlFor(product.mainImage)
                      .width(700)
                      .height(800)
                      .fit("crop")
                      .auto("format")
                      .url()
                    : null

                  return (
                    <article
                      key={product._id}
                      className="group relative"
                    >

                      <Link
                        to={`/product/${product.slug.current}`}
                        className="block"
                      >

                        <div className="relative aspect-[0.88] overflow-hidden rounded-[3px] bg-[#efe7da]">

                          {imageUrl ? (
                            <img
                              src={imageUrl}
                              alt={product.name}
                              loading="lazy"
                              className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                            />
                          ) : (
                            <div className="flex h-full items-center justify-center px-5 text-center">
                              <span className="font-serif text-xl italic text-[#765c4a]">
                                {product.name}
                              </span>
                            </div>
                          )}

                          {/* Overlay */}
                          <div className="absolute inset-0 bg-[#4a3528]/0 transition duration-500 group-hover:bg-[#4a3528]/10" />

                          {/* Open icon */}
                          <div className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-white/85 text-[#4a3528] opacity-0 shadow-sm backdrop-blur-sm transition duration-300 group-hover:opacity-100">
                            <ArrowUpRight
                              size={16}
                              strokeWidth={1.6}
                            />
                          </div>

                        </div>

                        <div className="mt-3">

                          <h3 className="font-serif text-lg text-[#4a3528] transition group-hover:text-[#a85f4e] sm:text-xl">
                            {product.name}
                          </h3>

                          {product.shortDescription && (
                            <p className="mt-1 line-clamp-1 text-xs leading-5 text-[#8a7666]">
                              {product.shortDescription}
                            </p>
                          )}

                          <p className="mt-2 text-sm font-medium text-[#4a3528]">
                            ₹{product.price?.toLocaleString("en-IN")}
                          </p>

                        </div>

                      </Link>


                      {/* Favorite */}
                      <button
                        type="button"
                        onClick={() =>
                          toggleFavorite(product._id)
                        }
                        aria-label={
                          isFavorite(product._id)
                            ? `Remove ${product.name} from favorites`
                            : `Save ${product.name} to favorites`
                        }
                        className={`absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-lg shadow-sm backdrop-blur-sm transition ${isFavorite(product._id)
                          ? "text-[#a85f4e]"
                          : "text-[#4a3528] opacity-0 group-hover:opacity-100"
                          }`}
                      >
                        {isFavorite(product._id)
                          ? "♥"
                          : "♡"}
                      </button>

                    </article>
                  )
                })}

              </div>

            ) : (

              /* Empty collection */
              <div className="mt-10 rounded-lg border border-[#e5dcd0] bg-[#f8f4ed] px-6 py-16 text-center">

                <p className="font-serif text-3xl text-[#4a3528]">
                  New creations are coming soon
                </p>

                <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-[#765c4a]">
                  We're preparing beautiful pieces for this
                  collection. In the meantime, explore our other
                  creations.
                </p>

                <Link
                  to="/shop"
                  className="mt-7 inline-flex rounded-full bg-[#4a3528] px-7 py-3 text-sm font-medium text-white transition hover:bg-[#30251f]"
                >
                  Explore All Products
                </Link>

              </div>

            )}

          </div>

        </section>

      </div>
    </>
  )
}

export default Category