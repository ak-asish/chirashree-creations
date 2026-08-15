import { Heart, ArrowUpRight } from "lucide-react"
import { Link } from "react-router-dom"

import { urlFor } from "../lib/image"
import { useFavorites } from "../hooks/useFavorites"

function ProductCard({ product }) {
  const {
    isFavorite,
    toggleFavorite,
  } = useFavorites()

  const favorite = isFavorite(product._id)

  const imageUrl = product.mainImage
    ? urlFor(product.mainImage)
        .width(800)
        .height(900)
        .fit("crop")
        .auto("format")
        .url()
    : null

  function handleFavorite(event) {
    event.preventDefault()
    event.stopPropagation()

    toggleFavorite(product._id)
  }

  return (
    <article className="group">

      {/* Product Image */}
      <Link
        to={`/product/${product.slug.current}`}
        className="block"
        aria-label={`View ${product.name}`}
      >
        <div className="relative aspect-[0.9] overflow-hidden rounded-[4px] bg-[#efe7da]">

          {imageUrl ? (
            <img
              src={imageUrl}
              alt={product.name}
              loading="lazy"
              className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
            />
          ) : (
            <div className="flex h-full items-center justify-center px-5 text-center">
              <span className="font-serif text-xl text-[#765c4a]">
                Chirashree Creation
              </span>
            </div>
          )}

          {/* Personalized Badge */}
          {product.productType === "customized" && (
            <span className="absolute left-3 top-3 rounded-full bg-[#f8f4ed]/90 px-3 py-1.5 text-[9px] font-semibold uppercase tracking-[0.12em] text-[#9f5845] backdrop-blur-sm">
              Personalized
            </span>
          )}

          {/* Favorite Button */}
          <button
            type="button"
            onClick={handleFavorite}
            aria-label={
              favorite
                ? `Remove ${product.name} from favorites`
                : `Save ${product.name} to favorites`
            }
            aria-pressed={favorite}
            className={`absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 shadow-sm backdrop-blur-sm transition ${
              favorite
                ? "text-[#a85f4e] opacity-100"
                : "text-[#4a3528] opacity-100 sm:opacity-0 sm:group-hover:opacity-100"
            }`}
          >
            <Heart
              size={17}
              strokeWidth={1.6}
              fill={favorite ? "currentColor" : "none"}
            />
          </button>

          {/* Desktop Hover Action */}
          <div className="absolute bottom-3 left-3 right-3 hidden translate-y-2 opacity-0 transition duration-300 sm:block sm:group-hover:translate-y-0 sm:group-hover:opacity-100">
            <div className="flex items-center justify-center gap-2 rounded-full bg-[#4a3528]/95 py-3 text-xs font-medium text-white backdrop-blur-sm">
              View Details
              <ArrowUpRight
                size={14}
                strokeWidth={1.7}
              />
            </div>
          </div>

        </div>
      </Link>

      {/* Product Information */}
      <div className="pt-4">

        {product.category?.name && (
          <p className="text-[9px] font-semibold uppercase tracking-[0.18em] text-[#b9684f]">
            {product.category.name}
          </p>
        )}

        <Link
          to={`/product/${product.slug.current}`}
          className="mt-1 block font-serif text-xl leading-tight text-[#4a3528] transition hover:text-[#a85f4e]"
        >
          {product.name}
        </Link>

        {product.shortDescription && (
          <p className="mt-1 line-clamp-1 text-xs leading-5 text-[#8a7666]">
            {product.shortDescription}
          </p>
        )}

        <p className="mt-2 text-sm font-medium text-[#4a3528]">
          ₹{product.price?.toLocaleString("en-IN")}
        </p>

      </div>

    </article>
  )
}

export default ProductCard