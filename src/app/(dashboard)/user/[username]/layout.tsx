// layout.tsx
import { getSelfByUsername } from "@/lib/user-actions";
import { redirect } from "next/navigation";
import { Navbar } from "./_components/navbar";
import { Sidebar } from "./_components/sidebar";

interface CreatorLayoutProps {
   params: { username: string };
   children: React.ReactNode;
}

const CreatorLayout = async ({ params, children }: CreatorLayoutProps) => {
   const resolvedParams = await params
   const self = await getSelfByUsername(resolvedParams.username)

   if (!self) redirect("/")

   return (
      <div className="flex flex-col h-screen overflow-hidden">
         <Navbar />
         <div className="flex flex-1 overflow-hidden bg-slate-700">
            <Sidebar />
            <main className="flex-1 h-full overflow-auto">
               {children}
            </main>
         </div>
      </div>
   )
}

export default CreatorLayout
