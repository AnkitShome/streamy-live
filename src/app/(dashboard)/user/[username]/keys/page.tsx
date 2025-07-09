import { Button } from "@/components/ui/button"
import { getStreamByUserId } from "@/lib/stream-service";
import { getSelf } from "@/lib/user-actions";
import { UrlCard } from "./_components/url-card";
import { KeyCard } from "./_components/key-card";
import { ConnectModel } from "./_components/connect-model";


const KeysPage = async () => {

   const self = await getSelf();
   const stream = await getStreamByUserId(self.id)
   if (!stream) throw new Error("Stream not found");

   return (
      <div className="w-full p-6">
         <div className="flex items-center justify-between mb-4">
            <h1 className="text-2xl font-bold text-slate-200">Keys and URLs</h1>
         </div>
         <ConnectModel />
         <div className="space-y-4">
            <UrlCard value={stream.serverUrl} />
            <KeyCard value={stream.streamKey} />
         </div>
      </div >
   )
}

export default KeysPage
