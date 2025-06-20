import NextAuth from 'next-auth'
import Credentials from 'next-auth/providers/credentials'
import Google from 'next-auth/providers/google'
import { PrismaAdapter } from '@auth/prisma-adapter'
import bcrypt from 'bcryptjs'
import { authConfig } from './auth.config'
import { prisma } from '@/lib/prisma'
import { loginSchema } from './types'

export const { auth, handlers, signIn, signOut } = NextAuth({
  ...authConfig,
  adapter: PrismaAdapter(prisma),
  session: { 
    strategy: 'jwt'
  },
  callbacks: {
    ...authConfig.callbacks,
    jwt: async ({ token, user, account }) => {
      if (user) {
        token.id = user.id
        token.email = user.email
        token.name = user.name
      }
      return token
    },
    session: async ({ session, token }) => {
      if (token && session.user) {
        session.user.id = token.id as string
      }
      return session
    },
    signIn: async ({ user, account, profile }: any) => {
      if (account?.provider === 'google') {
        try {
          const email = user.email!
          const name = user.name || profile?.name || email.split('@')[0]
          
          // Mevcut kullanıcıyı kontrol et
          const existingUser = await prisma.user.findUnique({
            where: { email },
            include: { accounts: true }
          })
          
          if (existingUser) {
            // Kullanıcı var, Google hesabı bağlı mı kontrol et
            const hasGoogleAccount = existingUser.accounts.some(
              acc => acc.provider === 'google'
            )
            
            if (!hasGoogleAccount) {
              // Google hesabı bağlı değil, Account kaydı oluşturulacak (NextAuth otomatik yapar)
              console.log('Existing user, linking Google account')
            }
            
            // User id'yi güncelle
            user.id = existingUser.id
          } else {
            // Yeni kullanıcı oluştur
            const newUser = await prisma.user.create({
              data: {
                email,
                name,
                emailVerified: new Date(),
              }
            })
            
            // User id'yi güncelle
            user.id = newUser.id
            console.log('New user created via Google:', email)
          }
          
          return true
        } catch (error) {
          console.error('Google sign in error:', error)
          return false
        }
      }
      return true
    },
  },
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      allowDangerousEmailAccountLinking: true,
    }),
    Credentials({
      async authorize(credentials) {
        const validatedFields = loginSchema.safeParse(credentials)
        
        if (validatedFields.success) {
          const { email, password } = validatedFields.data
          
          const user = await prisma.user.findUnique({
            where: { email }
          })
          
          if (!user || !user.password) return null
          
          const passwordsMatch = await bcrypt.compare(password, user.password)
          
          if (passwordsMatch) {
            return {
              id: user.id,
              email: user.email,
              name: user.name,
            }
          }
        }
        
        return null
      },
    }),
  ],
})