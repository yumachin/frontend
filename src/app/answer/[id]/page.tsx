"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { CircleCheck, XCircle } from "lucide-react"
import { useRouter } from "next/navigation"

export default function QuizInterface() {
  const [answered, setAnswered] = useState<boolean | null>(true)
  const [showExplanation, setShowExplanation] = useState(false)

  const explanationText = "渡された解説を表示するセクション。以下例文....プログラミングとは、コンピュータに対して具体的な指示を与えるための作業であり、問題を解決するための手順やアルゴリズムをコードとして記述することを指します。プログラミング言語はこの指示を書くためのツールで、JavaScriptやPython、C++など様々な種類があります。それぞれの言語には得意分野や特徴があり、用途に応じて使い分けられます。プログラミングの基本は、論理的思考力を用いて問題を細かく分解し、解決手順を設計することです。また、プログラムは一度書いて終わりではなく、バグの修正や機能追加などメンテナンスも重要な工程です。最近では、オブジェクト指向や関数型プログラミングなど、多様なパラダイムがあり、それらを理解し使いこなすことで効率的なコードを書くことが可能になります。プログラミングは単なる技術ではなく、創造的な作業であり、ソフトウェア開発やデータ解析、ゲーム制作など多くの分野で不可欠なスキルとなっています。"

  const Router = useRouter()
  
    const handleRoutingHome = () => {
      Router.push("/")
    }

  return (
    <div className="flex justify-center items-center bg-stone-800 py-8 lg:py-20 px-4 min-h-screen">
      <div className="w-full max-w-md">
        <Card className="bg-black w-full p-6 flex flex-col items-center space-y-6 shadow-md">
          {/* タイトル・正誤アイコン */}
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-6 text-white dark:text-white">第〇問</h1>
            {answered === true && (
              <div className="flex flex-col items-center">
                <CircleCheck className="w-20 h-20 text-green-500 mb-2" />
                <h2 className="text-3xl font-semibold text-green-500">正解！</h2>
              </div>
            )}
            {answered === false && (
              <div className="flex flex-col items-center">
                <XCircle className="w-20 h-20 text-red-500 mb-2" />
                <h2 className="text-3xl font-semibold text-red-500">不正解...</h2>
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
            <div className="w-full bg-white rounded-lg p-4 text-gray-800 text-base">
              {explanationText}
              <div className="mt-4 flex justify-center">
                <span
                onClick={() => setShowExplanation(false)}
                className=" cursor-pointer 
                            hover:text-blue-800
                            text-lg 
                            text-black
                            bg-gray-300
                            font-medium
                            mt-7
                            px-5
                            py-2
                            border-3
                            border-white
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
                        border-gray-800"
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
                      border-gray-800"
            onClick={handleRoutingHome}
            >
              終了
              </Button>
              <Button
              variant="outline"
              className="col-span-2 
                        py-6 
                        ml-3
                        text-lg 
                        font-medium 
                        rounded-lg 
                        border-3 
                        border-gray-300"
            >
              次の問題へ 
              </Button>
          </div>
        </Card>
      </div>
    </div>
  )
}
