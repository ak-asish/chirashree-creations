import { useEffect, useState } from "react"

const STORAGE_KEY = "chirashree_favorites"

function getStoredFavorites() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)

    return stored ? JSON.parse(stored) : []
  } catch {
    return []
  }
}

export function useFavorites() {
  const [favorites, setFavorites] = useState(getStoredFavorites)

  useEffect(() => {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(favorites)
    )
  }, [favorites])

  const isFavorite = (productId) => {
    return favorites.includes(productId)
  }

  const toggleFavorite = (productId) => {
    setFavorites((current) => {
      if (current.includes(productId)) {
        return current.filter((id) => id !== productId)
      }

      return [...current, productId]
    })
  }

  const clearFavorites = () => {
    setFavorites([])
  }

  return {
    favorites,
    isFavorite,
    toggleFavorite,
    clearFavorites,
  }
}