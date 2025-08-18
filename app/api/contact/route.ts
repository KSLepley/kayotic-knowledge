import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, phone, service, subject, message } = body

    // Basic validation
    if (!name || !email || !service) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // For now, we'll just log the submission
    // In production, you'd integrate with an email service like SendGrid, Mailgun, etc.
    console.log('Contact Form Submission:', {
      name,
      email,
      phone,
      service,
      subject,
      message,
      timestamp: new Date().toISOString()
    })

    // You can integrate with email services here:
    // - SendGrid: https://sendgrid.com/
    // - Mailgun: https://mailgun.com/
    // - Resend: https://resend.com/
    // - Or use Vercel's built-in email functionality

    // For now, return success
    return NextResponse.json(
      { 
        success: true, 
        message: 'Thank you! Your message has been received. We\'ll get back to you within 24 hours.' 
      },
      { status: 200 }
    )

  } catch (error) {
    console.error('Contact form error:', error)
    return NextResponse.json(
      { error: 'Something went wrong. Please try again.' },
      { status: 500 }
    )
  }
} 