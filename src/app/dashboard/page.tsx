"use client"

import { useEffect, useState } from "react"
import { StreamForm } from "@/components/dashboard/StreamForm"
import { StreamList } from "@/components/dashboard/StreamList"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Activity, Users, Video, TrendingUp } from "lucide-react"

export default function DashboardPage() {
   const [streams, setStreams] = useState([])

   useEffect(() => {
      const fetchStreams = async () => {
         try {
            const res = await fetch("/api/streams")
            if (!res.ok) throw new Error("Failed to fetch streams")
            const data = await res.json()
            setStreams(data)
         } catch (error) {
            console.error(error)
         }
      }

      fetchStreams()
   }, [])

   return (
      <main className="px-4 py-6 sm:px-6 lg:px-8 bg-purple-50 min-h-screen">
         <div className="max-w-7xl mx-auto space-y-10">

            {/* Dashboard Header */}
            <div className="flex items-center justify-between border-b border-purple-300 pb-4">
               <div>
                  <h1 className="text-4xl font-bold tracking-tight text-purple-800">Dashboard</h1>
                  <p className="mt-2 text-purple-600">
                     Manage your streams and track performance.
                  </p>
               </div>
               <Badge variant="outline" className="bg-purple-100 text-purple-800 border-purple-300">
                  <Activity className="w-4 h-4 mr-2" />
                  Live
               </Badge>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
               <Card className="border-purple-200">
                  <CardHeader className="flex items-center justify-between text-purple-700">
                     <CardTitle className="text-sm font-medium">Total Streams</CardTitle>
                     <Video className="w-4 h-4" />
                  </CardHeader>
                  <CardContent>
                     <div className="text-2xl font-bold text-purple-900">{streams.length}</div>
                     <p className="text-xs text-purple-600">+3 this week</p>
                  </CardContent>
               </Card>

               <Card className="border-purple-200">
                  <CardHeader className="flex items-center justify-between text-purple-700">
                     <CardTitle className="text-sm font-medium">Total Views</CardTitle>
                     <Users className="w-4 h-4" />
                  </CardHeader>
                  <CardContent>
                     <div className="text-2xl font-bold text-purple-900">2,350</div>
                     <p className="text-xs text-purple-600">+180 from last month</p>
                  </CardContent>
               </Card>

               <Card className="border-purple-200">
                  <CardHeader className="flex items-center justify-between text-purple-700">
                     <CardTitle className="text-sm font-medium">Live Viewers</CardTitle>
                     <Activity className="w-4 h-4" />
                  </CardHeader>
                  <CardContent>
                     <div className="text-2xl font-bold text-purple-900">127</div>
                     <p className="text-xs text-purple-600">+12 from last hour</p>
                  </CardContent>
               </Card>

               <Card className="border-purple-200">
                  <CardHeader className="flex items-center justify-between text-purple-700">
                     <CardTitle className="text-sm font-medium">Engagement</CardTitle>
                     <TrendingUp className="w-4 h-4" />
                  </CardHeader>
                  <CardContent>
                     <div className="text-2xl font-bold text-purple-900">89%</div>
                     <p className="text-xs text-purple-600">+5% from yesterday</p>
                  </CardContent>
               </Card>
            </div>

            {/* Create Stream */}
            <Card className="border-purple-200">
               <CardHeader>
                  <CardTitle className="text-purple-800">Create New Stream</CardTitle>
                  <CardDescription className="text-purple-600">
                     Set up a new live stream
                  </CardDescription>
               </CardHeader>
               <CardContent>
                  <StreamForm />
               </CardContent>
            </Card>

            {/* Stream List */}
            <Card className="border-purple-200">
               <CardHeader>
                  <CardTitle className="text-purple-800">Your Streams</CardTitle>
                  <CardDescription className="text-purple-600">
                     Manage and monitor your streams
                  </CardDescription>
               </CardHeader>
               <CardContent>
                  <StreamList streams={streams} />
               </CardContent>
            </Card>
         </div>
      </main>
   )
}
