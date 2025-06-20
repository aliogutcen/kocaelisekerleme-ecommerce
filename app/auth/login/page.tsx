'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { signIn } from 'next-auth/react'
import { LoginInput, loginSchema } from '@/lib/auth/types'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { AlertCircle, Loader2 } from 'lucide-react'
import { FcGoogle } from 'react-icons/fc'
import { motion } from 'framer-motion'

export default function LoginPage() {
  const router = useRouter()
  const [error, setError] = useState<string | null>(null)
  const [isGoogleLoading, setIsGoogleLoading] = useState(false)
  
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm<LoginInput>({
    resolver: zodResolver(loginSchema)
  })
  
  const onSubmit = async (data: LoginInput) => {
    try {
      setError(null)
      
      const result = await signIn('credentials', {
        email: data.email,
        password: data.password,
        redirect: false,
      })
      
      if (result?.error) {
        if (result.error === 'CredentialsSignin') {
          setError('E-posta adresiniz veya şifreniz hatalı. Lütfen kontrol edip tekrar deneyin.')
        } else {
          setError('Giriş yapılırken bir hata oluştu. Lütfen daha sonra tekrar deneyin.')
        }
        return
      }
      
      router.push('/account')
      router.refresh()
    } catch (error) {
      setError('Giriş yapılırken bir hata oluştu')
    }
  }
  
  const handleGoogleSignIn = async () => {
    try {
      setIsGoogleLoading(true)
      await signIn('google', { callbackUrl: '/account' })
    } catch (error) {
      setError('Google ile giriş yapılırken bir hata oluştu')
      setIsGoogleLoading(false)
    }
  }
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full"
    >
      <div className="text-center mb-10">
        <h1 className="text-3xl font-light text-gray-900 mb-3 tracking-tight" style={{ fontFamily: 'var(--font-playfair)' }}>
          Hoş Geldiniz
        </h1>
        <p className="text-gray-500 font-light">
          Hesabınıza giriş yapın
        </p>
      </div>

      <form className="space-y-6" onSubmit={handleSubmit(onSubmit)} noValidate>
        {error && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="bg-red-50 border border-red-100 rounded-lg p-4"
          >
            <div className="flex items-center gap-3" role="alert">
              <AlertCircle className="h-4 w-4 text-red-600 flex-shrink-0" aria-hidden="true" />
              <p className="text-sm text-red-800">{error}</p>
            </div>
          </motion.div>
        )}
        
        <div className="space-y-4">
          <div>
            <Label htmlFor="email" className="text-gray-800 text-xs font-medium uppercase tracking-wider mb-3 block">
              E-posta Adresi
            </Label>
            <Input
              id="email"
              type="email"
              autoComplete="email"
              placeholder="ornek@email.com"
              {...register('email')}
              aria-invalid={errors.email ? 'true' : 'false'}
              aria-describedby={errors.email ? 'email-error' : undefined}
              className={`h-12 px-4 bg-white border border-gray-300 rounded-md focus:bg-white focus:border-gray-900 focus:ring-0 transition-all duration-200 text-sm font-light placeholder:text-gray-400 ${
                errors.email ? 'border-red-300 bg-red-50' : ''
              }`}
            />
            {errors.email && (
              <p className="mt-1 text-sm text-red-600" role="alert" id="email-error">
                {errors.email.message}
              </p>
            )}
          </div>
          
          <div>
            <Label htmlFor="password" className="text-gray-800 text-xs font-medium uppercase tracking-wider mb-3 block">
              Şifre
            </Label>
            <Input
              id="password"
              type="password"
              autoComplete="current-password"
              placeholder="••••••••"
              {...register('password')}
              aria-invalid={errors.password ? 'true' : 'false'}
              aria-describedby={errors.password ? 'password-error' : undefined}
              className={`h-12 px-4 bg-white border border-gray-300 rounded-md focus:bg-white focus:border-gray-900 focus:ring-0 transition-all duration-200 text-sm font-light placeholder:text-gray-400 ${
                errors.password ? 'border-red-300 bg-red-50' : ''
              }`}
            />
            {errors.password && (
              <p className="mt-1 text-sm text-red-600" role="alert" id="password-error">
                {errors.password.message}
              </p>
            )}
          </div>
        </div>
        
        <div className="flex items-center justify-end">
          <Link
            href="/auth/forgot-password"
            className="text-sm text-gray-700 hover:text-gray-900 font-medium transition-colors"
          >
            Şifrenizi mi unuttunuz?
          </Link>
        </div>
        
        <Button
          type="submit"
          disabled={isSubmitting}
          className="w-full h-12 bg-black hover:bg-gray-900 text-white text-sm font-light tracking-wider rounded-md transition-all duration-300 hover:shadow-lg"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" aria-hidden="true" />
              <span>Giriş yapılıyor...</span>
            </>
          ) : (
            'Giriş Yap'
          )}
        </Button>
      </form>
      
      <div className="mt-8">
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-200" />
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="bg-white px-4 text-gray-400 text-xs uppercase tracking-widest">veya</span>
          </div>
        </div>
        
        <Button
          type="button"
          variant="outline"
          onClick={handleGoogleSignIn}
          disabled={isGoogleLoading}
          className="w-full h-12 mt-6 bg-white border border-gray-300 hover:bg-gray-50 hover:border-gray-400 text-sm font-light tracking-wide rounded-md transition-all duration-200 hover:shadow-sm"
        >
          {isGoogleLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Google ile giriş yapılıyor...
            </>
          ) : (
            <>
              <FcGoogle className="mr-2 h-5 w-5" aria-hidden="true" />
              Google ile giriş yap
            </>
          )}
        </Button>
      </div>
      
      <div className="mt-8 text-center">
        <p className="text-gray-500 font-light">
          Hesabınız yok mu?{' '}
          <Link 
            href="/auth/register" 
            className="font-normal text-gray-900 hover:text-black hover:underline underline-offset-4 transition-all"
          >
            Üye Olun
          </Link>
        </p>
      </div>
    </motion.div>
  )
}