import { Outlet } from "react-router-dom"

import Navbar from "../components/Navbar"
import Footer from "../components/Footer"
import CustomCursor from "../components/CustomCursor"

function MainLayout() {
  return (
    <div className="min-h-screen bg-[#f8f4ed]">
      
      <CustomCursor />

      <Navbar />

      <main>
        <Outlet />
      </main>

      <Footer />
    </div>
  )
}

export default MainLayout