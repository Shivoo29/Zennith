"use client"

import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Modal } from "@/components/ui/modal"
import { motion } from "framer-motion"

const sponsorTiers = [
  {
    title: "Title Sponsors",
    sponsors: [
      {
        id: 1,
        name: "TechCorp",
        logo: "/placeholder.svg",
        description: "Leading technology solutions provider",
        website: "https://example.com",
      },
      {
        id: 2,
        name: "InnovateX",
        logo: "/placeholder.svg",
        description: "Innovation and research company",
        website: "https://example.com",
      },
    ],
  },
  {
    title: "Gold Sponsors",
    sponsors: [
      {
        id: 3,
        name: "FutureLabs",
        logo: "/placeholder.svg",
        description: "AI and machine learning solutions",
        website: "https://example.com",
      },
      {
        id: 4,
        name: "SpaceX",
        logo: "/placeholder.svg",
        description: "Space exploration technologies",
        website: "https://example.com",
      },
    ],
  },
  {
    title: "Silver Sponsors",
    sponsors: [
      {
        id: 5,
        name: "StartupHub",
        logo: "/placeholder.svg",
        description: "Startup incubator and accelerator",
        website: "https://example.com",
      },
      {
        id: 6,
        name: "VentureCapital",
        logo: "/placeholder.svg",
        description: "Investment and venture capital firm",
        website: "https://example.com",
      },
    ],
  },
]

export default function Sponsors() {
  const [selectedSponsor, setSelectedSponsor] = useState<(typeof sponsorTiers)[0]["sponsors"][0] | null>(null)

  return (
    <div className="min-h-screen pt-20 bg-black/50 backdrop-blur-sm">
      <div className="container mx-auto px-4 py-12">
        <motion.h1
          className="font-press-start text-4xl text-center mb-12 bg-gradient-to-r from-zenith-red to-zenith-blue bg-clip-text text-transparent"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Our Sponsors
        </motion.h1>

        <div className="space-y-16">
          {sponsorTiers.map((tier, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
            >
              <div className="relative">
                <h2 className="font-press-start text-2xl text-center mb-8 text-zenith-purple">{tier.title}</h2>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-zenith-purple/20 to-transparent h-px -bottom-2" />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {tier.sponsors.map((sponsor, sponsorIndex) => (
                  <motion.button
                    key={sponsor.id}
                    onClick={() => setSelectedSponsor(sponsor)}
                    className="group relative p-6 rounded-lg border border-white/10 bg-white/5 backdrop-blur-sm hover:bg-white/10 transition-all duration-300"
                    whileHover={{ scale: 1.05 }}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3, delay: index * 0.2 + sponsorIndex * 0.1 }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-zenith-red/0 via-zenith-purple/10 to-zenith-blue/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg" />

                    <div className="relative h-32 mb-4 group-hover:scale-110 transition-transform duration-300">
                      <Image
                        src={sponsor.logo || "/placeholder.svg"}
                        alt={sponsor.name}
                        fill
                        className="object-contain filter group-hover:brightness-125 transition-all duration-300"
                      />
                    </div>

                    <div className="relative">
                      <h3 className="font-press-start text-xl mb-2 text-zenith-red group-hover:text-zenith-purple transition-colors">
                        {sponsor.name}
                      </h3>
                      <p className="text-gray-400 group-hover:text-gray-300 transition-colors">{sponsor.description}</p>

                      <div className="absolute -bottom-2 left-0 right-0 h-px bg-gradient-to-r from-transparent via-zenith-red to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
                    </div>
                  </motion.button>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        <Modal isOpen={!!selectedSponsor} onClose={() => setSelectedSponsor(null)} title={selectedSponsor?.name || ""}>
          <motion.div className="space-y-4" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <div className="relative h-48 overflow-hidden rounded-lg">
              <Image
                src={selectedSponsor?.logo || "/placeholder.svg"}
                alt={selectedSponsor?.name || ""}
                fill
                className="object-contain"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/20" />
            </div>

            <p className="text-gray-300 leading-relaxed">{selectedSponsor?.description}</p>

            <motion.div
              className="flex justify-between items-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <Button
                className="bg-zenith-red hover:bg-zenith-red/80 transform hover:scale-105 transition-transform"
                onClick={() => window.open(selectedSponsor?.website, "_blank")}
              >
                Visit Website
              </Button>
              <Button
                variant="outline"
                className="border-zenith-blue text-zenith-blue hover:bg-zenith-blue/10 transform hover:scale-105 transition-transform"
                onClick={() => setSelectedSponsor(null)}
              >
                Close
              </Button>
            </motion.div>
          </motion.div>
        </Modal>
      </div>
    </div>
  )
}

