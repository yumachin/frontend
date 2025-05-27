"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import Footer from "@/components/footer"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import { useEffect, useMemo, useState } from "react"
import { useUser } from "@/context/UserContext"
import Cookies from "js-cookie"
import { useRouter } from "next/navigation"
import { GetProfile, UpdateProfile } from "@/lib/api/user"
import Loading from "@/components/loading"

type StatsProps = {
  difficulty: string;
  clearNum: number;
  correctNum: number;
}

const DifficultyProgress = ({ difficulty, clearNum, correctNum }: StatsProps) => {
  const percentage = clearNum > 0 ? Math.round((clearNum / correctNum) * 100) : 0;

  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center px-4">
        <span className="lg:text-lg">{difficulty}</span>
        <span className="lg:text-lg">
          {clearNum}/{correctNum} <span className="text-sm text-muted-foreground ml-2">({percentage}%)</span>
        </span>
      </div>
      <Progress value={percentage} className="h-2 lg:h-3" />
    </div>
  );
};

export default function ProfilePage() {
  const { user, setUser } = useUser();
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);
  const [newUserName, setNewUserName] = useState(user?.userName || "");
  const token = Cookies.get("token");
  const userId = Cookies.get("userId");

  useEffect(() => {
    const newFetchUser = async () => {
      try {
        const profile = await GetProfile(userId, token);
        setUser(profile);
      } catch (error) {
        console.error("ユーザー情報の取得中にエラー:", error);
      }
    }
    newFetchUser();
  }, [])

  useEffect(() => {
    if (user?.userName) {
      setNewUserName(user.userName);
    }
  }, [user?.userName]);

  const clearCount = useMemo(() => (
    user?.stats
      ? user.stats.hardClearNum + user.stats.normalClearNum + user.stats.easyClearNum
      : 0
  ), [user]);

  const correctCount = useMemo(() => (
    user?.stats
      ? user.stats.hardCorrectNum + user.stats.normalCorrectNum + user.stats.easyCorrectNum
      : 0
  ), [user]);

  if (!user || !user.stats || !user.userName || !user.email) return <Loading />

  const handleEdit = async () => {
    try {
      const message = await UpdateProfile(userId, token, newUserName);
      if (message) {
        setIsEditing(false);
        window.location.reload();
      }
    } catch (error) {
      console.error(error);
    }
  };
  
  const handleLogout = () => {
    Cookies.remove("token");
    Cookies.remove("userId");
    setUser(null);
    router.push("/signIn");
  };
  
  return (
    <div className="flex flex-col items-center">
      <div className="h-24 lg:h-28" />
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
                  {!isEditing && (
                    <Button variant="outline" size="sm" onClick={() => setIsEditing(true)}>
                      編集
                    </Button>
                  )}
                </CardHeader>
                <CardContent className="flex items-center gap-8">
                  <Avatar className="h-24 w-24">
                    <AvatarImage src={`${process.env.NEXT_PUBLIC_API_URL}/${user.iconPath}`} alt={user.userName} />
                    <AvatarFallback>{user.userName.charAt(0) ?? "?"}</AvatarFallback>
                  </Avatar>
                  <div>
                    {isEditing ? (
                      <>
                        <input
                          type="text"
                          value={newUserName}
                          onChange={(e) => setNewUserName(e.target.value)}
                          className="border rounded px-2 py-1 mb-2 text-lg"
                        />
                        <div className="space-x-2">
                          <Button size="sm" onClick={handleEdit}>保存</Button>
                          <Button variant="outline" size="sm" onClick={() => {
                            setNewUserName(user.userName);
                            setIsEditing(false);
                          }}>キャンセル</Button>
                        </div>
                      </>
                    ) : (
                      <>
                        <h3 className="text-md lg:text-xl font-bold mb-2">{user.userName}</h3>
                        <p className="test-xs text-muted-foreground lg:text-md">{user.email}</p>
                      </>
                    )}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle>総回答数</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{correctCount}</div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle>総正答数</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{clearCount}</div>
                </CardContent>
              </Card>
            </div>

            <Card className="w-full bg-background max-w-7xl mx-auto">
              <CardHeader>
                <CardTitle>難易度別 正答率</CardTitle>
              </CardHeader>
              <CardContent className="grid gap-6 lg:gap-12">
                <DifficultyProgress difficulty="初級" clearNum={user.stats.easyClearNum} correctNum={user.stats.easyCorrectNum} />
                <DifficultyProgress difficulty="中級" clearNum={user.stats.normalClearNum} correctNum={user.stats.normalCorrectNum} />
                <DifficultyProgress difficulty="上級" clearNum={user.stats.hardClearNum} correctNum={user.stats.hardCorrectNum} />
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
  );
}
