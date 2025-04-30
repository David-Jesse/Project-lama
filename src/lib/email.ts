import nodemailer from "nodemailer";

type EmailPayload = {
    to: string;
    subject: string;
    text: string;
    html: string;
}

// this function configuration supports google email provider

export async function sendEmail({to, subject, text, html}: EmailPayload) {
    // Create a transporter
    const transporter = nodemailer.createTransport({
        host: process.env.EMAIL_SERVER_HOST,
        port: Number(process.env.EMAIL_SERVER_PORT),
        secure: process.env.EMAIL_SERVER_SECURE === "true",
        auth: {
            user: process.env.EMAIL_SERVER_USER,
            pass: process.env.EMAIL_SERVER_PASSWORD,
        },
    })

    try {
        const result = await transporter.sendMail({
            from: process.env.EMAIL_FROM,
            to,
            subject,
            text,
            html,
        })
        return result;
    } catch (error) {
        console.error("Failed to send email:", error);
        throw new Error("Failed to send email");
    }
}

// For testing and developmemnt
export async function createTextAccount() {
    const testAccount = await nodemailer.createTestAccount();
    console.log("Test account created:", testAccount);
    return testAccount;
}

// okqr kpim pshf yuzg