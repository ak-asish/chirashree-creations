import { useEffect } from "react"

const SITE_URL = "https://chirashree.netlify.app"

function SEO({
  title,
  description,
  path = "/",
  noIndex = false,
}) {
  useEffect(() => {
    const url = `${SITE_URL}${path}`

    document.title = title

    // Description
    let descriptionTag = document.querySelector(
      'meta[name="description"]'
    )

    if (!descriptionTag) {
      descriptionTag = document.createElement("meta")
      descriptionTag.setAttribute("name", "description")
      document.head.appendChild(descriptionTag)
    }

    descriptionTag.setAttribute("content", description)

    // Robots
    let robotsTag = document.querySelector(
      'meta[name="robots"]'
    )

    if (!robotsTag) {
      robotsTag = document.createElement("meta")
      robotsTag.setAttribute("name", "robots")
      document.head.appendChild(robotsTag)
    }

    robotsTag.setAttribute(
      "content",
      noIndex ? "noindex, nofollow" : "index, follow"
    )

    // Canonical
    let canonical = document.querySelector(
      'link[rel="canonical"]'
    )

    if (!canonical) {
      canonical = document.createElement("link")
      canonical.setAttribute("rel", "canonical")
      document.head.appendChild(canonical)
    }

    canonical.setAttribute("href", url)

    // Open Graph title
    setMetaProperty("og:title", title)

    // Open Graph description
    setMetaProperty("og:description", description)

    // Open Graph URL
    setMetaProperty("og:url", url)

    // Twitter title
    setMetaName("twitter:title", title)

    // Twitter description
    setMetaName("twitter:description", description)
  }, [title, description, path, noIndex])

  return null
}

function setMetaProperty(property, content) {
  let tag = document.querySelector(
    `meta[property="${property}"]`
  )

  if (!tag) {
    tag = document.createElement("meta")
    tag.setAttribute("property", property)
    document.head.appendChild(tag)
  }

  tag.setAttribute("content", content)
}

function setMetaName(name, content) {
  let tag = document.querySelector(
    `meta[name="${name}"]`
  )

  if (!tag) {
    tag = document.createElement("meta")
    tag.setAttribute("name", name)
    document.head.appendChild(tag)
  }

  tag.setAttribute("content", content)
}

export default SEO