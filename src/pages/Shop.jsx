import { useEffect, useMemo, useState } from "react"
import { Search, SlidersHorizontal, X } from "lucide-react"

import ProductCard from "../components/ProductCard"
import SectionHeading from "../components/SectionHeading"

import {
  getAllProducts,
  getCategories,
} from "../services/productService"

function Shop() {
  const [products, setProducts] = useState([])
  const [categories, setCategories] = useState([])

  const [search, setSearch] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedType, setSelectedType] = useState("all")

  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadShopData() {
      try {
        const [productData, categoryData] = await Promise.all([
          getAllProducts(),
          getCategories(),
        ])

        setProducts(productData)
        setCategories(categoryData)
      } catch (error) {
        console.error("Failed to load shop data:", error)
      } finally {
        setLoading(false)
      }
    }

    loadShopData()
  }, [])

  const filteredProducts = useMemo(() => {
    const searchTerm = search.trim().toLowerCase()

    return products.filter((product) => {
      const matchesSearch =
        !searchTerm ||
        product.name?.toLowerCase().includes(searchTerm) ||
        product.shortDescription
          ?.toLowerCase()
          .includes(searchTerm)

      const matchesCategory =
        selectedCategory === "all" ||
        product.category?.slug?.current === selectedCategory

      const matchesType =
        selectedType === "all" ||
        product.productType === selectedType

      return (
        matchesSearch &&
        matchesCategory &&
        matchesType
      )
    })
  }, [
    products,
    search,
    selectedCategory,
    selectedType,
  ])

  const clearFilters = () => {
    setSearch("")
    setSelectedCategory("all")
    setSelectedType("all")
  }

  const hasFilters =
    search ||
    selectedCategory !== "all" ||
    selectedType !== "all"

  return (
    <div className="min-h-screen bg-[#f8f4ed]">

      {/* Page Header */}
      <section className="px-6 pb-10 pt-16 sm:px-8 lg:px-10 lg:pb-14 lg:pt-20">
        <div className="mx-auto max-w-7xl">
          <SectionHeading
            eyebrow="The Collection"
            title="Handcrafted with Meaning"
            description="Explore our collection of handmade and personalized embroidery creations."
          />
        </div>
      </section>

      {/* Filters */}
      <section className="border-y border-[#e5dcd0] bg-[#fcfaf6]">
        <div className="mx-auto max-w-7xl px-6 py-5 sm:px-8 lg:px-10">

          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">

            {/* Search */}
            <div className="relative w-full lg:max-w-sm">
              <Search
                size={17}
                strokeWidth={1.6}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-[#a58e7c]"
              />

              <input
                type="text"
                value={search}
                onChange={(event) =>
                  setSearch(event.target.value)
                }
                placeholder="Search creations..."
                className="w-full rounded-full border border-[#e5dcd0] bg-[#f8f4ed] py-3 pl-11 pr-10 text-sm text-[#4a3528] outline-none transition placeholder:text-[#a58e7c] focus:border-[#b9827a]"
              />

              {search && (
                <button
                  type="button"
                  onClick={() => setSearch("")}
                  aria-label="Clear search"
                  className="absolute right-3 top-1/2 flex h-7 w-7 -translate-y-1/2 items-center justify-center rounded-full text-[#765c4a] hover:bg-[#efe7da]"
                >
                  <X size={15} />
                </button>
              )}
            </div>

            {/* Category filters */}
            <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none">
              <button
                type="button"
                onClick={() =>
                  setSelectedCategory("all")
                }
                className={`shrink-0 rounded-full px-4 py-2 text-xs font-medium transition ${
                  selectedCategory === "all"
                    ? "bg-[#4a3528] text-white"
                    : "bg-[#efe7da] text-[#4a3528] hover:bg-[#e5d8c8]"
                }`}
              >
                All
              </button>

              {categories.map((category) => (
                <button
                  key={category._id}
                  type="button"
                  onClick={() =>
                    setSelectedCategory(
                      category.slug.current
                    )
                  }
                  className={`shrink-0 rounded-full px-4 py-2 text-xs font-medium transition ${
                    selectedCategory ===
                    category.slug.current
                      ? "bg-[#4a3528] text-white"
                      : "bg-[#efe7da] text-[#4a3528] hover:bg-[#e5d8c8]"
                  }`}
                >
                  {category.name}
                </button>
              ))}
            </div>
          </div>

          {/* Product type */}
          <div className="mt-4 flex flex-wrap items-center gap-2">
            <div className="mr-1 flex items-center gap-2 text-xs text-[#765c4a]">
              <SlidersHorizontal size={14} />
              Type:
            </div>

            <button
              type="button"
              onClick={() => setSelectedType("all")}
              className={`rounded-full px-3 py-1.5 text-[11px] transition ${
                selectedType === "all"
                  ? "bg-[#b9827a] text-white"
                  : "bg-[#efe7da] text-[#765c4a]"
              }`}
            >
              All
            </button>

            <button
              type="button"
              onClick={() =>
                setSelectedType("readyMade")
              }
              className={`rounded-full px-3 py-1.5 text-[11px] transition ${
                selectedType === "readyMade"
                  ? "bg-[#b9827a] text-white"
                  : "bg-[#efe7da] text-[#765c4a]"
              }`}
            >
              Ready-made
            </button>

            <button
              type="button"
              onClick={() =>
                setSelectedType("customized")
              }
              className={`rounded-full px-3 py-1.5 text-[11px] transition ${
                selectedType === "customized"
                  ? "bg-[#b9827a] text-white"
                  : "bg-[#efe7da] text-[#765c4a]"
              }`}
            >
              Customized
            </button>

            {hasFilters && (
              <button
                type="button"
                onClick={clearFilters}
                className="ml-auto text-[11px] font-medium text-[#a85f4e] underline underline-offset-4"
              >
                Clear filters
              </button>
            )}
          </div>

        </div>
      </section>

      {/* Products */}
      <section className="px-6 py-12 sm:px-8 lg:px-10 lg:py-16">
        <div className="mx-auto max-w-7xl">

          {!loading && (
            <p className="mb-8 text-xs text-[#765c4a]">
              {filteredProducts.length}{" "}
              {filteredProducts.length === 1
                ? "creation"
                : "creations"}
            </p>
          )}

          {loading ? (
            <div className="grid grid-cols-2 gap-x-4 gap-y-10 sm:grid-cols-3 lg:grid-cols-4 lg:gap-x-6">
              {[1, 2, 3, 4, 5, 6, 7, 8].map(
                (item) => (
                  <div key={item}>
                    <div className="aspect-square animate-pulse rounded-[4px] bg-[#efe7da]" />

                    <div className="mt-4 h-3 w-20 animate-pulse bg-[#efe7da]" />

                    <div className="mt-2 h-6 w-36 animate-pulse bg-[#efe7da]" />
                  </div>
                )
              )}
            </div>
          ) : filteredProducts.length > 0 ? (
            <div className="grid grid-cols-2 gap-x-4 gap-y-10 sm:grid-cols-3 lg:grid-cols-4 lg:gap-x-6">
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product._id}
                  product={product}
                />
              ))}
            </div>
          ) : (
            <div className="py-20 text-center">

              <p className="font-serif text-3xl text-[#4a3528]">
                No creations found
              </p>

              <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-[#765c4a]">
                We couldn't find anything matching
                your search or filters.
              </p>

              <button
                type="button"
                onClick={clearFilters}
                className="mt-6 rounded-full bg-[#4a3528] px-6 py-3 text-sm font-medium text-white transition hover:bg-[#30251f]"
              >
                Clear Filters
              </button>

            </div>
          )}

        </div>
      </section>
    </div>
  )
}

export default Shop