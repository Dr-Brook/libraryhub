import configPromise from '@payload-config'
import { RootPage } from '@payloadcms/next/views'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'LibraryHub Admin',
  description: 'Admin panel for LibraryHub — DMV library offerings',
}

export default async function AdminPage() {
  const config = await configPromise
  return <RootPage config={config} />
}