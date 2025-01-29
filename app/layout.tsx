import type { Metadata } from "next"
import { Press_Start_2P, Space_Grotesk } from "next/font/google"
import "./globals.css"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { ThreeBackground } from "@/components/three-background"
import { ParticleEffect } from "@/components/particle-effect"
import { GradientBackground } from "@/components/gradient-background"
import { Providers } from "./providers"
import type React from "react"
import { validateEnv } from '@/lib/env'
import { Suspense } from "react"
import { LoadingScreen } from "@/components/loading-screen"

const pressStart = Press_Start_2P({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-press-start",
})

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
})

// Validate environment variables during app initialization
validateEnv()

export const metadata: Metadata = {
  title: "Zenith E-Summit 2025 | MAIT",
  description: "Explore the cosmos with us at Zenith E-Summit 2025, MAIT's premier entrepreneurship summit.",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${pressStart.variable} ${spaceGrotesk.variable} font-sans bg-black text-white`}>
        <Providers>
          <Suspense fallback={<LoadingScreen />}>
            <GradientBackground />
            <ParticleEffect />
            <ThreeBackground />
            <div className="relative min-h-screen flex flex-col z-10">
              <Navbar />
              <main className="flex-grow">{children}</main>
              <Footer />
            </div>
          </Suspense>
        </Providers>
      </body>
    </html>
  )
}

