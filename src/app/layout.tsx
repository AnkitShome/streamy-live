// app/layout.tsx
import { ClerkProvider } from '@clerk/nextjs';
import { Toaster } from "sonner";
import { redirect } from 'next/navigation';

import './globals.css';
import { inter } from "./fonts";

import { getSelf } from '@/lib/user-actions';
import { SocketHandler } from '@/components/socket/socket-handler';

export const metadata = { title: 'Streamy' };

export default async function RootLayout({ children }: { children: React.ReactNode }) {
   const self = await getSelf(); // ✅ safe, server-side

   if (!self) redirect("/sign-in");

   return (
      <ClerkProvider>
         <html lang="en" className={`${inter.variable}`}>
            <body>
               <Toaster position="top-right" />
               <SocketHandler userId={self.id} />
               {children}
            </body>
         </html>
      </ClerkProvider>
   );
}
