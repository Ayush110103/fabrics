import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth' // adjust the path as needed

export async function POST(req) {
  try {
    // Get session and sender email from the logged-in user
    const session = await getServerSession(authOptions, req)
    if (!session) {
      return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 })
    }
    const senderEmail = session.user.email

    const { invitations } = await req.json()
    if (!invitations || !Array.isArray(invitations)) {
      return new Response(JSON.stringify({ error: 'Invalid invitations payload' }), { status: 400 })
    }

    // For each invitation, simulate an email send using the logged-in email as sender
    invitations.forEach((invitation) => {
      console.log(`From: ${senderEmail}`)
      console.log(`To: ${invitation.email}`)
      console.log(`Subject: Invitation to Access the File`)
      console.log(`Message: You have been invited as a ${invitation.role}. [Include your access link here]`)
      // Replace the above with your actual sending logic if not using nodemailer
    })

    return new Response(JSON.stringify({ message: 'Emails sent successfully' }), { status: 200 })
  } catch (error) {
    console.error('Error sending invitations:', error)
    return new Response(JSON.stringify({ error: error.message }), { status: 500 })
  }
}