import nodemailer from 'nodemailer';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
    const { invites } = await request.json();

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        },
    });

    // Generate a join link for the invited users.
    const joinLink = 'https://fabrics-taupe.vercel.app/dashboard';

    for (const invite of invites) {
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: invite.email,
            subject: 'Invitation to join the team',
            html: `
                <p>You have been invited as a ${invite.role}.</p>
                <p>Click <a href="${joinLink}">here</a> to join our team.</p>
            `,
        };

        try {
            await transporter.sendMail(mailOptions);
        } catch (error) {
            console.error('Error sending email to', invite.email, error);
            return NextResponse.json({ error: `Failed to send email to ${invite.email}` }, { status: 500 });
        }
    }

    return NextResponse.json({ message: 'Invites sent successfully' });
}