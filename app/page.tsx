"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { GlowButton } from "@/components/ui/glow-button"
import { Modal } from "@/components/ui/modal"
import { Rocket, Users, Lightbulb } from "lucide-react"
import { cn } from "@/lib/utils"

const features = [
  {
    title: "Keynote Speakers",
    description: "Learn from industry leaders and visionaries",
    icon: Rocket,
    details: {
      title: "World-Class Keynote Speakers",
      content: `Experience inspiring talks from industry pioneers and thought leaders who are shaping the future of technology and entrepreneurship. Our carefully curated lineup of speakers will share their insights, experiences, and vision for the future.`,
      animation: "animate-float",
    },
  },
  {
    title: "Workshops",
    description: "Hands-on sessions to boost your skills",
    icon: Lightbulb,
    details: {
      title: "Interactive Workshops",
      content: `Dive deep into cutting-edge technologies and entrepreneurial skills with our hands-on workshops. From blockchain to AI, and from business modeling to pitch preparation, our workshops are designed to give you practical, applicable knowledge.`,
      animation: "animate-pulse-glow",
    },
  },
  {
    title: "Networking",
    description: "Connect with fellow entrepreneurs and investors",
    icon: Users,
    details: {
      title: "Networking Opportunities",
      content: `Build valuable connections with fellow entrepreneurs, investors, and industry experts. Our carefully crafted networking sessions and social events provide the perfect platform to expand your professional network and find potential collaborators.`,
      animation: "animate-bounce",
    },
  },
]

export default function Home() {
  const [selectedFeature, setSelectedFeature] = useState<(typeof features)[0] | null>(null)

  return (
    <div className="relative min-h-screen">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0 bg-gradient-to-b from-zenith-purple/20 via-zenith-red/20 to-black" />
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-zenith-blue/20 via-transparent to-transparent" />
        </div>

        {/* Content */}
        <motion.div
          className="relative z-10 container mx-auto px-4 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
          >
            <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-9dJGUDSbt9V5YMTmS9qZq0PQ3f4WFC.png"
              alt="Zenith Banner"
              width={1200}
              height={400}
              className="mx-auto mb-8 animate-pulse-glow"
            />
          </motion.div>

          <motion.h1
            className="font-press-start text-4xl md:text-6xl mb-6 animate-text-gradient bg-gradient-to-r from-zenith-red via-zenith-purple to-zenith-blue bg-clip-text text-transparent"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            EXPLORE THE COSMOS
          </motion.h1>

          <motion.p
            className="text-xl md:text-2xl mb-8 text-gray-300 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            Join us for the biggest entrepreneurship summit of 2025
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <Link href="/register">
              <GlowButton glowColor="rgba(255, 51, 102, 0.5)">Register Now</GlowButton>
            </Link>
            <Link href="/about">
              <GlowButton variant="outline" glowColor="rgba(51, 102, 255, 0.5)">
                Learn More
              </GlowButton>
            </Link>
          </motion.div>
        </motion.div>

        {/* Floating Elements */}
        <div className="absolute inset-0 pointer-events-none">
          <motion.div
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 1 }}
          >
          
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 1.2 }}
          >
            <Image
              src="/nobgsuperman.svg"
              alt="Floating Astronaut"
              width={80}
              height={80}
              className="absolute bottom-1/4 right-1/4 animate-float"
              style={{ animationDelay: "-2s" }}
            />
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-black/50 backdrop-blur-sm">
        <div className="container mx-auto px-4">
          <motion.h2
            className="font-press-start text-3xl md:text-4xl text-center mb-12 animate-text-gradient bg-gradient-to-r from-zenith-red to-zenith-blue bg-clip-text text-transparent"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            What to Expect
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.button
                key={index}
                onClick={() => setSelectedFeature(feature)}
                className="group relative p-6 rounded-lg border border-white/10 bg-white/5 backdrop-blur-sm hover:bg-white/10 transition-all duration-300"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                whileHover={{ scale: 1.05 }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-zenith-red/0 via-zenith-purple/10 to-zenith-blue/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg" />

                <feature.icon className="w-8 h-8 mb-4 text-zenith-red group-hover:text-zenith-purple transition-colors" />
                <h3 className="font-press-start text-xl mb-4 text-zenith-red group-hover:text-zenith-purple transition-colors">
                  {feature.title}
                </h3>
                <p className="text-gray-400 group-hover:text-gray-300 transition-colors">{feature.description}</p>

                <div className="absolute -bottom-2 left-0 right-0 h-px bg-gradient-to-r from-transparent via-zenith-red to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      {/* Feature Modal */}
      <Modal
        isOpen={!!selectedFeature}
        onClose={() => setSelectedFeature(null)}
        title={selectedFeature?.details.title || ""}
      >
        <motion.div className="relative" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <motion.div
            className={`absolute -top-12 -right-12 w-24 h-24 text-zenith-purple opacity-20 ${selectedFeature?.details.animation}`}
            initial={{ rotate: 0 }}
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
          >
            {selectedFeature?.icon && <selectedFeature.icon className="w-full h-full" />}
          </motion.div>
          <p className="text-gray-300 leading-relaxed">{selectedFeature?.details.content}</p>
          <GlowButton className="mt-6" onClick={() => setSelectedFeature(null)}>
            Close
          </GlowButton>
        </motion.div>
      </Modal>
    </div>
  )
}

