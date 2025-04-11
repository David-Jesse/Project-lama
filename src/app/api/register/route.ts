// import {NextRequest, NextResponse} from 'next/server'
// import { connectToMongoDB } from '@/lib/db'
// import { User } from '@/lib/models'
// import bcrypt from 'bcryptjs'

// export async function POST(req: NextRequest) {
//     try {
//         const formData = await req.json()
//         const {username, email, password, passwordRepeat, img} = formData;

//         if (!username || !email || !password || !passwordRepeat) {
//             return NextResponse.json({error: 'All fields are required'}, {status: 400})
//         }

//         if (password !== passwordRepeat) {
//             return NextResponse.json({error: 'Passwords do not match!'}, {status: 400})
//         }
        
//         await connectToMongoDB();

//         const existingUser = await User.findOne({username})

//         if (existingUser) {
//             return NextResponse.json({error: 'Username already exists'}, {status: 400})
//         }

//         const hashedPassword = await bcrypt.hash(password, 10)

//         const newUser = new User({
//             username, 
//             email,
//             password: hashedPassword,
//             img: img || '',
//         })

//         await newUser.save()
//         console.log('Saved to DB!')
//         return NextResponse.json({success: true, user: newUser}, {status: 201})
//     } catch (err) {
//         console.error('Registatration error:', err)
//         return NextResponse.json({error: "Failed to create account. Please try again later"}, {status: 500})
//     }
// }

// export async function GET() {
//     return NextResponse.json(
//         {error: 'GET method is not supported for this route'},
//         {status: 405}
//     )
// }

// export const registerUser = async (formData: {
//     username: string;
//     email: string;
//     password: string;
//     passwordRepeat: string;
//     img?: string;
// }) => {
//     const {username, email, password, passwordRepeat, img} = formData;

//     if (password !== passwordRepeat) {
//         return {error: "Password does not match"}
//     }

//     try {
//         await connectToMongoDB()

//         const existingUser = await User.findOne({username})
//         if (existingUser) {
//             return {error: "Username already exists"}
//         }

//         const hashedPassword = await bcrypt.hash(password, 10);

//         const newUser = new User({
//             username,
//             email,
//             password: hashedPassword,
//             img,
//         })

//         await newUser.save()
//         console.log('Saved to DB!')

//         return {success: true, user: newUser};
//     } catch (err) {
//         console.error('Registration error:', err)
//         return {error: "Something went wrong!"}
//     }
// };

// // Next.js API handler

// //export default handler;