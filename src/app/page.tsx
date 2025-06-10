import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function Home() {
   return (
      <div className="min-h-screen m-5 flex flex-col justify-center space-y-2 items-center border ">
         <button className="bg-blue-500 rounded-l px-4 py-1 text-white hover:bg-blue-800 ">Hello</button>
         <Button variant='chai'>Custom</Button>
         <Button variant='outline' size='sm'>ShadCn button</Button>
      </div >
   );
}
