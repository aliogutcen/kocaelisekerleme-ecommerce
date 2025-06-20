"use client"

import { motion } from "framer-motion"
import { 
  TrendingUp, 
  TrendingDown, 
  ShoppingCart, 
  Users, 
  Package, 
  DollarSign,
  Eye,
  Calendar,
  ArrowRight,
  MoreVertical
} from "lucide-react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from "recharts"

// Mock data
const salesData = [
  { name: "Oca", value: 45000 },
  { name: "Şub", value: 52000 },
  { name: "Mar", value: 48000 },
  { name: "Nis", value: 61000 },
  { name: "May", value: 58000 },
  { name: "Haz", value: 72000 }
]

const categoryData = [
  { name: "Tahin Helvası", value: 35, color: "#171717" },
  { name: "Tahin", value: 25, color: "#525252" },
  { name: "Lokum", value: 20, color: "#a3a3a3" },
  { name: "Pekmez", value: 20, color: "#d4d4d4" }
]

const recentOrders = [
  { id: "KS2025061234", customer: "Ahmet Yılmaz", amount: "249.90", status: "processing", time: "5 dk önce" },
  { id: "KS2025061233", customer: "Ayşe Demir", amount: "189.90", status: "shipped", time: "15 dk önce" },
  { id: "KS2025061232", customer: "Mehmet Kaya", amount: "345.00", status: "delivered", time: "1 saat önce" },
  { id: "KS2025061231", customer: "Zeynep Öz", amount: "128.50", status: "processing", time: "2 saat önce" }
]

const topProducts = [
  { name: "Geleneksel Tahin Helvası", sales: 145, revenue: "21,755 TL", trend: 12 },
  { name: "Organik Susam Tahini", sales: 98, revenue: "8,802 TL", trend: -5 },
  { name: "Antep Fıstıklı Helva", sales: 87, revenue: "16,491 TL", trend: 8 },
  { name: "Gül Lokumu", sales: 76, revenue: "9,872 TL", trend: 15 }
]

const stats = [
  {
    title: "Toplam Satış",
    value: "72,450 TL",
    change: "+12.5%",
    trend: "up",
    icon: DollarSign,
    color: "text-green-600",
    bgColor: "bg-green-50"
  },
  {
    title: "Siparişler",
    value: "243",
    change: "+8.2%",
    trend: "up",
    icon: ShoppingCart,
    color: "text-blue-600",
    bgColor: "bg-blue-50"
  },
  {
    title: "Müşteriler",
    value: "1,847",
    change: "+23.1%",
    trend: "up",
    icon: Users,
    color: "text-purple-600",
    bgColor: "bg-purple-50"
  },
  {
    title: "Ürün Görüntüleme",
    value: "12.4K",
    change: "-2.3%",
    trend: "down",
    icon: Eye,
    color: "text-orange-600",
    bgColor: "bg-orange-50"
  }
]

