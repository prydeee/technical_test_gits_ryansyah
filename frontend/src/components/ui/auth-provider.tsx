"use client"

import { useAuth } from "@/lib/auth-store"
import { useEffect, useState } from "react"

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const { checkAuth } = useAuth()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    checkAuth()
  }, [checkAuth])

  if (!mounted) {
    return <>{children}</>
  }

  return <>{children}</>
}