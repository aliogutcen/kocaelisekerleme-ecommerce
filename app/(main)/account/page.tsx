import AccountClient from "@/components/account/account-client"
import { auth } from "@/lib/auth/auth"
import { redirect } from "next/navigation"


export default async function AccountPage() {
  const session = await auth()
  
  if (!session?.user) {
    redirect('/auth/login')
  }
  
  return <AccountClient user={session.user} />
}