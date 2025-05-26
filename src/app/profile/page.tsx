"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import Footer from "@/components/footer"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import { useMemo } from "react"
import { useUser } from "@/context/UserContext"
import Cookies from "js-cookie"
import { useRouter } from "next/navigation"

type StatsProps = {
  difficulty: string;
  clearNum: number;
  correctNum: number;
}

const DifficultyProgress = ({ difficulty, clearNum, correctNum }: StatsProps) => {
  const percentage = clearNum > 0 ? Math.round((correctNum / clearNum) * 100) : 0;
  
  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center px-4">
        <span className="lg:text-lg">{difficulty}</span>
        <span className="lg:text-lg">
          {correctNum}/{clearNum} <span className="text-sm text-muted-foreground ml-2">({percentage}%)</span>
        </span>
      </div>
      <Progress 
        value={percentage} 
        className="h-2 lg:h-3"
      />
    </div>
  );
};

export default function ProfilePage() {
  const { user, setUser } = useUser();
  const router = useRouter();

  const solvedCount = useMemo(() => (
    user?.stats
      ? user.stats.hardClearNum + user.stats.normalClearNum + user.stats.easyClearNum
      : 0
  ), [user]);

  const correctCount = useMemo(() => (
    user?.stats
      ? user.stats.hardCorrectNum + user.stats.normalCorrectNum + user.stats.easyCorrectNum
      : 0
  ), [user]);

  if (!user) {
    return (
      <div className="flex flex-col justify-center items-center min-h-screen text-gray-500 dark:text-gray-300">
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-orange-500 mb-4"></div>
        <p className="text-xl font-semibold tracking-wide">Loading Arena...</p>
      </div>
    )
  }

  const handleEdit = () => {
    alert("この機能は開発中です。");
  }

  const handleLogout = () => {
    Cookies.remove("token", { path: "/" });
    Cookies.remove("userId", { path: "/" });
    setUser(null);
    router.push("/signIn");
  }

  return (
    <div className="flex flex-col items-center">
      <div className="h-24 lg:h-28"></div>
      <div className="w-full max-w-sm lg:max-w-7xl">
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid grid-cols-2 w-full">
            <TabsTrigger value="overview">概要</TabsTrigger>
            <TabsTrigger value="settings">設定</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-12">
            <div className="grid gap-4 lg:grid-cols-4">
              <Card className="col-span-2">
                <CardHeader className="flex items-center justify-between">
                  <CardTitle>プロフィール</CardTitle>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleEdit}
                  >
                    編集（開発中）
                  </Button>
                </CardHeader>
                <CardContent className="flex items-center gap-8">
                  <Avatar className="h-24 w-24">
                    <AvatarImage src={`${process.env.NEXT_PUBLIC_API_URL}/${user.iconPath}`} alt={user.userName} />
                    <AvatarFallback>{user.userName.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="text-xl font-bold mb-2">{user.userName}</h3>
                    <p className="text-muted-foreground">{user.email}</p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle>総回答数</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{solvedCount}</div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle>総正答数</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{correctCount}</div>
                </CardContent>
              </Card>
            </div>

            <Card className="w-full bg-background max-w-7xl mx-auto">
              <CardHeader>
                <CardTitle>難易度別 正答率</CardTitle>
              </CardHeader>
              <CardContent className="grid gap-6 lg:gap-12">
                <DifficultyProgress 
                  difficulty="初級" 
                  clearNum={user.stats.easyClearNum} 
                  correctNum={user.stats.easyCorrectNum} 
                />
                <DifficultyProgress 
                  difficulty="中級" 
                  clearNum={user.stats.normalClearNum} 
                  correctNum={user.stats.normalCorrectNum} 
                />
                <DifficultyProgress 
                  difficulty="上級" 
                  clearNum={user.stats.hardClearNum} 
                  correctNum={user.stats.hardCorrectNum} 
                />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="settings">
            <div className="space-y-4">
              <h2 className="text-lg font-bold">設定</h2>
              <p className="text-sm text-muted-foreground">この機能は開発中です。</p>
              <Button 
                variant="outline" 
                className="w-full bg-red-500 dark:bg-red-500 text-white hover:text-white hover:bg-red-600 dark:hover:bg-red-600"
                onClick={handleLogout}
              >
                ログアウト
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </div>
      <Footer />
    </div>
  )
}
