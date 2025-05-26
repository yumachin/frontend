"use client"

import { useUser } from "@/context/UserContext"
import { redirect } from "next/navigation"

const user = {
  userId: "5vcsdvasjhviaer",
  email: "e1922047@oit.ac.jp",
  userName: "中井裕麻",
  iconPath: "default.png",
  role: "user" as "user",
  stats: {
    hardClearNum: 3,
    normalClearNum: 13,
    easyClearNum: 10,
    hardCorrectNum: 2,
    normalCorrectNum: 5,
    easyCorrectNum: 7
  },
  createdAt: "2025-05-24T08:53:18.000Z",
  updatedAt: "2025-05-24T08:53:18.000Z"
}

export default function EasyQuizRootPage() {
  // const { user } = useUser()
  if (!user) {
    return <div className="text-center text-red-500 mt-30">プロフィールの取得に失敗しました。</div>
  }
  redirect(`/quiz/easy/${user.stats.easyClearNum + 1}`)
}
