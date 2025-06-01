"use client"

import { useParams, useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, Copy, Check } from "lucide-react"
import { use, useEffect, useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { socket } from '../../../../lib/socket'
import Cookies from "js-cookie"

type Member ={
  id: string;
  name: string;
}

type RoomInfo = {
  host: string;
  members: Member[];
  status: string;
}

export default function LobbyPage() {
  const [copied, setCopied] = useState(false)
  const params = useParams();
  const router = useRouter();
  // URLデコーディングを使用してパスワードを取得
  const encodedWatchword = params.watchword as string;
  const watchword = decodeURIComponent(encodedWatchword);
  const [roomInfo, setRoomInfo] = useState<RoomInfo | null>(null);
  const [isHost, setIsHost] = useState(false);

  useEffect(() => {
    // Cookieからユーザー情報を取得
    const userId = Cookies.get('userId');
    const userName = decodeURIComponent(Cookies.get('userName') || '');
    
    console.log('このルームページの合言葉は...', watchword, 'デコード前の合言葉は...', encodedWatchword);
    
    if (!userId || !userName) {
      // ユーザー情報がない場合はホームページにリダイレクト
      router.push('/');
      return;
    }

    // 接続が確立されていることを確認
    if (!socket.connected) {
      socket.connect();
    }
    
    const handleConnect = () => {
      socket.emit('setUserInfo', { userId, userName });
      // デコードされたパスワードを使用
      socket.emit('getRoomInfo', { watchword, userId });
    };

    if (socket.connected) {
      handleConnect();
    } else {
      // Socket.IO クライアントは、サーバーとリアルタイム接続を確立すると "connect" イベントが発生
      // そのタイミングで handleConnect という関数を呼び出す
      socket.on('connect', handleConnect);
    }

    socket.on('updateRoom', (data: RoomInfo) => {
      setRoomInfo(data);
      setIsHost(userId === data.host);
    });
    
    socket.on('gameStarted', () => {
      console.log('ゲームを開始するので、ゲームページに遷移します。');
      // ゲームページに遷移
      router.push(`/multi/quiz/${encodeURIComponent(watchword)}`);
    });

    socket.on('error', (data) => {
      alert(data.message);
    });

    // ルーム退出完了時の処理
    socket.on('roomLeft', () => {
      router.push('/multi');
    });

    // ルームが削除された時の処理（ホストが退出した場合など）
    socket.on('roomDeleted', () => {
      alert('ルームが削除されました。');
      router.push('/multi');
    });

    return () => {
      socket.off('connect', handleConnect);
      socket.off('updateRoom');
      socket.off('gameStarted');
      socket.off('error');
      socket.off('roomLeft');
      socket.off('roomDeleted');
    };
  }, [watchword, router, encodedWatchword]);

  const handleStartGame = () => {
    // デコードされたパスワードを使用
    socket.emit('startGame', { watchword });
  };

  const handleLeaveRoom = () => {
    const userId = Cookies.get('userId');
    if (userId) {
      // デコードされたパスワードを使用
      socket.emit('leaveRoom', { watchword, userId });
    }
  };

  const copyRoomCode = async () => {
    await navigator.clipboard.writeText(watchword)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }
  
  if (!roomInfo) {
    return <div>Loading...</div>;
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
              <code className="text-2xl font-mono font-bold bg-muted px-4 py-2 rounded">{watchword}</code>
              <Button variant="outline" size="sm" onClick={copyRoomCode} className="h-10">
                {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
              </Button>
            </div>
          </div>

          <div className="flex items-center justify-center gap-2 text-muted-foreground">
            <Users className="h-4 w-4 lg:h-5 lg:w-5" />
            <span className="text-sm lg:text-base">参加者: ( {roomInfo.members.length} / 6 )</span>
          </div>

          <div className="space-y-3">
            {isHost && (
              <Button
                className="w-full"
                disabled={roomInfo.members.length < 2 || roomInfo.status === 'playing'}
                onClick={handleStartGame}
              >
                {roomInfo.members.length < 2 ? '2人以上で開始できます' : 'ゲームスタート！'}
              </Button>
            )}
            <Button
              variant="outline"
              className="w-full"
              onClick={handleLeaveRoom}
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
          {roomInfo.members.map((member) => (
            <div key={member.id} className="flex justify-between items-center gap-6 pl-3 pr-2 py-2 bg-muted rounded-2xl">
              <div className="flex items-center gap-3 lg:gap-6">
                <Avatar className="h-7 w-7 lg:h-12 lg:w-12">
                  <AvatarImage src={`https://api.dicebear.com/7.x/thumbs/svg?seed=${member.name}`} alt={member.name} />
                  <AvatarFallback>{member.name.charAt(0) ?? "?"}</AvatarFallback>
                </Avatar>
                <span className="font-bold text-xs lg:text-base">{member.name}</span>
              </div>
              <span className="text-xs lg:text-sm">{member.id === roomInfo.host ? '👑（ ホスト ）' : ''}</span>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  )
}
