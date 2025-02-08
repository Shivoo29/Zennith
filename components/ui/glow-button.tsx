"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { motion, HTMLMotionProps } from "framer-motion"
import { ButtonProps } from "@/components/ui/button"

interface GlowButtonProps extends Omit<HTMLMotionProps<"button">, keyof ButtonProps> {
  glowColor?: string
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link"
  className?: string
  children?: React.ReactNode
}

const GlowButton = React.forwardRef<HTMLButtonElement, GlowButtonProps>(
  ({ className, glowColor = "rgba(255, 51, 102, 0.5)", variant = "default", children, ...props }, ref) => {
    return (
      <motion.button
        ref={ref}
        className={cn(
          "relative inline-flex items-center justify-center px-6 py-3 overflow-hidden rounded-lg font-press-start text-sm transition-all duration-300",
          variant === "default" && "bg-zenith-red text-white hover:bg-zenith-red/80",
          variant === "destructive" && "bg-red-600 text-white hover:bg-red-600/90",
          variant === "outline" && "border border-zenith-red text-zenith-red hover:bg-zenith-red/10",
          variant === "secondary" && "bg-zenith-purple text-white hover:bg-zenith-purple/80",
          variant === "ghost" && "hover:bg-zenith-red/10 hover:text-zenith-red",
          variant === "link" && "text-zenith-red underline-offset-4 hover:underline",
          className
        )}
        whileHover={{
          boxShadow: `0 0 20px ${glowColor}`,
        }}
        whileTap={{
          scale: 0.98,
        }}
        {...props}
      >
        {children}
      </motion.button>
    )
  }
)
GlowButton.displayName = "GlowButton"

export { GlowButton }

