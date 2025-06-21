import { Maximize, Minimize } from "lucide-react";
import { Hint } from "../hint";

interface FullScreenControlProps {
   isFullScreen: boolean,
   onToggle: () => void;
}

export const FullScreenControl = ({ isFullScreen, onToggle }: FullScreenControlProps) => {

   const Icon = isFullScreen ? Maximize : Minimize;
   const label = isFullScreen ? "Exit Full screen" : "Full screen";

   return (
      <div className="flex items-center justify-center gap-4">
         <Hint label={label} asChild>
            <button className="text-white p-1.5 hover:bg-white/10 rounded-lg" onClick={onToggle}>
               <Icon className="h-5 w-5" />
            </button>
         </Hint>
      </div>
   )
}