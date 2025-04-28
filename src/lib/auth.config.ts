import type { NextAuthConfig } from "next-auth";

export const authConfig: NextAuthConfig = {
    pages: {
        signIn: '/login',
        error: '/login' // redirect to Login on auth errors
    },
    providers: [],
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
        // async signIn({user, account, profile}) {
        //     console.log(profile)
        //     try{
        //         if (account?.provider === 'google') {
               
        //             console.log("google sign in:", user.email)
        //         }
        //     } catch(error) {
        //         console.error("Error in SignIn callback:", error)
        //         return false;
        //     }
           
        //     return true
        // },
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
};
