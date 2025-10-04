// server endpoint: receives form POST and sends email via SMTP (nodemailer)
import nodemailer from 'nodemailer';
import { json } from '@sveltejs/kit';
import { env } from '$env/dynamic/private';

/**
 * POST handler receives form-data:
 * - name
 * - email
 * - subject
 * - message
 *
 * Returns JSON: { success: true } or { success: false, error: '...' }
 */

export async function POST({ request }) {
  try {
    const form = await request.formData();
    const name = String(form.get('name') || '').trim();
    const email = String(form.get('email') || '').trim();
    const subject = String(form.get('subject') || 'Customer message').trim();
    const message = String(form.get('message') || '').trim();

    // Basic validation
    if (!name || !email || !message) {
      return json({ success: false, error: 'Please fill name, email, and message.' }, { status: 400 });
    }

    // Ensure SMTP envs exist
    const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, SMTP_SECURE, CONTACT_TO, CONTACT_FROM } = env;

    if (!SMTP_HOST || !SMTP_USER || !SMTP_PASS || !CONTACT_TO || !CONTACT_FROM) {
      console.error('Missing SMTP or contact env variables.');
      return json({ success: false, error: 'Server not configured for outgoing mail.' }, { status: 500 });
    }

    const transporter = nodemailer.createTransport({
      host: SMTP_HOST,
      port: SMTP_PORT ? Number(SMTP_PORT) : 587,
      secure: SMTP_SECURE === 'true', // true for 465, false for other ports
      auth: {
        user: SMTP_USER,
        pass: SMTP_PASS
      }
    });

    const mailOptions = {
      from: CONTACT_FROM, // must be allowed by SMTP provider
      to: CONTACT_TO,
      subject: `[Contact] ${subject}`,
      replyTo: `${name} <${email}>`,
      text: `
You received a new message from the contact form:

Name: ${name}
Email: ${email}
Subject: ${subject}
Message:
${message}
      `,
      html: `
        <h3>New contact form message</h3>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Subject:</strong> ${subject}</p>
        <hr />
        <pre style="white-space:pre-wrap">${escapeHtml(message)}</pre>
      `
    };

    // send mail
    const info = await transporter.sendMail(mailOptions);
    console.log('Contact form delivered:', info.messageId);

    return json({ success: true });
  } catch (err) {
    console.error('Error sending contact mail:', err);
    return json({ success: false, error: 'Failed to send message.' }, { status: 500 });
  }
}

// small helper to avoid raw HTML injection (basic)
function escapeHtml(unsafe) {
  return unsafe
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');
}
