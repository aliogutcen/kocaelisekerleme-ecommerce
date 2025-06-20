import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function seedOrders() {
  try {
    // Find the user with email cryptotakip
    const user = await prisma.user.findFirst({
      where: { email: { contains: 'cryptotakip' } }
    })

    if (!user) {
      console.error('User with email containing "cryptotakip" not found')
      return
    }

    console.log(`Found user: ${user.email}`)

    // Find or create an address for the user
    let address = await prisma.address.findFirst({
      where: { userId: user.id }
    })

    if (!address) {
      console.log('Creating address for user...')
      address = await prisma.address.create({
        data: {
          userId: user.id,
          title: 'Ev',
          firstName: 'Test',
          lastName: 'Kullanıcı',
          phone: '5551234567',
          address: 'Test Mahallesi, Test Sokak No:1 Daire:1',
          city: 'İstanbul',
          district: 'Kadıköy',
          postalCode: '34710',
          isDefault: true
        }
      })
    }

    // Find or create some products
    let products = await prisma.product.findMany({ take: 5 })
    
    if (products.length === 0) {
      console.log('No products found, creating sample products...')
      
      // Create a category first
      const category = await prisma.category.create({
        data: {
          name: 'Geleneksel Ürünler',
          slug: 'geleneksel-urunler',
          description: 'Geleneksel tahin ve helva ürünlerimiz'
        }
      })

      // Create sample products
      products = await Promise.all([
        prisma.product.create({
          data: {
            name: 'Tahin',
            slug: 'tahin',
            description: 'Geleneksel tahin',
            price: 120.00,
            sku: 'THN001',
            stock: 100,
            images: ['/images/products/tahin.jpg'],
            categoryId: category.id
          }
        }),
        prisma.product.create({
          data: {
            name: 'Tahin Helvası',
            slug: 'tahin-helvasi',
            description: 'Geleneksel tahin helvası',
            price: 150.00,
            sku: 'HLV001',
            stock: 50,
            images: ['/images/products/helva.jpg'],
            categoryId: category.id
          }
        }),
        prisma.product.create({
          data: {
            name: 'Cevizli Helva',
            slug: 'cevizli-helva',
            description: 'Cevizli özel helva',
            price: 180.00,
            sku: 'HLV002',
            stock: 30,
            images: ['/images/products/cevizli-helva.jpg'],
            categoryId: category.id
          }
        })
      ])
    }

    // Create fake orders with different statuses
    const orderStatuses = ['PENDING', 'PROCESSING', 'SHIPPED', 'DELIVERED', 'CANCELLED']
    
    for (let i = 0; i < 5; i++) {
      const orderDate = new Date()
      orderDate.setDate(orderDate.getDate() - Math.floor(Math.random() * 90)) // Random date within last 90 days
      
      const orderItems = []
      const numItems = Math.floor(Math.random() * 3) + 1 // 1-3 items per order
      let total = 0
      
      for (let j = 0; j < numItems; j++) {
        const product = products[Math.floor(Math.random() * products.length)]
        const quantity = Math.floor(Math.random() * 3) + 1 // 1-3 quantity
        const price = parseFloat(product.price.toString())
        total += price * quantity
        
        orderItems.push({
          productId: product.id,
          quantity,
          price,
          total: price * quantity
        })
      }
      
      const order = await prisma.order.create({
        data: {
          orderNumber: `KS${Date.now()}${i}`,
          userId: user.id,
          addressId: address.id,
          status: orderStatuses[i % orderStatuses.length] as any,
          total: total + 15 + (total * 0.18),
          subtotal: total,
          tax: total * 0.18,
          shippingCost: 15.00,
          paymentMethod: i % 2 === 0 ? 'credit_card' : 'bank_transfer',
          paymentStatus: (i < 3 ? 'SUCCESS' : 'PENDING') as any,
          createdAt: orderDate,
          items: {
            create: orderItems
          }
        },
        include: {
          items: {
            include: {
              product: true
            }
          }
        }
      })
      
      console.log(`Created order #${order.orderNumber} with ${order.items.length} items - Status: ${order.status}`)
    }
    
    console.log('✅ Successfully created 5 fake orders')
    
  } catch (error) {
    console.error('Error seeding orders:', error)
  } finally {
    await prisma.$disconnect()
  }
}

seedOrders()