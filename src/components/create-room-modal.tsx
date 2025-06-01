"use client"

import { useEffect, useState } from "react"
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
import { Label } from "@/components/ui/label"
import { Loader2 } from "lucide-react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { WatchwordFormData, WatchwordSchema } from "@/utils/validationSchema"
import Cookies from "js-cookie"
import { socket } from '../lib/socket'

type CreateRoomModalProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function CreateRoomModal({ open, onOpenChange }: CreateRoomModalProps) {
  const [watchword, setWatchword] = useState("")
  const [isCreating, setIsCreating] = useState(false)
  const [userName, setUserName] = useState('')
  const [userId, setUserId] = useState('')
  const router = useRouter()
  const form = useForm<WatchwordFormData>({
    resolver: zodResolver(WatchwordSchema),
    defaultValues: {
      watchword: "",
    },
  });

  const generateRandomWatchword = () => {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789あいうえおかきくけこさしすせそたちつてとなにぬねのはひふへほまみむめもやゆよらりるれろわをん"
    let result = ""
    for (let i = 0; i < 6; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length))
    }
    setWatchword(result)
  }

  useEffect(() => {
    // CookieからユーザーIDとユーザー名を取得、なければ生成
    let storedUserId = Cookies.get("userId")
    let storedUserName = decodeURIComponent(Cookies.get("userName") || '');

    setUserId(storedUserId || '');
    setUserName(storedUserName || '');

    // サーバーに接続
    if (!socket.connected) {
      console.log('Socketサーバーに接続しました。');
      socket.connect();
    }

    // 接続時にユーザーIDを送信
    const handleConnect = () => {
      socket.emit('setUserInfo', { userId: storedUserId, userName: storedUserName });
    };

    // ルーム作成と参加のイベントハンドラ
    const handleRoomCreated = ( data: { watchword: string } ) => {
      console.log('ルームが作成されました。', data.watchword);
      console.log('ルームを作成しました。遷移先は...', `multi/lobby/${encodeURIComponent(data.watchword)}`);
      // URLエンコーディングを使用
      router.push(`/multi/lobby/${encodeURIComponent(data.watchword)}`);
    };

    const handleError = ( data: { message: string, [key: string]: any } ) => {
      console.error('Socketエラー：', data);
      alert(data.message);
    };

    // イベントリスナーを登録
    socket.on('roomCreated', handleRoomCreated);
    socket.on('error', handleError);

    // ユーザーIdとユーザーネームの登録
    if (socket.connected) {
      handleConnect();
    } else {
      socket.on('connect', handleConnect);
    }

    // コンポーネントのアンマウント時に全てのイベントリスナーをクリーンアップ
    return () => {
      socket.off('connect', handleConnect);
      socket.off('roomCreated', handleRoomCreated);
      socket.off('error', handleError);
    };
  }, [router]);

  const handleCreateLobby = () => {
    console.log("watchword:", watchword);
    if (!watchword.trim()) return
    setIsCreating(true)
    if (watchword.trim() && userName.trim()) {
      console.log('以下の内容を使って、ルームを作成します：', { watchword, userId, userName });
      socket.emit('createRoom', { watchword, user: { id: userId, name: userName } });
    }
    setIsCreating(false)
    onOpenChange(false)
    router.push(`/multi/lobby/${watchword}`)
  };

  const handleOpenChange = (newOpen: boolean) => {
    if (!isCreating) {
      onOpenChange(newOpen)
      if (!newOpen) {
        setWatchword("")
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
              <input
                id="room-code"
                type="text"
                value={watchword}
                placeholder="合言葉を入力"
                {...form.register("watchword")}
                onChange={(e) => setWatchword(e.target.value)}
                className="text-sm lg:text-base w-full px-3 py-2 rounded-md"
              />
              <Button type="button" variant="outline" onClick={generateRandomWatchword} disabled={isCreating}>
                自動生成
              </Button>
            </div>
            <p className="text-xs text-muted-foreground ml-2">1〜6文字まで設定できます</p>
          </div>
        </div>

        <DialogFooter className="gap-2 sm:gap-4">
          <Button
            variant="outline"
            onClick={() => handleOpenChange(false)}
            disabled={isCreating}
            className="text-xs"
          >
            キャンセル
          </Button>
          <Button onClick={handleCreateLobby} disabled={!watchword.trim() || isCreating} className="bg-gray-600 dark:bg-white">
            {isCreating && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            作成
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
