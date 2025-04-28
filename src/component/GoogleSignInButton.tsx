// "use client"

// import { signIn } from "next-auth/react"
// import { useState } from "react"

// export default function GoogleSignInButton() {
//     const [isLoading, setIsLoading] = useState(false)

//     const handleGoogleSignIn = async () => {
//         setIsLoading(true)
//         try {
//             await signIn('google', {
//                 callback: '/',
//                 redirect: true 
//             })
//         } catch (error) {
//             console.error('Error signing in with Google:', error)
//         } finally {
//             setIsLoading(false)
//         }
//     }
// }