"use client"

import { Input } from "@/components/ui/input"
import { CopyButton } from "./copy-button"
import { Button } from "@/components/ui/button"
import { useState } from "react"

interface KeyCardProps {
   value?: string | null
}

export const KeyCard = ({ value }: KeyCardProps) => {
   const [show, setShow] = useState(false)

   return (
      <div className="rounded-xl w-full bg-slate-600/60 text-slate-200 p-6">
         <div className="flex items-center gap-x-10">
            <p className="font-semibold shrink-0">Server Key</p>
            <Input
               className="border-none placeholder:text-slate-100"
               value={value || ""}
               type={show ? "text" : "password"}
               disabled
               placeholder="Stream Key"
            />
            <CopyButton value={value || ""} />
         </div>
         <Button onClick={() => setShow(!show)} size="sm" variant='link' className="text-slate-200 cursor-pointer">
            {show ? "Hide" : "Show"}
         </Button>
      </div>
   )
}