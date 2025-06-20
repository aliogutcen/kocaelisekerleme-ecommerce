'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { ForgotPasswordInput, forgotPasswordSchema } from '@/lib/auth/types'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { AlertCircle, CheckCircle, Loader2, ArrowLeft } from 'lucide-react'
import { motion } from 'framer-motion'

export default function ForgotPasswordPage() {
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [message, setMessage] = useState('')
  
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm<ForgotPasswordInput>({
    resolver: zodResolver(forgotPasswordSchema)
  })
  
  const onSubmit = async (data: ForgotPasswordInput) => {
    try {
      setStatus('idle')
      setMessage('')
      
      const response = await fetch('/api/auth/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      
      const result = await response.json()
      
      if (result.success) {
        setStatus('success')
        setMessage(result.message)
      } else {
        setStatus('error')
        setMessage(result.message)
      }
    } catch (error) {
      setStatus('error')
      setMessage('Bir hata oluştu. Lütfen tekrar deneyin.')
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
          Şifre Sıfırlama
        </h1>
        <p className="text-gray-500 font-light">
          E-posta adresinizi girin, size şifre sıfırlama bağlantısı gönderelim
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
            E-posta Gönderildi
          </h3>
          <p className="text-gray-500 mb-2 font-light">{message}</p>
          <p className="text-sm text-gray-400 font-light mb-8">
            E-postanızı kontrol edin ve gelen linke tıklayarak şifrenizi sıfırlayın.
          </p>
          
          <Link href="/auth/login">
            <Button variant="outline" className="w-full h-12 bg-white border border-gray-300 hover:bg-gray-50 hover:border-gray-400 text-sm font-light tracking-wide rounded-md transition-all duration-200 hover:shadow-sm">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Giriş sayfasına dön
            </Button>
          </Link>
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
              className={`h-12 px-4 bg-white border border-gray-300 rounded-md focus:bg-white focus:border-gray-900 focus:ring-0 transition-all duration-200 text-sm font-light placeholder:text-gray-400 ${
                errors.email ? 'border-red-300 bg-red-50' : ''
              }`}
            />
            {errors.email && (
              <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
            )}
          </div>
          
          <div className="space-y-4">
            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full h-12 bg-black hover:bg-gray-900 text-white text-sm font-light tracking-wider rounded-md transition-all duration-300 hover:shadow-lg"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Gönderiliyor...
                </>
              ) : (
                'Şifre Sıfırlama Bağlantısı Gönder'
              )}
            </Button>
            
            <Link href="/auth/login" className="block">
              <Button variant="outline" className="w-full h-12 bg-white border border-gray-300 hover:bg-gray-50 hover:border-gray-400 text-sm font-light tracking-wide rounded-md transition-all duration-200 hover:shadow-sm">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Giriş Sayfasına Dön
              </Button>
            </Link>
          </div>
        </form>
      )}
    </motion.div>
  )
}