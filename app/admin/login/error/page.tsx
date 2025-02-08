"use client"

import { useSearchParams } from "next/navigation"
import { motion } from "framer-motion"
import { AlertCircle } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function AuthError() {
  const searchParams = useSearchParams()
  const error = searchParams?.get("error") || null

  const getErrorMessage = (error: string | null) => {
    switch (error) {
      case "CredentialsSignin":
        return "Invalid email or password"
      case "SessionRequired":
        return "Please sign in to access this page"
      default:
        return "An error occurred during authentication"
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-black">
      <div className="w-full max-w-md p-8 space-y-6 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-zenith-red/20 via-transparent to-transparent rounded-lg" />
        <div className="absolute inset-0 bg-white/5 backdrop-blur-sm rounded-lg border border-white/10" />

        <motion.div
          className="relative space-y-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex flex-col items-center gap-4">
            <AlertCircle className="h-12 w-12 text-zenith-red" />
            <h1 className="text-2xl font-press-start text-center bg-gradient-to-r from-zenith-red to-zenith-blue bg-clip-text text-transparent">
              Authentication Error
            </h1>
            <p className="text-gray-400 text-center">{getErrorMessage(error)}</p>
          </div>

          <div className="flex justify-center">
            <Link href="/admin/login">
              <Button className="bg-zenith-red hover:bg-zenith-red/80">Return to Login</Button>
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

