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
import { Loader2 } from "lucide-react"

type CreateRoomModalProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function CreateRoomModal({ open, onOpenChange }: CreateRoomModalProps) {
  const [roomCode, setRoomCode] = useState("")
  const [isCreating, setIsCreating] = useState(false)
  const router = useRouter()

  const generateRandomCode = () => {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789あいうえおかきくけこさしすせそたちつてとなにぬねのはひふへほまみむめもやゆよらりるれろわをん"
    let result = ""
    for (let i = 0; i < 6; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length))
    }
    setRoomCode(result)
  }

  const handleCreate = async () => {
    if (!roomCode.trim()) return

    setIsCreating(true)

    // シミュレート: ルーム作成API呼び出し
    await new Promise((resolve) => setTimeout(resolve, 1000))

    setIsCreating(false)
    onOpenChange(false)
    router.push(`/multi/wait?code=${roomCode}`)
  }

  const handleOpenChange = (newOpen: boolean) => {
    if (!isCreating) {
      onOpenChange(newOpen)
      if (!newOpen) {
        setRoomCode("")
      }
    }
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="lg:max-w-3xl space-y-4">
        <DialogHeader>
          <DialogTitle className="text-xl">ルームを作成</DialogTitle>
          <DialogDescription className="mt-4 lg:mt-0 text-xs lg:text-sm">
            クイズルームの合言葉を設定してください。他の参加者はこの合言葉でルームに参加できます。
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="room-code" className="text-xs lg:text-sm ml-1">合言葉</Label>
            <div className="flex gap-2">
              <Input
                id="room-code"
                className="text-sm lg:text-base"
                placeholder="合言葉を入力"
                value={roomCode}
                onChange={(e) => setRoomCode(e.target.value)}
                maxLength={6}
              />
              <Button type="button" variant="outline" onClick={generateRandomCode} disabled={isCreating}>
                自動生成
              </Button>
            </div>
            <p className="text-xs text-muted-foreground ml-2">1〜6文字まで設定できます</p>
          </div>
        </div>

        <DialogFooter className="gap-2 sm:gap-4">
          <Button variant="outline" onClick={() => handleOpenChange(false)} disabled={isCreating}>
            キャンセル
          </Button>
          <Button onClick={handleCreate} disabled={!roomCode.trim() || isCreating}>
            {isCreating && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            作成
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
