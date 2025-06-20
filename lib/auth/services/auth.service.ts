import bcrypt from 'bcryptjs'
import { prisma } from '@/lib/prisma'
import { RegisterInput, AuthError } from '../types'
import { generateToken } from '../utils/token'
import { sendPasswordResetEmail, sendVerificationEmail } from './email.service'

interface IAuthService {
  register(data: RegisterInput): Promise<{ success: boolean; message: string }>
  requestPasswordReset(email: string): Promise<{ success: boolean; message: string }>
  resetPassword(token: string, newPassword: string): Promise<{ success: boolean; message: string }>
  verifyEmail(token: string): Promise<{ success: boolean; message: string }>
}

export class AuthService implements IAuthService {
  async register(data: RegisterInput) {
    try {
      const { email, password } = data
      
      // Check if user exists
      const existingUser = await prisma.user.findUnique({
        where: { email }
      })
      
      if (existingUser) {
        return {
          success: false,
          message: 'Bu e-posta adresi ile kayıtlı bir hesap bulunmaktadır. Lütfen giriş yapın veya şifrenizi sıfırlayın.'
        }
      }
      
      // Hash password
      const hashedPassword = await bcrypt.hash(password, 12)
      
      // Generate verification token
      const verificationToken = generateToken()
      const verificationExpires = new Date(Date.now() + 24 * 60 * 60 * 1000) // 24 hours
      
      // Create user
      const user = await prisma.user.create({
        data: {
          email,
          password: hashedPassword,
          emailVerificationToken: verificationToken,
          emailVerificationExpires: verificationExpires,
        }
      })
      
      // Send verification email
      await sendVerificationEmail(email, verificationToken)
      
      return {
        success: true,
        message: 'Kayıt başarılı! Lütfen e-posta adresinizi doğrulayın.'
      }
    } catch (error) {
      console.error('Register error:', error)
      return {
        success: false,
        message: 'Kayıt işlemi sırasında beklenmeyen bir hata oluştu. Lütfen daha sonra tekrar deneyin.'
      }
    }
  }
  
  async requestPasswordReset(email: string) {
    try {
      const user = await prisma.user.findUnique({
        where: { email }
      })
      
      if (!user) {
        // Don't reveal that user doesn't exist
        return {
          success: true,
          message: 'E-posta adresinize şifre sıfırlama bağlantısı gönderildi'
        }
      }
      
      // Generate reset token
      const resetToken = generateToken()
      const resetExpires = new Date(Date.now() + 60 * 60 * 1000) // 1 hour
      
      // Update user with reset token
      await prisma.user.update({
        where: { id: user.id },
        data: {
          passwordResetToken: resetToken,
          passwordResetExpires: resetExpires,
        }
      })
      
      // Send reset email
      await sendPasswordResetEmail(email, resetToken)
      
      return {
        success: true,
        message: 'E-posta adresinize şifre sıfırlama bağlantısı gönderildi'
      }
    } catch (error) {
      console.error('Password reset error:', error)
      return {
        success: false,
        message: 'Şifre sıfırlama isteği sırasında bir hata oluştu'
      }
    }
  }
  
  async resetPassword(token: string, newPassword: string) {
    try {
      const user = await prisma.user.findFirst({
        where: {
          passwordResetToken: token,
          passwordResetExpires: {
            gt: new Date()
          }
        }
      })
      
      if (!user) {
        return {
          success: false,
          message: 'Şifre sıfırlama bağlantısı geçersiz veya süresi dolmuş. Lütfen yeni bir şifre sıfırlama talebinde bulunun.'
        }
      }
      
      // Hash new password
      const hashedPassword = await bcrypt.hash(newPassword, 12)
      
      // Update user password and clear reset token
      await prisma.user.update({
        where: { id: user.id },
        data: {
          password: hashedPassword,
          passwordResetToken: null,
          passwordResetExpires: null,
        }
      })
      
      return {
        success: true,
        message: 'Şifreniz başarıyla güncellendi'
      }
    } catch (error) {
      console.error('Reset password error:', error)
      return {
        success: false,
        message: 'Şifre güncelleme sırasında bir hata oluştu'
      }
    }
  }
  
  async verifyEmail(token: string) {
    try {
      const user = await prisma.user.findFirst({
        where: {
          emailVerificationToken: token,
          emailVerificationExpires: {
            gt: new Date()
          }
        }
      })
      
      if (!user) {
        return {
          success: false,
          message: 'E-posta doğrulama bağlantısı geçersiz veya süresi dolmuş. Lütfen yeniden kayıt olun.'
        }
      }
      
      // Update user as verified
      await prisma.user.update({
        where: { id: user.id },
        data: {
          emailVerified: new Date(),
          emailVerificationToken: null,
          emailVerificationExpires: null,
        }
      })
      
      return {
        success: true,
        message: 'E-posta adresiniz başarıyla doğrulandı'
      }
    } catch (error) {
      console.error('Email verification error:', error)
      return {
        success: false,
        message: 'E-posta doğrulama sırasında bir hata oluştu'
      }
    }
  }
}

// Singleton instance
export const authService = new AuthService()