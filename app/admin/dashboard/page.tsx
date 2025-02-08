"use client"

export const dynamic = 'force-dynamic'

import { useEffect, useState } from "react"
import { useSession } from "next-auth/react"
import { redirect } from "next/navigation"
import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Users, Calendar, Mail, BarChart3 } from "lucide-react"
import { getServerSession } from "next-auth"

interface Registration {
  id: string
  name: string
  email: string
  college: string
  registeredAt: string
  eventName: string
}

interface EventStats {
  name: string
  registrations: number
  capacity: number
}

export default function AdminDashboard() {
  const { data: session, status } = useSession()
  const [registrations, setRegistrations] = useState<Registration[]>([])
  const [eventStats, setEventStats] = useState<EventStats[]>([])

  if (status === 'loading') {
    return <div>Loading...</div>
  }

  if (status === 'unauthenticated' || !session) {
    redirect('/auth/signin')
  }

  // Simulated data - In a real app, this would fetch from your API
  useEffect(() => {
    // Mock registrations data
    setRegistrations([
      {
        id: "1",
        name: "John Doe",
        email: "john@example.com",
        college: "MAIT",
        registeredAt: "2024-02-01",
        eventName: "Startup Pitch",
      },
      {
        id: "2",
        name: "Jane Smith",
        email: "jane@example.com",
        college: "DTU",
        registeredAt: "2024-02-02",
        eventName: "Hackathon",
      },
      // Add more mock data as needed
    ])

    // Mock event statistics
    setEventStats([
      {
        name: "Startup Pitch",
        registrations: 45,
        capacity: 100,
      },
      {
        name: "Hackathon",
        registrations: 75,
        capacity: 150,
      },
      {
        name: "Case Study",
        registrations: 30,
        capacity: 50,
      },
    ])
  }, [])

  const stats = [
    {
      title: "Total Registrations",
      value: registrations.length,
      icon: Users,
      color: "text-zenith-red",
    },
    {
      title: "Active Events",
      value: eventStats.length,
      icon: Calendar,
      color: "text-zenith-blue",
    },
    {
      title: "Email Campaigns",
      value: 3,
      icon: Mail,
      color: "text-zenith-purple",
    },
  ]

  return (
    <div className="min-h-screen pt-20 bg-black">
      <div className="container mx-auto px-4 py-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <h1 className="font-press-start text-3xl mb-8 bg-gradient-to-r from-zenith-red to-zenith-blue bg-clip-text text-transparent">
            Admin Dashboard
          </h1>

          {/* Stats Overview */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-normal text-gray-400">{stat.title}</CardTitle>
                    <stat.icon className={`w-4 h-4 ${stat.color}`} />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{stat.value}</div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Main Content */}
          <Tabs defaultValue="registrations" className="space-y-4">
            <TabsList className="bg-white/5 border-white/10">
              <TabsTrigger value="registrations">Registrations</TabsTrigger>
              <TabsTrigger value="events">Event Stats</TabsTrigger>
            </TabsList>

            <TabsContent value="registrations" className="space-y-4">
              <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle>Recent Registrations</CardTitle>
                  <CardDescription>Overview of recent event registrations</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="rounded-md border border-white/10">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Name</TableHead>
                          <TableHead>Email</TableHead>
                          <TableHead>College</TableHead>
                          <TableHead>Event</TableHead>
                          <TableHead>Date</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {registrations.map((registration) => (
                          <TableRow key={registration.id}>
                            <TableCell>{registration.name}</TableCell>
                            <TableCell>{registration.email}</TableCell>
                            <TableCell>{registration.college}</TableCell>
                            <TableCell>{registration.eventName}</TableCell>
                            <TableCell>{registration.registeredAt}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="events" className="space-y-4">
              <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle>Event Statistics</CardTitle>
                  <CardDescription>Current registration status for each event</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-8">
                    {eventStats.map((event) => {
                      const percentage = (event.registrations / event.capacity) * 100
                      return (
                        <div key={event.name} className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-400">{event.name}</span>
                            <span className="text-gray-400">
                              {event.registrations}/{event.capacity}
                            </span>
                          </div>
                          <div className="h-2 rounded-full bg-white/10">
                            <motion.div
                              className="h-full rounded-full bg-zenith-purple"
                              initial={{ width: 0 }}
                              animate={{ width: `${percentage}%` }}
                              transition={{ duration: 1, ease: "easeOut" }}
                            />
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </motion.div>
      </div>
    </div>
  )
}

