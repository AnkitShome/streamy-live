import { ClerkProvider } from '@clerk/nextjs';
import './globals.css';
import { orbitron, inter } from "./fonts";

export const metadata = { title: 'Streamy' };

export default function RootLayout({ children }: { children: React.ReactNode }) {
   return (
      <ClerkProvider>
         <html lang="en" className={`${inter.variable}`}>
            <body>
               {children}
            </body>
         </html>
      </ClerkProvider>
   );
}