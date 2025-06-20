import { Resend } from 'resend'
import nodemailer from 'nodemailer'
import { emailTemplates } from '../email-templates'

interface EmailTemplate {
  subject: string
  html: string
  text: string
}

// Email template factory
class EmailTemplateFactory {
  static createPasswordResetEmail(resetUrl: string): EmailTemplate {
    return emailTemplates.passwordReset(resetUrl)
  }
  
  static createVerificationEmail(verifyUrl: string): EmailTemplate {
    return emailTemplates.verification(verifyUrl)
  }
}

// Email service interface (Dependency Inversion Principle)
interface IEmailService {
  sendEmail(to: string, template: EmailTemplate): Promise<void>
}

// Mock email service for development
class MockEmailService implements IEmailService {
  async sendEmail(to: string, template: EmailTemplate): Promise<void> {
    console.log('📧 Mock Email Service')
    console.log('To:', to)
    console.log('Subject:', template.subject)
    console.log('---')
    console.log(template.text)
    console.log('---')
  }
}

// Resend email service (Cloudflare uyumlu)
class ResendEmailService implements IEmailService {
  private resend: Resend
  
  constructor() {
    this.resend = new Resend(process.env.RESEND_API_KEY)
  }
  
  async sendEmail(to: string, template: EmailTemplate): Promise<void> {
    try {
      await this.resend.emails.send({
        from: process.env.EMAIL_FROM || 'hello@kocaelisekerleme.com',
        to,
        subject: template.subject,
        html: template.html,
        text: template.text,
      })
    } catch (error) {
      console.error('Resend email error:', error)
      throw new Error('E-posta gönderilemedi')
    }
  }
}

// SMTP email service (Gmail, SendGrid, vb.)
class NodemailerEmailService implements IEmailService {
  private transporter: nodemailer.Transporter
  
  constructor() {
    this.transporter = nodemailer.createTransport({
      host: process.env.EMAIL_SERVER_HOST,
      port: parseInt(process.env.EMAIL_SERVER_PORT || '587'),
      secure: false,
      auth: {
        user: process.env.EMAIL_SERVER_USER,
        pass: process.env.EMAIL_SERVER_PASSWORD,
      },
    })
  }
  
  async sendEmail(to: string, template: EmailTemplate): Promise<void> {
    try {
      await this.transporter.sendMail({
        from: process.env.EMAIL_FROM || 'hello@kocaelisekerleme.com',
        to,
        subject: template.subject,
        html: template.html,
        text: template.text,
      })
    } catch (error) {
      console.error('Nodemailer email error:', error)
      throw new Error('E-posta gönderilemedi')
    }
  }
}

// Email service factory
const emailService: IEmailService = (() => {
  // Resend API key varsa Resend kullan
  if (process.env.RESEND_API_KEY) {
    console.log('Using Resend email service')
    return new ResendEmailService()
  }
  
  // SMTP ayarları varsa Nodemailer kullan
  if (process.env.EMAIL_SERVER_HOST && process.env.EMAIL_SERVER_USER && process.env.EMAIL_SERVER_PASSWORD) {
    console.log('Using SMTP email service')
    return new NodemailerEmailService()
  }
  
  // Hiçbiri yoksa Mock kullan
  console.log('Using Mock email service')
  return new MockEmailService()
})()

// Exported functions
export async function sendPasswordResetEmail(email: string, token: string): Promise<void> {
  const resetUrl = `${process.env.AUTH_URL}/auth/reset-password?token=${token}`
  const template = EmailTemplateFactory.createPasswordResetEmail(resetUrl)
  await emailService.sendEmail(email, template)
}

export async function sendVerificationEmail(email: string, token: string): Promise<void> {
  const verifyUrl = `${process.env.AUTH_URL}/auth/verify-email?token=${token}`
  const template = EmailTemplateFactory.createVerificationEmail(verifyUrl)
  await emailService.sendEmail(email, template)
}