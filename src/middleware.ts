import NextAuth from "next-auth"
import { authConfig } from "./lib/auth.config"
//import { NextRequest, NextResponse } from "next/server";

export default NextAuth(authConfig).auth;

// export default auth((req) => {
//     const {nextUrl} = req;
//     const isAuthenticated = !!req.auth

//     const publicRoutes = ['/login', '/api/auth'];

//     if (publicRoutes.includes(nextUrl.pathname)) {
//         if (isAuthenticated)
//     }
// })

// const publicRoutes = [
//     '/',
//     '/login',
//     '/api/auth'
// ]


export const config = {
     matcher: ['/((?!api/auth|_next/static|_next/image|favicon.ico|auth/login).*)'],
    // matcher: ["/((?!api|static|.*\\..*|_next).*)"],
}

