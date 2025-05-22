"use client"

import { useRouter, useParams } from "next/navigation"
import { useState } from "react"
import { motion } from "framer-motion"
import { CheckCircle } from "lucide-react"

type Question = {
  questionId: number
  question: string
  choices: Choice[]
}

type Choice = {
  key: string
  text: string
}

const questions: Question[] = [
  {
    questionId: 54,
    question: "OSI参照モデルにおけるセッション層の役割は？",
    choices: [
      {key: "A", text: "パケットの経路選択"},
      {key: "B", text: "データの暗号化"},
      {key: "C", text: "通信の開始と終了の管理"},
      {key: "D", text: "エラー検出と訂正"},
    ],
  },
  {
    questionId: 12,
    question: "HTMLの略は？",
    choices: [
      {key: "A", text: "Hyper Text Markup Language"},
      {key: "B", text: "Home Tool Markup Language"},
      {key: "C", text: "Hyperlink and Text Markup Language"},
      {key: "D", text: "Hyperlink Transfer Mark Language"},
    ],
  },
  {
    questionId: 25,
    question: "HTMLの略？",
    choices: [
      {key: "A", text: "Hyper Text Markup Language"},
      {key: "B", text: "Home Tool Markup Language"},
      {key: "C", text: "Hyperlink and Text Markup Language"},
      {key: "D", text: "Hyperlink Transfer Mark Language"},
    ],
  },
]

export default function QuizPage() {
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null)

  const handleSelectAnswer = (answer: string) => {
    setSelectedAnswer(answer)
  }

  const router = useRouter()
  const params = useParams()
  const rawId = Array.isArray(params.id) ? params.id[0] : params.id
  const id = Number(rawId)

  const question = questions.find((_, index) => index+1 === id)

  if (!question) {
    return <div>問題が見つかりません</div>
  }

  // const handleNext = () => {
  //   router.push(`/quiz/hard/${id + 1}`)
  // }
  // const handleBack = () => {
  //   router.push('/')
  // }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-8 lg:px-0">
      <div className="w-full max-w-4xl">
        <div className="pt-6 rounded-2xl border-2 lg:border-3">
          {/* ヘッダー部分 */}
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
            {["A", "B", "C", "D"].map((option, index) => (
              <motion.button
                key={option}
                onClick={() => handleSelectAnswer(option)}
                className={`relative flex items-center p-4 rounded-xl border-1 transition-all ${
                  selectedAnswer === option
                    ? "border-orange-500 bg-orange-50 dark:text-black"
                    : "hover:border-gray-300 light:bg-gray-500"
                }`}
                whileTap={{ scale: 0.98 }}
              >
                <div
                  className={`flex items-center justify-center h-6 w-6 lg:h-10 lg:w-10 rounded-full mr-4 text-md lg:text-lg font-medium ${
                    selectedAnswer === option ? "bg-orange-500 text-white" : "bg-gray-100 text-gray-700"
                  }`}
                >
                  {option}
                </div>
                <span className="text-xs lg:text-lg">{question.choices[index].text}</span>
                {selectedAnswer === option && <CheckCircle className="absolute right-4 text-orange-500 h-6 w-6" />}
              </motion.button>
            ))}
          </div>

          {/* フッター部分 */}
          <div className="p-6 flex justify-end">
            <button
              className={`px-4 py-1 lg:px-8 lg:py-3 rounded-lg font-medium transition-all ${
                selectedAnswer
                  ? "bg-orange-400 text-white hover:bg-orange-600"
                  : "bg-gray-200 text-gray-400 cursor-not-allowed"
              }`}
              disabled={!selectedAnswer}
            >
              回答
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
