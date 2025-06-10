import { ClerkProvider } from '@clerk/nextjs';
import './globals.css';

export const metadata = { title: 'Streamy' };

export default function RootLayout({ children }: { children: React.ReactNode }) {
   return (
      <ClerkProvider>
         <html lang="en" className=''>
            <body>
               {children}
            </body>
         </html>
      </ClerkProvider>
   );
}