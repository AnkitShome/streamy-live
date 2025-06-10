"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Loader2, Plus, LinkIcon } from "lucide-react"
import { toast } from "sonner"

export function StreamForm() {
   const mockUserId = "user-123" // Mock user ID
   const router = useRouter()
   const [isLoading, setIsLoading] = useState(false)
   const [form, setForm] = useState({
      title: "",
      description: "",
      videoUrl: "",
   })

   async function handleSubmit(e: React.FormEvent) {
      e.preventDefault()
      if (!form.title.trim()) {
         toast.error("Please enter a stream title")
         return
      }

      setIsLoading(true)
      try {
         const response = await fetch("/api/streams", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ ...form, userId: mockUserId }),
         })

         if (response.ok) {
            toast.success("Stream created successfully!")
            router.refresh()
            setForm({ title: "", description: "", videoUrl: "" })
         } else {
            toast.error("Failed to create stream")
         }
      } catch (error) {
         toast.error("Something went wrong")
      } finally {
         setIsLoading(false)
      }
   }

   return (
      <form onSubmit={handleSubmit} className="space-y-6">
         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
               <div className="space-y-2">
                  <Label htmlFor="title">Stream Title *</Label>
                  <Input
                     id="title"
                     value={form.title}
                     onChange={(e) => setForm({ ...form, title: e.target.value })}
                     placeholder="Enter your stream title"
                     required
                  />
               </div>

               <div className="space-y-2">
                  <Label htmlFor="videoUrl">Video URL</Label>
                  <div className="relative">
                     <LinkIcon className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                     <Input
                        id="videoUrl"
                        value={form.videoUrl}
                        onChange={(e) => setForm({ ...form, videoUrl: e.target.value })}
                        placeholder="https://example.com/video"
                        className="pl-10"
                        type="url"
                     />
                  </div>
               </div>
            </div>

            <div className="space-y-2">
               <Label htmlFor="description">Description</Label>
               <Textarea
                  id="description"
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                  placeholder="Describe your stream content"
                  className="min-h-[100px] resize-none"
               />
            </div>
         </div>

         <div className="flex gap-3">
            <Button type="submit" disabled={isLoading || !form.title.trim()}>
               {isLoading ? (
                  <>
                     <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                     Creating...
                  </>
               ) : (
                  <>
                     <Plus className="w-4 h-4 mr-2" />
                     Create Stream
                  </>
               )}
            </Button>

            <Button
               type="button"
               variant="outline"
               onClick={() => setForm({ title: "", description: "", videoUrl: "" })}
               disabled={isLoading}
            >
               Clear
            </Button>
         </div>
      </form>
   )
}
