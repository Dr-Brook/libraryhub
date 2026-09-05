import { sqliteAdapter } from '@payloadcms/db-sqlite'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { seoPlugin } from '@payloadcms/plugin-seo'
import path from 'path'
import { fileURLToPath } from 'url'
import { buildConfig } from 'payload'
import sharp from 'sharp'

import { Libraries } from './collections/Libraries'
import { Offerings } from './collections/Offerings'
import { Pages } from './collections/Pages'
import { Media } from './collections/Media'
import { Users } from './collections/Users'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  collections: [Libraries, Offerings, Pages, Media, Users],
  editor: lexicalEditor({}),
  db: sqliteAdapter({
    client: {
      url: 'file:./libraryhub.db',
    },
  }),
  plugins: [
    seoPlugin({
      collections: ['libraries', 'offerings', 'pages'],
    }),
  ],
  cors: ['http://localhost:3003', 'http://localhost:3000'],
  csrf: ['http://localhost:3003', 'http://localhost:3000'],
  secret: process.env.PAYLOAD_SECRET || 'libraryhub-dev-secret-change-in-production',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  sharp,
})