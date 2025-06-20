interface ProductShippingProps {
  shipping: {
    estimatedDays: string
    minAmount: number
  }
}

export function ProductShipping({ shipping }: ProductShippingProps) {
  return (
    <div className="mt-12 pt-8 border-t border-neutral-100">
      <div className="grid grid-cols-3 gap-8 text-center">
        <div>
          <p className="text-[11px] tracking-[0.2em] text-neutral-400 uppercase mb-2">Delivery</p>
          <p className="text-sm font-light text-neutral-700">{shipping.estimatedDays} Days</p>
        </div>
        <div>
          <p className="text-[11px] tracking-[0.2em] text-neutral-400 uppercase mb-2">Free Shipping</p>
          <p className="text-sm font-light text-neutral-700">{shipping.minAmount}+ TRY</p>
        </div>
        <div>
          <p className="text-[11px] tracking-[0.2em] text-neutral-400 uppercase mb-2">Returns</p>
          <p className="text-sm font-light text-neutral-700">14 Days</p>
        </div>
      </div>
    </div>
  )
}