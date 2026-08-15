import Hero from "../components/Hero"
import FeatureStrip from "../components/FeatureStrip"
import CollectionGrid from "../components/CollectionGrid"
import FeaturedProducts from "../components/FeaturedProducts"
import CustomizedSection from "../components/CustomizedSection"
import HowItWorks from "../components/HowItWorks"
import InstagramCTA from "../components/InstagramCTA"

function Home() {
  return (
    <div>
      <Hero />

      <FeatureStrip />

      <CollectionGrid />

      <FeaturedProducts />

      <CustomizedSection />

      <HowItWorks />

      <InstagramCTA />
    </div>
  )
}

export default Home