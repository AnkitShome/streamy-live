"use client"

import { toast } from "sonner"
import { useTransition } from "react";

import { Switch } from "@/components/ui/switch";
import { updateStream } from "@/actions/stream";
import { Skeleton } from "@/components/ui/skeleton";

type FieldTypes = "isChatEnabled" | "isChatDelayed" | "isChatFollowersOnly";

interface ToggleCardProps {
   label: string;
   field: FieldTypes;
   value: boolean;
}

export const ToggleCard = ({ label, value = false, field }: ToggleCardProps) => {
   const [isPending, startTransition] = useTransition()
   const onChange = (() => {
      startTransition(() => {
         updateStream({ [field]: !value })
            .then(() => toast.success(`${label} setting updated`))
            .catch(() => toast.error(`Failed to update ${label}`))
      })
   })

   return (
      <div className="rounded-xl bg-slate-500/100 text-slate-200 p-6">
         <div className="flex items-center justify-between gap-x-2">
            <p className="font-semibold">{label}</p>
            <div className="mt-1">
               <Switch
                  checked={value}
                  disabled={isPending}
                  onCheckedChange={onChange}
               >
                  {value ? "On" : "Off"}
               </Switch>
            </div>
         </div>
      </div>
   )
}

export const ToggleCardSkeleton = () => {
   return (
      <Skeleton className="rounded-xl bg-slate-500/100 w-full" />
   )
}