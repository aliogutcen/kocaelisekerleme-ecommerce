"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { 
  Plus, 
  Search, 
  Filter,
  MoreVertical,
  Edit,
  Trash2,
  Eye,
  Copy,
  Download,
  ChevronDown,
  Package,
  AlertCircle,
  Loader2
} from "lucide-react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import Image from "next/image"
import { cn } from "@/lib/utils"
import { useToast } from "@/components/ui/use-toast"
import type { Product } from "@/types/product"

// Mock data - Kaldırılacak
const mockProducts = [
  {
    id: 1,
    name: "Geleneksel Tahin Helvası",
    category: "Tahin Helvası",
    price: "149.90",
    stock: 45,
    status: "active",
    image: "/hero.jpg",
    sku: "TH001",
    sales: 145
  },
  {
    id: 2,
    name: "Organik Susam Tahini",
    category: "Tahin",
    price: "89.90",
    stock: 0,
    status: "out_of_stock",
    image: "/hero.jpg",
    sku: "T001",
    sales: 98
  },
  {
    id: 3,
    name: "Antep Fıstıklı Helva",
    category: "Tahin Helvası",
    price: "189.90",
    stock: 23,
    status: "active",
    image: "/hero.jpg",
    sku: "TH002",
    sales: 87
  },
  {
    id: 4,
    name: "Gül Lokumu",
    category: "Lokum",
    price: "129.90",
    stock: 8,
    status: "low_stock",
    image: "/hero.jpg",
    sku: "L001",
    sales: 76
  },
  {
    id: 5,
    name: "Cevizli Tahin Helvası",
    category: "Tahin Helvası",
    price: "169.90",
    stock: 34,
    status: "active",
    image: "/hero.jpg",
    sku: "TH003",
    sales: 54
  }
]

