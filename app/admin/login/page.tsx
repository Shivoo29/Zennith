"use client"

import { useState } from "react"
import { signIn } from "next-auth/react"
import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { motion } from "framer-motion"
import { Loader2, AlertCircle } from "lucide-react"
import Link from "next/link"

export default function AdminLogin() {
  const [credentials, setCredentials] = useState({ email: "", password: "" })
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const searchParams = useSearchParams()
  const callbackUrl = searchParams.get("callbackUrl") || "/admin/dashboard"

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setIsLoading(true)

    try {
      const result = await signIn("credentials", {
        email: credentials.email,
        password: credentials.password,
        redirect: false,
      })

      if (result?.error) {
        setError("Invalid email or password")
      } else if (result?.ok) {
        router.push(callbackUrl)
        router.refresh()
      }
    } catch (error) {
      setError("An error occurred. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-black">
      <div className="w-full max-w-md p-8 space-y-6 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-zenith-purple/20 via-transparent to-transparent rounded-lg" />
        <div className="absolute inset-0 bg-white/5 backdrop-blur-sm rounded-lg border border-white/10" />

        <motion.div
          className="relative space-y-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="text-center">
            <h1 className="text-2xl font-press-start bg-gradient-to-r from-zenith-red to-zenith-blue bg-clip-text text-transparent">
              Admin Login
            </h1>
            <p className="mt-2 text-sm text-gray-400">Access the Zenith dashboard</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Input
                type="email"
                placeholder="Email"
                value={credentials.email}
                onChange={(e) => setCredentials({ ...credentials, email: e.target.value })}
                className="bg-white/10 border-white/20 text-white placeholder:text-gray-500"
                required
              />
            </div>
            <div className="space-y-2">
              <Input
                type="password"
                placeholder="Password"
                value={credentials.password}
                onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
                className="bg-white/10 border-white/20 text-white placeholder:text-gray-500"
                required
              />
            </div>

            {error && (
              <motion.div
                className="flex items-center gap-2 text-zenith-red text-sm p-2 rounded-md bg-zenith-red/10"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <AlertCircle className="h-4 w-4" />
                <span>{error}</span>
              </motion.div>
            )}

            <Button type="submit" className="w-full bg-zenith-red hover:bg-zenith-red/80" disabled={isLoading}>
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Authenticating...
                </div>
              ) : (
                "Login"
              )}
            </Button>
          </form>

          <div className="text-center">
            <Link href="/" className="text-sm text-gray-400 hover:text-white">
              Return to Home
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

