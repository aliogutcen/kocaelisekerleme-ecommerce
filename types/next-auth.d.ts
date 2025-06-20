import { DefaultSession } from 'next-auth'

declare module 'next-auth' {
  interface User {
    id: string
    email: string
    name: string | null
  }
  
  interface Session {
    user: {
      id: string
    } & DefaultSession['user']
  }
}