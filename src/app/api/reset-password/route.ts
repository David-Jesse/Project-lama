import { NextResponse } from "next/server";
import { connectToMongoDB } from "@/lib/db";
import { User } from "@/lib/models";
import bcrypt from "bcryptjs";

export async function POST(request: Request) {
    try {
        const {token, password} = await request.json();

        if(!token || !password) {
            return NextResponse.json(
                {message: "Token and password are required"},
                {status: 400}
            )
        }

        if(password.length < 8) {
            return NextResponse.json(
                {message: "Password must be at least 8 characters"},
                {status: 400}
            )
        }

        await connectToMongoDB();

        // Find user with this token and check if it's still valid
        const user = await User.findOne({
            resetPasswordToken: token,
            resetPasswordExpires: {$gt: Date.now()} // Check if the token is still valid (not expired)
        });

        if (!user) {
            return NextResponse.json(
                {message: "Invalid or expired token"},
                {status: 400}
            )
        }

        // Hash the new password
        const hashedPassword = await bcrypt.hash(password, 12);

        user.password = hashedPassword;
        user.resetPasswordToken = undefined; // Clear the reset token
        user.resetPasswordExpires = undefined; // Clear the expiration date
        await user.save();

        return NextResponse.json ({message: "Password has been reset successfullly"})
    } catch (error) {
        console.error("Password reset error:", error);
        return NextResponse.json (
            {message: "Failed to reset password"},
            {status: 500}
        )
    }
}