"use client"

import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Trophy, GraduationCap } from "lucide-react"
import Footer from "./footer"
import Link from "next/link"
import { Button } from "./ui/button"
import { useUser } from "@/context/UserContext"
import { useEffect, useState } from "react"

type FinishUiProps = {
  level: string
}

export default function FinishUi(props: FinishUiProps) {
  const { user } = useUser()
  const [totalQuestions, setTotalQuestions] = useState(0);
  const [correctAnswers, setCorrectAnswers] = useState(0);

  useEffect(() => {
    if (!user) return;
    if (props.level === "easy") {
      setTotalQuestions(user.stats.easyClearNum)
      setCorrectAnswers(user.stats.easyCorrectNum)
    } else if (props.level === "normal") {
      setTotalQuestions(user.stats.normalClearNum)
      setCorrectAnswers(user.stats.normalCorrectNum)
    } else {
      setTotalQuestions(user.stats.hardClearNum)
      setCorrectAnswers(user.stats.hardCorrectNum)
    }
  }, [user, props.level])

  

  return (
    <div className="min-h-screen from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <Card className="w-full max-w-md mx-auto shadow-lg">
        <CardHeader className="text-center pb-2">
          <div className="mx-auto mb-4 w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
            <GraduationCap className="w-8 h-8 text-green-600" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2 dark:text-white">お疲れ様でした！</h1>
          <p className="text-gray-600 dark:text-gray-400">問題が完了しました</p>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Score Display */}
          <div className="text-center">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Trophy className="w-10 h-10 text-yellow-500" />
              <span className="text-xl text-black dark:text-white">
                {correctAnswers}/{totalQuestions}問正解
              </span>
            </div>
          </div>

          {/* Encouragement Message */}
          <div className="text-center p-4 bg-blue-50 rounded-lg dark:bg-gray-700">
            <div className="text-sm text-blue-800 dark:text-white">

              <h1 className="text-blue-800 dark:text-white px-4 py-2">
                よくできました
              </h1>
              素晴らしい成績です！この調子で頑張ってください。
            </div>
          </div>
          <Link className="flex text-center justify-center" href={"/mode"}>
            <Button className="text-center flex justify-center ">
              難易度選択画面に戻る
            </Button>
          </Link>
          <Footer />
        </CardContent>
      </Card>
    </div>
  )
}
