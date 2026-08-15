import { defineField, defineType } from "sanity"

export const siteSettingsType = defineType({
  name: "siteSettings",
  title: "Site Settings",
  type: "document",

  fields: [
    defineField({
      name: "brandName",
      title: "Brand Name",
      type: "string",
      initialValue: "Chirashree Creation",
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "heroImage",
      title: "Homepage Hero Image",
      type: "image",
      options: {
        hotspot: true,
      },
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "heroEyebrow",
      title: "Hero Eyebrow",
      type: "string",
      initialValue: "Handcrafted with love",
    }),

    defineField({
      name: "heroTitle",
      title: "Hero Title",
      type: "string",
      initialValue: "Turning Moments into Memories",
    }),

    defineField({
      name: "heroDescription",
      title: "Hero Description",
      type: "text",
      rows: 3,
      initialValue:
        "Beautiful embroidery creations, made for life's most special occasions.",
    }),

    defineField({
      name: "instagramUsername",
      title: "Instagram Username",
      type: "string",
      description:
        "Enter only the username, without @ or https://instagram.com/",
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "email",
      title: "Business Email",
      type: "email",
      validation: (Rule) => Rule.required(),
    }),
  ],

  preview: {
    select: {
      title: "brandName",
      media: "heroImage",
    },
  },
})