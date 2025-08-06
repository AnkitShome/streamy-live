// import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';

// const isApiWebhook = createRouteMatcher(['/api/webhooks/livekit']);
// const isPublicRoute = createRouteMatcher(['/sign-in']);

// export default clerkMiddleware((auth, req) => {
//    if (isApiWebhook(req) || isPublicRoute(req)) {
//       return; // <-- Don't run Clerk auth checks here
//    }
//    console.log("Clerk middleware running for:", req.nextUrl.pathname);
// });

// export const config = {
//    matcher: [
//       '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
//       '/(api|trpc)(.*)',
//    ],
// };


// middleware.ts
import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';

const isPublicRoute = createRouteMatcher([
   '/sign-in',
   '/api/webhooks/livekit'
]);

export default clerkMiddleware((auth, req) => {
   if (isPublicRoute(req)) return;
   // console.log("🔐 Clerk middleware protecting:", req.nextUrl.pathname);
});

export const config = {
   matcher: [
      '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
      '/(api|trpc)(.*)',
   ],
};
