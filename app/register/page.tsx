"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Rocket, Send, User, Mail, Phone, School } from "lucide-react"

export default function Register() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    college: "",
    year: "",
    phone: "",
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 2000))

    setIsSubmitting(false)
    setIsSuccess(true)

    // Reset success message after 3 seconds
    setTimeout(() => setIsSuccess(false), 3000)
  }

  const formFields = [
    {
      id: "name",
      label: "Full Name",
      type: "text",
      icon: User,
      placeholder: "Enter your full name",
    },
    {
      id: "email",
      label: "Email",
      type: "email",
      icon: Mail,
      placeholder: "Enter your email",
    },
    {
      id: "college",
      label: "College/University",
      type: "text",
      icon: School,
      placeholder: "Enter your institution",
    },
    {
      id: "phone",
      label: "Phone Number",
      type: "tel",
      icon: Phone,
      placeholder: "Enter your phone number",
    },
  ]

  return (
    <div className="min-h-screen pt-20 bg-black/50 backdrop-blur-sm">
      <div className="container mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-2xl mx-auto"
        >
          <div className="text-center mb-12">
            <motion.h1
              className="font-press-start text-4xl mb-4 bg-gradient-to-r from-zenith-red to-zenith-blue bg-clip-text text-transparent"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              Register for Zenith
            </motion.h1>
            <motion.p
              className="text-gray-400"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              Join us on this cosmic journey of innovation and entrepreneurship
            </motion.p>
          </div>

          <motion.div
            className="bg-white/5 backdrop-blur-sm rounded-lg border border-white/10 p-8 relative overflow-hidden"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-zenith-red/5 via-zenith-purple/5 to-zenith-blue/5" />

            <form onSubmit={handleSubmit} className="space-y-6 relative">
              {formFields.map((field, index) => (
                <motion.div
                  key={field.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.8 + index * 0.1 }}
                >
                  <Label htmlFor={field.id} className="text-gray-300 flex items-center gap-2">
                    <field.icon className="w-4 h-4 text-zenith-purple" />
                    {field.label}
                  </Label>
                  <Input
                    id={field.id}
                    type={field.type}
                    placeholder={field.placeholder}
                    value={formData[field.id as keyof typeof formData]}
                    onChange={(e) => setFormData({ ...formData, [field.id]: e.target.value })}
                    className="mt-1 bg-white/10 border-white/20 text-white placeholder:text-gray-500 focus:border-zenith-purple focus:ring-zenith-purple"
                    required
                  />
                </motion.div>
              ))}

              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 1.2 }}
              >
                <Label htmlFor="year" className="text-gray-300 flex items-center gap-2">
                  <Rocket className="w-4 h-4 text-zenith-purple" />
                  Year of Study
                </Label>
                <Select value={formData.year} onValueChange={(value) => setFormData({ ...formData, year: value })}>
                  <SelectTrigger className="mt-1 bg-white/10 border-white/20 text-white">
                    <SelectValue placeholder="Select year" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">1st Year</SelectItem>
                    <SelectItem value="2">2nd Year</SelectItem>
                    <SelectItem value="3">3rd Year</SelectItem>
                    <SelectItem value="4">4th Year</SelectItem>
                  </SelectContent>
                </Select>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 1.4 }}
              >
                <Button
                  type="submit"
                  className="w-full bg-zenith-red hover:bg-zenith-red/80 transform hover:scale-105 transition-all"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <div className="flex items-center gap-2">
                      <div className="animate-spin rounded-full h-4 w-4 border-2 border-white/20 border-t-white" />
                      Registering...
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      <Send className="w-4 h-4" />
                      Register Now
                    </div>
                  )}
                </Button>
              </motion.div>
            </form>

            {isSuccess && (
              <motion.div
                className="absolute inset-0 flex items-center justify-center bg-black/80 backdrop-blur-sm"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <div className="text-center text-white">
                  <Rocket className="w-12 h-12 mx-auto mb-4 text-zenith-purple animate-bounce" />
                  <h3 className="text-2xl font-bold mb-2">Registration Successful!</h3>
                  <p className="text-gray-400">We'll contact you soon with further details.</p>
                </div>
              </motion.div>
            )}
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}