interface Category {
  id: string
  name: string
  slug: string
}

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("")
  const [showFilters, setShowFilters] = useState(false)
  const [selectedProducts, setSelectedProducts] = useState<string[]>([])
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 12,
    total: 0,
    totalPages: 0
  })
  const { toast } = useToast()

  useEffect(() => {
    fetchCategories()
    fetchProducts()
  }, [selectedCategory, searchQuery, pagination.page])

  const fetchCategories = async () => {
    try {
      const response = await fetch("/api/categories")
      if (!response.ok) throw new Error("Kategoriler yüklenemedi")
      const data = await response.json()
      setCategories(data)
    } catch (error) {
      console.error("Error fetching categories:", error)
    }
  }

  const fetchProducts = async () => {
    try {
      setLoading(true)
      const params = new URLSearchParams({
        page: pagination.page.toString(),
        limit: pagination.limit.toString(),
        ...(searchQuery && { search: searchQuery }),
        ...(selectedCategory && { categoryId: selectedCategory })
      })

      const response = await fetch(`/api/products?${params}`)
      if (!response.ok) throw new Error("Ürünler yüklenemedi")
      
      const data = await response.json()
      setProducts(data.products)
      setPagination(data.pagination)
    } catch (error) {
      toast({
        title: "Hata",
        description: "Ürünler yüklenirken hata oluştu",
        variant: "destructive"
      })
    } finally {
      setLoading(false)
    }
  }

  const getStatusBadge = (product: Product) => {
    if (!product.isActive) {
      return { text: "Pasif", className: "bg-gray-100 text-gray-800" }
    }
    if (product.stock === 0) {
      return { text: "Stokta Yok", className: "bg-red-100 text-red-800" }
    }
    if (product.stock < 10) {
      return { text: "Stok Az", className: "bg-yellow-100 text-yellow-800" }
    }
    return { text: "Aktif", className: "bg-green-100 text-green-800" }
  }

  const toggleProductSelection = (id: string) => {
    setSelectedProducts(prev =>
      prev.includes(id)
        ? prev.filter(p => p !== id)
        : [...prev, id]
    )
  }

  const selectAllProducts = () => {
    if (selectedProducts.length === products.length) {
      setSelectedProducts([])
    } else {
      setSelectedProducts(products.map(p => p.id))
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm("Bu ürünü silmek istediğinizden emin misiniz?")) return

    try {
      const response = await fetch(`/api/products/${id}`, {
        method: "DELETE"
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.error || "Silme işlemi başarısız")
      }

      toast({
        title: "Ürün silindi",
        description: "Ürün başarıyla silindi"
      })

      fetchProducts()
    } catch (error: any) {
      toast({
        title: "Hata",
        description: error.message || "Silme işlemi sırasında hata oluştu",
        variant: "destructive"
      })
    }
  }

  const handlePageChange = (page: number) => {
    setPagination(prev => ({ ...prev, page }))
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-extralight text-neutral-900">Ürünler</h1>
          <p className="text-sm text-neutral-500 mt-1">Toplam {pagination.total} ürün</p>
        </div>
        <Link href="/admin/products/new">
          <Button className="bg-neutral-900 hover:bg-neutral-800">
            <Plus className="h-4 w-4 mr-2" />
            Yeni Ürün Ekle
          </Button>
        </Link>
      </div>

      {/* Filters Bar */}
      <Card className="p-4">
        <div className="flex flex-col lg:flex-row gap-4">
          {/* Search */}
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-400" />
            <input
              type="text"
              placeholder="Ürün adı veya SKU ile ara..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-10 pl-10 pr-4 bg-neutral-50 border border-neutral-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-neutral-900 focus:border-transparent"
            />
          </div>

          {/* Category Filter */}
          <div className="flex gap-2">
            <Button
              variant={selectedCategory === "" ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedCategory("")}
              className={cn(
                "h-10",
                selectedCategory === "" && "bg-neutral-900 hover:bg-neutral-800"
              )}
            >
              Tümü
            </Button>
            {categories.map((category) => (
              <Button
                key={category.id}
                variant={selectedCategory === category.id ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(category.id)}
                className={cn(
                  "h-10",
                  selectedCategory === category.id && "bg-neutral-900 hover:bg-neutral-800"
                )}
              >
                {category.name}
              </Button>
            ))}
          </div>

          {/* More Filters */}
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowFilters(!showFilters)}
            className="h-10 w-full lg:w-auto"
          >
            <Filter className="h-4 w-4 mr-2" />
            Filtreler
            <ChevronDown className={cn("h-4 w-4 ml-2 transition-transform", showFilters && "rotate-180")} />
          </Button>
        </div>

        {/* Advanced Filters */}
        {showFilters && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4 pt-4 border-t border-neutral-200">
            <div>
              <label className="text-sm font-medium text-neutral-700 mb-2 block">Fiyat Aralığı</label>
              <div className="flex gap-2">
                <input
                  type="number"
                  placeholder="Min"
                  className="w-full h-10 px-3 bg-neutral-50 border border-neutral-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-neutral-900"
                />
                <input
                  type="number"
                  placeholder="Max"
                  className="w-full h-10 px-3 bg-neutral-50 border border-neutral-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-neutral-900"
                />
              </div>
            </div>
            <div>
              <label className="text-sm font-medium text-neutral-700 mb-2 block">Stok Durumu</label>
              <select className="w-full h-10 px-3 bg-neutral-50 border border-neutral-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-neutral-900">
                <option>Tümü</option>
                <option>Stokta Var</option>
                <option>Stok Az</option>
                <option>Stokta Yok</option>
              </select>
            </div>
            <div>
              <label className="text-sm font-medium text-neutral-700 mb-2 block">Sıralama</label>
              <select className="w-full h-10 px-3 bg-neutral-50 border border-neutral-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-neutral-900">
                <option>En Yeni</option>
                <option>En Eski</option>
                <option>Fiyat (Düşük → Yüksek)</option>
                <option>Fiyat (Yüksek → Düşük)</option>
                <option>En Çok Satan</option>
              </select>
            </div>
          </div>
        )}
      </Card>

      {/* Selected Actions */}
      {selectedProducts.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-neutral-900 text-white p-4 rounded-lg flex items-center justify-between"
        >
          <span className="text-sm">{selectedProducts.length} ürün seçildi</span>
          <div className="flex gap-2">
            <Button variant="secondary" size="sm">
              <Copy className="h-4 w-4 mr-2" />
              Çoğalt
            </Button>
            <Button variant="secondary" size="sm">
              <Download className="h-4 w-4 mr-2" />
              Dışa Aktar
            </Button>
            <Button variant="secondary" size="sm" className="text-red-600 hover:text-red-700">
              <Trash2 className="h-4 w-4 mr-2" />
              Sil
            </Button>
          </div>
        </motion.div>
      )}

      {/* Products Table */}
      <Card className="overflow-hidden">
        {loading ? (
          <div className="flex items-center justify-center h-96">
            <Loader2 className="h-8 w-8 animate-spin text-neutral-500" />
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-neutral-50 border-b border-neutral-200">
                <tr>
                  <th className="text-left p-4">
                    <input
                      type="checkbox"
                      checked={selectedProducts.length === products.length && products.length > 0}
                      onChange={selectAllProducts}
                      className="rounded border-neutral-300"
                    />
                  </th>
                  <th className="text-left p-4 text-xs font-medium text-neutral-700 uppercase tracking-wider">Ürün</th>
                  <th className="text-left p-4 text-xs font-medium text-neutral-700 uppercase tracking-wider">SKU</th>
                  <th className="text-left p-4 text-xs font-medium text-neutral-700 uppercase tracking-wider">Kategori</th>
                  <th className="text-left p-4 text-xs font-medium text-neutral-700 uppercase tracking-wider">Fiyat</th>
                  <th className="text-left p-4 text-xs font-medium text-neutral-700 uppercase tracking-wider">Stok</th>
                  <th className="text-left p-4 text-xs font-medium text-neutral-700 uppercase tracking-wider">Satış</th>
                  <th className="text-left p-4 text-xs font-medium text-neutral-700 uppercase tracking-wider">Durum</th>
                  <th className="text-right p-4 text-xs font-medium text-neutral-700 uppercase tracking-wider">İşlemler</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-200">
                {products.map((product, index) => {
                  const status = getStatusBadge(product)
                return (
                  <motion.tr
                    key={product.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: index * 0.05 }}
                    className="hover:bg-neutral-50"
                  >
                    <td className="p-4">
                      <input
                        type="checkbox"
                        checked={selectedProducts.includes(product.id)}
                        onChange={() => toggleProductSelection(product.id)}
                        className="rounded border-neutral-300"
                      />
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 relative rounded-lg overflow-hidden bg-neutral-100">
                          {product.images && product.images.length > 0 ? (
                            <Image
                              src={product.images[0].thumbnail || product.images[0].original || "/hero.jpg"}
                              alt={product.name}
                              fill
                              className="object-cover"
                            />
                          ) : (
                            <Image
                              src="/hero.jpg"
                              alt={product.name}
                              fill
                              className="object-cover"
                            />
                          )}
                        </div>
                        <div>
                          <p className="text-sm font-medium text-neutral-900">{product.name}</p>
                        </div>
                      </div>
                    </td>
                    <td className="p-4">
                      <span className="text-sm text-neutral-600">{product.sku}</span>
                    </td>
                    <td className="p-4">
                      <span className="text-sm text-neutral-600">{product.category?.name || "-"}</span>
                    </td>
                    <td className="p-4">
                      {product.discountPrice ? (
                        <div>
                          <span className="text-sm line-through text-neutral-400">{Number(product.price).toFixed(2)} TL</span>
                          <span className="text-sm font-medium text-neutral-900 ml-1">{Number(product.discountPrice).toFixed(2)} TL</span>
                        </div>
                      ) : (
                        <span className="text-sm font-medium text-neutral-900">{Number(product.price).toFixed(2)} TL</span>
                      )}
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        {product.stock < 10 && product.stock > 0 && (
                          <AlertCircle className="h-4 w-4 text-yellow-600" />
                        )}
                        <span className={cn(
                          "text-sm",
                          product.stock === 0 && "text-red-600",
                          product.stock < 10 && product.stock > 0 && "text-yellow-600"
                        )}>
                          {product.stock}
                        </span>
                      </div>
                    </td>
                    <td className="p-4">
                      <span className="text-sm text-neutral-600">{product._count?.orderItems || 0}</span>
                    </td>
                    <td className="p-4">
                      <span className={cn("text-xs px-2 py-1 rounded-full", status.className)}>
                        {status.text}
                      </span>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center justify-end gap-2">
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Link href={`/admin/products/${product.id}/edit`}>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <Edit className="h-4 w-4" />
                          </Button>
                        </Link>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="h-8 w-8 text-red-600 hover:text-red-700"
                          onClick={() => handleDelete(product.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </td>
                  </motion.tr>
                )
              })}
              </tbody>
            </table>

            {/* Empty State */}
            {products.length === 0 && (
              <div className="text-center py-12">
                <Package className="h-12 w-12 text-neutral-300 mx-auto mb-4" />
                <p className="text-neutral-500">Ürün bulunamadı</p>
              </div>
            )}
          </div>
        )}

        {/* Pagination */}
        {!loading && products.length > 0 && (
          <div className="flex items-center justify-between p-4 border-t border-neutral-200">
            <p className="text-sm text-neutral-600">
              Sayfa {pagination.page} / {pagination.totalPages} - Toplam {pagination.total} ürün
            </p>
            <div className="flex gap-2">
              <Button 
                variant="outline" 
                size="sm" 
                disabled={pagination.page === 1}
                onClick={() => handlePageChange(pagination.page - 1)}
              >
                Önceki
              </Button>
              <Button 
                variant="outline" 
                size="sm"
                disabled={pagination.page === pagination.totalPages}
                onClick={() => handlePageChange(pagination.page + 1)}
              >
                Sonraki
              </Button>
            </div>
          </div>
        )}
      </Card>
    </div>
  )
}