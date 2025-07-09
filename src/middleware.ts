import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';

const isApiWebhook = createRouteMatcher(['/api/webhooks/livekit']);

export default clerkMiddleware((auth, req) => {
   if (isApiWebhook(req)) {
      return;
   }
   console.log("Clerk middleware running for:", req.nextUrl.pathname);
});

export const config = {
   matcher: [
      '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
      '/(api|trpc)(.*)',
   ],
};
