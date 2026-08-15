import { useEffect, useState } from "react"
import { ArrowUpRight } from "lucide-react"

import Button from "./Button"
import { getSiteSettings } from "../services/productService"
import { urlFor } from "../lib/image"

function Hero() {
  const [siteSettings, setSiteSettings] = useState(null)
  const [heroEyebrowIndex, setHeroEyebrowIndex] = useState(0)

  useEffect(() => {
    async function loadSiteSettings() {
      try {
        const data = await getSiteSettings()
        setSiteSettings(data)
      } catch (error) {
        console.error(
          "Failed to load site settings:",
          error
        )
      }
    }

    loadSiteSettings()
  }, [])

  const imageUrl = siteSettings?.heroImage
    ? urlFor(siteSettings.heroImage)
      .width(1200)
      .height(1200)
      .fit("crop")
      .auto("format")
      .url()
    : null

  const heroEyebrow =
    siteSettings?.heroEyebrow ||
    "Handcrafted with love"

  const heroEyebrowTexts = [
    heroEyebrow,
    "Stitched with care",
    "Made for your moments",
    "Created just for you",
  ]

  useEffect(() => {
    const eyebrowInterval = setInterval(() => {
      setHeroEyebrowIndex((currentIndex) => {
        return (
          (currentIndex + 1) %
          heroEyebrowTexts.length
        )
      })
    }, 2500)

    return () => clearInterval(eyebrowInterval)
  }, [heroEyebrowTexts.length])

  const heroTitle =
    siteSettings?.heroTitle ||
    "Turning Moments into Memories"

  const heroDescription =
    siteSettings?.heroDescription ||
    "Beautiful embroidery creations, made for life's most special occasions."

  return (
    <section className="relative overflow-hidden bg-[#f8f4ed]">

      {/* =====================================================
          ANIMATION STYLES
      ====================================================== */}
      <style>
        {`
          @keyframes heroFloat {
            0%,
            100% {
              transform: translateY(0px);
            }

            50% {
              transform: translateY(-8px);
            }
          }

          @keyframes heroGlow {
            0%,
            100% {
              opacity: 0.35;
              transform: scale(1);
            }

            50% {
              opacity: 0.7;
              transform: scale(1.08);
            }
          }

          @keyframes heroTextReveal {
            0% {
              opacity: 0;
              transform: translateY(12px);
            }

            100% {
              opacity: 1;
              transform: translateY(0);
            }
          }

          @keyframes heroEyebrowFade {
            0% {
              opacity: 0;
              transform: translateY(7px);
            }

            25%,
            75% {
              opacity: 1;
              transform: translateY(0);
            }

            100% {
              opacity: 0;
              transform: translateY(-7px);
            }
          }

          @keyframes heroBorderSpin {
            from {
              transform: rotate(0deg);
            }

            to {
              transform: rotate(360deg);
            }
          }

          @keyframes heroHowMadeSpin {
            from {
              transform: rotate(0deg);
            }

            to {
              transform: rotate(360deg);
            }
          }

          @keyframes heroImagePulse {
            0%,
            100% {
              transform: scale(1);
            }

            50% {
              transform: scale(1.015);
            }
          }

          .hero-text-reveal {
            animation: heroTextReveal 0.8s ease-out both;
          }

          .hero-text-delay-1 {
            animation-delay: 0.15s;
          }

          .hero-text-delay-2 {
            animation-delay: 0.3s;
          }

          .hero-text-delay-3 {
            animation-delay: 0.45s;
          }

          .hero-eyebrow-animation {
            animation: heroEyebrowFade 2.5s ease-in-out both;
          }

          .hero-float {
            animation: heroFloat 5s ease-in-out infinite;
          }

          .hero-glow {
            animation: heroGlow 4s ease-in-out infinite;
          }

          .hero-image-pulse {
            animation: heroImagePulse 6s ease-in-out infinite;
          }

          .hero-explore-border {
            animation: heroBorderSpin 4s linear infinite;
          }

          .hero-how-made-border {
            animation: heroHowMadeSpin 4s linear infinite;
          }

          @media (prefers-reduced-motion: reduce) {
            .hero-text-reveal,
            .hero-eyebrow-animation,
            .hero-float,
            .hero-glow,
            .hero-image-pulse,
            .hero-explore-border,
            .hero-how-made-border {
              animation: none !important;
            }
          }
        `}
      </style>


      {/* =====================================================
          HERO
      ====================================================== */}
      <div className="mx-auto max-w-7xl lg:grid lg:min-h-[calc(100vh-76px)] lg:grid-cols-2">


        {/* =====================================================
            LEFT — TEXT
        ====================================================== */}
        <div className="relative z-20 flex items-center px-5 py-14 sm:px-10 sm:py-16 lg:px-12 lg:py-20">

          <div className="w-full max-w-xl">

            {/* Eyebrow */}
            <div
              className="hero-text-reveal relative h-4 text-[10px] font-semibold uppercase tracking-[0.28em] text-[#b9684f] sm:h-5 sm:text-[11px]"
            >
              <span
                key={heroEyebrowIndex}
                className="hero-eyebrow-animation absolute left-0 top-0 whitespace-nowrap"
              >
                {heroEyebrowTexts[heroEyebrowIndex]}
              </span>
            </div>


            {/* =================================================
                MOBILE IMAGE
                It sits behind/next to the heading instead of
                creating a separate column.
            ================================================== */}
            <div className="pointer-events-none absolute right-[4px] top-[105px] z-0 w-[112px] aspect-square md:right-8 md:top-1/2 md:w-[220px] md:-translate-y-1/2 lg:hidden">

              {/* Glow */}
              <div className="hero-glow absolute left-1/2 top-1/2 h-[120%] w-[120%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#d9a395]/30 blur-2xl md:h-full md:w-full" />

              {/* Floating frame */}
              <div className="hero-float relative">

                {/* Outer frame */}
                <div className="relative aspect-square rounded-[3px] bg-[#e4d1bd] p-2 shadow-xl">

                  {/* Border */}
                  <div className="absolute inset-2 rounded-[2px] border border-[#b9827a]/40" />

                  {/* Image */}
                  <div className="relative h-full w-full overflow-hidden rounded-[2px] bg-[#f5eadc]">

                    {imageUrl ? (
                      <img
                        src={imageUrl}
                        alt={
                          siteSettings?.brandName ||
                          "Chirashree Creation"
                        }
                        className="hero-image-pulse h-full w-full object-cover"
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center bg-[#f5eadc]">
                        <div className="text-center">
                          <p className="font-serif text-lg italic text-[#4a3528]">
                            Chirashree
                          </p>

                          <p className="mt-1 text-[5px] font-medium uppercase tracking-[0.25em] text-[#b9684f]">
                            Creation
                          </p>
                        </div>
                      </div>
                    )}

                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-[#4a3528]/5 via-transparent to-white/15" />

                  </div>

                  {/* Corners */}
                  <div className="absolute left-1 top-1 h-5 w-5 border-l border-t border-[#b9684f]/40" />

                  <div className="absolute right-1 top-1 h-5 w-5 border-r border-t border-[#b9684f]/40" />

                  <div className="absolute bottom-1 left-1 h-5 w-5 border-b border-l border-[#b9684f]/40" />

                  <div className="absolute bottom-1 right-1 h-5 w-5 border-b border-r border-[#b9684f]/40" />

                </div>

                {/* Small label */}
                <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 rounded-full border border-white/60 bg-white/80 px-3 py-1.5 shadow-lg backdrop-blur-md">

                  <p className="whitespace-nowrap text-[5px] font-semibold uppercase tracking-[0.16em] text-[#4a3528]">
                    Made with love
                  </p>

                </div>

              </div>
            </div>


            {/* =================================================
                HEADING
            ================================================== */}
            <h1
              className="hero-text-reveal hero-text-delay-1 relative z-10 mt-5 max-w-[82%] font-serif text-[43px] leading-[0.94] tracking-[-0.025em] text-[#4a3528] sm:max-w-xl sm:text-6xl lg:max-w-xl lg:text-[72px]"
            >
              {heroTitle.includes(" into ") ? (
                <>
                  {heroTitle.split(" into ")[0]}
                  <br />

                  <span className="italic text-[#a85f4e]">
                    into{" "}
                    {heroTitle.split(" into ")[1]}
                  </span>
                </>
              ) : (
                heroTitle
              )}
            </h1>


            {/* Description */}
            <p
              className="hero-text-reveal hero-text-delay-2 relative z-10 mt-7 max-w-[88%] text-[14px] leading-6 text-[#765c4a] sm:max-w-md sm:text-lg sm:leading-7"
            >
              {heroDescription}
            </p>


            {/* =================================================
                BUTTONS
                ALWAYS HORIZONTAL
            ================================================== */}
            <div className="hero-text-reveal hero-text-delay-3 relative z-10 mt-8 flex flex-nowrap items-center gap-2 sm:gap-4">

              {/* Explore */}
              <div className="relative inline-flex shrink-0 overflow-hidden rounded-full p-[2px]">

                <span className="hero-explore-border absolute inset-[-200%] bg-[conic-gradient(from_0deg,#ffffff,#d9a395,#ffffff,#c79b73,#ffffff)]" />

                <span className="absolute inset-0 rounded-full bg-white/70 blur-md" />

                <Button
                  to="/shop"
                  className="relative !rounded-full !border !border-white/70 !bg-white/60 !px-4 !py-3 !text-[11px] !text-[#4a3528] !shadow-[0_8px_30px_rgba(255,255,255,0.35)] !backdrop-blur-xl transition-all duration-300 hover:!bg-white/80 sm:!px-7 sm:!py-3.5 sm:!text-sm"
                >
                  Explore Collection
                </Button>

              </div>


              {/* How it's made */}
              <a
                href="#how-it-works"
                className="group relative inline-flex shrink-0 overflow-hidden rounded-full p-[2px]"
              >

                <span className="hero-how-made-border absolute inset-[-200%] bg-[conic-gradient(from_0deg,#b9684f,#e6a391,#d8b46a,#8fb8a5,#9b8fc4,#b9684f)]" />

                <span className="absolute inset-0 rounded-full bg-gradient-to-r from-[#b9684f]/40 via-[#d8b46a]/40 to-[#8fb8a5]/40 blur-md transition duration-500 group-hover:blur-lg" />

                <span className="relative inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#b9684f] via-[#b9827a] to-[#8fae9d] px-3.5 py-3 text-[11px] font-medium text-white shadow-[0_8px_25px_rgba(168,95,78,0.25)] backdrop-blur-xl transition-all duration-300 group-hover:scale-[1.02] sm:gap-3 sm:px-5 sm:py-3.5 sm:text-sm">

                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-white/40 bg-white/20 shadow-inner backdrop-blur-md sm:h-8 sm:w-8">

                    <span className="ml-0.5 text-[9px]">
                      ▶
                    </span>

                  </span>

                  <span className="whitespace-nowrap tracking-wide">
                    How it's made
                  </span>

                  <ArrowUpRight
                    size={14}
                    strokeWidth={1.7}
                    className="shrink-0 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  />

                </span>

              </a>

            </div>


            {/* Supporting text */}
            <div className="relative z-10 mt-6 flex items-center gap-2 text-[8px] uppercase tracking-[0.16em] text-[#a58e7c] sm:text-[10px]">

              <span className="h-1.5 w-1.5 shrink-0 animate-pulse rounded-full bg-[#b9684f]" />

              <span>
                Crafted by hand · Made with love
              </span>

            </div>

          </div>
        </div>


        {/* =====================================================
            DESKTOP — SANITY HERO IMAGE
            Hidden on mobile because the mobile version above
            is integrated into the text composition.
        ====================================================== */}
        <div className="relative hidden min-w-0 items-center justify-center overflow-hidden lg:flex lg:min-h-full lg:px-12 lg:py-16">

          {/* Background */}
          <div className="absolute left-1/2 top-1/2 aspect-square w-[90%] -translate-x-1/2 -translate-y-1/2 rounded-[4px] bg-[#ead9c8] xl:inset-0 xl:top-0 xl:left-0 xl:h-full xl:w-full xl:translate-x-0 xl:translate-y-0 xl:aspect-auto xl:rounded-none" />

          {/* Soft animated glow */}
          <div className="hero-glow absolute left-1/2 top-1/2 h-[70%] w-[70%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#d9a395]/30 blur-3xl" />

          {/* Decorative floating circles */}
          <div className="hero-float absolute left-[10%] top-[16%] h-5 w-5 rounded-full bg-[#b9827a]/50" />

          <div className="absolute right-[12%] top-[22%] h-8 w-8 rounded-full border-2 border-[#b9684f]/40" />

          <div className="absolute bottom-[17%] left-[13%] h-7 w-7 rounded-full border-2 border-[#b9827a]/40" />

          <div className="absolute bottom-[12%] right-[15%] h-4 w-4 rounded-full bg-[#c79b73]/50" />


          {/* Desktop image */}
          <div className="hero-float relative z-10 w-full max-w-[450px]">

            <div className="relative aspect-square rounded-[4px] bg-[#e4d1bd] p-6 shadow-2xl">

              <div className="absolute inset-4 rounded-[3px] border border-[#b9827a]/40" />

              <div className="relative h-full w-full overflow-hidden rounded-[2px] bg-[#f5eadc]">

                {imageUrl ? (
                  <img
                    src={imageUrl}
                    alt={
                      siteSettings?.brandName ||
                      "Chirashree Creation"
                    }
                    className="hero-image-pulse h-full w-full object-cover"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center bg-[#f5eadc]">
                    <div className="text-center">
                      <p className="font-serif text-3xl italic text-[#4a3528]">
                        Chirashree
                      </p>

                      <p className="mt-1 text-[9px] font-medium uppercase tracking-[0.3em] text-[#b9684f]">
                        Creation
                      </p>
                    </div>
                  </div>
                )}

                <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-[#4a3528]/5 via-transparent to-white/15" />

              </div>


              {/* Corners */}
              <div className="absolute left-1 top-1 h-8 w-8 border-l border-t border-[#b9684f]/40" />

              <div className="absolute right-1 top-1 h-8 w-8 border-r border-t border-[#b9684f]/40" />

              <div className="absolute bottom-1 left-1 h-8 w-8 border-b border-l border-[#b9684f]/40" />

              <div className="absolute bottom-1 right-1 h-8 w-8 border-b border-r border-[#b9684f]/40" />

            </div>


            {/* Desktop label */}
            <div className="absolute -bottom-5 left-1/2 -translate-x-1/2 rounded-full border border-white/60 bg-white/75 px-5 py-2.5 shadow-xl backdrop-blur-md">

              <p className="whitespace-nowrap text-[9px] font-semibold uppercase tracking-[0.18em] text-[#4a3528]">
                Made with love
              </p>

            </div>

          </div>

        </div>

      </div>
    </section>
  )
}

export default Hero