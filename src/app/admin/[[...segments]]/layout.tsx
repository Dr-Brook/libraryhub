import configPromise from '@payload-config'
import { RootLayout } from '@payloadcms/next/layouts'

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const config = await configPromise
  return <RootLayout config={config}>{children}</RootLayout>
}