"use client"

import { motion } from "framer-motion"
import Image from "next/image"

interface Sponsor {
  name: string
  logo: string
  description: string
  tier: "platinum" | "gold" | "silver"
  website?: string
}

const sponsors: Sponsor[] = [
  {
    name: "TechCorp",
    logo: "/sponsors/techcorp.png",
    description: "Leading technology solutions provider",
    tier: "platinum",
    website: "https://techcorp.com"
  },
  {
    name: "InnovateX",
    logo: "/sponsors/innovatex.png",
    description: "Innovation and research leader",
    tier: "platinum",
    website: "https://innovatex.com"
  },
  // Add more sponsors here
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
}

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1
  }
}

export default function SponsorsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-purple-900/20 to-black">
      <div className="max-w-7xl mx-auto px-4 py-20">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-500 to-red-500">
            Our Sponsors
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Meet the innovative companies powering Zenith E-Summit 2025
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {sponsors.map((sponsor, index) => (
            <motion.div
              key={sponsor.name}
              variants={itemVariants}
              whileHover={{ scale: 1.05 }}
              className={`
                relative group overflow-hidden rounded-xl
                ${sponsor.tier === 'platinum' ? 'md:col-span-2 lg:col-span-1' : ''}
                bg-gradient-to-br from-purple-900/30 via-black to-purple-900/30
                border border-purple-500/20 backdrop-blur-sm
              `}
            >
              <div className="p-8">
                <div className="aspect-square relative mb-6 group-hover:scale-105 transition-transform">
                  <Image
                    src={sponsor.logo}
                    alt={sponsor.name}
                    fill
                    className="object-contain"
                  />
                </div>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-2xl font-bold text-white">{sponsor.name}</h3>
                    <span className={`
                      px-3 py-1 rounded-full text-sm font-medium
                      ${sponsor.tier === 'platinum' ? 'bg-purple-500/20 text-purple-300' :
                        sponsor.tier === 'gold' ? 'bg-yellow-500/20 text-yellow-300' :
                        'bg-gray-500/20 text-gray-300'}
                    `}>
                      {sponsor.tier}
                    </span>
                  </div>
                  <p className="text-gray-400">{sponsor.description}</p>
                  {sponsor.website && (
                    <a
                      href={sponsor.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center text-purple-400 hover:text-purple-300"
                    >
                      Visit Website
                      <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </a>
                  )}
                </div>
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-purple-500/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  )
}



