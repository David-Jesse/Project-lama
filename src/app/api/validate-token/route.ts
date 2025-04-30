import { NextResponse } from "next/server";
import { connectToMongoDB } from "@/lib/db";
import { User } from "@/lib/models";

export async function POST(request: Request) {
    try {
        const {token} = await request.json();

        if(!token) {
            return NextResponse.json(
                {message: "Token is required"},
                {status: 400}
            );
        }

        await connectToMongoDB();

        // Find user with this token and check if it's still valid
        const user = await User.findOne({
            resetPasswordToken: token,
            resetPasswordExpires: {$gt: Date.now()} // Check if the token is still valid (not expired)
        })

        if(!user) {
            return NextResponse.json(
                {message: "Invalid or expired token"},
                {status: 400}
            );
        }

        return NextResponse.json({message: "Token is valid"}, {status: 200});
    } catch (error){
        console.error("Token validation error:", error)
        return NextResponse.json(
            {message: "Failed to validate token"},
            {status: 500}
        )
    }
}

