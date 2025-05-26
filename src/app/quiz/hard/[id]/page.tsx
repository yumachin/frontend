import { GetQuestion } from "@/lib/api/question"
import HardQuizClient from "./HardQuizClient"
import { QuestionType } from "@/types/type";

const question: QuestionType[] = [
  {
    questionId: 54,
    question: "OSI参照モデルにおけるセッション層の役割は？",
    choices: [
      {key: "A", text: "パケットの経路選択"},
      {key: "B", text: "データの暗号化"},
      {key: "C", text: "通信の開始と終了の管理"},
      {key: "D", text: "エラー検出と訂正"},
    ],
    answer: "C",
    explanation: "OSI参照モデルのセッション層は、通信の開始と終了を管理し、セッションの確立、維持、終了を行います。これにより、アプリケーション間の通信が円滑に行われるようになります。",
  },
]

export default async function HardQuizPage({ params }: { params: {id: string } }) {
  const { id } = await params;
  // const question: QuestionType[] = await GetQuestion("easy", id)
  console.log("question", question)

  if (!question) {
    return <div>問題が見つかりません</div>
  }

  // const router = useRouter()
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
          <div className="relative">
            <div className="absolute left-4 font-semibold rounded-full h-12 w-12 lg:h-14 lg:w-14 flex items-center justify-center text-md lg:text-xl border-2 lg:border-3">
              上
            </div>
            <div className="text-right pt-4 lg:pt-6 pr-8">
              <span className="text-2xl">{id}</span>
              <span className="ml-1 lg:ml-2">問目</span>
            </div>
          </div>
          <HardQuizClient question={question[0]} />
        </div>
      </div>
    </div>
  )
}