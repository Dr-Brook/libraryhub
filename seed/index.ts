import { getPayload } from 'payload'
import { sqliteAdapter } from '@payloadcms/db-sqlite'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import config from '../src/payload.config.js'
import { seedLibraries, seedOfferings } from './seed-data.js'

async function seed() {
  console.log('🌱 Seeding LibraryHub...')

  const payload = await getPayload({
    config,
  })

  // Create admin user
  console.log('👤 Creating admin user...')
  try {
    await payload.create({
      collection: 'users',
      data: {
        email: 'admin@libraryhub.org',
        password: 'admin',
        name: 'Admin User',
      },
    })
    console.log('  ✅ Admin user created')
  } catch (err: any) {
    if (err?.message?.includes('duplicate') || err?.message?.includes('already exists') || err?.message?.includes('unique')) {
      console.log('  ⏭️  Admin user already exists, skipping')
    } else {
      console.error('  ❌ Error creating admin user:', err.message)
    }
  }

  // Create libraries
  console.log('📚 Creating libraries...')
  const libraryMap: Record<string, any> = {}

  for (const lib of seedLibraries) {
    try {
      const created = await payload.create({
        collection: 'libraries',
        data: {
          name: lib.name,
          slug: lib.slug,
          state: lib.state,
          county: lib.county || undefined,
          city: lib.city || undefined,
          description: {
            root: {
              type: 'root',
              children: [
                {
                  type: 'paragraph',
                  version: 1,
                  children: [
                    {
                      type: 'text',
                      version: 1,
                      text: lib.description,
                    },
                  ],
                },
              ],
              direction: 'ltr',
              format: 'left',
              indent: 0,
              version: 1,
            },
          } as any,
          categories: lib.categories,
          website: lib.website || undefined,
          phone: lib.phone || undefined,
          address: lib.address || undefined,
          hours: lib.hours || undefined,
          featured: lib.featured,
        },
      })
      libraryMap[lib.slug] = created.id
      console.log(`  ✅ ${lib.name}`)
    } catch (err: any) {
      console.error(`  ❌ Error creating ${lib.name}:`, err.message)
    }
  }

  // Create offerings
  console.log('🎁 Creating offerings...')
  for (const offering of seedOfferings) {
    const libraryId = libraryMap[offering.librarySlug]
    if (!libraryId) {
      console.error(`  ⚠️  Library not found for offering "${offering.title}": ${offering.librarySlug}`)
      continue
    }

    try {
      await payload.create({
        collection: 'offerings',
        data: {
          title: offering.title,
          slug: offering.slug,
          library: libraryId,
          category: offering.category,
          description: {
            root: {
              type: 'root',
              children: [
                {
                  type: 'paragraph',
                  version: 1,
                  children: [
                    {
                      type: 'text',
                      version: 1,
                      text: offering.description,
                    },
                  ],
                },
              ],
              direction: 'ltr',
              format: 'left',
              indent: 0,
              version: 1,
            },
          } as any,
        },
      })
      console.log(`  ✅ ${offering.title}`)
    } catch (err: any) {
      console.error(`  ❌ Error creating ${offering.title}:`, err.message)
    }
  }

  console.log('\n🎉 Seeding complete!')
  console.log(`   Libraries: ${Object.keys(libraryMap).length}`)
  console.log(`   Offerings: ${seedOfferings.length}`)
  console.log('\n   Login: admin@libraryhub.org / admin')
  console.log('   Admin: http://localhost:3003/admin')

  process.exit(0)
}

seed().catch((err) => {
  console.error('❌ Seeding failed:', err)
  process.exit(1)
})
