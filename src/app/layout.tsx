import { ClerkProvider } from '@clerk/nextjs';
import { Toaster } from "sonner";

import './globals.css';
import { orbitron, inter } from "./fonts";

export const metadata = { title: 'Streamy' };

export default function RootLayout({ children }: { children: React.ReactNode }) {
   return (
      <ClerkProvider>
         <html lang="en" className={`${inter.variable}`}>
            <body>
               <Toaster position="top-right" />
               {children}
            </body>
         </html>
      </ClerkProvider>
   );
}