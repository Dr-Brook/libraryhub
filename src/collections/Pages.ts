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

export const Pages: CollectionConfig = {
  slug: 'pages',
  admin: {
    useAsTitle: 'title',
    description: 'Static pages like About, Contact, etc.',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      label: 'Page Title',
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
      name: 'content',
      type: 'richText',
      label: 'Page Content',
    },
  ],
  hooks: {
    beforeValidate: [slugifyTitle],
  },
}