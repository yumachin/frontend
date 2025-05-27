"use client"

import NotUser from "@/components/not-user"
import { useUser } from "@/context/UserContext"

export default function HardQuizRootPage() {
  const { user } = useUser()
  if (!user) return <NotUser />
  window.location.href = `/quiz/hard/${user.stats.hardCorrectNum + 1}`
}
