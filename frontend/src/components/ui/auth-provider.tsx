"use client"

import { useAuth } from "@/lib/auth-store"
import { useEffect, useState } from "react"

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  useEffect(() => {
    if (isClient) {
      useAuth.getState().checkAuth()
    }
  }, [isClient])

  return <>{children}</>
}