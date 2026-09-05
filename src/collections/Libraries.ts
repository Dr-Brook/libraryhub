import type { CollectionConfig, CollectionBeforeValidateHook } from 'payload'

const slugify: CollectionBeforeValidateHook = ({ data }) => {
  if (data?.name && !data?.slug) {
    data.slug = String(data.name)
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '')
  }
  return data
}

const slugifyTitle: CollectionBeforeValidateHook = ({ data }) => {
  if (data?.title && !data?.slug) {
    data.slug = String(data.title)
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '')
  }
  return data
}

export const Libraries: CollectionConfig = {
  slug: 'libraries',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'state', 'county', 'categories', 'featured'],
    description: 'Library systems across the DMV region',
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
      label: 'Library Name',
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      admin: {
        readOnly: true,
        description: 'Auto-generated from library name',
      },
    },
    {
      name: 'state',
      type: 'text',
      required: true,
      label: 'State',
      admin: {
        description: 'Two-letter state abbreviation (e.g., MD, VA, DC)',
      },
    },
    {
      name: 'county',
      type: 'text',
      label: 'County',
    },
    {
      name: 'city',
      type: 'text',
      label: 'City',
    },
    {
      name: 'description',
      type: 'richText',
      label: 'Description',
    },
    {
      name: 'categories',
      type: 'select',
      hasMany: true,
      label: 'Categories',
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
      name: 'website',
      type: 'text',
      label: 'Website URL',
    },
    {
      name: 'phone',
      type: 'text',
      label: 'Phone Number',
    },
    {
      name: 'address',
      type: 'text',
      label: 'Street Address',
    },
    {
      name: 'hours',
      type: 'textarea',
      label: 'Hours of Operation',
    },
    {
      name: 'logo',
      type: 'upload',
      label: 'Library Logo',
      relationTo: 'media',
    },
    {
      name: 'featured',
      type: 'checkbox',
      label: 'Featured Library',
      defaultValue: false,
      admin: {
        description: 'Featured libraries appear prominently on the homepage',
      },
    },
  ],
  hooks: {
    beforeValidate: [slugify],
  },
}