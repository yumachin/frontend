"use client"

import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { GraduationCap } from "lucide-react"
import Footer from "./footer"

export default function FinishUi() {

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

        {/* <CardContent className="space-y-6">

          <div className="text-center p-4 bg-blue-50 rounded-lg dark:bg-gray-700">
            <div className="text-sm text-blue-800 dark:text-white">
              <p>
                
              </p>
                  よくできました
                
              素晴らしい成績です！この調子で頑張ってください。"
                : "継続は力なり。次回はもっと良い結果を目指しましょう！"
            </div>
          </div>
          <Footer />
        </CardContent> */}
      </Card>
      <Footer/>
    </div>
  )
}
