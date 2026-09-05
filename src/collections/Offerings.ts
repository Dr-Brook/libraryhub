import type { CollectionConfig, CollectionBeforeValidateHook } from 'payload'

const slugifyTitle: CollectionBeforeValidateHook = ({ data }) => {
  if (data?.title && !data?.slug) {
    data.slug = String(data.title)
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '')
  }
  return data
}

export const Offerings: CollectionConfig = {
  slug: 'offerings',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'library', 'category'],
    description: 'Unique programs and services offered by libraries',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      label: 'Offering Title',
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      admin: {
        readOnly: true,
        description: 'Auto-generated from title',
      },
    },
    {
      name: 'library',
      type: 'relationship',
      relationTo: 'libraries',
      required: true,
      label: 'Library',
      admin: {
        description: 'Which library system offers this program',
      },
    },
    {
      name: 'category',
      type: 'select',
      required: true,
      label: 'Category',
      options: [
        { label: 'Maker & Tech Spaces', value: 'maker-tech-spaces' },
        { label: 'Library of Things', value: 'library-of-things' },
        { label: 'Digital Streaming', value: 'digital-streaming' },
        { label: 'Career & Business', value: 'career-business' },
        { label: 'Government Services', value: 'government-services' },
        { label: 'Creative Maker', value: 'creative-maker' },
        { label: 'Historical Research', value: 'historical-research' },
        { label: 'Mobile Outreach', value: 'mobile-outreach' },
        { label: 'Education & STEAM', value: 'education-steam' },
      ],
    },
    {
      name: 'description',
      type: 'richText',
      label: 'Description',
    },
    {
      name: 'url',
      type: 'text',
      label: 'Program URL',
      admin: {
        description: 'Link to the program or service page',
      },
    },
  ],
  hooks: {
    beforeValidate: [slugifyTitle],
  },
}