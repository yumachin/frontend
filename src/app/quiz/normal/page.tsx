"use client"

import NotUser from "@/components/not-user"
import { useUser } from "@/context/UserContext"

export default function NormalQuizRootPage() {
  const { user } = useUser()
  if (!user) return <NotUser />
  window.location.href = `/quiz/normal/${user.stats.normalCorrectNum + 1}`
}
