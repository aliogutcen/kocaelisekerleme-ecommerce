"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { MapPin, Plus, Edit2, Trash2, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import AddressForm from "./address-form"

interface Address {
  id: string
  title: string
  firstName: string
  lastName: string
  phone: string
  address: string
  city: string
  district: string
  postalCode: string | null
  isDefault: boolean
}

export default function AddressBook() {
  const [addresses, setAddresses] = useState<Address[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [showForm, setShowForm] = useState(false)
  const [editingAddress, setEditingAddress] = useState<Address | null>(null)

  useEffect(() => {
    fetchAddresses()
  }, [])

  const fetchAddresses = async () => {
    try {
      setLoading(true)
      const response = await fetch('/api/account/addresses')
      const data = await response.json()

      if (!data.success) {
        setError(data.message || 'Adresler yüklenirken bir hata oluştu')
        return
      }

      setAddresses(data.addresses || [])
    } catch (error) {
      setError('Adresler yüklenirken bir hata oluştu')
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Bu adresi silmek istediğinizden emin misiniz?')) return

    try {
      const response = await fetch(`/api/account/addresses/${id}`, {
        method: 'DELETE',
      })

      const data = await response.json()

      if (!data.success) {
        alert(data.message || 'Adres silinirken bir hata oluştu')
        return
      }

      setAddresses(addresses.filter(addr => addr.id !== id))
    } catch (error) {
      alert('Adres silinirken bir hata oluştu')
    }
  }

  const handleEdit = (address: Address) => {
    setEditingAddress(address)
    setShowForm(true)
  }

  const handleFormClose = () => {
    setShowForm(false)
    setEditingAddress(null)
    fetchAddresses()
  }

  if (showForm) {
    return (
      <AddressForm
        address={editingAddress}
        onClose={handleFormClose}
      />
    )
  }

  return (
    <div>
      <div className="flex items-start justify-between mb-8">
        <div>
          <h2 className="text-2xl font-light text-gray-900 mb-2" style={{ fontFamily: 'var(--font-playfair)' }}>
            Adreslerim
          </h2>
          <p className="text-gray-500 font-light text-sm">
            Teslimat adreslerinizi yönetin
          </p>
        </div>
        <Button
          onClick={() => setShowForm(true)}
          className="h-10 px-4 bg-black hover:bg-gray-900 text-white text-sm font-light tracking-wider rounded-md transition-all duration-300 hover:shadow-lg"
        >
          <Plus className="h-4 w-4 mr-2" />
          Yeni Adres Ekle
        </Button>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-gray-400" />
        </div>
      ) : error ? (
        <div className="text-center py-12">
          <p className="text-red-600">{error}</p>
        </div>
      ) : addresses.length === 0 ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-12"
        >
          <MapPin className="h-12 w-12 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-light text-gray-900 mb-2">Henüz adresiniz yok</h3>
          <p className="text-gray-500 font-light text-sm mb-6">
            Sipariş verebilmek için en az bir adres eklemelisiniz
          </p>
        </motion.div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {addresses.map((address, index) => (
            <motion.div
              key={address.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`border rounded-lg p-6 relative ${
                address.isDefault
                  ? 'border-gray-900 bg-gray-50'
                  : 'border-gray-200 hover:border-gray-300'
              } transition-colors`}
            >
              {address.isDefault && (
                <span className="absolute top-4 right-4 px-2 py-1 bg-gray-900 text-white text-xs font-medium rounded">
                  Varsayılan
                </span>
              )}
              
              <h3 className="text-lg font-medium text-gray-900 mb-1">
                {address.title}
              </h3>
              <p className="text-sm text-gray-600 mb-3">{address.firstName} {address.lastName}</p>
              
              <address className="text-sm text-gray-600 not-italic space-y-1">
                <p>{address.address}</p>
                <p>{address.district} / {address.city} {address.postalCode}</p>
                <p className="flex items-center gap-2 mt-2">
                  <span className="text-gray-400">Tel:</span>
                  {address.phone}
                </p>
              </address>
              
              <div className="flex items-center gap-2 mt-4 pt-4 border-t border-gray-100">
                <button
                  onClick={() => handleEdit(address)}
                  className="flex items-center gap-1 text-sm text-gray-600 hover:text-gray-900 transition-colors"
                >
                  <Edit2 className="h-3 w-3" />
                  Düzenle
                </button>
                <span className="text-gray-300">•</span>
                <button
                  onClick={() => handleDelete(address.id)}
                  className="flex items-center gap-1 text-sm text-red-600 hover:text-red-700 transition-colors"
                >
                  <Trash2 className="h-3 w-3" />
                  Sil
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  )
}