import { GetQuestion } from "@/lib/api/question"
import NormalQuizClient from "./NormalQuizClient"
import { QuestionType } from "@/types/type";
import { cookies } from "next/headers";

export default async function NormalQuizPage({ params }: { params: {id: string } }) {
  const { id } = await params;
  const cookieStore = await cookies()
  const token = cookieStore.get("token")?.value

  if (!token) {
    return <div className="text-center text-red-500 mt-30">ログインが必要です。</div>
  }

  const question: QuestionType[] = await GetQuestion("easy", id, token)

  if (!question) {
    return <div>問題が見つかりません</div>
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-8 lg:px-0">
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
          <NormalQuizClient question={question[0]} />
        </div>
      </div>
    </div>
  )
}