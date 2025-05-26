"use client"

import { useUser } from "@/context/UserContext"
import { redirect } from "next/navigation"

export default function HardQuizRootPage() {
  const { user } = useUser()
  if (!user) {
    return <div className="text-center text-red-500 mt-30">プロフィールの取得に失敗しました。</div>
  }
  redirect(`/quiz/hard/${user.stats.hardClearNum + 1}`)
}
