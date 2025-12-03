"use client"

import "./globals.css"
import { Toaster } from "@/components/ui/toaster"
import { useAuth } from "@/lib/auth-store"
import { useEffect } from "react"

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { checkAuth } = useAuth()

  useEffect(() => {
    checkAuth()
  }, [checkAuth])

  return (
    <html lang="en">
      <body>
        {children}
        <Toaster />
      </body>
    </html>
  )
}