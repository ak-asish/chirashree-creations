import { useEffect, useState } from "react"

function CustomCursor() {
  const [position, setPosition] = useState({
    x: 0,
    y: 0,
  })

  const [isVisible, setIsVisible] = useState(false)
  const [isHovering, setIsHovering] = useState(false)

  useEffect(() => {
    // Don't activate custom cursor on touch devices
    if (window.matchMedia("(pointer: coarse)").matches) {
      return
    }

    const handleMouseMove = (event) => {
      setPosition({
        x: event.clientX,
        y: event.clientY,
      })

      setIsVisible(true)

      const target = event.target

      const clickable = target.closest(
        "a, button, input, textarea, select, [role='button']"
      )

      setIsHovering(Boolean(clickable))
    }

    const handleMouseLeave = () => {
      setIsVisible(false)
    }

    const handleMouseEnter = () => {
      setIsVisible(true)
    }

    window.addEventListener("mousemove", handleMouseMove)
    document.addEventListener("mouseleave", handleMouseLeave)
    document.addEventListener("mouseenter", handleMouseEnter)

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
      document.removeEventListener("mouseleave", handleMouseLeave)
      document.removeEventListener("mouseenter", handleMouseEnter)
    }
  }, [])

  if (!isVisible) {
    return null
  }

  return (
    <>
      {/* Outer ring */}
      <div
        className={`pointer-events-none fixed left-0 top-0 z-[9999] rounded-full border border-[#a85f4e] transition-all duration-200 ease-out ${
          isHovering
            ? "h-10 w-10 -translate-x-1/2 -translate-y-1/2 bg-[#a85f4e]/10"
            : "h-7 w-7 -translate-x-1/2 -translate-y-1/2"
        }`}
        style={{
          left: position.x,
          top: position.y,
        }}
      />

      {/* Center dot */}
      <div
        className={`pointer-events-none fixed left-0 top-0 z-[10000] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#4a3528] transition-all duration-200 ${
          isHovering
            ? "h-1.5 w-1.5"
            : "h-2 w-2"
        }`}
        style={{
          left: position.x,
          top: position.y,
        }}
      />
    </>
  )
}

export default CustomCursor