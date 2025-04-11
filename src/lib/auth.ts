import NextAuth from "next-auth"
import GitHub from "next-auth/providers/github"
import Google from "next-auth/providers/google"
import CredentialsProvider from "next-auth/providers/credentials"
import {Session} from "next-auth"
import { connectToMongoDB } from "./db"
import { User } from "./models"
import bcrypt from "bcryptjs"

interface CredentialsProps {
    username: string
    password: string
}

const login = async (credentials: CredentialsProps) => {
    try {
        connectToMongoDB()
        const user = await User.findOne({username: credentials.username})

        if (!user) {
            throw new Error("Wrong credentials!")
        }

        const isPasswordCorrect = await bcrypt.compare(
            credentials.password, 
            user.password
        )

        if (!isPasswordCorrect) {
            throw new Error ('Wrong credentials!')
        }

        return user;
    } catch (err) {
        console.log(err)
        throw new Error("failed to login")
    }
   
}
 
export const { 
    auth, 
    handlers:{GET, POST}, 
    signIn, 
    signOut } = NextAuth({
  providers: [
    GitHub({
        clientId: process.env.GITHUB_ID, 
        clientSecret: process.env.GITHUB_SECRET
    }), 
    CredentialsProvider({
        async authorize(credentials) {
            try {
                const user = await login(credentials as unknown as CredentialsProps);
                return user;
            } catch (err) {
                return { error: err, message: "error logging in" }
            }
        }
    }),
    Google
    ],
    callbacks: {
    async signIn ({user, account, profile}) {
        console.log(user)
        console.log(profile)
        
        if (account?.provider === "github") {
            console.log("this is the name:", user.name)
            await connectToMongoDB()
            console.log("Connected to DB!")
            try {
                const existingUser = await User.findOne({email: profile?.email})
                console.log("attempting to create user with username:", profile?.login)
                // console.log("Schema paths:", User.schema.paths);

                if (!existingUser) {
                    const newUser = new User ({
                        username: profile?.login,
                        email: profile?.email,
                        img: profile?.avatar_url,
                        password: profile?.id,
                        provider: 'github'
                    })
                    console.log('User to be saved:', newUser)
                    await newUser.save()
                }

            } catch (err) {
                console.error("Error connecting to DB!", err);
                return false 
            }
        } 
        return true
      }
    }
})

declare module "next-auth" {
    interface Session {
        user: {
            isAdmin: boolean;
        }
    }
}

export type SessionType = Session; 