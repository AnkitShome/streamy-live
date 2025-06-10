import { ClerkProvider } from '@clerk/nextjs';
import './globals.css';

export const metadata = { title: 'Streamy' };

export default function RootLayout({ children }: { children: React.ReactNode }) {
   return (
      <html lang="en" className='dark'>
         <body>
            <ClerkProvider>
               {children}
            </ClerkProvider>
         </body>
      </html>
   );
}