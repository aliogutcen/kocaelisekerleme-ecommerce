import { Star } from "lucide-react"
import { cn } from "@/lib/utils"

interface Review {
  id: number
  name: string
  verified: boolean
  rating: number
  date: string
  comment: string
  helpful: number
}

interface ProductReviewsProps {
  productRating: number
  totalReviews: number
  reviews: Review[]
}

export function ProductReviews({ productRating, totalReviews, reviews }: ProductReviewsProps) {
  const ratingDistribution = [
    { rating: 5, percentage: 85 },
    { rating: 4, percentage: 10 },
    { rating: 3, percentage: 5 },
    { rating: 2, percentage: 0 },
    { rating: 1, percentage: 0 }
  ]

  return (
    <section className="py-32 bg-gradient-to-b from-white to-neutral-50">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-[11px] font-extralight tracking-[0.3em] text-neutral-400 uppercase mb-4">Reviews</h2>
            <p className="text-4xl font-thin text-neutral-900">What Our Customers Say</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <div className="text-center">
              <p className="text-4xl font-light mb-2">{productRating}</p>
              <div className="flex justify-center mb-2">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-neutral-900 text-neutral-900" />
                ))}
              </div>
              <p className="text-sm text-neutral-500">{totalReviews} reviews</p>
            </div>
            
            <div className="col-span-2 space-y-2">
              {ratingDistribution.map(({ rating, percentage }) => (
                <div key={rating} className="flex items-center gap-4">
                  <span className="text-sm w-3">{rating}</span>
                  <div className="flex-1 h-1 bg-neutral-200">
                    <div
                      className="h-full bg-neutral-900"
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                  <span className="text-sm text-neutral-500 w-10 text-right">
                    {percentage}%
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-6">
            {reviews.map((review) => (
              <div key={review.id} className="py-8 border-b border-neutral-100">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={cn(
                              "h-3.5 w-3.5",
                              i < review.rating
                                ? "fill-neutral-900 text-neutral-900"
                                : "fill-transparent text-neutral-200"
                            )}
                          />
                        ))}
                      </div>
                      <h4 className="text-sm font-light">{review.name}</h4>
                      {review.verified && (
                        <span className="text-[10px] tracking-wider text-neutral-400 uppercase">
                          Verified Purchase
                        </span>
                      )}
                    </div>
                    <span className="text-xs text-neutral-400">{review.date}</span>
                  </div>
                  <p className="text-neutral-600 font-light leading-relaxed">{review.comment}</p>
                  <button className="text-xs tracking-wider text-neutral-400 hover:text-neutral-600 uppercase transition-colors">
                    Helpful ({review.helpful})
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}