import { getSelfByUsername } from "@/lib/user-actions";
import { redirect } from "next/navigation";
import { Navbar } from "./_components/navbar";
import { Sidebar } from "./_components/sidebar";


interface CreatorLayoutProps{
   params:{username:string};
   children:React.ReactNode;
}

const CreatorLayout=async({params,children}:CreatorLayoutProps)=>{
   // const {username}=await params;

   const self=await getSelfByUsername(params.username)
   
   if(!self)   redirect("/")

   return(
      <div className="flex flex-col h-screen">
         <Navbar/>
         <div className="flex h-full min-h-screen bg-slate-700">
            <Sidebar/>
            {children}
         </div>
      </div>
   )
}

export default CreatorLayout