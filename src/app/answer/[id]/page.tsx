"use client"

import { use, useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { BookOpen, CheckCircle2, CircleCheck, Eye, EyeOff, User, XCircle } from "lucide-react"
import { useRouter, useSearchParams } from "next/navigation"
import { GetQuestion } from "@/lib/api/question"
import { QuestionType } from "@/types/type"
import Cookies from "js-cookie"
import Loading from "@/components/loading"
import { useUser } from "@/context/UserContext"
import { GetProfile } from "@/lib/api/user"

type AnswerPageProps = {
  params: Promise<{ id: string }>
}

export default function AnswerPage({ params }: AnswerPageProps){
  const [question, setQuestion] = useState<QuestionType | null>(null)
  const [answered, setAnswered] = useState<boolean | null>(null)
  const [showExplanation, setShowExplanation] = useState(false)
  const [text, setText] = useState("")
  const { user, setUser } = useUser()
  const unwrapParams = use(params);
  const router = useRouter()
  const token = Cookies.get("token")
  const userId = Cookies.get("userId")
  const searchParams = useSearchParams()
  const level = searchParams.get("level")
  const selectedAnswer = searchParams.get("selectedAnswer")

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
    if (!token) {
      router.push("/signIn")
    };
    const fetchQuestion = async () => {
      try {
        const question = await GetQuestion(level, unwrapParams.id, token)
        setQuestion(question)
      } catch (error) {
        console.error("問題の取得中にエラー:", error)
      }
    }
    fetchQuestion()
  }, [])
  
  useEffect(() => {
    if (!question) return;
    if (selectedAnswer) {
      setAnswered(selectedAnswer === question.answer);
    } else {
      setAnswered(null); 
    }
  }, [selectedAnswer, question]);

  useEffect(() => {
    if (user === null) return;

    const { easyCorrectNum, normalCorrectNum, hardCorrectNum } = user.stats;
    const isFinished =
      (level === "easy" && easyCorrectNum === Number(process.env.NEXT_PUBLIC_QUESTION_COUNT)) ||
      (level === "normal" && normalCorrectNum === Number(process.env.NEXT_PUBLIC_QUESTION_COUNT)) ||
      (level === "hard" && hardCorrectNum === Number(process.env.NEXT_PUBLIC_QUESTION_COUNT));

    setText(isFinished ? "お疲れ様でした！" : "次の問題へ");
  }, [user, level])

  if (!question){
    return <Loading />
  }

  const handleFinish = () => {
    router.push("/")
  }

  const handleNext = () => {
    if (user === null) {
      router.push(`/quiz/${level}`)
      return
    }

    if (
      (level === "easy" && user.stats.easyCorrectNum === Number(process.env.NEXT_PUBLIC_QUESTION_COUNT)) ||
      (level === "normal" && user.stats.normalCorrectNum === Number(process.env.NEXT_PUBLIC_QUESTION_COUNT)) ||
      (level === "hard" && user.stats.hardCorrectNum === Number(process.env.NEXT_PUBLIC_QUESTION_COUNT))
    ) {
      router.push(`/finishUi/${level}`)
    } else {
      router.push(`/quiz/${level}`)
    }
  }

  return (
    <div className="min-h-screen flex justify-center items-center py-4 px-6">
      <div className="w-full max-w-4xl">
        <Card className="border-0 shadow-2xl rounded-3xl">
          <CardContent className="px-6 pb-2 space-y-8">
            {/* ヘッダー */}
            <div className="text-center">
              <div className="flex justify-between items-center">
                <div className="flex-1"></div>
                <div className="inline-flex items-center gap-2 px-4 dark:text-white rounded-full text-sm lg:text-lg">
                  <BookOpen className="w-4 h-4 lg:h-6 lg:w-6" />第 {unwrapParams.id} 問
                </div>
              </div>

              {answered !== null && (
                <div className="flex flex-col items-center">
                  {answered ? (
                    <>
                      <div className="relative">
                        <div className="absolute inset-0 bg-green-400 rounded-full blur-xl opacity-30 animate-pulse"></div>
                        <CircleCheck className="relative w-20 h-20 lg:w-24 lg:h-24 text-green-500" />
                      </div>
                      <h2 className="text-2xl lg:text-3xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                        正解！
                      </h2>
                    </>
                  ) : (
                    <>
                      <div className="relative">
                        <div className="absolute inset-0 bg-red-400 rounded-full blur-xl opacity-30 animate-pulse"></div>
                        <XCircle className="relative w-24 h-24 text-red-500" />
                      </div>
                      <h2 className="text-3xl font-bold bg-gradient-to-r from-red-600 to-rose-600 bg-clip-text text-transparent">
                        不正解...
                      </h2>
                    </>
                  )}
                </div>
              )}
            </div>

            {/* 問題文 */}
            <div className="bg-slate-50 dark:bg-black rounded-2xl p-6 border-2 border-slate-200 dark:border-slate-900">
              <div className="flex items-center gap-2 mb-3">
                <BookOpen className="w-4 h-4 lg:w-5 lg:h-5 text-blue-600 dark:text-blue-400" />
                <h3 className="font-semibold text-slate-700 dark:text-slate-300 text-sm lg:text-sm">問題</h3>
              </div>
              <p className="text-slate-800 dark:text-slate-200 text-xs lg:text-lg leading-relaxed">{question.question}</p>
            </div>

            {/* 回答比較 */}
            <div className="grid gap-4">
              {/* ユーザーの回答 */}
              <div
                className={`rounded-2xl px-6 py-3 border-2 ${
                  answered
                    ? "bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-700"
                    : "bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-700"
                }`}
              >
                <div className="flex items-center gap-2 mb-3">
                  <User
                    className={`w-4 h-4 lg:w-5 lg:h-5 ${answered ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"}`}
                  />
                  <h3
                    className={`font-semibold text-xs lg:text-sm ${answered ? "text-green-700 dark:text-green-300" : "text-red-700 dark:text-red-300"}`}
                  >
                    あなたの回答
                  </h3>
                </div>
                <p
                  className={`text-sm lg:text-lg ${answered ? "text-green-800 dark:text-green-200" : "text-red-800 dark:text-red-200"}`}
                >
                  {selectedAnswer}
                </p>
              </div>

              {/* 正解 */}
              <div className="bg-emerald-50 dark:bg-emerald-900/20 rounded-2xl px-6 py-3 border-2 border-emerald-200 dark:border-emerald-700">
                <div className="flex items-center gap-2 mb-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                  <h3 className="font-semibold text-xs lg:text-sm text-emerald-700 dark:text-emerald-300">正解</h3>
                </div>
                <p className="text-sm lg:text-lg font-medium text-emerald-800 dark:text-emerald-200">{question.answer}</p>
              </div>
            </div>

            {/* 解説セクション */}
            <div className="space-y-4">
              {!showExplanation ? (
                <Button
                  onClick={() => setShowExplanation(true)}
                  className="w-full py-4 lg:py-6 my-2 text-xs lg:text-sm bg-slate-100 text-black dark:bg-zinc-700 dark:text-white rounded-2xl border-2 border-slate-200 dark:border-slate-900"
                >
                  <Eye className="w-5 h-5 mr-2" />
                  解説を見る
                </Button>
              ) : (
                <div className="bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 rounded-2xl px-6 py-3 border border-amber-200 dark:border-amber-700 space-y-2">
                  <div className="flex items-center gap-2">
                    <BookOpen className="w-4 h-4 lg:w-5 lg:h-5 text-amber-600 dark:text-amber-400" />
                    <h3 className="font-semibold text-xs lg:text-sm text-amber-700 dark:text-amber-300">解説</h3>
                  </div>
                  <p className="text-xs lg:text-lg text-slate-700 dark:text-slate-300 leading-relaxed mb-6 lg:mb-12">{question.explanation}</p>
                  <Button
                    onClick={() => setShowExplanation(false)}
                    variant="outline"
                    className="w-full py-3 text-xs lg:text-sm border-amber-300 dark:border-amber-600 text-amber-700 dark:text-amber-300 hover:bg-amber-100 dark:hover:bg-amber-900/30 rounded-xl"
                  >
                    <EyeOff className="w-4 h-4 mr-2" />
                    解説を閉じる
                  </Button>
                </div>
              )}
            </div>

            {/* ナビゲーションボタン */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4">
              <Button
                onClick={handleNext}
                className="md:col-span-2 py-3 lg:py-6 text-xs lg:text-sm font-medium lg:font-bold bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 text-white rounded-2xl shadow-lg hover:shadow-xl"
              >
                {text}
              </Button>
              {text !== "お疲れ様でした！" && (
                <Button
                  onClick={handleFinish}
                  className="md:col-span-1 py-3 lg:py-6 text-xs lg:text-sm font-medium lg:font-bold bg-red-500 text-white hover:bg-slate-100 dark:hover:bg-red-600 rounded-2xl"
                >
                  終了
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
