"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Loader2, AlertCircle } from "lucide-react"

type JoinRoomModalProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function JoinRoomModal({ open, onOpenChange }: JoinRoomModalProps) {
  const [roomCode, setRoomCode] = useState("")
  const [isJoining, setIsJoining] = useState(false)
  const [error, setError] = useState("")
  const router = useRouter()

  const handleJoin = async () => {
    if (!roomCode.trim()) return

    setIsJoining(true)
    setError("")

    // シミュレート: ルーム存在確認API呼び出し
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // ランダムでルームが存在するかどうかを決める（デモ用）
    const roomExists = Math.random() > 0.3

    if (roomExists) {
      setIsJoining(false)
      onOpenChange(false)
      router.push(`/waiting?code=${roomCode}`)
    } else {
      setError("指定された合言葉のルームが見つかりません")
      setIsJoining(false)
    }
  }

  const handleOpenChange = (newOpen: boolean) => {
    if (!isJoining) {
      onOpenChange(newOpen)
      if (!newOpen) {
        setRoomCode("")
        setError("")
      }
    }
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="lg:max-w-3xl space-y-4">
        <DialogHeader>
          <DialogTitle className="text-xl">ルームに参加</DialogTitle>
          <DialogDescription className="mt-2 lg:mt-0 text-xs lg:text-sm">参加したいルームの合言葉を入力してください。</DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="join-room-code" className="text-xs lg:text-sm ml-1">合言葉</Label>
            <Input
              id="join-room-code"
              placeholder="合言葉を入力"
              value={roomCode}
              onChange={(e) => {
                setRoomCode(e.target.value.toUpperCase())
                setError("")
              }}
              maxLength={10}
              className="font-mono text-sm lg:text-base"
              onKeyDown={(e) => {
                if (e.key === "Enter" && roomCode.trim() && !isJoining) {
                  handleJoin()
                }
              }}
            />
          </div>

          {error && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
        </div>

        <DialogFooter className="gap-2 sm:gap-4">
          <Button variant="outline" onClick={() => handleOpenChange(false)} disabled={isJoining}>
            キャンセル
          </Button>
          <Button onClick={handleJoin} disabled={!roomCode.trim() || isJoining}>
            {isJoining && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            参加
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
