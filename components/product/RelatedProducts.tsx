import Link from "next/link"
import Image from "next/image"

interface RelatedProduct {
  id: number
  name: string
  price: number
  image: string
  tag?: string
}

interface RelatedProductsProps {
  products: RelatedProduct[]
}

export function RelatedProducts({ products }: RelatedProductsProps) {
  return (
    <section className="py-32">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-16">
          <h2 className="text-[11px] font-extralight tracking-[0.3em] text-neutral-400 uppercase mb-4">Discover More</h2>
          <p className="text-4xl font-thin text-neutral-900">You May Also Like</p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {products.map((item) => (
            <Link
              key={item.id}
              href={`/products/${item.id}`}
              className="group"
            >
              <div className="space-y-4">
                <div className="relative aspect-square bg-white overflow-hidden">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  {item.tag && (
                    <div className="absolute top-4 left-4">
                      <p className="text-[10px] tracking-[0.2em] text-neutral-500 uppercase">{item.tag}</p>
                    </div>
                  )}
                </div>
                <div>
                  <h3 className="text-sm font-light group-hover:text-neutral-600 transition-colors">
                    {item.name}
                  </h3>
                  <p className="text-lg font-light mt-1">₺{item.price}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}