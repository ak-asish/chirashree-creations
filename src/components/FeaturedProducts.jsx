import { useEffect, useState } from "react"
import { Link } from "react-router-dom"

import { getFeaturedProducts } from "../services/productService"
import ProductCard from "./ProductCard"
import SectionHeading from "./SectionHeading"

function FeaturedProducts() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadProducts() {
      try {
        const data = await getFeaturedProducts()
        setProducts(data)
      } catch (error) {
        console.error("Failed to load featured products:", error)
      } finally {
        setLoading(false)
      }
    }

    loadProducts()
  }, [])

  return (
    <section className="bg-[#fcfaf6] px-6 py-20 sm:px-8 lg:px-10 lg:py-28">
      <div className="mx-auto max-w-7xl">

        <div className="flex items-end justify-between gap-6">
          <SectionHeading
            eyebrow="Handpicked for you"
            title="Our Bestsellers"
            centered={false}
          />

          <Link
            to="/shop"
            className="hidden shrink-0 text-sm font-medium text-[#4a3528] underline decoration-[#b9827a] underline-offset-4 transition hover:text-[#a85f4e] sm:block"
          >
            View All
          </Link>
        </div>

        {loading ? (
          <div className="mt-12 grid grid-cols-2 gap-x-4 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-x-6">
            {[1, 2, 3, 4].map((item) => (
              <div key={item}>
                <div className="aspect-square animate-pulse rounded-[4px] bg-[#efe7da]" />

                <div className="mt-4 h-3 w-20 animate-pulse bg-[#efe7da]" />

                <div className="mt-2 h-6 w-36 animate-pulse bg-[#efe7da]" />
              </div>
            ))}
          </div>
        ) : products.length > 0 ? (
          <div className="mt-12 grid grid-cols-2 gap-x-4 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-x-6">
            {products.slice(0, 4).map((product) => (
              <ProductCard
                key={product._id}
                product={product}
              />
            ))}
          </div>
        ) : (
          <div className="mt-12 rounded-lg border border-[#e5dcd0] bg-[#f8f4ed] px-6 py-12 text-center">
            <p className="font-serif text-2xl text-[#4a3528]">
              More beautiful creations are coming soon.
            </p>

            <p className="mt-2 text-sm text-[#765c4a]">
              Check back soon to discover our latest handmade pieces.
            </p>
          </div>
        )}

        <div className="mt-8 flex justify-center sm:hidden">
          <Link
            to="/shop"
            className="text-sm font-medium text-[#4a3528] underline decoration-[#b9827a] underline-offset-4"
          >
            View All Products
          </Link>
        </div>

      </div>
    </section>
  )
}

export default FeaturedProducts