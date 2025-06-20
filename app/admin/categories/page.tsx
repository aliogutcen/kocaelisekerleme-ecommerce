"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { 
  Plus, 
  Search, 
  Edit,
  Trash2,
  MoreVertical,
  Folder,
  FolderOpen,
  Image as ImageIcon,
  X,
  Upload
} from "lucide-react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useToast } from "@/components/ui/use-toast"
import { cn } from "@/lib/utils"

interface Category {
  id: string
  name: string
  slug: string
  description: string | null
  image: string | null
  parentId: string | null
  parent?: Category | null
  children: Category[]
  _count: {
    products: number
  }
  createdAt: string
  updatedAt: string
}

export default function CategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [showForm, setShowForm] = useState(false)
  const [editingCategory, setEditingCategory] = useState<Category | null>(null)
  const [expandedCategories, setExpandedCategories] = useState<string[]>([])
  const { toast } = useToast()

  // Form state
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    image: "",
    parentId: ""
  })

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
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    try {
      const url = editingCategory 
        ? `/api/categories/${editingCategory.id}`
        : "/api/categories"
      
      const method = editingCategory ? "PUT" : "POST"
      
      // Empty string'leri null'a çevir
      const dataToSend = {
        name: formData.name,
        description: formData.description || null,
        image: formData.image || null,
        parentId: formData.parentId || null
      }
      
      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dataToSend)
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.error || "İşlem başarısız")
      }

      toast({
        title: editingCategory ? "Kategori güncellendi" : "Kategori oluşturuldu",
        description: "İşlem başarıyla tamamlandı"
      })

      fetchCategories()
      resetForm()
    } catch (error: any) {
      toast({
        title: "Hata",
        description: error.message || "İşlem sırasında hata oluştu",
        variant: "destructive"
      })
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm("Bu kategoriyi silmek istediğinizden emin misiniz?")) return

    try {
      const response = await fetch(`/api/categories/${id}`, {
        method: "DELETE"
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.error || "Silme işlemi başarısız")
      }

      toast({
        title: "Kategori silindi",
        description: "Kategori başarıyla silindi"
      })

      fetchCategories()
    } catch (error: any) {
      toast({
        title: "Hata",
        description: error.message || "Silme işlemi sırasında hata oluştu",
        variant: "destructive"
      })
    }
  }

  const handleEdit = (category: Category) => {
    setEditingCategory(category)
    setFormData({
      name: category.name,
      description: category.description || "",
      image: category.image || "",
      parentId: category.parentId || ""
    })
    setShowForm(true)
  }

  const resetForm = () => {
    setFormData({
      name: "",
      description: "",
      image: "",
      parentId: ""
    })
    setEditingCategory(null)
    setShowForm(false)
  }

  const toggleExpanded = (categoryId: string) => {
    setExpandedCategories(prev =>
      prev.includes(categoryId)
        ? prev.filter(id => id !== categoryId)
        : [...prev, categoryId]
    )
  }

  const renderCategory = (category: Category, level: number = 0) => {
    const hasChildren = category.children && category.children.length > 0
    const isExpanded = expandedCategories.includes(category.id)

    return (
      <div key={category.id}>
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className={cn(
            "flex items-center gap-4 p-4 hover:bg-neutral-50 rounded-lg transition-colors",
            level > 0 && "ml-8"
          )}
        >
          <button
            onClick={() => hasChildren && toggleExpanded(category.id)}
            className={cn("p-1", !hasChildren && "invisible")}
          >
            {hasChildren && (
              isExpanded ? <FolderOpen className="h-5 w-5 text-neutral-600" /> : <Folder className="h-5 w-5 text-neutral-600" />
            )}
          </button>

          <div className="flex-1">
            <div className="flex items-center gap-3">
              {category.image && (
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-10 h-10 rounded-lg object-cover"
                />
              )}
              <div>
                <h3 className="font-medium text-neutral-900">{category.name}</h3>
                <p className="text-sm text-neutral-500">
                  {category._count.products} ürün • {category.slug}
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => handleEdit(category)}
            >
              <Edit className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => handleDelete(category.id)}
              className="text-red-600 hover:text-red-700"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </motion.div>

        {hasChildren && isExpanded && (
          <div className="pl-4">
            {category.children.map(child => renderCategory(child, level + 1))}
          </div>
        )}
      </div>
    )
  }

  const filteredCategories = categories.filter(cat =>
    cat.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    cat.slug.toLowerCase().includes(searchQuery.toLowerCase())
  )

  // Sadece üst seviye kategorileri göster (parent'ı olmayanlar)
  const topLevelCategories = filteredCategories.filter(cat => !cat.parentId)

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-neutral-500">Yükleniyor...</div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-extralight text-neutral-900">Kategoriler</h1>
          <p className="text-sm text-neutral-500 mt-1">Toplam {categories.length} kategori</p>
        </div>
        <Button 
          className="bg-neutral-900 hover:bg-neutral-800"
          onClick={() => setShowForm(true)}
        >
          <Plus className="h-4 w-4 mr-2" />
          Yeni Kategori
        </Button>
      </div>

      {/* Search */}
      <Card className="p-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-400" />
          <input
            type="text"
            placeholder="Kategori ara..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full h-10 pl-10 pr-4 bg-neutral-50 border border-neutral-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-neutral-900 focus:border-transparent"
          />
        </div>
      </Card>

      {/* Categories */}
      <Card className="overflow-hidden">
        <div className="divide-y divide-neutral-200">
          {topLevelCategories.length === 0 ? (
            <div className="p-12 text-center text-neutral-500">
              Kategori bulunamadı
            </div>
          ) : (
            topLevelCategories.map(category => renderCategory(category))
          )}
        </div>
      </Card>

      {/* Form Modal */}
      <AnimatePresence>
        {showForm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
            onClick={resetForm}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white rounded-lg shadow-xl w-full max-w-md"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-light">
                    {editingCategory ? "Kategori Düzenle" : "Yeni Kategori"}
                  </h2>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={resetForm}
                  >
                    <X className="h-5 w-5" />
                  </Button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-2">
                      Kategori Adı
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
                      Açıklama
                    </label>
                    <textarea
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      className="w-full h-24 px-3 py-2 bg-neutral-50 border border-neutral-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-neutral-900 resize-none"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-2">
                      Resim URL
                    </label>
                    <input
                      type="url"
                      value={formData.image}
                      onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                      className="w-full h-10 px-3 bg-neutral-50 border border-neutral-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-neutral-900"
                      placeholder="https://..."
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-2">
                      Üst Kategori
                    </label>
                    <select
                      value={formData.parentId}
                      onChange={(e) => setFormData({ ...formData, parentId: e.target.value })}
                      className="w-full h-10 px-3 bg-neutral-50 border border-neutral-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-neutral-900"
                    >
                      <option value="">Ana Kategori</option>
                      {categories
                        .filter(cat => cat.id !== editingCategory?.id)
                        .map(cat => (
                          <option key={cat.id} value={cat.id}>
                            {cat.name}
                          </option>
                        ))}
                    </select>
                  </div>

                  <div className="flex gap-3 pt-4">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={resetForm}
                      className="flex-1"
                    >
                      İptal
                    </Button>
                    <Button
                      type="submit"
                      className="flex-1 bg-neutral-900 hover:bg-neutral-800"
                    >
                      {editingCategory ? "Güncelle" : "Oluştur"}
                    </Button>
                  </div>
                </form>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}