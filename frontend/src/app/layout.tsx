import "./globals.css"
import { Toaster } from "@/components/ui/toaster"
import  AuthProvider from "@/components/ui/auth-provider"

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          {children}
        </AuthProvider>
        <Toaster />
      </body>
    </html>
  )
}