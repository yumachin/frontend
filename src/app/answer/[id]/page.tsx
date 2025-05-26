"use client"

import { use, useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { CircleCheck, XCircle } from "lucide-react"
import { useRouter } from "next/navigation"
import { GetQuestion } from "@/lib/api/question"
import { QuestionType } from "@/types/type"

// export type QuestionType = {
//   questionid: number
//   question: string
//   answer: string
//   explanation: string
// }

export default function QuizInterface({ params }: { params: Promise<{ id: string }> }){
  const [question, setQuestion] = useState<QuestionType | null>(null)
  const [answered, setAnswered] = useState<boolean | null>(true) // 仮に正解としてセット
  const [showExplanation, setShowExplanation] = useState(false)
  const unwrapParams = use(params);
  const Router = useRouter()
  
  const handleRoutingHome = () => {
    Router.push("/")
  }

  useEffect(() => {
    const fetchQuestion = async () => {
      const fetchedQuestion: QuestionType = await GetQuestion("easy", unwrapParams.id)
      setQuestion(fetchedQuestion)
    }
    fetchQuestion()
  }, [])
  
  
  if (!question){
    return
  }
  
  const handleNext = () => {
    Router.push(`/quiz/hard/${question.questionId + 1}`)
  }

  return (
    <div className="flex justify-center items-center  dark:bg-stone-800 py-8 lg:py-20 px-4 min-h-screen">
      <div className="mt-20 w-full max-w-md">
        <Card className="bg-white dark:bg-black w-full p-6 flex flex-col items-center space-y-6 shadow-md rounded-2xl border-4 dark:border-1 border-gray-200 dark:border-gray-700">
          {/* タイトル・正誤アイコン */}
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-6 text-black dark:text-white">第  {question.questionId}  問</h1>
            {answered === true && (
              <div className="flex flex-col items-center">
                <CircleCheck className="w-20 h-20 text-green-500 mb-2" />
                <h2 className="text-3xl font-semibold text-green-600 dark:text-green-400">正解！</h2>
              </div>
            )}
            {answered === false && (
              <div className="flex flex-col items-center">
                <XCircle className="w-20 h-20 text-red-500 mb-2" />
                <h2 className="text-3xl font-semibold text-red-600 dark:text-red-400">不正解...</h2>
              </div>
            )}
          
          </div>


{/* _____DEMO button______________________________________________________________________________________________________ */}
{/* 
          <Button
            variant="outline"
            className="py-6 text-lg font-medium rounded-lg border-2 border-gray-800"
            onClick={() => setAnswered((prev) => (prev === null ? true : !prev))} // 仮の切替
          >
            ※正誤動作TEST
          </Button> */}


{/* _____DEMO button_______________________________________________________________________________________________________ */}


          {/* 解説表示エリア */}
          {showExplanation && (
            <div className="pl-6 w-full bg-gray-100 dark:bg-gray-800 rounded-xl p-4 text-black dark:text-white text-base">
              {question.explanation}
              <div className="mt-4 flex justify-center">
                <span
                onClick={() => setShowExplanation(false)}
                className=" cursor-pointer 
                            hover:text-blue-800
                            text-lg 
                            text-black
                            bg-gray-300
                            dark:bg-white
                            font-medium
                            mt-5
                            px-3
                            py-1
                            border-3
                            border-white
                            dark:boder-black
                            rounded-xl
                            "
                >
                  閉じる
                  </span>
              </div>
            </div>
            
          )}

          {/* 解説ボタン */}
          {!showExplanation && (
            <Button
              variant="outline"
              className="w-full
                        py-6 
                        text-lg 
                        font-medium 
                        rounded-lg 
                        border-2 
                        border-gray-500
                        "
              onClick={() => setShowExplanation(true)}
            >
              解説を見る
            </Button>
          )}

          {/* ナビゲーションボタン */}
          <div className="w-full grid grid-cols-3 gap-4 mt-4">
            <Button
            variant="outline"
            className="col-span-1 
                      py-6
                      mr-7 
                      text-base 
                      font-medium 
                      rounded-lg 
                      border-3 
                      border-gray-500
                      "
            onClick={handleRoutingHome}
            >
              終了
              </Button>
              <Button
              onClick={handleNext}
              variant="outline"
              className="col-span-2 
                        py-6 
                        ml-3
                        text-lg 
                        font-medium 
                        rounded-lg 
                        border-3 
                        border-gray-500
                        "
            >
              次の問題へ 
              </Button>
          </div>
        </Card> 
      </div>
    </div>
  )
}
