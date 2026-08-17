import { useEffect, useRef, useState } from "react"
import {
  ChevronLeft,
  ChevronRight,
  ArrowLeft,
  Check,
  Share2,
} from "lucide-react"
import { FaInstagram } from "react-icons/fa"
import { Link, useParams } from "react-router-dom"

import { useSiteSettings } from "../hooks/useSiteSettings"
import { getProductBySlug } from "../services/productService"
import { urlFor } from "../lib/image"
import { useFavorites } from "../hooks/useFavorites"
import ShareButton from "../components/ShareButton"
import RelatedProducts from "../components/RelatedProducts"

function ProductDetails() {
  const { slug } = useParams()

  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [selectedImage, setSelectedImage] = useState(null)
  const [orderCopied, setOrderCopied] = useState(false)

  // Gallery animation
  const [slideDirection, setSlideDirection] = useState("next")
  const [isAnimating, setIsAnimating] = useState(false)
  const [previousImage, setPreviousImage] = useState(null)

  // Sticky order button
  const [showStickyOrder, setShowStickyOrder] = useState(true)

  const touchStartX = useRef(null)
  const animationTimeoutRef = useRef(null)
  const orderButtonRef = useRef(null)

  const { settings } = useSiteSettings()

  const {
    isFavorite,
    toggleFavorite,
  } = useFavorites()

  /*
   * Clean up animation timer
   */
  useEffect(() => {
    return () => {
      if (animationTimeoutRef.current) {
        clearTimeout(animationTimeoutRef.current)
      }
    }
  }, [])

  /*
   * Watch the real "Order on Instagram" button.
   *
   * When the real button is visible on screen,
   * hide the floating sticky version.
   *
   * When the real button is outside the viewport,
   * show the floating version.
   */
  useEffect(() => {
    if (!product) return

    const orderButton = orderButtonRef.current

    if (!orderButton) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        setShowStickyOrder(!entry.isIntersecting)
      },
      {
        threshold: 0.15,
      }
    )

    observer.observe(orderButton)

    return () => {
      observer.disconnect()
    }
  }, [product])

  /*
   * Load product
   */
  useEffect(() => {
    async function loadProduct() {
      try {
        const data = await getProductBySlug(slug)

        setProduct(data)

        if (data?.mainImage) {
          setSelectedImage(data.mainImage)
        }
      } catch (error) {
        console.error("Failed to load product:", error)
      } finally {
        setLoading(false)
      }
    }

    loadProduct()
  }, [slug])

  /*
   * Dynamic SEO metadata
   */
  useEffect(() => {
    if (!product) return

    const siteName = "Chirashree Creation"
    const siteUrl = "https://chirashree.netlify.app"

    const productSlug =
      product.slug?.current || slug

    const productUrl =
      `${siteUrl}/product/${productSlug}`

    const title =
      `${product.name} | ${siteName}`

    const description =
      product.shortDescription ||
      product.description ||
      `Discover ${product.name}, a handcrafted creation from ${siteName}.`

    const imageUrl = product.mainImage
      ? urlFor(product.mainImage)
          .width(1200)
          .height(1200)
          .fit("crop")
          .auto("format")
          .url()
      : null

    document.title = title

    function setMeta(attribute, key, content) {
      if (!content) return

      let element = document.head.querySelector(
        `meta[${attribute}="${key}"]`
      )

      if (!element) {
        element = document.createElement("meta")
        element.setAttribute(attribute, key)
        document.head.appendChild(element)
      }

      element.setAttribute("content", content)
    }

    setMeta(
      "name",
      "description",
      description
    )

    setMeta(
      "name",
      "robots",
      "index, follow"
    )

    setMeta(
      "property",
      "og:title",
      title
    )

    setMeta(
      "property",
      "og:description",
      description
    )

    setMeta(
      "property",
      "og:type",
      "product"
    )

    setMeta(
      "property",
      "og:url",
      productUrl
    )

    setMeta(
      "property",
      "og:site_name",
      siteName
    )

    if (imageUrl) {
      setMeta(
        "property",
        "og:image",
        imageUrl
      )
    }

    setMeta(
      "name",
      "twitter:card",
      "summary_large_image"
    )

    setMeta(
      "name",
      "twitter:title",
      title
    )

    setMeta(
      "name",
      "twitter:description",
      description
    )

    if (imageUrl) {
      setMeta(
        "name",
        "twitter:image",
        imageUrl
      )
    }

    let canonical = document.head.querySelector(
      'link[rel="canonical"]'
    )

    if (!canonical) {
      canonical = document.createElement("link")
      canonical.setAttribute("rel", "canonical")
      document.head.appendChild(canonical)
    }

    canonical.setAttribute(
      "href",
      productUrl
    )

    return () => {
      const defaultTitle =
        "Chirashree Creation | Handmade Embroidery & Personalized Gifts"

      const defaultDescription =
        "Chirashree Creation creates handcrafted embroidery, personalized gifts and meaningful handmade creations for weddings, celebrations and special moments."

      const defaultOgDescription =
        "Handcrafted embroidery and personalized creations made for meaningful moments."

      const defaultUrl =
        `${siteUrl}/`

      document.title = defaultTitle

      setMeta(
        "name",
        "description",
        defaultDescription
      )

      setMeta(
        "name",
        "robots",
        "index, follow"
      )

      setMeta(
        "property",
        "og:title",
        defaultTitle
      )

      setMeta(
        "property",
        "og:description",
        defaultOgDescription
      )

      setMeta(
        "property",
        "og:type",
        "website"
      )

      setMeta(
        "property",
        "og:url",
        defaultUrl
      )

      setMeta(
        "property",
        "og:site_name",
        siteName
      )

      setMeta(
        "name",
        "twitter:card",
        "summary_large_image"
      )

      setMeta(
        "name",
        "twitter:title",
        defaultTitle
      )

      setMeta(
        "name",
        "twitter:description",
        defaultOgDescription
      )

      const ogImage = document.head.querySelector(
        'meta[property="og:image"]'
      )

      const twitterImage = document.head.querySelector(
        'meta[name="twitter:image"]'
      )

      ogImage?.remove()
      twitterImage?.remove()

      canonical?.setAttribute(
        "href",
        defaultUrl
      )
    }
  }, [product, slug])

  if (loading) {
    return (
      <div className="min-h-screen bg-[#f8f4ed] px-6 py-16">
        <div className="mx-auto max-w-7xl">
          <div className="grid animate-pulse gap-10 lg:grid-cols-2">
            <div className="aspect-square rounded bg-[#efe7da]" />

            <div className="space-y-5 py-5">
              <div className="h-4 w-24 rounded bg-[#efe7da]" />
              <div className="h-12 w-3/4 rounded bg-[#efe7da]" />
              <div className="h-8 w-32 rounded bg-[#efe7da]" />
              <div className="h-20 w-full rounded bg-[#efe7da]" />
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (!product) {
    return (
      <div className="flex min-h-[70vh] items-center justify-center bg-[#f8f4ed] px-6 text-center">
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-[#b9684f]">
            Product not found
          </p>

          <h1 className="mt-3 font-serif text-4xl text-[#4a3528]">
            This creation isn't available
          </h1>

          <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-[#765c4a]">
            The product may have been removed or is
            currently unavailable.
          </p>

          <Link
            to="/shop"
            className="mt-7 inline-flex rounded-full bg-[#4a3528] px-6 py-3 text-sm font-medium text-white"
          >
            Back to Shop
          </Link>
        </div>
      </div>
    )
  }

  const galleryImages = [
    ...(product.mainImage
      ? [product.mainImage]
      : []),
    ...(product.gallery || []),
  ]

  const currentImageIndex = Math.max(
    0,
    galleryImages.findIndex(
      (image) => image === selectedImage
    )
  )

  const imageUrl = selectedImage
    ? urlFor(selectedImage)
        .width(1200)
        .height(1200)
        .fit("crop")
        .auto("format")
        .url()
    : null

  const productUrl = window.location.href

  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description:
      product.description ||
      product.shortDescription ||
      "",
    image: imageUrl
      ? [imageUrl]
      : [],
    url: productUrl,

    brand: {
      "@type": "Brand",
      name: "Chirashree Creation",
    },

    offers: {
      "@type": "Offer",
      url: productUrl,
      priceCurrency: "INR",
      price: product.price,
    },
  }

  const instagramUsername =
    settings?.instagramUsername || ""

  const instagramUrl =
    instagramUsername
      ? `https://ig.me/m/${instagramUsername}`
      : "#"

  /*
   * Change gallery image
   *
   * IMPORTANT:
   * We keep the old image and new image
   * rendered at the same time.
   */
  function changeGalleryImage(
    nextImage,
    direction
  ) {
    if (
      !nextImage ||
      isAnimating ||
      nextImage === selectedImage
    ) {
      return
    }

    setPreviousImage(selectedImage)

    setSlideDirection(direction)

    setIsAnimating(true)

    setSelectedImage(nextImage)

    if (animationTimeoutRef.current) {
      clearTimeout(
        animationTimeoutRef.current
      )
    }

    animationTimeoutRef.current =
      setTimeout(() => {
        setPreviousImage(null)
        setIsAnimating(false)
      }, 400)
  }

  function showPreviousImage() {
    if (
      galleryImages.length <= 1 ||
      isAnimating
    ) {
      return
    }

    const previousIndex =
      currentImageIndex === 0
        ? galleryImages.length - 1
        : currentImageIndex - 1

    changeGalleryImage(
      galleryImages[previousIndex],
      "previous"
    )
  }

  function showNextImage() {
    if (
      galleryImages.length <= 1 ||
      isAnimating
    ) {
      return
    }

    const nextIndex =
      currentImageIndex ===
      galleryImages.length - 1
        ? 0
        : currentImageIndex + 1

    changeGalleryImage(
      galleryImages[nextIndex],
      "next"
    )
  }

  function handleTouchStart(event) {
    touchStartX.current =
      event.touches[0].clientX
  }

  function handleTouchEnd(event) {
    if (touchStartX.current === null) {
      return
    }

    const touchEndX =
      event.changedTouches[0].clientX

    const distance =
      touchStartX.current - touchEndX

    const minimumSwipeDistance = 50

    if (
      Math.abs(distance) >=
      minimumSwipeDistance
    ) {
      if (distance > 0) {
        showNextImage()
      } else {
        showPreviousImage()
      }
    }

    touchStartX.current = null
  }

  async function handleImageShare() {
    const url = window.location.href

    try {
      if (navigator.share) {
        await navigator.share({
          title: product.name,
          text: `Check out ${product.name} from Chirashree Creation.`,
          url,
        })
      } else {
        await navigator.clipboard.writeText(
          url
        )

        alert("Product link copied!")
      }
    } catch (error) {
      if (error?.name !== "AbortError") {
        console.error(
          "Unable to share product:",
          error
        )
      }
    }
  }

  async function handleCopyOrderDetails() {
    const price = product.price
      ? `₹${product.price.toLocaleString(
          "en-IN"
        )}`
      : "Price to be confirmed"

    const customizationMessage =
      product.isCustomizable
        ? `
Customization details:
• Names:
• Date:
• Preferred colors:
• Other details:
`
        : ""

    const message = `Hi Chirashree Creation,

I'd like to enquire about this product:

Product: ${product.name}
Price: ${price}
${customizationMessage}
Please let me know about availability and ordering details.

Thank you!`

    try {
      await navigator.clipboard.writeText(
        message
      )

      setOrderCopied(true)

      setTimeout(() => {
        setOrderCopied(false)
      }, 3000)
    } catch (error) {
      console.error(
        "Unable to copy order details:",
        error
      )
    }
  }

  return (
    <>
      {/* 
        Gallery animation CSS is kept inside this
        component so you don't need to change App.css.
      */}
      <style>{`
        .chirashree-gallery {
          position: relative;
          overflow: hidden;
        }

        .chirashree-gallery-image {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          user-select: none;
          -webkit-user-drag: none;
        }

        @keyframes chirashree-slide-in-right {
          0% {
            transform: translate3d(100%, 0, 0);
          }

          100% {
            transform: translate3d(0, 0, 0);
          }
        }

        @keyframes chirashree-slide-in-left {
          0% {
            transform: translate3d(-100%, 0, 0);
          }

          100% {
            transform: translate3d(0, 0, 0);
          }
        }

        @keyframes chirashree-slide-out-left {
          0% {
            transform: translate3d(0, 0, 0);
          }

          100% {
            transform: translate3d(-100%, 0, 0);
          }
        }

        @keyframes chirashree-slide-out-right {
          0% {
            transform: translate3d(0, 0, 0);
          }

          100% {
            transform: translate3d(100%, 0, 0);
          }
        }

        .chirashree-gallery-in-right {
          animation:
            chirashree-slide-in-right
            400ms
            cubic-bezier(
              0.22,
              0.61,
              0.36,
              1
            )
            both;
        }

        .chirashree-gallery-in-left {
          animation:
            chirashree-slide-in-left
            400ms
            cubic-bezier(
              0.22,
              0.61,
              0.36,
              1
            )
            both;
        }

        .chirashree-gallery-out-left {
          animation:
            chirashree-slide-out-left
            400ms
            cubic-bezier(
              0.22,
              0.61,
              0.36,
              1
            )
            both;
        }

        .chirashree-gallery-out-right {
          animation:
            chirashree-slide-out-right
            400ms
            cubic-bezier(
              0.22,
              0.61,
              0.36,
              1
            )
            both;
        }

        @media (prefers-reduced-motion: reduce) {
          .chirashree-gallery-in-right,
          .chirashree-gallery-in-left,
          .chirashree-gallery-out-left,
          .chirashree-gallery-out-right {
            animation-duration: 1ms;
          }
        }
      `}</style>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html:
            JSON.stringify(
              productSchema
            ).replace(
              /</g,
              "\\u003c"
            ),
        }}
      />

      {/* Floating sticky Order button */}
      {showStickyOrder && (
        <div className="fixed inset-x-0 bottom-0 z-[60] px-4 pb-4 sm:px-6">
          <a
            href={instagramUrl}
            target="_blank"
            rel="noreferrer"
            className="mx-auto flex w-full max-w-md items-center justify-center gap-2 rounded-full bg-[#9f5845] px-5 py-4 text-sm font-medium text-white shadow-[0_8px_30px_rgba(74,53,40,0.22)] transition-all duration-300 hover:bg-[#844737] active:scale-[0.98]"
          >
            <span className="shrink-0 text-base">
              <FaInstagram/>
            </span>

            <span>
              Order on Instagram
            </span>
          </a>
        </div>
      )}

      <div className="min-h-screen overflow-x-hidden bg-[#f8f4ed]">

        {/* Breadcrumb */}
        <div className="mx-auto max-w-7xl px-6 pt-8 sm:px-8 lg:px-10">
          <Link
            to="/shop"
            className="inline-flex items-center gap-2 text-xs font-medium text-[#765c4a] transition hover:text-[#a85f4e]"
          >
            <ArrowLeft size={14} />
            Back to Shop
          </Link>
        </div>

        {/* Product */}
        <section className="mx-auto max-w-7xl px-6 py-8 sm:px-8 lg:px-10 lg:py-12">
          <div className="grid min-w-0 gap-10 lg:grid-cols-2 lg:gap-16">

            {/* Images */}
            <div className="min-w-0">

              {/* Main image */}
              <div
                className="chirashree-gallery relative h-[78vw] min-h-[280px] max-h-[600px] w-full rounded-[4px] bg-[#efe7da] touch-pan-y sm:aspect-square sm:h-auto sm:min-h-0 sm:max-h-none"
                onTouchStart={handleTouchStart}
                onTouchEnd={handleTouchEnd}
              >

                {/* Image actions */}
                <div className="absolute right-3 top-3 z-30 flex items-center gap-2 sm:right-4 sm:top-4">

                  {/* Save */}
                  <button
                    type="button"
                    onClick={() =>
                      toggleFavorite(
                        product._id
                      )
                    }
                    aria-label={
                      isFavorite(
                        product._id
                      )
                        ? "Remove from favorites"
                        : "Save to favorites"
                    }
                    aria-pressed={isFavorite(
                      product._id
                    )}
                    className={`flex h-10 w-10 items-center justify-center rounded-full bg-white/90 shadow-sm backdrop-blur-sm transition hover:scale-105 sm:h-11 sm:w-11 ${
                      isFavorite(
                        product._id
                      )
                        ? "text-[#a85f4e]"
                        : "text-[#4a3528]"
                    }`}
                  >
                    <span className="text-xl leading-none">
                      {isFavorite(
                        product._id
                      )
                        ? "♥"
                        : "♡"}
                    </span>
                  </button>

                  {/* Share */}
                  <button
                    type="button"
                    onClick={
                      handleImageShare
                    }
                    aria-label="Share product"
                    className="flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-[#4a3528] shadow-sm backdrop-blur-sm transition hover:scale-105 hover:text-[#a85f4e] sm:h-11 sm:w-11"
                  >
                    <Share2
                      size={18}
                      strokeWidth={1.6}
                    />
                  </button>

                </div>

                {/* Previous */}
                {galleryImages.length >
                  1 && (
                  <button
                    type="button"
                    onClick={
                      showPreviousImage
                    }
                    aria-label="Previous product image"
                    disabled={isAnimating}
                    className="group absolute left-4 top-1/2 z-30 flex -translate-y-1/2 items-center justify-center p-2 text-white transition-all duration-300 hover:scale-110 focus:outline-none disabled:cursor-default sm:left-5"
                  >
                    <ChevronLeft
                      size={30}
                      strokeWidth={1.5}
                      className="drop-shadow-[0_2px_4px_rgba(0,0,0,0.45)] transition-transform duration-300 group-hover:-translate-x-0.5"
                    />
                  </button>
                )}

                {/* Next */}
                {galleryImages.length >
                  1 && (
                  <button
                    type="button"
                    onClick={
                      showNextImage
                    }
                    aria-label="Next product image"
                    disabled={isAnimating}
                    className="group absolute right-4 top-1/2 z-30 flex -translate-y-1/2 items-center justify-center p-2 text-white transition-all duration-300 hover:scale-110 focus:outline-none disabled:cursor-default sm:right-5"
                  >
                    <ChevronRight
                      size={30}
                      strokeWidth={1.5}
                      className="drop-shadow-[0_2px_4px_rgba(0,0,0,0.45)] transition-transform duration-300 group-hover:translate-x-0.5"
                    />
                  </button>
                )}

                {/* Product images */}
                {imageUrl ? (
                  <div className="absolute inset-0 overflow-hidden">

                    {/* OLD IMAGE */}
                    {isAnimating &&
                      previousImage && (
                        <img
                          src={urlFor(
                            previousImage
                          )
                            .width(1200)
                            .height(1200)
                            .fit("crop")
                            .auto("format")
                            .url()}
                          alt=""
                          aria-hidden="true"
                          draggable="false"
                          className={`chirashree-gallery-image ${
                            slideDirection ===
                            "next"
                              ? "chirashree-gallery-out-left"
                              : "chirashree-gallery-out-right"
                          }`}
                        />
                      )}

                    {/* NEW IMAGE */}
                    <img
                      key={
                        selectedImage?._key ||
                        imageUrl
                      }
                      src={imageUrl}
                      alt={`${product.name} view ${
                        currentImageIndex + 1
                      }`}
                      draggable="false"
                      className={`chirashree-gallery-image ${
                        isAnimating
                          ? slideDirection ===
                            "next"
                            ? "chirashree-gallery-in-right"
                            : "chirashree-gallery-in-left"
                          : ""
                      }`}
                    />

                  </div>
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="font-serif text-2xl text-[#765c4a]">
                      Chirashree Creation
                    </span>
                  </div>
                )}

              </div>

              {/* Counter */}
              {galleryImages.length >
                1 && (
                <div className="mt-3 flex items-center justify-between">

                  <p className="text-[10px] font-medium uppercase tracking-[0.16em] text-[#9a8575]">
                    {currentImageIndex +
                      1}{" "}
                    /{" "}
                    {
                      galleryImages.length
                    }
                  </p>

                  <p className="text-[10px] text-[#9a8575] sm:hidden">
                    Swipe to explore
                  </p>

                </div>
              )}

              {/* Thumbnails */}
              {galleryImages.length >
                1 && (
                <div
                  className="mt-3 flex w-full min-w-0 gap-3 overflow-x-auto pb-2 scrollbar-none"
                  style={{
                    scrollbarWidth:
                      "none",
                  }}
                >
                  {galleryImages.map(
                    (
                      image,
                      index
                    ) => {
                      const thumbnailUrl =
                        urlFor(
                          image
                        )
                          .width(220)
                          .height(220)
                          .fit("crop")
                          .auto("format")
                          .url()

                      const isSelected =
                        currentImageIndex ===
                        index

                      return (
                        <button
                          key={index}
                          type="button"
                          disabled={
                            isAnimating
                          }
                          onClick={() => {
                            if (
                              isAnimating ||
                              image ===
                                selectedImage
                            ) {
                              return
                            }

                            const direction =
                              index >
                              currentImageIndex
                                ? "next"
                                : "previous"

                            changeGalleryImage(
                              image,
                              direction
                            )
                          }}
                          aria-label={`View ${product.name} image ${
                            index + 1
                          }`}
                          aria-current={
                            isSelected
                              ? "true"
                              : undefined
                          }
                          className={`group relative h-20 w-20 shrink-0 overflow-hidden rounded-[4px] border-2 transition duration-300 sm:h-24 sm:w-24 ${
                            isSelected
                              ? "border-[#a85f4e]"
                              : "border-transparent hover:border-[#d8cbbd]"
                          }`}
                        >
                          <img
                            src={
                              thumbnailUrl
                            }
                            alt={`${product.name} thumbnail ${
                              index + 1
                            }`}
                            draggable="false"
                            className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
                          />

                          {isSelected && (
                            <div className="absolute inset-0 bg-[#a85f4e]/10" />
                          )}
                        </button>
                      )
                    }
                  )}
                </div>
              )}

            </div>

            {/* Product information */}
            <div className="min-w-0 lg:py-4">

              {product.category?.name && (
                <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-[#b9684f]">
                  {product.category.name}
                </p>
              )}

              <h1 className="mt-3 font-serif text-5xl leading-[0.95] tracking-[-0.02em] text-[#4a3528] sm:text-6xl">
                {product.name}
              </h1>

              <div className="mt-5 flex flex-wrap items-center gap-3">
                <p className="text-xl font-medium text-[#4a3528]">
                  ₹
                  {product.price?.toLocaleString(
                    "en-IN"
                  )}
                </p>

                {product.productType ===
                  "customized" && (
                  <span className="rounded-full bg-[#efe0d8] px-3 py-1 text-[9px] font-semibold uppercase tracking-[0.12em] text-[#9f5845]">
                    Personalized
                  </span>
                )}
              </div>

              {product.shortDescription && (
                <p className="mt-6 text-base leading-7 text-[#765c4a]">
                  {
                    product.shortDescription
                  }
                </p>
              )}

              <div className="my-8 h-px bg-[#e5dcd0]" />

              {/* Customization */}
              {product.isCustomizable &&
                product.customizationDetails && (
                  <div className="rounded-lg bg-[#efe7da]/70 p-5">
                    <h2 className="font-serif text-2xl text-[#4a3528]">
                      Make it yours
                    </h2>

                    <p className="mt-2 whitespace-pre-line text-sm leading-6 text-[#765c4a]">
                      {
                        product.customizationDetails
                      }
                    </p>
                  </div>
                )}

              {/* Instagram CTA */}
              <div className="mt-8 min-w-0">

                <a
                  ref={orderButtonRef}
                  href={instagramUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="flex w-full min-w-0 items-center justify-center gap-2 rounded-full bg-[#9f5845] px-4 py-4 text-center text-sm font-medium text-white transition hover:bg-[#844737] sm:gap-3 sm:px-6"
                >
                  <span className="shrink-0 text-base">
                    <FaInstagram />
                  </span>

                  <span className="min-w-0 truncate">
                    Order on Instagram
                  </span>
                </a>

                <button
                  type="button"
                  onClick={
                    handleCopyOrderDetails
                  }
                  className="mt-3 flex w-full min-w-0 items-center justify-center gap-2 rounded-full border border-[#d8cbbd] px-4 py-3.5 text-center text-sm font-medium text-[#4a3528] transition hover:border-[#a85f4e] hover:text-[#a85f4e] sm:px-6"
                >
                  {orderCopied ? (
                    <>
                      <Check
                        size={16}
                        strokeWidth={1.7}
                        className="shrink-0"
                      />

                      <span className="truncate">
                        Order Details Copied
                      </span>
                    </>
                  ) : (
                    <span className="truncate">
                      Copy Order Details
                    </span>
                  )}
                </button>

                <div className="mt-5 min-w-0 rounded-lg border border-[#e5dcd0] bg-[#efe7da]/60 p-5">

                  <p className="text-xs font-semibold uppercase tracking-[0.15em] text-[#4a3528]">
                    When you message us
                  </p>

                  <p className="mt-2 text-sm leading-6 text-[#765c4a]">
                    Please first copy the order details then DM us. Mention the product name and tell us any customization details you'd like. We'll guide you through the rest of the process.
                  </p>

                  <div className="mt-4 min-w-0 rounded-md bg-[#f8f4ed] px-4 py-3">

                    <p className="text-[10px] uppercase tracking-[0.12em] text-[#8a7666]">
                      Product
                    </p>

                    <p className="mt-1 truncate text-sm font-medium text-[#4a3528]">
                      {
                        product.name
                      }
                    </p>

                  </div>

                </div>

                <p className="mt-3 text-center text-[11px] leading-5 text-[#8a7666]">
                  Message us on Instagram to check availability, customization options and place your order.
                </p>

                <div className="mt-4 flex flex-wrap justify-center gap-3">

                  {/* Save */}
                  <button
                    type="button"
                    onClick={() =>
                      toggleFavorite(
                        product._id
                      )
                    }
                    className={`inline-flex items-center gap-2 rounded-full border px-5 py-3 text-sm font-medium transition ${
                      isFavorite(
                        product._id
                      )
                        ? "border-[#a85f4e] bg-[#efe0d8] text-[#a85f4e]"
                        : "border-[#d8cbbd] text-[#4a3528] hover:border-[#a85f4e] hover:text-[#a85f4e]"
                    }`}
                  >
                    <span className="text-base">
                      {isFavorite(
                        product._id
                      )
                        ? "♥"
                        : "♡"}
                    </span>

                    {isFavorite(
                      product._id
                    )
                      ? "Saved"
                      : "Save"}
                  </button>

                  {/* Share */}
                  <ShareButton
                    product={product}
                  />

                </div>

              </div>

              {/* Product details */}
              <div className="mt-10 border-t border-[#e5dcd0]">

                {product.materials && (
                  <div className="flex flex-wrap justify-between gap-4 border-b border-[#e5dcd0] py-4 text-sm">
                    <span className="text-[#8a7666]">
                      Materials
                    </span>

                    <span className="text-right text-[#4a3528]">
                      {
                        product.materials
                      }
                    </span>
                  </div>
                )}

                {product.dimensions && (
                  <div className="flex flex-wrap justify-between gap-4 border-b border-[#e5dcd0] py-4 text-sm">
                    <span className="text-[#8a7666]">
                      Dimensions
                    </span>

                    <span className="text-right text-[#4a3528]">
                      {
                        product.dimensions
                      }
                    </span>
                  </div>
                )}

                {product.processingTime && (
                  <div className="flex flex-wrap justify-between gap-4 border-b border-[#e5dcd0] py-4 text-sm">
                    <span className="text-[#8a7666]">
                      Processing time
                    </span>

                    <span className="text-right text-[#4a3528]">
                      {
                        product.processingTime
                      }
                    </span>
                  </div>
                )}

              </div>

            </div>
          </div>
        </section>

        {/* Description */}
        {product.description && (
          <section className="border-t border-[#e5dcd0] bg-[#fcfaf6] px-6 py-16 sm:px-8 lg:px-10 lg:py-20">
            <div className="mx-auto max-w-3xl text-center">

              <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-[#b9684f]">
                About this creation
              </p>

              <p className="mt-5 whitespace-pre-line text-base leading-8 text-[#765c4a]">
                {
                  product.description
                }
              </p>

            </div>
          </section>
        )}

        <RelatedProducts
          product={product}
        />

      </div>
    </>
  )
}

export default ProductDetails