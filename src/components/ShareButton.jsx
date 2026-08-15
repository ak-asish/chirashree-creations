import { Check, Share2 } from "lucide-react"
import { useState } from "react"

function ShareButton({ product }) {
  const [copied, setCopied] = useState(false)

  async function handleShare() {
    const url = window.location.href

    const shareData = {
      title: product.name,
      text: `Check out ${product.name} from Chirashree Creation — ₹${product.price?.toLocaleString("en-IN")}.`,
      url,
    }

    try {
      if (navigator.share) {
        await navigator.share(shareData)
        return
      }

      await navigator.clipboard.writeText(url)

      setCopied(true)

      setTimeout(() => {
        setCopied(false)
      }, 2000)
    } catch (error) {
      // User cancelling the native share dialog is not an error
      if (error?.name === "AbortError") {
        return
      }

      try {
        await navigator.clipboard.writeText(url)

        setCopied(true)

        setTimeout(() => {
          setCopied(false)
        }, 2000)
      } catch {
        console.error("Unable to share product:", error)
      }
    }
  }

  return (
    <button
      type="button"
      onClick={handleShare}
      className="inline-flex items-center gap-2 rounded-full border border-[#d8cbbd] px-5 py-3 text-sm font-medium text-[#4a3528] transition hover:border-[#a85f4e] hover:text-[#a85f4e]"
    >
      {copied ? (
        <>
          <Check size={16} strokeWidth={1.7} />
          Link Copied
        </>
      ) : (
        <>
          <Share2 size={16} strokeWidth={1.7} />
          Share
        </>
      )}
    </button>
  )
}

export default ShareButton