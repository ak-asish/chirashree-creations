import "dotenv/config"

import { createClient } from "@sanity/client"
import { writeFile } from "node:fs/promises"
import path from "node:path"
import { fileURLToPath } from "node:url"

const SITE_URL = "https://chirashree.netlify.app"

const projectId = process.env.VITE_SANITY_PROJECT_ID
const dataset = process.env.VITE_SANITY_DATASET

if (!projectId || !dataset) {
  throw new Error(
    "Missing VITE_SANITY_PROJECT_ID or VITE_SANITY_DATASET"
  )
}

const sanityClient = createClient({
  projectId,
  dataset,
  apiVersion: "2026-08-13",
  useCdn: true,
})

const staticPages = [
  "/",
  "/shop",
  "/customized",
  "/about",
  "/contact",
]

const products = await sanityClient.fetch(`
  *[
    _type == "product" &&
    published == true &&
    defined(slug.current)
  ]{
    "slug": slug.current
  }
`)

const categories = await sanityClient.fetch(`
  *[
    _type == "category" &&
    defined(slug.current)
  ]{
    "slug": slug.current
  }
`)

const urls = [
  ...staticPages,
  ...categories.map(
    (category) => `/category/${category.slug}`
  ),
  ...products.map(
    (product) => `/product/${product.slug}`
  ),
]

const uniqueUrls = [...new Set(urls)]

const escapeXml = (value) =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;")

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset
  xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
>
${uniqueUrls
  .map(
    (url) => `  <url>
    <loc>${escapeXml(`${SITE_URL}${url}`)}</loc>
  </url>`
  )
  .join("\n")}
</urlset>
`

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const outputPath = path.join(
  __dirname,
  "..",
  "public",
  "sitemap.xml"
)

await writeFile(outputPath, sitemap, "utf8")

console.log(
  `✓ Sitemap generated with ${uniqueUrls.length} URLs`
)