import {defineField, defineType} from 'sanity'

export const productType = defineType({
  name: 'product',
  title: 'Product',
  type: 'document',

  fields: [
    defineField({
      name: 'name',
      title: 'Product Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'slug',
      title: 'URL Slug',
      type: 'slug',
      options: {
        source: 'name',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'category',
      title: 'Category',
      type: 'reference',
      to: [{type: 'category'}],
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'productType',
      title: 'Product Type',
      type: 'string',
      options: {
        list: [
          {title: 'Ready-made', value: 'readyMade'},
          {title: 'Customized', value: 'customized'},
        ],
        layout: 'radio',
      },
      initialValue: 'readyMade',
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'price',
      title: 'Price',
      type: 'number',
      validation: (Rule) =>
        Rule.required().min(0),
    }),

    defineField({
      name: 'shortDescription',
      title: 'Short Description',
      type: 'string',
      validation: (Rule) =>
        Rule.required().max(160),
    }),

    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 6,
    }),

    defineField({
      name: 'mainImage',
      title: 'Main Product Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'gallery',
      title: 'Product Gallery',
      type: 'array',
      of: [
        {
          type: 'image',
          options: {
            hotspot: true,
          },
        },
      ],
    }),

    defineField({
      name: 'isCustomizable',
      title: 'This product can be customized',
      type: 'boolean',
      initialValue: false,
    }),

    defineField({
      name: 'customizationDetails',
      title: 'Customization Details',
      type: 'text',
      rows: 5,
      description:
        'Tell customers what can be personalized, such as names, dates, colors, etc.',
      hidden: ({parent}) => !parent?.isCustomizable,
    }),

    defineField({
      name: 'materials',
      title: 'Materials',
      type: 'string',
    }),

    defineField({
      name: 'dimensions',
      title: 'Dimensions',
      type: 'string',
    }),

    defineField({
      name: 'processingTime',
      title: 'Processing Time',
      type: 'string',
      description:
        'Example: 5–7 working days',
    }),

    defineField({
      name: 'featured',
      title: 'Featured Product',
      type: 'boolean',
      initialValue: false,
    }),

    defineField({
      name: 'published',
      title: 'Visible on Website',
      type: 'boolean',
      initialValue: true,
    }),
  ],

  preview: {
    select: {
      title: 'name',
      media: 'mainImage',
      price: 'price',
      productType: 'productType',
    },

    prepare({title, media, price, productType}) {
      return {
        title,
        subtitle: `₹${price ?? 0} • ${
          productType === 'customized'
            ? 'Customized'
            : 'Ready-made'
        }`,
        media,
      }
    },
  },
})