export default function AdminDashboard() {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "processing": return "bg-yellow-100 text-yellow-800"
      case "shipped": return "bg-blue-100 text-blue-800"
      case "delivered": return "bg-green-100 text-green-800"
      default: return "bg-neutral-100 text-neutral-800"
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case "processing": return "İşleniyor"
      case "shipped": return "Kargoda"
      case "delivered": return "Teslim Edildi"
      default: return status
    }
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-extralight text-neutral-900">Dashboard</h1>
          <p className="text-sm text-neutral-500 mt-1">Hoş geldiniz, işte bugünkü özet</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" size="sm" className="h-9">
            <Calendar className="h-4 w-4 mr-2" />
            Son 30 Gün
          </Button>
          <Button size="sm" className="h-9 bg-neutral-900 hover:bg-neutral-800">
            Rapor İndir
          </Button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm text-neutral-500">{stat.title}</p>
                  <p className="text-2xl font-light text-neutral-900 mt-2">{stat.value}</p>
                  <div className="flex items-center gap-1 mt-3">
                    {stat.trend === "up" ? (
                      <TrendingUp className="h-4 w-4 text-green-600" />
                    ) : (
                      <TrendingDown className="h-4 w-4 text-red-600" />
                    )}
                    <span className={`text-sm ${stat.trend === "up" ? "text-green-600" : "text-red-600"}`}>
                      {stat.change}
                    </span>
                    <span className="text-xs text-neutral-500">bu ay</span>
                  </div>
                </div>
                <div className={`w-12 h-12 ${stat.bgColor} rounded-lg flex items-center justify-center`}>
                  <stat.icon className={`h-6 w-6 ${stat.color}`} />
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Sales Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="lg:col-span-2"
        >
          <Card className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-light text-neutral-900">Satış Grafiği</h2>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <MoreVertical className="h-4 w-4" />
              </Button>
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={salesData}>
                <defs>
                  <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#171717" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#171717" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#f5f5f5" />
                <XAxis dataKey="name" stroke="#a3a3a3" fontSize={12} />
                <YAxis stroke="#a3a3a3" fontSize={12} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'white', 
                    border: '1px solid #e5e5e5',
                    borderRadius: '8px',
                    padding: '8px 12px'
                  }}
                  formatter={(value: any) => [`${value} TL`, 'Satış']}
                />
                <Area 
                  type="monotone" 
                  dataKey="value" 
                  stroke="#171717" 
                  fillOpacity={1} 
                  fill="url(#colorSales)"
                  strokeWidth={2}
                />
              </AreaChart>
            </ResponsiveContainer>
          </Card>
        </motion.div>

        {/* Category Distribution */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card className="p-6">
            <h2 className="text-lg font-light text-neutral-900 mb-6">Kategori Dağılımı</h2>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  formatter={(value: any) => `%${value}`}
                  contentStyle={{ 
                    backgroundColor: 'white', 
                    border: '1px solid #e5e5e5',
                    borderRadius: '8px',
                    padding: '8px 12px'
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
            <div className="space-y-2 mt-6">
              {categoryData.map((item) => (
                <div key={item.name} className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                    <span className="text-neutral-600">{item.name}</span>
                  </div>
                  <span className="font-light">%{item.value}</span>
                </div>
              ))}
            </div>
          </Card>
        </motion.div>
      </div>

      {/* Tables Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Orders */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Card className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-light text-neutral-900">Son Siparişler</h2>
              <Link href="/admin/orders" className="text-sm text-neutral-600 hover:text-neutral-900 flex items-center gap-1">
                Tümünü Gör
                <ArrowRight className="h-3 w-3" />
              </Link>
            </div>
            <div className="space-y-4">
              {recentOrders.map((order) => (
                <div key={order.id} className="flex items-center justify-between py-3 border-b border-neutral-100 last:border-0">
                  <div className="flex-1">
                    <p className="text-sm font-medium text-neutral-900">{order.id}</p>
                    <p className="text-xs text-neutral-500">{order.customer} • {order.time}</p>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-sm font-light">{order.amount} TL</span>
                    <span className={`text-xs px-2 py-1 rounded-full ${getStatusColor(order.status)}`}>
                      {getStatusText(order.status)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </motion.div>

        {/* Top Products */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <Card className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-light text-neutral-900">En Çok Satanlar</h2>
              <Link href="/admin/products" className="text-sm text-neutral-600 hover:text-neutral-900 flex items-center gap-1">
                Tümünü Gör
                <ArrowRight className="h-3 w-3" />
              </Link>
            </div>
            <div className="space-y-4">
              {topProducts.map((product, index) => (
                <div key={product.name} className="flex items-center justify-between py-3 border-b border-neutral-100 last:border-0">
                  <div className="flex items-center gap-3">
                    <span className="text-sm text-neutral-400 font-light">{index + 1}</span>
                    <div>
                      <p className="text-sm font-medium text-neutral-900">{product.name}</p>
                      <p className="text-xs text-neutral-500">{product.sales} satış</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-light">{product.revenue}</p>
                    <div className="flex items-center gap-1 justify-end">
                      {product.trend > 0 ? (
                        <TrendingUp className="h-3 w-3 text-green-600" />
                      ) : (
                        <TrendingDown className="h-3 w-3 text-red-600" />
                      )}
                      <span className={`text-xs ${product.trend > 0 ? "text-green-600" : "text-red-600"}`}>
                        {product.trend > 0 ? "+" : ""}{product.trend}%
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}