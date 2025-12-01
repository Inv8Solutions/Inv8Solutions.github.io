/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

const { setGlobalOptions } = require('firebase-functions')
const { onCall } = require('firebase-functions/v2/https')
const logger = require('firebase-functions/logger')
const { Resend } = require('resend')
const { defineSecret } = require('firebase-functions/params')

// Define Resend API key as secret
const resendApiKey = defineSecret('RESEND_API_KEY')

// For cost control, you can set the maximum number of containers that can be
// running at the same time. This helps mitigate the impact of unexpected
// traffic spikes by instead downgrading performance. This limit is a
// per-function limit. You can override the limit for each function using the
// `maxInstances` option in the function's options, e.g.
// `onRequest({ maxInstances: 5 }, (req, res) => { ... })`.
// NOTE: setGlobalOptions does not apply to functions using the v1 API. V1
// functions should each use functions.runWith({ maxInstances: 10 }) instead.
// In the v1 API, each function can only serve one request per container, so
// this will be the maximum concurrent request count.
setGlobalOptions({ maxInstances: 10 })

// Send confirmation email function
exports.sendInquiryConfirmation = onCall(
  {
    secrets: [resendApiKey],
  },
  async (request) => {
    const inquiry = request.data

    if (!inquiry || !inquiry.email) {
      logger.error('Inquiry data or email field is missing')
      return { success: false, error: 'Missing inquiry data or email' }
    }

    try {
      // Initialize Resend with secret
      const resend = new Resend(resendApiKey.value())

      const emailHtml = createEmailHtml(inquiry)

      const { data, error } = await resend.emails.send({
        from: 'Inv8 Solutions <hello@inv8.io>',
        to: [inquiry.email],
        subject: 'Thank you for your inquiry - Inv8 Solutions',
        html: emailHtml,
      })

      if (error) {
        logger.error('Failed to send email:', error)
        return { success: false, error: error.message }
      }

      logger.info(`Confirmation email sent to ${inquiry.email}`)
      return { success: true, messageId: data }
    } catch (error) {
      logger.error('Error sending confirmation email:', error)
      return { success: false, error: error.message }
    }
  },
)

// Helper function to create email HTML
function createEmailHtml(inquiry) {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Thank you for your inquiry</title>
      <style>
        body {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto,
            sans-serif;
          line-height: 1.6;
          color: #333;
          max-width: 600px;
          margin: 0 auto;
          padding: 20px;
          background-color: #f8f9fa;
        }
        .container {
          background-color: white;
          padding: 40px;
          border-radius: 12px;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }
        .header {
          text-align: center;
          margin-bottom: 30px;
        }
        .logo {
          color: #2563eb;
          font-size: 28px;
          font-weight: bold;
          margin-bottom: 10px;
        }
        .title {
          color: #1f2937;
          font-size: 24px;
          margin-bottom: 20px;
        }
        .content {
          margin-bottom: 30px;
        }
        .details {
          background-color: #f3f4f6;
          padding: 20px;
          border-radius: 8px;
          margin: 20px 0;
        }
        .detail-item {
          margin-bottom: 10px;
        }
        .detail-label {
          font-weight: 600;
          color: #6b7280;
          font-size: 14px;
        }
        .detail-value {
          color: #1f2937;
          margin-top: 2px;
        }
        .footer {
          text-align: center;
          margin-top: 40px;
          padding-top: 20px;
          border-top: 1px solid #e5e7eb;
          color: #6b7280;
          font-size: 14px;
        }
        .contact-info {
          margin-top: 20px;
          padding: 20px;
          background-color: #eff6ff;
          border-radius: 8px;
          border-left: 4px solid #2563eb;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <div class="logo">Inv8 Solutions</div>
          <h1 class="title">Thank you for your inquiry!</h1>
        </div>

        <div class="content">
          <p>Hi ${inquiry.name},</p>
          <p>We have received your inquiry and are excited to learn more about
             your project. Our team will review your requirements and get back to
             you within 24 hours during business days.</p>

          <div class="details">
            <div class="detail-item">
              <div class="detail-label">Service Interested In:</div>
              <div class="detail-value">${inquiry.service}</div>
            </div>
            ${
              inquiry.budget
                ? `
            <div class="detail-item">
              <div class="detail-label">Estimated Budget:</div>
              <div class="detail-value">${inquiry.budget}</div>
            </div>
            `
                : ''
            }
            ${
              inquiry.timeline
                ? `
            <div class="detail-item">
              <div class="detail-label">Project Timeline:</div>
              <div class="detail-value">${inquiry.timeline}</div>
            </div>
            `
                : ''
            }
            ${
              inquiry.company
                ? `
            <div class="detail-item">
              <div class="detail-label">Company:</div>
              <div class="detail-value">${inquiry.company}</div>
            </div>
            `
                : ''
            }
          </div>

          <p><strong>What happens next:</strong></p>
          <ul>
            <li>Our team will review your project requirements</li>
            <li>We will prepare a personalized proposal</li>
            <li>We will schedule a consultation call to discuss details</li>
          </ul>
        </div>

        <div class="contact-info">
          <p><strong>Need to reach us sooner?</strong></p>
          <p>Email: <a href="mailto:hello@inv8.studio" style="color: #2563eb;">
             hello@inv8.studio</a></p>
          <p>We typically respond within 24 hours on business days.</p>
        </div>

        <div class="footer">
          <p>© 2025 Inv8 Solutions. All rights reserved.</p>
          <p>Weekdays · 9am - 6pm</p>
        </div>
      </div>
    </body>
    </html>
  `
}
