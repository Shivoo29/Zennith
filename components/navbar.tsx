"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Menu, X } from "lucide-react"

const navItems = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Events", href: "/events" },
  { name: "Sponsors", href: "/sponsors" },
  { name: "Register", href: "/register" },
]

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <nav className="fixed w-full z-50 bg-black/70 backdrop-blur-md border-b border-purple-500/30">
      <div className="relative">
        {/* Neon glow effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-purple-800/20 via-fuchsia-600/20 to-purple-800/20" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="flex items-center justify-between h-20">
            <div className="flex-shrink-0 relative group">
              <Link href="/" className="relative block">
                <Image
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-HqsSd8ODyl1cpMzjdbPprhLRQeFXNI.png"
                  alt="Zenith Logo"
                  width={120}
                  height={40}
                  className="h-8 w-auto transition-all duration-300 group-hover:opacity-90"
                />
                {/* Logo glow effect */}
                <div className="absolute inset-0 bg-fuchsia-500 opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-300" />
              </Link>
            </div>

            {/* Desktop menu */}
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-8">
                {navItems.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="relative group"
                  >
                    <span className="font-press-start text-sm text-gray-300 group-hover:text-fuchsia-400 transition-colors duration-200">
                      {item.name}
                    </span>
                    {/* Neon underline effect */}
                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-fuchsia-500 group-hover:w-full transition-all duration-300 ease-out" />
                    {/* Glow effect */}
                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-fuchsia-400 opacity-50 blur-sm group-hover:w-full transition-all duration-300 ease-out" />
                  </Link>
                ))}
              </div>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="inline-flex items-center justify-center p-2 rounded-md text-fuchsia-300 hover:text-white hover:bg-purple-900/50 focus:outline-none transition-colors duration-200"
              >
                {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-black/95 backdrop-blur-lg border-b border-purple-500/30">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="block px-3 py-2 rounded-md text-base font-press-start text-gray-300 hover:text-fuchsia-400 hover:bg-purple-900/30 transition-all duration-200"
                onClick={() => setIsOpen(false)}
              >
                <span className="relative group-hover:text-fuchsia-400">
                  {item.name}
                </span>
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  )
}