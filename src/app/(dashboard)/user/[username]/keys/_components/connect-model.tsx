"use client"

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
import { AlertTriangle } from "lucide-react";

export const ConnectModel = () => {

   // const closeRef = useRef<ElementRef<"button">>(null);
   // const [isPending, startTransition] = useTransition();
   // const [ingressType, setIngressType] = useState<IngressType>(RTMP);

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
            <Select>
               <SelectTrigger className="w-full">
                  <SelectValue placeholder="Ingress type" />
               </SelectTrigger>
               <SelectContent>
                  <SelectItem value="RTMP">RTMP</SelectItem>
                  <SelectItem value="WHIP">WHIP</SelectItem>
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
               <DialogClose asChild>
                  <Button variant="ghost">Cancel</Button>
               </DialogClose>
               <Button
                  onClick={() => { }}
                  variant="stream">
                  Generate
               </Button>
            </div>
         </DialogContent>
      </Dialog>
   )
}