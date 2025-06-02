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
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Loader2, AlertCircle } from "lucide-react"
import { socket } from '../lib/socket';
import Cookies from "js-cookie"
import { useForm } from "react-hook-form"
import { WatchwordFormData, WatchwordSchema } from "@/utils/validationSchema"
import { zodResolver } from "@hookform/resolvers/zod"

type JoinRoomModalProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function JoinRoomModal({ open, onOpenChange }: JoinRoomModalProps) {
  const [watchword, setWatchword] = useState("")
  const [isJoining, setIsJoining] = useState(false)
  const [userName, setUserName] = useState('')
  const [userId, setUserId] = useState('')
  // const [error, setError] = useState("")
  const router = useRouter()
  const form = useForm<WatchwordFormData>({
    resolver: zodResolver(WatchwordSchema),
    mode: "onChange",
    defaultValues: {
      watchword: "",
    },
  });

  useEffect(() => {
    // CookieからユーザーIDとユーザー名を取得、なければ生成
    let storedUserId = Cookies.get("userId")
    let storedUserName = decodeURIComponent(Cookies.get("userName") || '');
    
    setUserId(storedUserId || '');
    setUserName(storedUserName || '');
    
    // サーバーに接続
    if (!socket.connected) {
      socket.connect();
    }

    // 接続時にユーザーIDを送信
    const handleConnect = () => {
      socket.emit('setUserInfo', { userId: storedUserId, userName: storedUserName });
    };

    const handleRoomJoined = ( data: { watchword: string} ) => {
      console.log('ルームに参加しました。遷移先は...', `/room/${encodeURIComponent(data.watchword)}`);
      // URLエンコーディングを使用
      router.push(`multi/lobby/${encodeURIComponent(data.watchword)}`);
    };

    const handleError = ( data: { message: string, [key: string]: any } ) => {
      console.error('Socketエラー：', data);
      alert(data.message);
    };

    // イベントリスナーを登録
    socket.on('roomJoined', handleRoomJoined);
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
      socket.off('roomJoined', handleRoomJoined);
      socket.off('error', handleError);
    };
  }, [router]);

  const handleJoinRoom = () => {
    if (!watchword.trim()) return
    setIsJoining(true)
    if (watchword.trim() && userName.trim()) {
      console.log('以下の内容を使って、ルームに参加します：', { watchword, userId, userName });
      socket.emit('joinRoom', { watchword, user: { id: userId, name: userName } });
    }
    setIsJoining(false)
    onOpenChange(false)
    router.push(`/multi/lobby/${watchword}`)
  };

  const handleOpenChange = (newOpen: boolean) => {
    if (!isJoining) {
      onOpenChange(newOpen)
      if (!newOpen) {
        setWatchword("")
        // setError("")
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
              {...form.register("watchword")}
              value={watchword}
              onChange={(e) => {
                setWatchword(e.target.value)
                // setError("")
              }}
              className="font-mono text-sm lg:text-base"
              onKeyDown={(e) => {
                if (e.key === "Enter" && watchword.trim() && !isJoining) {
                  handleJoinRoom()
                }
              }}
            />
          </div>

          {/* {error && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )} */}
        </div>

        <DialogFooter className="gap-2 sm:gap-4">
          <Button 
            variant="outline"
            onClick={() => handleOpenChange(false)}
            disabled={isJoining}
            className="text-xs"
          >
            キャンセル
          </Button>
          <Button onClick={handleJoinRoom} disabled={!watchword.trim() || isJoining}>
            {isJoining && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            参加
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
