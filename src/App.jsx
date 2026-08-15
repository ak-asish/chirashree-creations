import { BrowserRouter, Route, Routes } from "react-router-dom"

import MainLayout from "./layouts/MainLayout"

import Home from "./pages/Home"
import Shop from "./pages/Shop"
import ProductDetails from "./pages/ProductDetails"
import About from "./pages/About"
import Contact from "./pages/Contact"
import Customized from "./pages/Customized"
import Category from "./pages/Category"
import Favorites from "./pages/Favorites"
import NotFound from "./pages/NotFound"

import ScrollToTop from "./components/ScrollToTop"

import { useCallback, useState } from "react"
import SplashScreen from "./components/SplashScreen"

function App() {

  const [showSplash, setShowSplash] = useState(true)

  const handleSplashFinish = useCallback(() => {
    setShowSplash(false)
  }, [])

  return (

    <>
      {showSplash && (
        <SplashScreen onFinish={handleSplashFinish} />
      )}

      <BrowserRouter>

        <ScrollToTop />

        <Routes>

          <Route element={<MainLayout />}>

            <Route path="/" element={<Home />} />

            <Route path="/shop" element={<Shop />} />

            <Route
              path="/product/:slug"
              element={<ProductDetails />}
            />

            <Route path="/about" element={<About />} />

            <Route path="/contact" element={<Contact />} />

            <Route path="/customized" element={<Customized />} />

            <Route path="/category/:slug" element={<Category />} />

            <Route path="/favorites" element={<Favorites />} />

            {/* 404 - must be the last route */}
            <Route path="*" element={<NotFound />} />

          </Route>

        </Routes>

      </BrowserRouter>
    </>

  )
}

export default App