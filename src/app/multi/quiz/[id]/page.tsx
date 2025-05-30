"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

type QuizQuestion = {
  id: number
  question: string
  options: {
    id: string
    text: string
    color: string
    hoverColor: string
  }[]
}

const sampleQuestion: QuizQuestion = {
  id: 1,
  question: "Pythonでリストの要素数を取得する方法は？",
  options: [
    {
      id: "a",
      text: "len()",
      color: "bg-red-500 dark:bg-red-600",
      hoverColor: "hover:bg-red-600 dark:hover:bg-red-700",
    },
    {
      id: "b",
      text: "count()",
      color: "bg-blue-500 dark:bg-blue-600",
      hoverColor: "hover:bg-blue-600 dark:hover:bg-blue-700",
    },
    {
      id: "c",
      text: "size()",
      color: "bg-yellow-500 dark:bg-yellow-600",
      hoverColor: "hover:bg-yellow-600 dark:hover:bg-yellow-700",
    },
    {
      id: "d",
      text: "length()",
      color: "bg-green-500 dark:bg-green-600",
      hoverColor: "hover:bg-green-600 dark:hover:bg-green-700",
    },
  ],
}

export default function MultiQuizPage() {
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null)

  const handleAnswerSelect = (optionId: string) => {
    if (!selectedAnswer) {
      setSelectedAnswer(optionId)
    }
  }

  return (
    <div className="min-h-screen flex flex-col justify-center items-center gap-30 px-6 bg-background transition-colors duration-300">
      {/* Question Area */}
      <Card className="relative w-full max-w-4xl text-center shadow-xl py-8 lg:py-12 bg-slate-50 dark:bg-black border-slate-200 dark:border-slate-900 text-slate-700 dark:text-slate-300">
        <div className="absolute top-1 left-0 lg:top-2 lg:left-2 font-semibold dark:text-white text-sm lg:text-base px-4 py-1 rounded-full">
          Q{sampleQuestion.id}
        </div>
        <h1 className="px-6 text-sm lg:text-2xl font-bold leading-tight">
          {sampleQuestion.question}
        </h1>
      </Card>

      {/* Answer Options */}
      <div className="w-full max-w-4xl grid grid-cols-1 sm:grid-cols-2 gap-8 lg:gap-12">
        {sampleQuestion.options.map((option) => (
          <Button
            key={option.id}
            onClick={() => handleAnswerSelect(option.id)}
            className={`
              ${option.color} ${option.hoverColor} text-white 
              h-12 lg:h-24 
              text-lg lg:text-2xl font-bold
              transition-all duration-200 transform hover:scale-105 active:scale-95
              shadow-lg hover:shadow-xl
              ${selectedAnswer === option.id ? "ring-4 ring-white dark:ring-gray-200 scale-105 shadow-2xl" : ""}
              ${selectedAnswer && selectedAnswer !== option.id ? "opacity-50 scale-95" : ""}
              border-0
            `}
            disabled={!!selectedAnswer}
          >
            <div className="flex items-center gap-2 sm:gap-4">
              <span className="font-bold text-base lg:text-xl">{option.text}</span>
            </div>
          </Button>
        ))}
      </div>

      {selectedAnswer && (
        <div className="mt-6 sm:mt-8 text-center animate-fade-in">
          <div className="bg-card dark:bg-card border border-border rounded-lg p-4 shadow-lg">
            <p className="text-base sm:text-lg text-muted-foreground">
              Answer selected! Waiting for next question...
            </p>
          </div>
        </div>
      )}
    </div>
  )
}
