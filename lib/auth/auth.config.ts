import type { NextAuthConfig } from 'next-auth'

export const authConfig = {
  pages: {
    signIn: '/auth/login',
    signOut: '/auth/logout',
    error: '/auth/error',
    verifyRequest: '/auth/verify-request',
    newUser: '/auth/welcome',
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user
      const isOnDashboard = nextUrl.pathname.startsWith('/account')
      const isOnCheckout = nextUrl.pathname.startsWith('/checkout')
      const isOnAuth = nextUrl.pathname.startsWith('/auth')
      
      // Public auth pages that don't require redirect
      const publicAuthPages = [
        '/auth/reset-password',
        '/auth/verify-email',
        '/auth/forgot-password',
      ]
      const isPublicAuthPage = publicAuthPages.some(page => 
        nextUrl.pathname.startsWith(page)
      )
      
      // Protected routes - require authentication
      if (isOnDashboard || isOnCheckout) {
        if (isLoggedIn) return true
        return false // Redirect unauthenticated users to login page
      }
      
      // Auth pages logic
      if (isOnAuth) {
        // Allow access to public auth pages regardless of auth status
        if (isPublicAuthPage) {
          return true
        }
        
        // Redirect logged-in users from login/register to account
        if (isLoggedIn && (
          nextUrl.pathname === '/auth/login' || 
          nextUrl.pathname === '/auth/register'
        )) {
          return Response.redirect(new URL('/account', nextUrl))
        }
      }
      
      return true
    },
  },
  providers: [], // Add providers with an empty array for now
} satisfies NextAuthConfig