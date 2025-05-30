"use client"

import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, Copy, Check } from "lucide-react"
import { use, useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

const users = [
  {
    "userId": "UN1czOzwaZQWyzbPunXGx6byDPl2",
    "email": "e1922047@oit.ac.jp",
    "userName": "中井裕麻",
    "iconPath": "default.png",
    "role": "user",
    "stats": {
      "hardClearNum": 0,
      "normalClearNum": 0,
      "easyClearNum": 0,
      "hardCorrectNum": 0,
      "normalCorrectNum": 0,
      "easyCorrectNum": 0
    },
    "createdAt": "2025-05-29T12:47:39.152Z",
    "updatedAt": "2025-05-29T12:47:39.152Z"
  },
  {
    "userId": "UN1czOzwaZQWyzbPunXGx6byDPl3",
    "email": "e1922047@oit.ac.jp",
    "userName": "中井裕麻",
    "iconPath": "default.png",
    "role": "user",
    "stats": {
      "hardClearNum": 0,
      "normalClearNum": 0,
      "easyClearNum": 0,
      "hardCorrectNum": 0,
      "normalCorrectNum": 0,
      "easyCorrectNum": 0
    },
    "createdAt": "2025-05-29T12:47:39.152Z",
    "updatedAt": "2025-05-29T12:47:39.152Z"
  },
]

type LobbyPageProps = {
  params: Promise<{ watchword: string }>
}

export default function LobbyPage({ params }: LobbyPageProps) {
  const searchParams = useSearchParams()
  const roomCode = searchParams.get("code") || "Arena"
  const [copied, setCopied] = useState(false)
  const unwrapParams = use(params);
  const router = useRouter()
  const canStart = users.length >= 2
  const hostId = "UN1czOzwaZQWyzbPunXGx6byDPl2"

  const copyRoomCode = async () => {
    await navigator.clipboard.writeText(roomCode)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleStartQuiz = () => {
    router.push(`/multi/quiz/${roomCode}`)
  }

  return (
    <div className="min-h-screen flex flex-col justify-center bg-background p-6 mx-auto max-w-2xl">
      <Card className="mb-6">
        <CardHeader className="text-center">
          <CardTitle className="text-lg lg:text-xl">ルーム待機中</CardTitle>
          <CardDescription className="text-xs lg:text-sm">他の参加者がルームに参加するのを待っています</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="text-center">
            <p className="text-sm text-muted-foreground mb-2">ルームコード</p>
            <div className="flex items-center justify-center gap-4">
              <code className="text-2xl font-mono font-bold bg-muted px-4 py-2 rounded">{roomCode}</code>
              <Button variant="outline" size="sm" onClick={copyRoomCode} className="h-10">
                {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
              </Button>
            </div>
          </div>

          <div className="flex items-center justify-center gap-2 text-muted-foreground">
            <Users className="h-4 w-4 lg:h-5 lg:w-5" />
            <span className="text-sm lg:text-base">参加者: 1人</span>
          </div>

          <div className="space-y-3">
            <Button
              className="w-full"
              disabled={!canStart}
              onClick={handleStartQuiz}
            >
              クイズを開始 (最低2人必要)
            </Button>
            <Button
              variant="outline"
              className="w-full"
              onClick={() => {
                router.push("/multi")
              }}
            >
              ルームを退出
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-base lg:text-lg">参加者一覧</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          {users.map((user) => (
            <div key={user.userId} className="flex justify-between items-center gap-6 pl-3 pr-2 py-2 bg-muted rounded-2xl">
              <div className="flex items-center gap-3 lg:gap-6">
                <Avatar className="h-7 w-7 lg:h-12 lg:w-12">
                  <AvatarImage src={`https://api.dicebear.com/7.x/thumbs/svg?seed=${user.userName}`} alt={user.userName} />
                  <AvatarFallback>{user.userName.charAt(0) ?? "?"}</AvatarFallback>
                </Avatar>
                <span className="font-medium text-sm lg:text-base">{user.userName}</span>
              </div>
              <span className="text-xs">{user.userId === hostId ? "ホスト" : ""}</span>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  )
}
