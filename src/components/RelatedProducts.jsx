import { useEffect, useState } from "react"
import { Link } from "react-router-dom"

import ProductCard from "./ProductCard"
import { getRelatedProducts } from "../services/productService"

function RelatedProducts({ product }) {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadRelatedProducts() {
      if (!product?._id) return

      try {
        const data = await getRelatedProducts(
          product._id,
          product.category?._id
        )

        setProducts(data)
      } catch (error) {
        console.error(
          "Failed to load related products:",
          error
        )
      } finally {
        setLoading(false)
      }
    }

    loadRelatedProducts()
  }, [product?._id, product?.category?._id])

  if (!loading && products.length === 0) {
    return null
  }

  return (
    <section className="border-t border-[#e5dcd0] bg-[#f8f4ed] px-6 py-16 sm:px-8 lg:px-10 lg:py-24">
      <div className="mx-auto max-w-7xl">

        <div className="flex items-end justify-between gap-5">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-[#b9684f]">
              Keep exploring
            </p>

            <h2 className="mt-3 font-serif text-4xl leading-none text-[#4a3528] sm:text-5xl">
              You May Also Like
            </h2>
          </div>

          <Link
            to="/shop"
            className="hidden text-xs font-medium text-[#a85f4e] underline underline-offset-4 sm:block"
          >
            View all creations
          </Link>
        </div>

        {loading ? (
          <div className="mt-10 grid grid-cols-2 gap-x-4 gap-y-10 sm:grid-cols-3 lg:grid-cols-4 lg:gap-x-6">
            {[1, 2, 3, 4].map((item) => (
              <div key={item}>
                <div className="aspect-square animate-pulse rounded bg-[#efe7da]" />

                <div className="mt-4 h-3 w-20 animate-pulse bg-[#efe7da]" />

                <div className="mt-2 h-6 w-36 animate-pulse bg-[#efe7da]" />
              </div>
            ))}
          </div>
        ) : (
          <div className="mt-10 grid grid-cols-2 gap-x-4 gap-y-10 sm:grid-cols-3 lg:grid-cols-4 lg:gap-x-6">
            {products.map((item) => (
              <ProductCard
                key={item._id}
                product={item}
              />
            ))}
          </div>
        )}

        <div className="mt-10 text-center sm:hidden">
          <Link
            to="/shop"
            className="text-xs font-medium text-[#a85f4e] underline underline-offset-4"
          >
            View all creations →
          </Link>
        </div>

      </div>
    </section>
  )
}

export default RelatedProducts