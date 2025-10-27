import { stackServerApp } from './stack';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Protected routes that require authentication
const protectedRoutes = [
    '/dashboard',
    '/match',
    '/results',
    '/essay-analyzer',
    '/interview-prep',
    '/profile',
];

// Public routes that don't require authentication
const publicRoutes = [
    '/',
    '/handler',
];

export async function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;

    // Check if the route is protected
    const isProtectedRoute = protectedRoutes.some(route => pathname.startsWith(route));
    const isPublicRoute = publicRoutes.some(route => pathname.startsWith(route));

    // Allow public routes and handler routes (Stack Auth)
    if (isPublicRoute || pathname.startsWith('/handler')) {
        return NextResponse.next();
    }

    // Check authentication for protected routes
    if (isProtectedRoute) {
        try {
            const user = await stackServerApp.getUser();

            if (!user) {
                // Redirect to sign-in page
                const signInUrl = new URL('/handler/sign-in', request.url);
                signInUrl.searchParams.set('redirect', pathname);
                return NextResponse.redirect(signInUrl);
            }
        } catch (error) {
            // If there's an error getting the user, redirect to sign-in
            console.error('Middleware auth error:', error);
            const signInUrl = new URL('/handler/sign-in', request.url);
            signInUrl.searchParams.set('redirect', pathname);
            return NextResponse.redirect(signInUrl);
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - api (API routes)
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         */
        '/((?!api|_next/static|_next/image|favicon.ico).*)',
    ],
};
