import type { NextAuthConfig } from "next-auth";

export const authConfig: NextAuthConfig = {
    pages: {
        signIn: '/login',
        error: '/login' // redirect to Login on auth errors
    },
    providers: [],
    cookies: {
        csrfToken: {
            name: process.env.NODE_ENV === "production"
            ? "__Host-next-auth.csrf-token"
            : "next-auth.csrf-token",
            options: {
                httpOnly: true,
                sameSite: "lax",
                path: "/",
                secure: process.env.NODE_ENV === "production"

            }
        },
        sessionToken: {
            name: process.env.NODE_ENV === "production"
            ? "__Secure-next-auth.session-token"
            : "next-auth.session-token",
            options: {
                httpOnly: true,
                sameSite: "lax",
                path: "/",
                secure: process.env.NODE_ENV === "production"
            }    
        }
    },
    callbacks: {
        async jwt({token, user}) {
            if(user) {
                token.id = user.id;
                token.isAdmin = user.isAdmin
            }
            return token;
        },
        async session({session, token}) {
            if (token) {
                session.user.id = token.id as string;
                session.user.isAdmin = token.isAdmin as boolean; 
            }
           
            return session;
        },
        authorized ({auth, request}) {
            const user =  auth?.user;
            const isOnAdminPanel = request.nextUrl?.pathname.startsWith('/admin')
            const isOnBlogPage = request.nextUrl?.pathname.startsWith("/blog")
            const isOnLoginPage = request.nextUrl?.pathname.startsWith("/login")

            // ONLY ADMIN CAN REACH THE ADMIN DASHBOARD

            if(isOnAdminPanel && !user?.isAdmin) {
                return false 
            }

            // ONLY AUTHENTICATED USERS CAN REACH THE BLOG PAGE

            if (isOnBlogPage && !user) {
                return false
            }

            // ONLY AUTHENTICATED USERS CAN REACH THE LOGIN PAGE

            if(isOnLoginPage && user) {
                return Response.redirect(new URL("/", request.nextUrl))
            }

            return true;
        }
    },
    useSecureCookies: process.env.NODE_ENV === 'production',
    debug: process.env.NODE_ENV === "development"
};
