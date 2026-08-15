import { MessageCircle, Palette, PackageCheck } from "lucide-react"

const steps = [
  {
    number: "01",
    icon: MessageCircle,
    title: "Choose your creation",
    description:
      "Browse our collection and find something that speaks to you.",
  },
  {
    number: "02",
    icon: Palette,
    title: "Make it personal",
    description:
      "For customized pieces, tell us your names, dates, colors or ideas.",
  },
  {
    number: "03",
    icon: PackageCheck,
    title: "We handcraft it",
    description:
      "Your piece is carefully embroidered and prepared with love.",
  },
]

function HowItWorks() {
  return (
    <section
      id="how-it-works"
      className="bg-[#f8f4ed] px-6 py-20 sm:px-8 lg:px-10 lg:py-28"
    >
      <div className="mx-auto max-w-7xl">

        <div className="mx-auto max-w-2xl text-center">
          <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-[#b9684f]">
            Simple & personal
          </p>

          <h2 className="mt-3 font-serif text-4xl leading-none text-[#4a3528] sm:text-5xl">
            How It Works
          </h2>

          <p className="mt-4 text-sm leading-6 text-[#765c4a] sm:text-base">
            From choosing your piece to making it uniquely yours,
            we keep the process simple.
          </p>
        </div>

        <div className="mt-14 grid gap-8 md:grid-cols-3 md:gap-6">
          {steps.map((step) => {
            const Icon = step.icon

            return (
              <div
                key={step.number}
                className="relative border-t border-[#d8cbbd] pt-7"
              >
                <div className="flex items-start justify-between">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#efe7da] text-[#a85f4e]">
                    <Icon size={21} strokeWidth={1.5} />
                  </div>

                  <span className="font-serif text-3xl text-[#d8cbbd]">
                    {step.number}
                  </span>
                </div>

                <h3 className="mt-6 font-serif text-2xl text-[#4a3528]">
                  {step.title}
                </h3>

                <p className="mt-2 max-w-sm text-sm leading-6 text-[#765c4a]">
                  {step.description}
                </p>
              </div>
            )
          })}
        </div>

      </div>
    </section>
  )
}

export default HowItWorks