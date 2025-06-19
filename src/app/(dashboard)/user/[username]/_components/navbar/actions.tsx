"use client"
import Link from "next/link"
import { LogOut } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function Actions() {

   return (
      <div className="flex items-center justify-end gap-x-2">
         <Button className='text-slate-400 hover:bg-transparent hover:text-white' variant='ghost' asChild>
            <Link href='/'>
               <LogOut className="h-7 w-7 mr-1"/>
               Exit
            </Link>
         </Button>
      </div >
   )
}
