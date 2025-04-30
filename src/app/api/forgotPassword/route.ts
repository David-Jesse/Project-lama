import { NextResponse } from "next/server";
import { connectToMongoDB } from "@/lib/db";
import { User } from "@/lib/models";
import {sendEmail} from '@/lib/email';
import crypto from 'crypto'

export async function POST(request: Request) {
    try {
        const {email} = await request.json();

        if (!email) {
            return NextResponse.json(
                {message: "Email is required"},
                {status: 400}
            )
        }

        // Connect to MongoDB
        await connectToMongoDB();

        const user = await User.findOne({email: email.toLowerCase()});

        if (user) {
            // Generate a reset token that expires in 1 hour
            const resetToken = crypto.randomBytes(32).toString("hex");
            const resetTokenExpiry = Date.now() + 3600000; // 1 hour in milliseconds

            // Save the reset token to the user document
            user.resetPasswordToken = resetToken;
            user.resetPasswordExpires = resetTokenExpiry;
            await user.save();

            const resetUrl = `${process.env.NEXTAUTH_URL}/reset-password?token=${resetToken}`;

            await sendEmail({
                to: user.email,
                subject: "Password Reset Request",
                text: `You requested a password reset. Click the link below to reset your password. This link will expire in 1 hour.\n\n${resetUrl}`,
                html: `
                    <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
                        <h2 style="color: #333; text-align: center;">Password Reset Request</
                        <p>You requested a password reset for your account. Click the button below to reset your password:</p>
                        <div style="text-align: center; margin: 30px 0;">
                            <a href="${resetUrl}" style="background-color: #3b82f6; color: white; padding: 12px 24px; text-decoration: none; border-radius: 4px; display: inline-block;"> Reset Password</a>
                        </div>
                        <p>This link will expire in 1 hour.</p>
                        <p>If you didn't request this, please ignore this email and your password will remain unchanged.</p>
                        <p>Cheers, <br/>DJ</p>
                    </div>
                `,
            });
        }

        return NextResponse.json({
            message: "If an account with this email exists, a password reset link has been sent.",
        })
    } catch (error) {
        console.error("Forgot password error:", error);
        return NextResponse.json(
            {message: "Failed to process your request"},
            {status: 500}
        )
    }
}

