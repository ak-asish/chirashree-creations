import { useEffect, useState } from "react"
import { getSiteSettings } from "../services/productService"

let cachedSettings = null
let settingsPromise = null

export function useSiteSettings() {
  const [settings, setSettings] = useState(cachedSettings)
  const [loading, setLoading] = useState(!cachedSettings)

  useEffect(() => {
    if (cachedSettings) {
      setSettings(cachedSettings)
      setLoading(false)
      return
    }

    if (!settingsPromise) {
      settingsPromise = getSiteSettings()
    }

    settingsPromise
      .then((data) => {
        cachedSettings = data
        setSettings(data)
      })
      .catch((error) => {
        console.error("Failed to load site settings:", error)
      })
      .finally(() => {
        setLoading(false)
      })
  }, [])

  return {
    settings,
    loading,
  }
}