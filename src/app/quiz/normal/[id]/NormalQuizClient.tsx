"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { CheckCircle } from "lucide-react"
import { QuestionType } from "@/types/type"
import { useRouter } from "next/navigation"
import { PostIfCorrect } from "@/lib/api/question"
import { useUser } from "@/context/UserContext"
import Cookies from "js-cookie"
import Loading from "@/components/loading"

export default function NormalQuizClient({ question, id }: { question: QuestionType, id: string }) {
  const { user } = useUser()
  const router = useRouter()
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null)
  const token = Cookies.get("token")

  useEffect(() => {
    if (!user) return;
    router.push(`/quiz/normal/${user.stats.normalCorrectNum + 1}`)
  }, [user])
  
  if (!user) return <Loading />;

  const handleSelectAnswer = (answer: string) => {
    setSelectedAnswer(answer)
  }

  const handleAnswer = async () => {
    try {
      const res = await PostIfCorrect(user.userId, "normal", selectedAnswer === question.answer, token)
      if (res.message) {
        router.push(`/answer/${user.stats.normalCorrectNum+1}?level=normal&selectedAnswer=${selectedAnswer}`)
      } else {
        throw new Error("API error")
      }
    } catch (error) {
      console.error("Error submitting answer:", error)
    }
  }

  return (
    <div className="fixed inset-0 min-h-screen flex flex-col items-center justify-center px-8 lg:px-0">
      <div className="w-full max-w-4xl">
        <div className="pt-6 rounded-2xl border-2 lg:border-3">
          <div className="relative">
            <div className="absolute left-4 font-semibold rounded-full h-12 w-12 lg:h-14 lg:w-14 flex items-center justify-center text-md lg:text-xl border-2 lg:border-3">
              中
            </div>
            <div className="text-right pt-4 lg:pt-6 pr-8">
              <span className="text-2xl">{id}</span>
              <span className="ml-1 lg:ml-2">問目</span>
            </div>
          </div>
          {/* 問題文エリア */}
          <div className="px-6 py-4 lg:p-8 border-b">
            <p className="text-sm md:text-xl leading-relaxed">
              {question.question}
            </p>
          </div>

          {/* 選択肢エリア */}
          <div className="p-4 grid gap-4">
            {["A", "B", "C", "D"].map((alph, index) => {
              const optionKey = `option${index+1}` as "option1" | "option2" | "option3" | "option4";;
              const option = question[optionKey];
              
              return (
                <motion.button
                  key={index}
                  onClick={() => handleSelectAnswer(alph)}
                  className={`relative flex items-center p-4 rounded-xl border-1 transition-all ${
                    selectedAnswer === alph
                      ? "border-orange-500 bg-orange-50 dark:text-black"
                      : "hover:border-gray-300 light:bg-gray-500"
                  }`}
                  whileTap={{ scale: 0.98 }}
                >
                  <div
                    className={`flex items-center justify-center h-6 w-6 lg:h-10 lg:w-10 rounded-full mr-4 text-md lg:text-lg font-medium ${
                      selectedAnswer === alph ? "bg-orange-500 text-white" : "bg-gray-100 text-gray-700"
                    }`}
                  >
                    {alph}
                  </div>
                  <span className="text-xs lg:text-lg">{option}</span>
                  {selectedAnswer === alph && <CheckCircle className="absolute right-4 text-orange-500 h-6 w-6" />}
                </motion.button>
              )
            })}
          </div>

          {/* フッター部分 */}
          <div className="p-6 flex justify-end">
            <button
              className={`px-4 py-1.5 lg:px-8 lg:py-3 rounded-md lg:rounded-lg font-medium text-xs lg:text-sm transition-all ${
                selectedAnswer
                  ? "bg-orange-400 text-white hover:bg-orange-500"
                  : "bg-gray-200 text-gray-400 cursor-not-allowed"
              }`}
              disabled={!selectedAnswer}
              onClick={handleAnswer}
            >
              回答
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
