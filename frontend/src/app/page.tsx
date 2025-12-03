"use client"

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/lib/auth-store'

export default function HomePage() {
  const router = useRouter()
  const { token, isLoading } = useAuth()

  useEffect(() => {
    if (!isLoading) {
      if (token) {
        router.replace('/dashboard')
      } else {
        router.replace('/login')
      }
    }
  }, [token, isLoading, router])

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="text-center">
        <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-blue-600 mx-auto"></div>
        <p className="mt-6 text-gray-600 text-lg">Loading...</p>
      </div>
    </div>
  )
}