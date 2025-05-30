"use client"

import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Trophy, GraduationCap } from "lucide-react"
import Footer from "./footer"
import Link from "next/link"
import { Button } from "./ui/button"
import { useUser } from "@/context/UserContext"
import { useEffect, useState } from "react"

export default function FinishUi(props: {level: string}) {
  const { user } = useUser()
  const [totalQuestions, setTotalQuestions] = useState(0);
  const [clearAnswers, setClearAnswers] = useState(0);

  useEffect(() => {
    if (!user) return;
    if (props.level === "easy") {
      setTotalQuestions(user.stats.easyCorrectNum)
      setClearAnswers(user.stats.easyClearNum)
    } else if (props.level === "normal") {
      setTotalQuestions(user.stats.normalCorrectNum)
      setClearAnswers(user.stats.normalClearNum)
    } else {
      setTotalQuestions(user.stats.hardCorrectNum)
      setClearAnswers(user.stats.hardClearNum)
    }
  }, [user, props.level])

  return (
    <div className="min-h-screen from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <Card className="w-full max-w-md mx-auto shadow-lg">
        <CardHeader className="text-center pb-2">
          <div className="mx-auto mb-4 w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
            <GraduationCap className="w-8 h-8 text-green-600" />
          </div>
          <h1 className="text-xl lg:text-2xl font-bold text-gray-900 mb-2 dark:text-white">お疲れ様でした！</h1>
          <p className="text-sm text-gray-600 dark:text-gray-400">問題が完了しました</p>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Score Display */}
          <div className="text-center">
            <div className="flex items-center justify-center gap-3 mb-4">
              <Trophy className="w-7 h-7 lg:w-10 lg;h-10 text-yellow-500" />
              <span className="text-lg lg:text-xl text-black dark:text-white">
                {clearAnswers}/{totalQuestions}問正解
              </span>
            </div>
          </div>

          {/* Encouragement Message */}
          <div className="text-center p-4 bg-blue-50 rounded-lg dark:bg-gray-700">
            <div className="text-xs lg:text-sm text-blue-800 dark:text-white">
              <h1 className="text-blue-800 dark:text-white px-4 pb-2">
                よくできました
              </h1>
              素晴らしい成績です！この調子で頑張ってください。
            </div>
          </div>
          <Link className="flex text-center justify-center" href={"/mode"}>
            <Button className="text-xs lg:text-sm text-center flex justify-center">
              難易度選択画面に戻る
            </Button>
          </Link>
          <Footer />
        </CardContent>
      </Card>
    </div>
  )
}
