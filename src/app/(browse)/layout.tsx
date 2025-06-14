import { Navbar } from "./_components/navbar";
import { Sidebar } from "./_components/sidebar";

const BrowseLayout = ({ children }: { children: React.ReactNode }) => {
   return (
      <div className="flex flex-col h-screen">
         {/* Navbar at top */}
         <Navbar />

         {/* Sidebar and page content side-by-side */}
         <div className="flex flex-1 overflow-hidden">
            <Sidebar />
            <main className="flex-1 overflow-y-auto p-6">
               {children}
            </main>
         </div>
      </div>
   );
};

export default BrowseLayout;
