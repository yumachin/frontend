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
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { ProfileFormData, ProfileSchema } from "@/utils/validationSchema"

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
  const token = Cookies.get("token");
  const userId = Cookies.get("userId");
  const form = useForm<ProfileFormData>({
    resolver: zodResolver(ProfileSchema),
    defaultValues: {
      userName: user?.userName || "",
    },
  });

  useEffect(() => {
    form.reset({ userName: user?.userName || "" });
  }, [user, form.reset]);

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

  const handleEdit = async (data: ProfileFormData) => {
    try {
      const message = await UpdateProfile(userId, token, data.userName);
      console.log(message)
      if (message) {
        Cookies.set("userName", data.userName)
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
    Cookies.remove("userName");
    setUser(null);
    router.push("/signIn");
  };
  
  return (
    <div className="flex flex-col items-center">
      <div className="h-24 lg:h-28" />
      <div className="w-full max-w-sm lg:max-w-7xl px-4">
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid grid-cols-2 w-full">
            <TabsTrigger value="overview">概要</TabsTrigger>
            <TabsTrigger value="settings">設定</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6 lg:space-y-10">
            <div className="grid gap-4 lg:grid-cols-4">
              <Card className="col-span-2">
                <CardHeader className="flex items-center justify-between">
                  <CardTitle>プロフィール</CardTitle>
                  {!isEditing && (
                    <button className="text-xs border-2 px-1.5 lg:px-3 py-0.5 lg:py-1.5 rounded-sm" onClick={() => setIsEditing(true)}>
                      編集
                    </button>
                  )}
                </CardHeader>
                <CardContent className="flex items-center gap-4 lg:gap-8">
                  <Avatar className="h-16 w-16 lg:h-24 lg:w-24">
                    {/* 写真を登録できるようになったらこれにする */}
                    {/* <AvatarImage src={`${process.env.NEXT_PUBLIC_API_URL}/${user.iconPath}`} alt={user.userName} />
                    <AvatarFallback>{user.userName.charAt(0) ?? "?"}</AvatarFallback> */}
                    <AvatarImage src={`https://api.dicebear.com/7.x/thumbs/svg?seed=${user.userName}`} alt={user.userName} />
                    <AvatarFallback>{user.userName.charAt(0) ?? "?"}</AvatarFallback>
                  </Avatar>
                  <div className="w-full">
                    {isEditing ? (
                      <form onSubmit={form.handleSubmit(handleEdit)}>
                        <input
                          type="text"
                          {...form.register("userName")}
                          className={`w-full border rounded-md px-3 py-2 text-sm lg:text-md ${form.formState.errors.userName ? "border-red-500" : ""}`}
                          disabled={form.formState.isSubmitting}
                        />
                        {form.formState.errors.userName && (
                          <p className="text-red-500 text-xs lg:text-sm my-1 ml-1">{form.formState.errors.userName.message}</p>
                        )}
                        <div className="text-right space-x-6 mt-4 mr-3">
                          <button
                            type="submit"
                            className="bg-orange-400 text-xs text-white py-1 px-3 rounded hover:bg-orange-500"
                            disabled={form.formState.isSubmitting}
                          >
                            保存
                          </button>
                          <button
                            className="bg-gray-200 text-xs text-gray-800 py-1 px-3 rounded hover:bg-gray-300"
                            onClick={() => {
                              form.reset({ userName: user.userName });
                              setIsEditing(false);
                            }}
                            disabled={form.formState.isSubmitting}
                          >
                            キャンセル
                          </button>
                        </div>
                      </form>
                    ) : (
                      <>
                        <h3 className="text-sm lg:text-xl font-bold mb-2">{user.userName}</h3>
                        <p className="text-xs text-muted-foreground lg:text-md">{user.email}</p>
                      </>
                    )}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between lg:pb-2">
                  <CardTitle className="text-xs lg:text-lg">総正答数</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{clearCount}</div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="flex flex-row items-center justify-between lg:pb-2">
                  <CardTitle className="text-xs lg:text-lg">総回答数</CardTitle>
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
                <DifficultyProgress difficulty="初級" clearNum={user.stats.easyClearNum} correctNum={user.stats.easyCorrectNum} />
                <DifficultyProgress difficulty="中級" clearNum={user.stats.normalClearNum} correctNum={user.stats.normalCorrectNum} />
                <DifficultyProgress difficulty="上級" clearNum={user.stats.hardClearNum} correctNum={user.stats.hardCorrectNum} />
                <DifficultyProgress difficulty="総合" clearNum={user.stats.hardClearNum + user.stats.easyClearNum + user.stats.normalClearNum} correctNum={user.stats.hardCorrectNum + user.stats.easyCorrectNum + user.stats.normalCorrectNum} />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="settings">
            <div className="space-y-4 px-4">
              <h2 className="text-lg font-bold">設定</h2>
              <p className="text-xs lg:text-sm text-muted-foreground">設定ページは、これから追加していきます。</p>
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
      <div className="mb-18 lg:hidden"></div>
      <Footer />
    </div>
  );
}
