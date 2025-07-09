"use client"

import { AlertTriangle } from "lucide-react";
import { useState, useTransition, useRef } from "react";
import {
   Dialog, DialogClose, DialogContent, DialogHeader, DialogTitle, DialogTrigger
} from "@/components/ui/dialog"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
   Select,
   SelectContent,
   SelectItem,
   SelectTrigger,
   SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { createIngress } from "@/actions/ingress";
import { toast } from "sonner";

import { RTMP, WHIP } from "@/app/constants/ingress-types";

type IngressType = typeof RTMP | typeof WHIP;

export const ConnectModel = () => {
   const closeRef = useRef<React.ElementRef<"button">>(null)
   const [ingressType, setIngressType] = useState<IngressType>(RTMP)
   const [isPending, startTransition] = useTransition()

   const onSubmit = () => {
      startTransition(() => {
         createIngress(parseInt(ingressType))
            .then(() => {
               toast.success("Ingress created")
               closeRef?.current?.click();
            })
            .catch(() => toast.error("Something went wrong"))
      })
   }

   return (
      <Dialog>
         <DialogTrigger asChild>
            <Button variant='stream'>Generate Connection</Button>
         </DialogTrigger>
         <DialogContent>
            <DialogHeader>
               <DialogTitle>
                  Generate connection
               </DialogTitle>
            </DialogHeader>
            <Select
               value={ingressType}
               onValueChange={(value) => setIngressType(value)}
               disabled={isPending}
            >
               <SelectTrigger className="w-full">
                  <SelectValue placeholder="Ingress type" />
               </SelectTrigger>
               <SelectContent>
                  <SelectItem value={RTMP}>RTMP</SelectItem>
                  <SelectItem value={WHIP}>WHIP</SelectItem>
               </SelectContent>
            </Select>
            <Alert>
               <AlertTriangle className="h-4 w-4" />
               <AlertTitle>Warning!</AlertTitle>
               <AlertDescription>
                  This action will reset all active streams using the current
                  connection
               </AlertDescription>
            </Alert>
            <div className="flex justify-between">
               <DialogClose ref={closeRef} asChild>
                  <Button variant="ghost">Cancel</Button>
               </DialogClose>
               <Button
                  disabled={isPending}
                  onClick={onSubmit}
                  variant="stream"
               >
                  Generate
               </Button>
            </div>
         </DialogContent>
      </Dialog>
   )
}