'use client'

import { useEffect, useState, Suspense } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import { CheckCircle, XCircle, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { motion } from 'framer-motion'

function VerifyEmailContent() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const token = searchParams.get('token')
  
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading')
  const [message, setMessage] = useState('')
  
  useEffect(() => {
    if (!token) {
      setStatus('error')
      setMessage('Geçersiz doğrulama linki')
      return
    }
    
    const verifyEmail = async () => {
      try {
        const response = await fetch(`/api/auth/verify-email?token=${token}`)
        const data = await response.json()
        
        if (data.success) {
          setStatus('success')
          setMessage(data.message)
          setTimeout(() => {
            router.push('/auth/login')
          }, 3000)
        } else {
          setStatus('error')
          setMessage(data.message)
        }
      } catch (error) {
        setStatus('error')
        setMessage('Doğrulama sırasında bir hata oluştu')
      }
    }
    
    verifyEmail()
  }, [token, router])
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full text-center"
    >
      {status === 'loading' && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <Loader2 className="h-12 w-12 animate-spin mx-auto text-gray-400" />
          <h2 className="mt-6 text-3xl font-light text-gray-900" style={{ fontFamily: 'var(--font-playfair)' }}>E-posta Doğrulanıyor</h2>
          <p className="mt-3 text-gray-500 font-light">Lütfen bekleyin...</p>
        </motion.div>
      )}
      
      {status === 'success' && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4"
          >
            <CheckCircle className="h-8 w-8 text-green-600" />
          </motion.div>
          <h2 className="text-3xl font-light text-gray-900 mb-3" style={{ fontFamily: 'var(--font-playfair)' }}>E-posta Doğrulandı</h2>
          <p className="text-gray-500 font-light mb-2">{message}</p>
          <p className="text-sm text-gray-400 font-light">Giriş sayfasına yönlendiriliyorsunuz...</p>
        </motion.div>
      )}
      
      {status === 'error' && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4"
          >
            <XCircle className="h-8 w-8 text-red-600" />
          </motion.div>
          <h2 className="text-3xl font-light text-gray-900 mb-3" style={{ fontFamily: 'var(--font-playfair)' }}>Doğrulama Başarısız</h2>
          <p className="text-gray-500 font-light mb-8">{message}</p>
          <div className="space-y-3">
            <Link href="/auth/register" className="block">
              <Button variant="outline" className="w-full h-12 bg-white border border-gray-300 hover:bg-gray-50 hover:border-gray-400 text-sm font-light tracking-wide rounded-md transition-all duration-200 hover:shadow-sm">
                Tekrar Kayıt Ol
              </Button>
            </Link>
            <Link href="/auth/login" className="block">
              <Button className="w-full h-12 bg-black hover:bg-gray-900 text-white text-sm font-light tracking-wider rounded-md transition-all duration-300 hover:shadow-lg">
                Giriş Yap
              </Button>
            </Link>
          </div>
        </motion.div>
      )}
    </motion.div>
  )
}

export default function VerifyEmailPage() {
  return (
    <Suspense fallback={
      <div className="text-center">
        <Loader2 className="h-12 w-12 animate-spin mx-auto text-gray-400" />
      </div>
    }>
      <VerifyEmailContent />
    </Suspense>
  )
}