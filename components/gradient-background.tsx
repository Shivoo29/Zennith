"use client"

export function GradientBackground() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0">
      {/* Main gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-zenith-purple/10 to-black animate-pulse-slow" />

      {/* Animated orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-zenith-red/20 rounded-full blur-3xl animate-float" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-zenith-blue/20 rounded-full blur-3xl animate-float-delayed" />
      <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-zenith-purple/20 rounded-full blur-3xl animate-float-slow" />

      {/* Grid overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff10_1px,transparent_1px),linear-gradient(to_bottom,#ffffff10_1px,transparent_1px)] bg-[size:4rem_4rem]" />
    </div>
  )
}

