"use client"

import { useState } from "react"
import Link from "next/link"
import { Bug, Code, Eye, EyeOff } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

export default function LandingPage() {
  const [showPassword, setShowPassword] = useState(false)

  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      {/* Header */}
      <header className="border-b border-zinc-800 p-4">
        <div className="container flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Bug className="h-6 w-6" />
            <span className="font-bold text-2xl">BugHunt</span>
          </div>
          <nav className="hidden md:flex items-center gap-4">
            <Link href="#" className="px-3 py-2 rounded-md bg-zinc-900">
              Home
            </Link>
            <Link href="#" className="px-3 py-2">
              Quizzes
            </Link>
            <Link href="#" className="px-3 py-2">
              Create
            </Link>
            <Link href="#" className="px-3 py-2">
              Profile
            </Link>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center p-4">
        <Card className="w-full max-w-md bg-zinc-900 border-zinc-800">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold text-center">ログイン</CardTitle>
            <CardDescription className="text-center text-zinc-400">
              デバッグの旅を続けるにはログインしてください
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-zinc-300">
                メールアドレス
              </Label>
              <div className="relative">
                <Input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  className="bg-zinc-800 border-zinc-700 text-white placeholder:text-zinc-500"
                />
                <div className="absolute right-3 top-2.5 text-zinc-500 text-xs font-mono">// ユーザー識別子</div>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password" className="text-zinc-300">
                  パスワード
                </Label>
                <Link href="#" className="text-xs text-zinc-400 hover:text-white">
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
              <div className="text-xs text-zinc-500 font-mono">// セキュリティのため8文字以上</div>
            </div>
            <Button className="w-full bg-white text-black hover:bg-zinc-200">ログイン</Button>
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-zinc-700" />
              </div>
              <div className="relative flex justify-center text-xs">
                <span className="bg-zinc-900 px-2 text-zinc-400">または</span>
              </div>
            </div>
            <Button variant="outline" className="w-full border-zinc-700 text-white hover:bg-zinc-800 hover:text-white">
              <Code className="mr-2 h-4 w-4" />
              GitHubでログイン
            </Button>
          </CardContent>
          <CardFooter className="flex flex-col space-y-4 pt-0">
            <div className="text-center text-sm text-zinc-400">
              アカウントをお持ちでないですか？{" "}
              <Link href="#" className="text-white hover:underline">
                新規登録
              </Link>
            </div>
            <div className="text-center text-xs text-zinc-500 font-mono">
              /* バグを見つけて、デバッグスキルを向上させよう */
            </div>
          </CardFooter>
        </Card>
      </main>

      {/* Footer */}
      <footer className="border-t border-zinc-800 p-4 text-center text-zinc-500 text-sm">
        <div className="container">
          <p>© 2025 BugHunt. バグを見つけるのが好きな開発者のために。</p>
        </div>
      </footer>
    </div>
  )
}
