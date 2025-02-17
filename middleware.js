import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import { getToken } from './utils/auth'; // Import the getToken function from auth.js
// Function to decode JWT
const verifyToken = (token) => {
    try {
        return jwt.decode(token); // Decode token (doesn't verify signature)
    } catch (error) {
        console.error('Invalid token:', error);
        return null;
    }
};

// Middleware function
export function middleware(req) {
    const token = req.cookies.get('jwt_token'); // Read JWT from cookies
    
    if (!token) {
        if (req.nextUrl.pathname === '/login' || req.nextUrl.pathname === '/register') {
            return NextResponse.next(); // Allow access to login and register pages if not authenticated
        }
        return NextResponse.redirect(new URL('/login', req.url)); // Redirect to login if not authenticated
    }
    const userData = verifyToken(token.value); // Decode the JWT
    
    if (!userData) {
        return NextResponse.redirect(new URL('/login', req.url));
    }
    const userRole = userData.roles ? userData.roles.toUpperCase() : null; // Extract role from JWT and handle undefined roles
    
    if (!userRole) {
        return NextResponse.redirect(new URL('/login', req.url)); // Redirect if role is not present
    }
    
    if (req.nextUrl.pathname.startsWith('/testator') && userRole !== 'TESTATOR') {
        return NextResponse.redirect(new URL('/unauthorized', req.url));
    }
    if (req.nextUrl.pathname.startsWith('/admin') && userRole !== 'ADMIN') {
        return NextResponse.redirect(new URL('/unauthorized', req.url));
    }

    if (req.nextUrl.pathname === '/login' || req.nextUrl.pathname === '/register') {
        return NextResponse.redirect(new URL('/', req.url)); // Redirect to home if authenticated and on login or register page
    }

    // if (req.nextUrl.pathname === '/dashboard' || req.nextUrl.pathname.startsWith('/user')) {
    //     if (userRole === 'TESTATOR') {
    //         return NextResponse.redirect(new URL('/testator/dashboard', req.url));
    //     } else if (userRole === 'ADMIN') {
    //         return NextResponse.redirect(new URL('/admin/dashboard', req.url));
    //     }
    // }

    return NextResponse.next(); // Allow access if role is valid
}

// Apply middleware only to protected routes
export const config = {
    matcher: ['/testator/:path*', '/admin/:path*', '/login', '/register', '/dashboard', '/user/:path*'], // Protect Testator, Admin, Login, Register, Dashboard, and User routes
};
