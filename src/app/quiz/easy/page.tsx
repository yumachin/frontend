"use client"

import NotUser from "@/components/not-user"
import { useUser } from "@/context/UserContext"

export default function EasyQuizRootPage() {
  const { user } = useUser()
  if (!user) return <NotUser />
  window.location.href = `/quiz/easy/${user.stats.easyCorrectNum + 1}`
}
