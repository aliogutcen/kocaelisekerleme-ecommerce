"use client"

import { Suspense } from "react"
import AccountDashboard from "@/components/account/account-dashboard"

interface AccountClientProps {
  user: any
}

export default function AccountClient({ user }: AccountClientProps) {
  return (
    <Suspense fallback={<div className="flex justify-center py-12"><div className="h-8 w-8 animate-spin rounded-full border-2 border-gray-300 border-t-gray-900" /></div>}>
      <AccountDashboard user={user} />
    </Suspense>
  )
}