import { Heart } from "lucide-react"
import { Link } from "react-router-dom"
import { useEffect, useState } from "react"

import ProductCard from "../components/ProductCard"
import { getAllProducts } from "../services/productService"
import { useFavorites } from "../hooks/useFavorites"

import SEO from "../components/SEO"

function Favorites() {
  const {
    favorites,
    clearFavorites,
  } = useFavorites()

  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadProducts() {
      try {
        const data = await getAllProducts()
        setProducts(data)
      } catch (error) {
        console.error(
          "Failed to load favorite products:",
          error
        )
      } finally {
        setLoading(false)
      }
    }

    loadProducts()
  }, [])

  const favoriteProducts = products.filter((product) =>
    favorites.includes(product._id)
  )

  return (
    <div className="min-h-screen bg-[#f8f4ed]">

      <SEO
        title="Saved Creations | Chirashree Creation"
        description="View your saved Chirashree Creation favorites."
        path="/favorites"
        noIndex
      />

      <section className="px-6 pb-10 pt-16 sm:px-8 lg:px-10 lg:pb-14 lg:pt-20">
        <div className="mx-auto max-w-7xl">

          <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">

            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-[#b9684f]">
                Your collection
              </p>

              <h1 className="mt-3 font-serif text-5xl leading-none text-[#4a3528]">
                Favorites
              </h1>

              <p className="mt-4 text-sm text-[#765c4a]">
                Creations you've saved for later.
              </p>
            </div>

            {favorites.length > 0 && (
              <button
                type="button"
                onClick={clearFavorites}
                className="self-start text-xs font-medium text-[#a85f4e] underline underline-offset-4 sm:self-auto"
              >
                Clear all
              </button>
            )}

          </div>
        </div>
      </section>

      <section className="px-6 pb-16 sm:px-8 lg:px-10 lg:pb-24">
        <div className="mx-auto max-w-7xl">

          {loading ? (
            <div className="grid grid-cols-2 gap-x-4 gap-y-10 sm:grid-cols-3 lg:grid-cols-4 lg:gap-x-6">
              {[1, 2, 3, 4].map((item) => (
                <div key={item}>
                  <div className="aspect-square animate-pulse rounded bg-[#efe7da]" />

                  <div className="mt-4 h-3 w-20 animate-pulse bg-[#efe7da]" />

                  <div className="mt-2 h-6 w-36 animate-pulse bg-[#efe7da]" />
                </div>
              ))}
            </div>
          ) : favoriteProducts.length > 0 ? (
            <div className="grid grid-cols-2 gap-x-4 gap-y-10 sm:grid-cols-3 lg:grid-cols-4 lg:gap-x-6">
              {favoriteProducts.map((product) => (
                <ProductCard
                  key={product._id}
                  product={product}
                />
              ))}
            </div>
          ) : (
            <div className="flex min-h-[40vh] items-center justify-center text-center">

              <div className="max-w-md">

                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#efe7da] text-[#a85f4e]">
                  <Heart
                    size={25}
                    strokeWidth={1.4}
                  />
                </div>

                <h2 className="mt-6 font-serif text-3xl text-[#4a3528]">
                  Nothing saved yet
                </h2>

                <p className="mt-3 text-sm leading-6 text-[#765c4a]">
                  Save the creations you love and come back
                  to them whenever you're ready.
                </p>

                <Link
                  to="/shop"
                  className="mt-7 inline-flex rounded-full bg-[#4a3528] px-6 py-3 text-sm font-medium text-white transition hover:bg-[#30251f]"
                >
                  Explore the Collection
                </Link>

              </div>

            </div>
          )}

        </div>
      </section>

    </div>
  )
}

export default Favorites