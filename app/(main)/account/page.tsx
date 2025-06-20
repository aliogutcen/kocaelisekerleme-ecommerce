import { auth } from "@/lib/auth/auth"
import { redirect } from "next/navigation"
import AccountClient from "./account-client"

export default async function AccountPage() {
  const session = await auth()
  
  if (!session?.user) {
    redirect('/auth/login')
  }
  
  return <AccountClient user={session.user} />
}