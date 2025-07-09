import { Input } from "@/components/ui/input"
import { CopyButton } from "./copy-button"

interface UrlCardProps {
   value: string | null
}

export const UrlCard = ({ value }: UrlCardProps) => {
   return (
      <div className="rounded-xl w-full bg-slate-600/60 text-slate-200 p-6">
         <div className="flex items-center gap-x-10 w-full">
            <p className="font-semibold shrink-0">Server URL</p>
            <Input
               className="border-none placeholder:text-slate-100"
               value={value || ""}
               disabled
               placeholder="Server Url"
            />
            <CopyButton
               value={value || ""} />
         </div>
      </div>
   )
}
