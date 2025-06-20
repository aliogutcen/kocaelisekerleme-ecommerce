import { Skeleton } from "@/components/ui/skeleton"

export default function AuthLoading() {
  return (
    <div className="w-full animate-in fade-in duration-500">
      <div className="text-center mb-10">
        <Skeleton className="h-9 w-48 mx-auto mb-3" />
        <Skeleton className="h-5 w-64 mx-auto" />
      </div>

      <div className="space-y-6">
        <div className="space-y-2">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-12 w-full" />
        </div>
        
        <div className="space-y-2">
          <Skeleton className="h-4 w-16" />
          <Skeleton className="h-12 w-full" />
        </div>
        
        <Skeleton className="h-12 w-full" />
        
        <div className="flex items-center gap-4 my-8">
          <Skeleton className="h-px flex-1" />
          <Skeleton className="h-4 w-12" />
          <Skeleton className="h-px flex-1" />
        </div>
        
        <Skeleton className="h-12 w-full" />
        
        <Skeleton className="h-5 w-48 mx-auto" />
      </div>
    </div>
  )
}