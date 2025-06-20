"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Loader2, CheckCircle } from "lucide-react"

const profileSchema = z.object({
  name: z.string().min(2, "İsim en az 2 karakter olmalıdır").optional(),
  surname: z.string().min(2, "Soyisim en az 2 karakter olmalıdır").optional(),
  email: z.string().email("Geçerli bir e-posta adresi giriniz"),
  phone: z.string().regex(/^[0-9]{10,11}$/, "Geçerli bir telefon numarası giriniz").optional().or(z.literal("")),
})

type ProfileFormData = z.infer<typeof profileSchema>

interface ProfileSectionProps {
  user: any
}

export default function ProfileSection({ user }: ProfileSectionProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const {
    register,
    handleSubmit,
    formState: { errors, isDirty }
  } = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: user.name || "",
      surname: user.surname || "",
      email: user.email || "",
      phone: user.phone || "",
    }
  })

  const onSubmit = async (data: ProfileFormData) => {
    try {
      setIsSubmitting(true)
      setError(null)
      setSuccess(false)

      const response = await fetch('/api/account/profile', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })

      const result = await response.json()

      if (!result.success) {
        setError(result.message || 'Profil güncellenirken bir hata oluştu')
        return
      }

      setSuccess(true)
      setTimeout(() => setSuccess(false), 3000)
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
          Profil Bilgileri
        </h2>
        <p className="text-gray-500 font-light text-sm">
          Kişisel bilgilerinizi güncelleyebilirsiniz
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6" noValidate>
        {success && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-green-50 border border-green-200 rounded-lg p-4"
          >
            <div className="flex items-center gap-3">
              <CheckCircle className="h-4 w-4 text-green-600 flex-shrink-0" />
              <p className="text-sm text-green-800">Profil bilgileriniz başarıyla güncellendi</p>
            </div>
          </motion.div>
        )}

        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-red-50 border border-red-100 rounded-lg p-4"
          >
            <p className="text-sm text-red-800">{error}</p>
          </motion.div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <Label htmlFor="name" className="text-gray-800 text-xs font-medium uppercase tracking-wider mb-3 block">
              Ad
            </Label>
            <Input
              id="name"
              placeholder="Adınız"
              {...register('name')}
              className={`h-12 px-4 bg-white border border-gray-300 rounded-md focus:bg-white focus:border-gray-900 focus:ring-0 transition-all duration-200 text-sm font-light placeholder:text-gray-400 ${
                errors.name ? 'border-red-300' : ''
              }`}
            />
            {errors.name && (
              <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
            )}
          </div>

          <div>
            <Label htmlFor="surname" className="text-gray-800 text-xs font-medium uppercase tracking-wider mb-3 block">
              Soyad
            </Label>
            <Input
              id="surname"
              placeholder="Soyadınız"
              {...register('surname')}
              className={`h-12 px-4 bg-white border border-gray-300 rounded-md focus:bg-white focus:border-gray-900 focus:ring-0 transition-all duration-200 text-sm font-light placeholder:text-gray-400 ${
                errors.surname ? 'border-red-300' : ''
              }`}
            />
            {errors.surname && (
              <p className="mt-1 text-sm text-red-600">{errors.surname.message}</p>
            )}
          </div>

          <div>
            <Label htmlFor="email" className="text-gray-800 text-xs font-medium uppercase tracking-wider mb-3 block">
              E-posta Adresi
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="ornek@email.com"
              {...register('email')}
              disabled
              className="h-12 px-4 bg-gray-50 border border-gray-200 rounded-md text-sm font-light text-gray-500 cursor-not-allowed"
            />
            <p className="mt-1 text-xs text-gray-400">E-posta adresi değiştirilemez</p>
          </div>

          <div>
            <Label htmlFor="phone" className="text-gray-800 text-xs font-medium uppercase tracking-wider mb-3 block">
              Telefon
            </Label>
            <Input
              id="phone"
              type="tel"
              placeholder="5XXXXXXXXX"
              {...register('phone')}
              className={`h-12 px-4 bg-white border border-gray-300 rounded-md focus:bg-white focus:border-gray-900 focus:ring-0 transition-all duration-200 text-sm font-light placeholder:text-gray-400 ${
                errors.phone ? 'border-red-300' : ''
              }`}
            />
            {errors.phone && (
              <p className="mt-1 text-sm text-red-600">{errors.phone.message}</p>
            )}
          </div>
        </div>

        <div className="flex justify-end pt-6">
          <Button
            type="submit"
            disabled={!isDirty || isSubmitting}
            className="h-12 px-6 bg-black hover:bg-gray-900 text-white text-sm font-light tracking-wider rounded-md transition-all duration-300 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Kaydediliyor...
              </>
            ) : (
              'Değişiklikleri Kaydet'
            )}
          </Button>
        </div>
      </form>
    </div>
  )
}