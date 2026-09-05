import configPromise from '@payload-config'
import { handleNextAuth } from '@payloadcms/next/utilities'
import { NextRequest } from 'next/server'

export const GET = handleNextAuth(configPromise)
export const POST = handleNextAuth(configPromise)