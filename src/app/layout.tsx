import { ClerkProvider } from '@clerk/nextjs';
import '../styles/globals.css';

export const metadata = { title: 'Streamy' };

export default function RootLayout({ children }: { children: React.ReactNode }) {
   return (
      <html lang="en">
         <body>
            <ClerkProvider>
               {children}
            </ClerkProvider>
         </body>
      </html>
   );
}