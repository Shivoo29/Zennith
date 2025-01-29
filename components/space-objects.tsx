"use client"

import { useEffect, useState } from "react"
import Image from "next/image"

const spaceObjects = [
  "/placeholder.svg?height=100&width=100", // Asteroid
  "/placeholder.svg?height=120&width=120", // Planet
  "/placeholder.svg?height=80&width=80", // Satellite
]

export function SpaceObjects() {
  const [objects, setObjects] = useState<{ src: string; style: any }[]>([])

  useEffect(() => {
    const newObjects = spaceObjects.map((src) => ({
      src,
      style: {
        top: `${Math.random() * 100}%`,
        left: `${Math.random() * 100}%`,
        animationDelay: `${Math.random() * 5}s`,
        transform: `rotate(${Math.random() * 360}deg)`,
      },
    }))
    setObjects(newObjects)
  }, [])

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {objects.map((obj, index) => (
        <div key={index} className="absolute animate-float opacity-20" style={obj.style}>
          <Image
            src={obj.src || "/placeholder.svg"}
            alt="Space Object"
            width={100}
            height={100}
            className="animate-spin-slow"
          />
        </div>
      ))}
    </div>
  )
}

