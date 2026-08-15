import { useEffect, useState } from "react"

function SplashScreen({ onFinish }) {
  const [visible, setVisible] = useState(true)
  const [showTagline, setShowTagline] = useState(false)

  useEffect(() => {
    const taglineTimer = setTimeout(() => {
      setShowTagline(true)
    }, 700)

    const finishTimer = setTimeout(() => {
      setVisible(false)

      setTimeout(() => {
        onFinish()
      }, 600)
    }, 2100)

    return () => {
      clearTimeout(taglineTimer)
      clearTimeout(finishTimer)
    }
  }, [onFinish])

  if (!visible) {
    return null
  }

  return (
    <div
      className="
        fixed
        inset-0
        z-[9999]
        flex
        items-center
        justify-center
        overflow-hidden
        bg-[#f8f4ed]
        transition-opacity
        duration-700
      "
    >

      {/* Soft decorative circles */}
      <div className="absolute left-[12%] top-[18%] h-20 w-20 rounded-full border border-[#c99d82]/20 animate-[float_4s_ease-in-out_infinite]" />

      <div className="absolute bottom-[18%] right-[12%] h-28 w-28 rounded-full border border-[#b9827a]/20 animate-[float_5s_ease-in-out_infinite_reverse]" />

      {/* Main content */}
      <div className="relative text-center">

        {/* Small eyebrow */}
        <p
          className="
            text-[9px]
            font-semibold
            uppercase
            tracking-[0.38em]
            text-[#b9684f]
            animate-[fadeUp_700ms_ease-out_both]
          "
        >
          Handmade with love
        </p>


        {/* Brand name */}
        <h1
          className="
            mt-5
            font-serif
            text-5xl
            italic
            leading-none
            tracking-[-0.035em]
            text-[#4a3528]
            animate-[brandReveal_1000ms_ease-out_both]
            sm:text-6xl
            md:text-7xl
          "
        >
          Chirashree
        </h1>


        {/* Brand subtitle */}
        <div
          className="
            mt-4
            flex
            items-center
            justify-center
            gap-3
            animate-[fadeUp_900ms_300ms_ease-out_both]
          "
        >
          <span className="h-px w-8 bg-[#b9827a]/60 sm:w-12" />

          <span className="text-[10px] font-medium uppercase tracking-[0.35em] text-[#765c4a]">
            Creations
          </span>

          <span className="h-px w-8 bg-[#b9827a]/60 sm:w-12" />
        </div>


        {/* Decorative star */}
        <div
          className="
            mx-auto
            mt-7
            text-sm
            text-[#a85f4e]
            animate-[sparkle_1200ms_500ms_ease-out_both]
          "
        >
          ✦
        </div>


        {/* Tagline */}
        <div
          className={`mt-5 transition-all duration-700 ${
            showTagline
              ? "translate-y-0 opacity-100"
              : "translate-y-3 opacity-0"
          }`}
        >
          <p className="text-[9px] uppercase tracking-[0.28em] text-[#9a8575]">
            Every stitch tells a story
          </p>
        </div>

      </div>


      {/* Bottom loading line */}
      <div className="absolute bottom-10 left-1/2 w-24 -translate-x-1/2 overflow-hidden">

        <div className="h-px w-full bg-[#e2d2c4]" />

        <div
          className="
            absolute
            left-0
            top-0
            h-px
            w-full
            origin-left
            bg-[#a85f4e]
            animate-[loadingLine_1800ms_ease-in-out_forwards]
          "
        />

      </div>

    </div>
  )
}

export default SplashScreen