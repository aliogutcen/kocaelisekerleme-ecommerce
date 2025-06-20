"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { 
  ArrowLeft,
  Upload,
  X,
  Plus,
  Image as ImageIcon,
  Save,
  Info,
  Loader2
} from "lucide-react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useToast } from "@/components/ui/use-toast"
import Link from "next/link"
import { cn } from "@/lib/utils"

interface Category {
  id: string
  name: string
  slug: string
}

export default function NewProductPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [loading, setLoading] = useState(false)
  const [categories, setCategories] = useState<Category[]>([])
  
  // Form state
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    story: "",
    price: "",
    discountPrice: "",
    sku: "",
    stock: "",
    categoryId: "",
    images: [] as any[], // Detaylı görsel bilgileri
    isActive: true,
    // SEO Fields
    metaTitle: "",
    metaDescription: "",
    metaKeywords: "",
    ogTitle: "",
    ogDescription: "",
    ogImage: ""
  })

  // Nutrition info state
  const [nutritionInfo, setNutritionInfo] = useState({
    calories: "",
    protein: "",
    carbs: "",
    fat: "",
    fiber: "",
    sugar: "",
    salt: ""
  })

  // Image URL input
  const [imageUrl, setImageUrl] = useState("")
  const [uploadingImage, setUploadingImage] = useState(false)

  useEffect(() => {
    fetchCategories()
  }, [])

  const fetchCategories = async () => {
    try {
      const response = await fetch("/api/categories")
      if (!response.ok) throw new Error("Kategoriler yüklenemedi")
      const data = await response.json()
      setCategories(data)
    } catch (error) {
      toast({
        title: "Hata",
        description: "Kategoriler yüklenirken hata oluştu",
        variant: "destructive"
      })
    }
  }

  const handleAddImage = () => {
    if (imageUrl && !formData.images.find(img => img.original === imageUrl)) {
      // URL ile ekleme durumunda basit bir yapı oluştur
      const imageData = {
        original: imageUrl,
        thumbnail: imageUrl,
        medium: imageUrl,
        large: imageUrl,
        publicId: null,
        format: 'url',
        width: null,
        height: null
      }
      setFormData({
        ...formData,
        images: [...formData.images, imageData]
      })
      setImageUrl("")
    }
  }

  const handleRemoveImage = (index: number) => {
    setFormData({
      ...formData,
      images: formData.images.filter((_, i) => i !== index)
    })
  }

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files || files.length === 0) return

    setUploadingImage(true)
    
    try {
      for (const file of Array.from(files)) {
        const formData = new FormData()
        formData.append("file", file)
        formData.append("folder", "products")

        const response = await fetch("/api/upload", {
          method: "POST",
          body: formData
        })

        if (!response.ok) {
          const error = await response.json()
          throw new Error(error.error || "Yükleme başarısız")
        }

        const data = await response.json()
        
        // Cloudinary'den gelen detaylı veriyi sakla
        const imageData = {
          original: data.urls.original,
          thumbnail: data.urls.thumbnail,
          medium: data.urls.medium,
          large: data.urls.large,
          publicId: data.publicId,
          format: data.format,
          width: data.width,
          height: data.height
        }
        
        setFormData(prev => ({
          ...prev,
          images: [...prev.images, imageData]
        }))
      }

      toast({
        title: "Başarılı",
        description: "Görseller yüklendi"
      })
    } catch (error: any) {
      toast({
        title: "Hata",
        description: error.message || "Görsel yüklenirken hata oluştu",
        variant: "destructive"
      })
    } finally {
      setUploadingImage(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      // Nutrition info'yu sadece dolu olanları al
      const nutritionData = Object.entries(nutritionInfo).reduce((acc, [key, value]) => {
        if (value) acc[key] = value
        return acc
      }, {} as any)

      const productData = {
        name: formData.name,
        description: formData.description || null,
        story: formData.story || null,
        price: parseFloat(formData.price),
        discountPrice: formData.discountPrice ? parseFloat(formData.discountPrice) : null,
        sku: formData.sku,
        stock: parseInt(formData.stock) || 0,
        categoryId: formData.categoryId,
        images: formData.images,
        isActive: formData.isActive,
        nutritionInfo: Object.keys(nutritionData).length > 0 ? nutritionData : null,
        metaTitle: formData.metaTitle || null,
        metaDescription: formData.metaDescription || null,
        metaKeywords: formData.metaKeywords || null,
        ogTitle: formData.ogTitle || null,
        ogDescription: formData.ogDescription || null,
        ogImage: formData.ogImage || null
      }

      const response = await fetch("/api/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(productData)
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.error || "Ürün oluşturulamadı")
      }

      toast({
        title: "Ürün oluşturuldu",
        description: "Ürün başarıyla eklendi"
      })

      router.push("/admin/products")
    } catch (error: any) {
      toast({
        title: "Hata",
        description: error.message || "Ürün oluşturulurken hata oluştu",
        variant: "destructive"
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Link href="/admin/products">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="h-5 w-5" />
          </Button>
        </Link>
        <h1 className="text-3xl font-extralight text-neutral-900">Yeni Ürün Ekle</h1>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Temel Bilgiler */}
        <Card className="p-6">
          <h2 className="text-lg font-light text-neutral-900 mb-6">Temel Bilgiler</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-neutral-700 mb-2">
                Ürün Adı *
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full h-10 px-3 bg-neutral-50 border border-neutral-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-neutral-900"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-2">
                SKU (Stok Kodu) *
              </label>
              <input
                type="text"
                value={formData.sku}
                onChange={(e) => setFormData({ ...formData, sku: e.target.value })}
                className="w-full h-10 px-3 bg-neutral-50 border border-neutral-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-neutral-900"
                placeholder="TH001"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-2">
                Kategori *
              </label>
              <select
                value={formData.categoryId}
                onChange={(e) => setFormData({ ...formData, categoryId: e.target.value })}
                className="w-full h-10 px-3 bg-neutral-50 border border-neutral-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-neutral-900"
                required
              >
                <option value="">Kategori Seçin</option>
                {categories.map(cat => (
                  <option key={cat.id} value={cat.id}>{cat.name}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-2">
                Fiyat (TL) *
              </label>
              <input
                type="number"
                step="0.01"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                className="w-full h-10 px-3 bg-neutral-50 border border-neutral-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-neutral-900"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-2">
                İndirimli Fiyat (TL)
              </label>
              <input
                type="number"
                step="0.01"
                value={formData.discountPrice}
                onChange={(e) => setFormData({ ...formData, discountPrice: e.target.value })}
                className="w-full h-10 px-3 bg-neutral-50 border border-neutral-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-neutral-900"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-2">
                Stok Adedi
              </label>
              <input
                type="number"
                value={formData.stock}
                onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                className="w-full h-10 px-3 bg-neutral-50 border border-neutral-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-neutral-900"
                placeholder="0"
              />
            </div>

            <div className="flex items-center gap-3 mt-7">
              <input
                type="checkbox"
                id="isActive"
                checked={formData.isActive}
                onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                className="rounded border-neutral-300"
              />
              <label htmlFor="isActive" className="text-sm text-neutral-700">
                Ürün aktif (sitede görünsün)
              </label>
            </div>
          </div>
        </Card>

        {/* Açıklama ve Hikaye */}
        <Card className="p-6">
          <h2 className="text-lg font-light text-neutral-900 mb-6">Açıklama ve Hikaye</h2>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-2">
                Ürün Açıklaması
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="w-full h-32 px-3 py-2 bg-neutral-50 border border-neutral-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-neutral-900 resize-none"
                placeholder="Ürün hakkında kısa açıklama..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-2">
                Ürün Hikayesi
              </label>
              <textarea
                value={formData.story}
                onChange={(e) => setFormData({ ...formData, story: e.target.value })}
                className="w-full h-32 px-3 py-2 bg-neutral-50 border border-neutral-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-neutral-900 resize-none"
                placeholder="Ürünün hikayesi, üretim süreci, özel yanları..."
              />
            </div>
          </div>
        </Card>

        {/* Görseller */}
        <Card className="p-6">
          <h2 className="text-lg font-light text-neutral-900 mb-6">Ürün Görselleri</h2>
          
          <div className="space-y-4">
            {/* Dosya Yükleme */}
            <div className="flex gap-3">
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={handleImageUpload}
                className="hidden"
                id="image-upload"
                disabled={uploadingImage}
              />
              <label
                htmlFor="image-upload"
                className="flex-1 h-10 px-4 bg-neutral-900 text-white rounded-lg text-sm font-medium hover:bg-neutral-800 transition-colors cursor-pointer flex items-center justify-center disabled:opacity-50"
              >
                {uploadingImage ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Yükleniyor...
                  </>
                ) : (
                  <>
                    <Upload className="h-4 w-4 mr-2" />
                    Bilgisayardan Yükle
                  </>
                )}
              </label>
            </div>

            {/* URL ile Ekleme */}
            <div className="flex items-center gap-3">
              <span className="text-sm text-neutral-500">veya</span>
              <input
                type="url"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                placeholder="Resim URL'si girin..."
                className="flex-1 h-10 px-3 bg-neutral-50 border border-neutral-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-neutral-900"
              />
              <Button
                type="button"
                onClick={handleAddImage}
                variant="outline"
              >
                <Plus className="h-4 w-4 mr-2" />
                URL Ekle
              </Button>
            </div>

            {formData.images.length > 0 && (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {formData.images.map((img, index) => (
                  <div key={index} className="relative group">
                    <img
                      src={img.thumbnail || img.original}
                      alt={`Ürün ${index + 1}`}
                      className="w-full h-32 object-cover rounded-lg"
                    />
                    <button
                      type="button"
                      onClick={() => handleRemoveImage(index)}
                      className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <X className="h-4 w-4" />
                    </button>
                    {index === 0 && (
                      <span className="absolute bottom-2 left-2 text-xs bg-black/70 text-white px-2 py-1 rounded">
                        Ana Görsel
                      </span>
                    )}
                    {img.width && img.height && (
                      <span className="absolute top-2 left-2 text-xs bg-black/70 text-white px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                        {img.width}x{img.height}
                      </span>
                    )}
                  </div>
                ))}
              </div>
            )}

            {formData.images.length === 0 && (
              <div className="border-2 border-dashed border-neutral-300 rounded-lg p-12 text-center">
                <ImageIcon className="h-12 w-12 text-neutral-400 mx-auto mb-3" />
                <p className="text-sm text-neutral-600">
                  Henüz görsel eklenmedi
                </p>
              </div>
            )}
          </div>
        </Card>

        {/* Besin Değerleri */}
        <Card className="p-6">
          <h2 className="text-lg font-light text-neutral-900 mb-6">Besin Değerleri (100g için)</h2>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-2">
                Kalori
              </label>
              <input
                type="text"
                value={nutritionInfo.calories}
                onChange={(e) => setNutritionInfo({ ...nutritionInfo, calories: e.target.value })}
                className="w-full h-10 px-3 bg-neutral-50 border border-neutral-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-neutral-900"
                placeholder="450 kcal"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-2">
                Protein
              </label>
              <input
                type="text"
                value={nutritionInfo.protein}
                onChange={(e) => setNutritionInfo({ ...nutritionInfo, protein: e.target.value })}
                className="w-full h-10 px-3 bg-neutral-50 border border-neutral-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-neutral-900"
                placeholder="12g"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-2">
                Karbonhidrat
              </label>
              <input
                type="text"
                value={nutritionInfo.carbs}
                onChange={(e) => setNutritionInfo({ ...nutritionInfo, carbs: e.target.value })}
                className="w-full h-10 px-3 bg-neutral-50 border border-neutral-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-neutral-900"
                placeholder="45g"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-2">
                Yağ
              </label>
              <input
                type="text"
                value={nutritionInfo.fat}
                onChange={(e) => setNutritionInfo({ ...nutritionInfo, fat: e.target.value })}
                className="w-full h-10 px-3 bg-neutral-50 border border-neutral-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-neutral-900"
                placeholder="22g"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-2">
                Lif
              </label>
              <input
                type="text"
                value={nutritionInfo.fiber}
                onChange={(e) => setNutritionInfo({ ...nutritionInfo, fiber: e.target.value })}
                className="w-full h-10 px-3 bg-neutral-50 border border-neutral-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-neutral-900"
                placeholder="3g"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-2">
                Şeker
              </label>
              <input
                type="text"
                value={nutritionInfo.sugar}
                onChange={(e) => setNutritionInfo({ ...nutritionInfo, sugar: e.target.value })}
                className="w-full h-10 px-3 bg-neutral-50 border border-neutral-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-neutral-900"
                placeholder="35g"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-2">
                Tuz
              </label>
              <input
                type="text"
                value={nutritionInfo.salt}
                onChange={(e) => setNutritionInfo({ ...nutritionInfo, salt: e.target.value })}
                className="w-full h-10 px-3 bg-neutral-50 border border-neutral-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-neutral-900"
                placeholder="0.1g"
              />
            </div>
          </div>
        </Card>

        {/* SEO Ayarları */}
        <Card className="p-6">
          <h2 className="text-lg font-light text-neutral-900 mb-6">SEO Ayarları</h2>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-2">
                Meta Başlık
              </label>
              <input
                type="text"
                value={formData.metaTitle}
                onChange={(e) => setFormData({ ...formData, metaTitle: e.target.value })}
                className="w-full h-10 px-3 bg-neutral-50 border border-neutral-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-neutral-900"
                placeholder="Sayfa başlığı (60 karakter önerilen)"
              />
              <p className="text-xs text-neutral-500 mt-1">
                {formData.metaTitle.length}/60 karakter
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-2">
                Meta Açıklama
              </label>
              <textarea
                value={formData.metaDescription}
                onChange={(e) => setFormData({ ...formData, metaDescription: e.target.value })}
                className="w-full h-24 px-3 py-2 bg-neutral-50 border border-neutral-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-neutral-900 resize-none"
                placeholder="Arama motorlarında görünecek açıklama (160 karakter önerilen)"
              />
              <p className="text-xs text-neutral-500 mt-1">
                {formData.metaDescription.length}/160 karakter
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-2">
                Anahtar Kelimeler
              </label>
              <input
                type="text"
                value={formData.metaKeywords}
                onChange={(e) => setFormData({ ...formData, metaKeywords: e.target.value })}
                className="w-full h-10 px-3 bg-neutral-50 border border-neutral-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-neutral-900"
                placeholder="tahin helvası, geleneksel, organik (virgülle ayırın)"
              />
            </div>

            {/* Open Graph / Sosyal Medya */}
            <div className="pt-4 border-t border-neutral-200">
              <h3 className="text-sm font-medium text-neutral-700 mb-4">Sosyal Medya Görünümü</h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2">
                    OG Başlık
                  </label>
                  <input
                    type="text"
                    value={formData.ogTitle}
                    onChange={(e) => setFormData({ ...formData, ogTitle: e.target.value })}
                    className="w-full h-10 px-3 bg-neutral-50 border border-neutral-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-neutral-900"
                    placeholder="Sosyal medyada görünecek başlık"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2">
                    OG Açıklama
                  </label>
                  <textarea
                    value={formData.ogDescription}
                    onChange={(e) => setFormData({ ...formData, ogDescription: e.target.value })}
                    className="w-full h-20 px-3 py-2 bg-neutral-50 border border-neutral-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-neutral-900 resize-none"
                    placeholder="Sosyal medyada görünecek açıklama"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2">
                    OG Görsel URL
                  </label>
                  <input
                    type="url"
                    value={formData.ogImage}
                    onChange={(e) => setFormData({ ...formData, ogImage: e.target.value })}
                    className="w-full h-10 px-3 bg-neutral-50 border border-neutral-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-neutral-900"
                    placeholder="Sosyal medya paylaşımlarında görünecek resim URL'si"
                  />
                  <p className="text-xs text-neutral-500 mt-1">
                    Önerilen boyut: 1200x630 piksel
                  </p>
                </div>
              </div>
            </div>

            {/* SEO Önizleme */}
            <div className="pt-4 border-t border-neutral-200">
              <h3 className="text-sm font-medium text-neutral-700 mb-4">Arama Motoru Önizlemesi</h3>
              <div className="bg-white border border-neutral-200 rounded-lg p-4">
                <h4 className="text-blue-600 text-lg hover:underline cursor-pointer">
                  {formData.metaTitle || formData.name || "Sayfa Başlığı"}
                </h4>
                <p className="text-green-700 text-sm mt-1">kocaelisekerleme.com/urunler/{formData.name.toLowerCase().replace(/\s+/g, '-')}</p>
                <p className="text-sm text-neutral-600 mt-2">
                  {formData.metaDescription || formData.description || "Meta açıklama buraya gelecek..."}
                </p>
              </div>
            </div>
          </div>
        </Card>

        {/* Actions */}
        <div className="flex gap-3">
          <Link href="/admin/products" className="flex-1">
            <Button variant="outline" className="w-full">
              İptal
            </Button>
          </Link>
          <Button
            type="submit"
            disabled={loading}
            className="flex-1 bg-neutral-900 hover:bg-neutral-800"
          >
            <Save className="h-4 w-4 mr-2" />
            {loading ? "Kaydediliyor..." : "Ürünü Kaydet"}
          </Button>
        </div>
      </form>
    </div>
  )
}