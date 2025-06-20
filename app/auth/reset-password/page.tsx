'use client'

import { useState, useEffect, Suspense } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { ResetPasswordInput, resetPasswordSchema } from '@/lib/auth/types'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { AlertCircle, CheckCircle, Loader2 } from 'lucide-react'
import { motion } from 'framer-motion'

function ResetPasswordContent() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const token = searchParams.get('token')
  
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [message, setMessage] = useState('')
  
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm<ResetPasswordInput>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      token: token || ''
    }
  })
  
  useEffect(() => {
    if (!token) {
      setStatus('error')
      setMessage('Geçersiz veya eksik token')
    }
  }, [token])
  
  const onSubmit = async (data: ResetPasswordInput) => {
    try {
      setStatus('idle')
      setMessage('')
      
      const response = await fetch('/api/auth/reset-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      
      const result = await response.json()
      
      if (result.success) {
        setStatus('success')
        setMessage(result.message)
        setTimeout(() => {
          router.push('/auth/login')
        }, 3000)
      } else {
        setStatus('error')
        setMessage(result.message)
      }
    } catch (error) {
      setStatus('error')
      setMessage('Bir hata oluştu. Lütfen tekrar deneyin.')
    }
  }
  
  if (!token) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full text-center"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4"
        >
          <AlertCircle className="h-8 w-8 text-red-600" />
        </motion.div>
        <h2 className="text-3xl font-light text-gray-900 mb-3" style={{ fontFamily: 'var(--font-playfair)' }}>Geçersiz Bağlantı</h2>
        <p className="text-gray-500 font-light">
          Şifre sıfırlama bağlantısı geçersiz veya süresi dolmuş.
        </p>
      </motion.div>
    )
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
          Yeni Şifre Belirleyin
        </h1>
        <p className="text-gray-500 font-light">
          Hesabınız için yeni bir şifre oluşturun
        </p>
      </div>
      
      {status === 'success' ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4"
          >
            <CheckCircle className="h-8 w-8 text-green-600" />
          </motion.div>
          <h3 className="text-2xl font-light text-gray-900 mb-3" style={{ fontFamily: 'var(--font-playfair)' }}>
            Şifre Güncellendi
          </h3>
          <p className="text-gray-500 mb-2 font-light">{message}</p>
          <p className="text-sm text-gray-400 font-light">
            Giriş sayfasına yönlendiriliyorsunuz...
          </p>
        </motion.div>
      ) : (
        <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
          {status === 'error' && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className="bg-red-50 border border-red-100 rounded-lg p-4"
            >
              <div className="flex items-center gap-3">
                <AlertCircle className="h-4 w-4 text-red-600 flex-shrink-0" />
                <p className="text-sm text-red-800">{message}</p>
              </div>
            </motion.div>
          )}
          
          <input type="hidden" {...register('token')} />
          
          <div className="space-y-5">
            <div>
              <Label htmlFor="password" className="text-gray-800 text-xs font-medium uppercase tracking-wider mb-3 block">
                Yeni Şifre
              </Label>
              <Input
                id="password"
                type="password"
                autoComplete="new-password"
                placeholder="••••••••"
                {...register('password')}
                className={`h-12 px-4 bg-white border border-gray-300 rounded-md focus:bg-white focus:border-gray-900 focus:ring-0 transition-all duration-200 text-sm font-light placeholder:text-gray-400 ${
                  errors.password ? 'border-red-300 bg-red-50' : ''
                }`}
              />
              {errors.password && (
                <p className="mt-1 text-sm text-red-600">{errors.password.message}</p>
              )}
            </div>
            
            <div>
              <Label htmlFor="confirmPassword" className="text-gray-800 text-xs font-medium uppercase tracking-wider mb-3 block">
                Yeni Şifre Tekrar
              </Label>
              <Input
                id="confirmPassword"
                type="password"
                autoComplete="new-password"
                placeholder="••••••••"
                {...register('confirmPassword')}
                className={`h-12 px-4 bg-white border border-gray-300 rounded-md focus:bg-white focus:border-gray-900 focus:ring-0 transition-all duration-200 text-sm font-light placeholder:text-gray-400 ${
                  errors.confirmPassword ? 'border-red-300 bg-red-50' : ''
                }`}
              />
              {errors.confirmPassword && (
                <p className="mt-1 text-sm text-red-600">{errors.confirmPassword.message}</p>
              )}
            </div>
          </div>
          
          <Button
            type="submit"
            className="w-full h-12 bg-black hover:bg-gray-900 text-white text-sm font-light tracking-wider rounded-md transition-all duration-300 hover:shadow-lg"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Şifre Değiştiriliyor...
              </>
            ) : (
              'Şifreyi Değiştir'
            )}
          </Button>
        </form>
      )}
    </motion.div>
  )
}

export default function ResetPasswordPage() {
  return (
    <Suspense fallback={
      <div className="text-center">
        <Loader2 className="h-12 w-12 animate-spin mx-auto text-gray-400" />
      </div>
    }>
      <ResetPasswordContent />
    </Suspense>
  )
}