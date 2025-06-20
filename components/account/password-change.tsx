"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Loader2, CheckCircle, AlertCircle } from "lucide-react"

const passwordSchema = z.object({
  currentPassword: z.string().min(6, "Mevcut şifrenizi giriniz"),
  newPassword: z.string()
    .min(6, "Şifre en az 6 karakter olmalıdır")
    .regex(/[A-Z]/, "Şifre en az bir büyük harf içermelidir")
    .regex(/[0-9]/, "Şifre en az bir rakam içermelidir"),
  confirmPassword: z.string(),
}).refine((data) => data.newPassword === data.confirmPassword, {
  message: "Şifreler eşleşmiyor",
  path: ["confirmPassword"],
})

type PasswordFormData = z.infer<typeof passwordSchema>

export default function PasswordChange() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<PasswordFormData>({
    resolver: zodResolver(passwordSchema)
  })

  const onSubmit = async (data: PasswordFormData) => {
    try {
      setIsSubmitting(true)
      setError(null)
      setSuccess(false)

      const response = await fetch('/api/account/password', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          currentPassword: data.currentPassword,
          newPassword: data.newPassword,
        }),
      })

      const result = await response.json()

      if (!result.success) {
        setError(result.message || 'Şifre değiştirilirken bir hata oluştu')
        return
      }

      setSuccess(true)
      reset()
      setTimeout(() => setSuccess(false), 5000)
    } catch (error) {
      setError('Bir hata oluştu. Lütfen tekrar deneyin.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div>
      <div className="mb-8">
        <h2 className="text-2xl font-light text-gray-900 mb-2" style={{ fontFamily: 'var(--font-playfair)' }}>
          Şifre Değiştir
        </h2>
        <p className="text-gray-500 font-light text-sm">
          Hesap güvenliğiniz için düzenli olarak şifrenizi değiştirin
        </p>
      </div>

      <div className="max-w-md">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6" noValidate>
          {success && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-green-50 border border-green-200 rounded-lg p-4"
            >
              <div className="flex items-center gap-3">
                <CheckCircle className="h-4 w-4 text-green-600 flex-shrink-0" />
                <p className="text-sm text-green-800">Şifreniz başarıyla değiştirildi</p>
              </div>
            </motion.div>
          )}

          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-red-50 border border-red-100 rounded-lg p-4"
            >
              <div className="flex items-center gap-3">
                <AlertCircle className="h-4 w-4 text-red-600 flex-shrink-0" />
                <p className="text-sm text-red-800">{error}</p>
              </div>
            </motion.div>
          )}

          <div>
            <Label htmlFor="currentPassword" className="text-gray-800 text-xs font-medium uppercase tracking-wider mb-3 block">
              Mevcut Şifre
            </Label>
            <Input
              id="currentPassword"
              type="password"
              placeholder="••••••••"
              {...register('currentPassword')}
              className={`h-12 px-4 bg-white border border-gray-300 rounded-md focus:bg-white focus:border-gray-900 focus:ring-0 transition-all duration-200 text-sm font-light placeholder:text-gray-400 ${
                errors.currentPassword ? 'border-red-300' : ''
              }`}
            />
            {errors.currentPassword && (
              <p className="mt-1 text-sm text-red-600">{errors.currentPassword.message}</p>
            )}
          </div>

          <div>
            <Label htmlFor="newPassword" className="text-gray-800 text-xs font-medium uppercase tracking-wider mb-3 block">
              Yeni Şifre
            </Label>
            <Input
              id="newPassword"
              type="password"
              placeholder="••••••••"
              {...register('newPassword')}
              className={`h-12 px-4 bg-white border border-gray-300 rounded-md focus:bg-white focus:border-gray-900 focus:ring-0 transition-all duration-200 text-sm font-light placeholder:text-gray-400 ${
                errors.newPassword ? 'border-red-300' : ''
              }`}
            />
            {errors.newPassword && (
              <p className="mt-1 text-sm text-red-600">{errors.newPassword.message}</p>
            )}
          </div>

          <div>
            <Label htmlFor="confirmPassword" className="text-gray-800 text-xs font-medium uppercase tracking-wider mb-3 block">
              Yeni Şifre Tekrar
            </Label>
            <Input
              id="confirmPassword"
              type="password"
              placeholder="••••••••"
              {...register('confirmPassword')}
              className={`h-12 px-4 bg-white border border-gray-300 rounded-md focus:bg-white focus:border-gray-900 focus:ring-0 transition-all duration-200 text-sm font-light placeholder:text-gray-400 ${
                errors.confirmPassword ? 'border-red-300' : ''
              }`}
            />
            {errors.confirmPassword && (
              <p className="mt-1 text-sm text-red-600">{errors.confirmPassword.message}</p>
            )}
          </div>

          <div className="pt-6">
            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full h-12 bg-black hover:bg-gray-900 text-white text-sm font-light tracking-wider rounded-md transition-all duration-300 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Değiştiriliyor...
                </>
              ) : (
                'Şifreyi Değiştir'
              )}
            </Button>
          </div>
        </form>

        <div className="mt-8 p-4 bg-gray-50 rounded-lg">
          <h3 className="text-sm font-medium text-gray-900 mb-2">Güvenli şifre ipuçları:</h3>
          <ul className="text-sm text-gray-600 space-y-1">
            <li>• En az 6 karakter kullanın</li>
            <li>• En az bir büyük harf ekleyin</li>
            <li>• En az bir rakam ekleyin</li>
            <li>• Kişisel bilgilerinizi kullanmayın</li>
          </ul>
        </div>
      </div>
    </div>
  )
}