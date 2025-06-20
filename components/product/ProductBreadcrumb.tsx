import Link from "next/link"

interface ProductBreadcrumbProps {
  category: string
  productName: string
}

export function ProductBreadcrumb({ category, productName }: ProductBreadcrumbProps) {
  return (
    <div className="container mx-auto px-4 md:px-6 py-6">
      <nav className="flex items-center text-[11px] text-neutral-400 tracking-wider">
        <Link href="/" className="hover:text-neutral-600 transition-colors uppercase">
          Home
        </Link>
        <span className="mx-3 opacity-50">/</span>
        <Link href="/products" className="hover:text-neutral-600 transition-colors uppercase">
          Products
        </Link>
        <span className="mx-3 opacity-50">/</span>
        <span className="text-neutral-600 uppercase">{category}</span>
        <span className="mx-3 opacity-50">/</span>
        <span className="text-neutral-900">{productName}</span>
      </nav>
    </div>
  )
}