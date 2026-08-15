import { ArrowLeft, ArrowUpRight } from "lucide-react"
import { Link } from "react-router-dom"

function NotFound() {
  return (
    <div className="flex min-h-[75vh] items-center justify-center bg-[#f8f4ed] px-6 py-20 sm:px-8 lg:px-10">

      <div className="mx-auto w-full max-w-3xl text-center">

        {/* 404 */}
        <div className="relative mx-auto w-fit">

          <p className="font-serif text-[8rem] leading-none tracking-[-0.08em] text-[#e5dcd0] sm:text-[11rem]">
            404
          </p>

          {/* Decorative stitch */}
          <div className="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 items-center gap-3">
            <span className="h-px w-8 bg-[#b9827a] sm:w-12" />

            <span className="text-sm text-[#a85f4e]">
              ✦
            </span>

            <span className="h-px w-8 bg-[#b9827a] sm:w-12" />
          </div>

        </div>


        {/* Eyebrow */}
        <p className="mt-2 text-[10px] font-semibold uppercase tracking-[0.3em] text-[#b9684f]">
          A little detour
        </p>


        {/* Heading */}
        <h1 className="mx-auto mt-4 max-w-2xl font-serif text-4xl leading-tight text-[#4a3528] sm:text-5xl lg:text-6xl">
          Oops, this stitch
          <span className="italic text-[#a85f4e]">
            {" "}came loose.
          </span>
        </h1>


        {/* Description */}
        <p className="mx-auto mt-5 max-w-lg text-sm leading-7 text-[#765c4a] sm:text-base">
          The page you're looking for doesn't seem to be
          here. Perhaps it wandered off while we were
          stitching something beautiful.
        </p>


        {/* Actions */}
        <div className="mt-8 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center">

          <Link
            to="/"
            className="inline-flex items-center justify-center gap-2 rounded-full bg-[#4a3528] px-6 py-3.5 text-sm font-medium text-white transition duration-300 hover:-translate-y-0.5 hover:bg-[#36251d]"
          >
            <ArrowLeft
              size={16}
              strokeWidth={1.7}
            />

            Back Home
          </Link>

          <Link
            to="/shop"
            className="inline-flex items-center justify-center gap-2 rounded-full border border-[#cdb8a7] bg-[#fcfaf6] px-6 py-3.5 text-sm font-medium text-[#4a3528] transition duration-300 hover:-translate-y-0.5 hover:border-[#a85f4e] hover:text-[#a85f4e]"
          >
            Explore Collection

            <ArrowUpRight
              size={16}
              strokeWidth={1.7}
            />
          </Link>

        </div>


        {/* Bottom decorative message */}
        <div className="mx-auto mt-12 flex max-w-xs items-center justify-center gap-3">
          <span className="h-px flex-1 bg-[#e5dcd0]" />

          <span className="whitespace-nowrap text-[9px] font-medium uppercase tracking-[0.2em] text-[#9a8575]">
            Every stitch tells a story
          </span>

          <span className="h-px flex-1 bg-[#e5dcd0]" />
        </div>

      </div>

    </div>
  )
}

export default NotFound