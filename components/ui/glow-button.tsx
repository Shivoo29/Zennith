"use client"

import { type ButtonHTMLAttributes, forwardRef } from "react"
import { cn } from "@/lib/utils"
import { motion } from "framer-motion"

interface GlowButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  glowColor?: string
  variant?: "default" | "outline"
}

export const GlowButton = forwardRef<HTMLButtonElement, GlowButtonProps>(
  ({ className, glowColor = "rgba(255, 51, 102, 0.5)", variant = "default", children, ...props }, ref) => {
    return (
      <motion.button
        ref={ref}
        className={cn(
          "relative inline-flex items-center justify-center px-6 py-3 overflow-hidden rounded-lg font-press-start text-sm transition-all duration-300",
          variant === "default"
            ? "bg-zenith-red text-white hover:bg-zenith-red/80"
            : "border-2 border-zenith-blue text-zenith-blue hover:bg-zenith-blue/10",
          className,
        )}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        {...props}
      >
        <div
          className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity duration-300"
          style={{
            background: `radial-gradient(circle at center, ${glowColor} 0%, transparent 70%)`,
            filter: "blur(8px)",
          }}
        />
        <span className="relative z-10">{children}</span>
      </motion.button>
    )
  },
)
GlowButton.displayName = "GlowButton"

