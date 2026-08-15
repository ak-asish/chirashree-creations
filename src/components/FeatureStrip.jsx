import { Heart, Palette, Leaf, Gift } from "lucide-react"

const features = [
  {
    icon: Heart,
    title: "Handmade",
    description: "Every piece is carefully crafted with love.",
  },
  {
    icon: Palette,
    title: "Customized",
    description: "Personalized designs made just for you.",
  },
  {
    icon: Leaf,
    title: "Premium Quality",
    description: "Quality materials for lasting memories.",
  },
  {
    icon: Gift,
    title: "Perfect Gifting",
    description: "Thoughtful gifts for every occasion.",
  },
]

function FeatureStrip() {
  return (
    <section className="border-y border-[#e5dcd0] bg-[#fcfaf6]">
      <div className="mx-auto grid max-w-7xl grid-cols-1 divide-y divide-[#e5dcd0] px-6 sm:grid-cols-2 sm:px-8 md:grid-cols-4 md:divide-x md:divide-y-0 lg:px-10">
        {features.map((feature) => {
          const Icon = feature.icon

          return (
            <div
              key={feature.title}
              className="flex items-center gap-4 px-4 py-6 sm:px-6 md:py-7"
            >
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#efe7da] text-[#a85f4e]">
                <Icon size={20} strokeWidth={1.5} />
              </div>

              <div>
                <h3 className="font-serif text-lg font-semibold text-[#4a3528]">
                  {feature.title}
                </h3>

                <p className="mt-0.5 text-[11px] leading-4 text-[#765c4a]">
                  {feature.description}
                </p>
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}

export default FeatureStrip