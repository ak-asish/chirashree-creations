import { sanityClient } from "../lib/sanity"

const productFields = `
  _id,
  name,
  slug,
  price,
  productType,
  shortDescription,
  mainImage,
  category->{
    _id,
    name,
    slug
  }
`

export async function getFeaturedProducts() {
  const query = `
    *[
      _type == "product"
      && published == true
      && featured == true
    ]
    | order(_createdAt desc)
    {
      ${productFields}
    }
  `

  return sanityClient.fetch(query)
}

export async function getAllProducts() {
  const query = `
    *[
      _type == "product"
      && published == true
    ]
    | order(_createdAt desc)
    {
      ${productFields}
    }
  `

  return sanityClient.fetch(query)
}

export async function getCategories() {
  const query = `
    *[
      _type == "category"
    ]
    | order(name asc)
    {
      _id,
      name,
      slug,
      description,
      image,
      featured
    }
  `

  return sanityClient.fetch(query)
}

export async function getProductBySlug(slug) {
  const query = `
    *[
      _type == "product"
      && published == true
      && slug.current == $slug
    ][0]
    {
      _id,
      name,
      slug,
      price,
      productType,
      shortDescription,
      description,
      mainImage,
      gallery,
      isCustomizable,
      customizationDetails,
      materials,
      dimensions,
      processingTime,
      category->{
        _id,
        name,
        slug
      }
    }
  `

  return sanityClient.fetch(query, { slug })
}

export async function getRelatedProducts(productId, categoryId) {
  const query = `
    *[
      _type == "product"
      && published == true
      && _id != $productId
      && defined(slug.current)
    ]
    | order(_createdAt desc)
    {
      ${productFields}
    }
  `

  const products = await sanityClient.fetch(query, {
    productId,
  })

  // Prefer products from the same category.
  const sameCategory = categoryId
    ? products.filter(
        (product) =>
          product.category?._id === categoryId
      )
    : []

  // Then use other products to fill the remaining slots.
  const otherProducts = products.filter(
    (product) =>
      !categoryId ||
      product.category?._id !== categoryId
  )

  return [
    ...sameCategory,
    ...otherProducts,
  ].slice(0, 4)
}

export async function getCategoryBySlug(slug) {
  const query = `
    *[
      _type == "category"
      && slug.current == $slug
    ][0]
    {
      _id,
      name,
      slug,
      description,
      image
    }
  `

  return sanityClient.fetch(query, { slug })
}

export async function getProductsByCategory(slug) {
  const query = `
    *[
      _type == "product"
      && published == true
      && category->slug.current == $slug
    ]
    | order(_createdAt desc)
    {
      _id,
      name,
      slug,
      price,
      productType,
      shortDescription,
      mainImage,
      category->{
        _id,
        name,
        slug
      }
    }
  `

  return sanityClient.fetch(query, { slug })
}

export async function getFeaturedCustomizedProducts() {
  const query = `
    *[
      _type == "product"
      && published == true
      && featured == true
      && productType == "customized"
    ]
    | order(_createdAt desc)[0...6]
    {
      _id,
      name,
      slug,
      price,
      shortDescription,
      mainImage,
      category->{
        _id,
        name,
        slug
      }
    }
  `

  return sanityClient.fetch(query)
}

export async function getSiteSettings() {
  const query = `
    *[
      _type == "siteSettings"
    ][0]
    {
      _id,
      brandName,
      heroImage,
      heroEyebrow,
      heroTitle,
      heroDescription,
      instagramUsername,
      email
    }
  `

  return sanityClient.fetch(query)
}