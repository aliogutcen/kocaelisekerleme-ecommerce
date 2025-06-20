"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { ArrowLeft, Loader2 } from "lucide-react"

const addressSchema = z.object({
  title: z.string().min(2, "Adres başlığı en az 2 karakter olmalıdır"),
  firstName: z.string().min(2, "Ad en az 2 karakter olmalıdır"),
  lastName: z.string().min(2, "Soyad en az 2 karakter olmalıdır"),
  phone: z.string().regex(/^[0-9]{10,11}$/, "Geçerli bir telefon numarası giriniz"),
  address: z.string().min(10, "Adres en az 10 karakter olmalıdır"),
  city: z.string().min(2, "Şehir seçiniz"),
  district: z.string().min(2, "İlçe seçiniz"),
  postalCode: z.string().regex(/^[0-9]{5}$/, "Geçerli bir posta kodu giriniz").optional(),
  isDefault: z.boolean().optional(),
})

type AddressFormData = z.infer<typeof addressSchema>

interface AddressFormProps {
  address?: any
  onClose: () => void
}

export default function AddressForm({ address, onClose }: AddressFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<AddressFormData>({
    resolver: zodResolver(addressSchema),
    defaultValues: address || {
      title: "",
      firstName: "",
      lastName: "",
      phone: "",
      address: "",
      city: "",
      district: "",
      postalCode: "",
      isDefault: false,
    }
  })

  const onSubmit = async (data: AddressFormData) => {
    try {
      setIsSubmitting(true)
      setError(null)

      const url = address 
        ? `/api/account/addresses/${address.id}`
        : '/api/account/addresses'
      
      const method = address ? 'PUT' : 'POST'

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })

      const result = await response.json()

      if (!result.success) {
        setError(result.message || 'Adres kaydedilirken bir hata oluştu')
        return
      }

      onClose()
    } catch (error) {
      setError('Bir hata oluştu. Lütfen tekrar deneyin.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div>
      <div className="mb-8">
        <button
          onClick={onClose}
          className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 transition-colors mb-4"
        >
          <ArrowLeft className="h-4 w-4" />
          Geri Dön
        </button>
        <h2 className="text-2xl font-light text-gray-900 mb-2" style={{ fontFamily: 'var(--font-playfair)' }}>
          {address ? 'Adresi Düzenle' : 'Yeni Adres Ekle'}
        </h2>
        <p className="text-gray-500 font-light text-sm">
          Teslimat bilgilerinizi eksiksiz giriniz
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6" noValidate>
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
            <Label htmlFor="title" className="text-gray-800 text-xs font-medium uppercase tracking-wider mb-3 block">
              Adres Başlığı
            </Label>
            <Input
              id="title"
              placeholder="Ev, İş, vb."
              {...register('title')}
              className={`h-12 px-4 bg-white border border-gray-300 rounded-md focus:bg-white focus:border-gray-900 focus:ring-0 transition-all duration-200 text-sm font-light placeholder:text-gray-400 ${
                errors.title ? 'border-red-300' : ''
              }`}
            />
            {errors.title && (
              <p className="mt-1 text-sm text-red-600">{errors.title.message}</p>
            )}
          </div>

          <div>
            <Label htmlFor="firstName" className="text-gray-800 text-xs font-medium uppercase tracking-wider mb-3 block">
              Ad
            </Label>
            <Input
              id="firstName"
              placeholder="Alıcı adı"
              {...register('firstName')}
              className={`h-12 px-4 bg-white border border-gray-300 rounded-md focus:bg-white focus:border-gray-900 focus:ring-0 transition-all duration-200 text-sm font-light placeholder:text-gray-400 ${
                errors.firstName ? 'border-red-300' : ''
              }`}
            />
            {errors.firstName && (
              <p className="mt-1 text-sm text-red-600">{errors.firstName.message}</p>
            )}
          </div>

          <div>
            <Label htmlFor="lastName" className="text-gray-800 text-xs font-medium uppercase tracking-wider mb-3 block">
              Soyad
            </Label>
            <Input
              id="lastName"
              placeholder="Alıcı soyadı"
              {...register('lastName')}
              className={`h-12 px-4 bg-white border border-gray-300 rounded-md focus:bg-white focus:border-gray-900 focus:ring-0 transition-all duration-200 text-sm font-light placeholder:text-gray-400 ${
                errors.lastName ? 'border-red-300' : ''
              }`}
            />
            {errors.lastName && (
              <p className="mt-1 text-sm text-red-600">{errors.lastName.message}</p>
            )}
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

          <div>
            <Label htmlFor="postalCode" className="text-gray-800 text-xs font-medium uppercase tracking-wider mb-3 block">
              Posta Kodu
            </Label>
            <Input
              id="postalCode"
              placeholder="41000"
              {...register('postalCode')}
              className={`h-12 px-4 bg-white border border-gray-300 rounded-md focus:bg-white focus:border-gray-900 focus:ring-0 transition-all duration-200 text-sm font-light placeholder:text-gray-400 ${
                errors.postalCode ? 'border-red-300' : ''
              }`}
            />
            {errors.postalCode && (
              <p className="mt-1 text-sm text-red-600">{errors.postalCode.message}</p>
            )}
          </div>

          <div className="md:col-span-2">
            <Label htmlFor="address" className="text-gray-800 text-xs font-medium uppercase tracking-wider mb-3 block">
              Adres
            </Label>
            <textarea
              id="address"
              rows={3}
              placeholder="Mahalle, sokak, bina no, daire no"
              {...register('address')}
              className={`w-full px-4 py-3 bg-white border border-gray-300 rounded-md focus:bg-white focus:border-gray-900 focus:ring-0 transition-all duration-200 text-sm font-light placeholder:text-gray-400 resize-none ${
                errors.address ? 'border-red-300' : ''
              }`}
            />
            {errors.address && (
              <p className="mt-1 text-sm text-red-600">{errors.address.message}</p>
            )}
          </div>

          <div>
            <Label htmlFor="city" className="text-gray-800 text-xs font-medium uppercase tracking-wider mb-3 block">
              Şehir
            </Label>
            <Input
              id="city"
              placeholder="İstanbul"
              {...register('city')}
              className={`h-12 px-4 bg-white border border-gray-300 rounded-md focus:bg-white focus:border-gray-900 focus:ring-0 transition-all duration-200 text-sm font-light placeholder:text-gray-400 ${
                errors.city ? 'border-red-300' : ''
              }`}
            />
            {errors.city && (
              <p className="mt-1 text-sm text-red-600">{errors.city.message}</p>
            )}
          </div>

          <div>
            <Label htmlFor="district" className="text-gray-800 text-xs font-medium uppercase tracking-wider mb-3 block">
              İlçe
            </Label>
            <Input
              id="district"
              placeholder="Kadıköy"
              {...register('district')}
              className={`h-12 px-4 bg-white border border-gray-300 rounded-md focus:bg-white focus:border-gray-900 focus:ring-0 transition-all duration-200 text-sm font-light placeholder:text-gray-400 ${
                errors.district ? 'border-red-300' : ''
              }`}
            />
            {errors.district && (
              <p className="mt-1 text-sm text-red-600">{errors.district.message}</p>
            )}
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <Checkbox
            id="isDefault"
            {...register('isDefault')}
            className="border-gray-300"
          />
          <Label
            htmlFor="isDefault"
            className="text-sm font-light text-gray-700 cursor-pointer"
          >
            Varsayılan adres olarak ayarla
          </Label>
        </div>

        <div className="flex justify-end gap-4 pt-6">
          <Button
            type="button"
            variant="outline"
            onClick={onClose}
            className="h-12 px-6 border border-gray-300 hover:bg-gray-50 text-gray-700 text-sm font-light tracking-wide rounded-md transition-all duration-200"
          >
            İptal
          </Button>
          <Button
            type="submit"
            disabled={isSubmitting}
            className="h-12 px-6 bg-black hover:bg-gray-900 text-white text-sm font-light tracking-wider rounded-md transition-all duration-300 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Kaydediliyor...
              </>
            ) : (
              'Kaydet'
            )}
          </Button>
        </div>
      </form>
    </div>
  )
}