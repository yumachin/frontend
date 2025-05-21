import { QuizList } from "@/components/quiz-list"
import { QuizFilters } from "@/components/quiz-filters"

export default function QuizzesPage() {
  return (
    <div className="container py-4 sm:py-8 px-4 sm:px-6">
      <h1 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6">Find the Bug Quizzes</h1>
      <div className="flex flex-col md:grid md:grid-cols-4 gap-6">
        <div className="w-full md:col-span-1 order-2 md:order-1">
          <QuizFilters />
        </div>
        <div className="w-full md:col-span-3 order-1 md:order-2">
          <QuizList />
        </div>
      </div>
    </div>
  )
}
