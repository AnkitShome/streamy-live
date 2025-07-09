"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { SearchIcon } from "lucide-react"

export const Search = () => {
   const [query, setQuery] = useState("")
   const router = useRouter()

   const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault()
      if (!query.trim()) return
      router.push(`/search?q=${encodeURIComponent(query.trim())}`)
   }

   return (
      <form
         onSubmit={handleSubmit}
         className="flex items-center bg-slate-800/50 backdrop-blur-sm rounded-xl overflow-hidden border border-slate-700/50 hover:border-cyan-500/50 transition-all duration-200 max-w-md w-full group"
      >
         <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search movies, shows, actors..."
            className="border-none bg-transparent focus:ring-0 px-4 py-3 text-sm text-slate-200 placeholder:text-slate-400 focus-visible:ring-0 focus-visible:ring-offset-0"
         />
         <Button
            type="submit"
            variant="ghost"
            className="rounded-none px-4 py-3 hover:bg-cyan-500/20 transition-colors duration-200 group-hover:text-cyan-400"
         >
            <SearchIcon size={18} className="text-slate-400 group-hover:text-cyan-400 transition-colors duration-200" />
         </Button>
      </form>
   )
}
