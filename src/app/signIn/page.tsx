"use client"

import { useState } from "react"
import Link from "next/link"
import { Eye, EyeOff } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { auth } from "@/lib/firebase"
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth"
import { useRouter } from "next/navigation"
import { Resister } from "@/lib/api/auth"
import Cookies from "js-cookie"

export default function SignInPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [isSigningIn, setIsSigningIn] = useState(false)
  const oneHourLater = new Date(new Date().getTime() + 1 * 60 * 60 * 1000);

  const handleGoogleLogin = async (): Promise<boolean> => {
    if (isSigningIn) return false
    setIsSigningIn(true)

    const provider = new GoogleAuthProvider()

    try {
      const result = await signInWithPopup(auth, provider)
      const user = result.user
      const token = await user.getIdToken()

      Cookies.set("token", token, {
        // トークンの有効期限はまた話し合って決めたい
        expires: oneHourLater,
        secure: true,
        sameSite: "none",
      })

      const userObject = {
        email: user.email || "",
        userName: user.displayName || "",
        userId: user.uid || "",
      }

      // await Resister(userObject)
      console.log("ログイン成功:", user)
      return true
    } catch (error) {
      console.error("ログイン失敗:", error)
      return false
    } finally {
      setIsSigningIn(false)
    }
  }

  const Router = useRouter()

  const handleRoutingHome = () => {
    Router.push("/")
  }

  const handleFirstRouting = async () => {
    const success = await handleGoogleLogin()
    if (success) {
      handleRoutingHome()
    }
  }

  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center p-4">
        <Card className="w-full max-w-md bg-zinc-900 border-zinc-800">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold text-center text-white">ログイン</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-zinc-300">
                メールアドレス（開発予定）
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                className="bg-zinc-800 border-zinc-700 text-white placeholder:text-zinc-500"
              />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password" className="text-zinc-300">
                  パスワード（開発予定）
                </Label>
                <Link href="#" onClick={() => alert("パスワードの再設定機能は開発中です。")} className="text-xs text-zinc-400 hover:text-white">
                  パスワードをお忘れですか？
                </Link>
              </div>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  className="bg-zinc-800 border-zinc-700 text-white pr-10 placeholder:text-zinc-500"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-2.5 text-zinc-400 hover:text-white"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
              <div className="text-xs text-zinc-500 font-mono">※ セキュリティのため8文字以上</div>
            </div>
            <Button
              className="w-full bg-white text-black hover:bg-zinc-200"
              onClick={() => alert("ログイン機能は開発中です。")}
            >
              ログイン（開発予定）
            </Button>
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-zinc-700" />
              </div>
              <div className="relative flex justify-center text-xs">
                <span className="bg-zinc-900 px-2 text-zinc-400">または</span>
              </div>
            </div>
            <Button
              variant="outline"
              className="w-full border-zinc-700 dark:text-black hover:bg-zinc-200 dark:bg-white dark:hover:bg-zinc-200"
              onClick={handleFirstRouting}
              disabled={isSigningIn}
            >
              Googleでログイン
            </Button>
          </CardContent>
          <CardFooter className="flex flex-col space-y-4 pt-0">
            <div className="text-center text-sm text-zinc-400">
              アカウントをお持ちでないですか？{" "}
              <Link href="#" onClick={() => alert("新規登録機能は開発中です。")} className="text-white hover:underline">
                新規登録
              </Link>
            </div>
          </CardFooter>
        </Card>
      </main>
    </div>
  )
}