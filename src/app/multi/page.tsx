"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Plus, LogIn } from "lucide-react"
import { CreateRoomModal } from "@/components/create-room-modal"
import { JoinRoomModal } from "@/components/join-room-modal"

export default function HomePage() {
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [showJoinModal, setShowJoinModal] = useState(false)

  return (
    <div className="fixed inset-0 flex items-center justify-center p-4 min-h-screen bg-background">
      <Card className="w-full max-w-md lg:max-w-lg space-y-6">
        <CardHeader className="text-center space-y-4 mb-6">
          <CardTitle className="text-lg lg:text-xl">ルームを選択</CardTitle>
          <CardDescription className="text-xs lg:text-sm">新しいルームを作成するか、既存のルームに参加してください</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Button className="w-full h-10 text-sm lg:text-base" onClick={() => setShowCreateModal(true)}>
            <Plus className="mr-2 h-5 w-5" />
            ルームを作成
          </Button>

          <Button variant="outline" className="w-full h-10 text-sm lg:text-base" onClick={() => setShowJoinModal(true)}>
            <LogIn className="mr-2 h-5 w-5" />
            合言葉で参加
          </Button>
        </CardContent>
      </Card>

      <CreateRoomModal open={showCreateModal} onOpenChange={setShowCreateModal} />
      <JoinRoomModal open={showJoinModal} onOpenChange={setShowJoinModal} />
    </div>
  )
}
