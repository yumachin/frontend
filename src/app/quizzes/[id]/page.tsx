import { QuizDetail } from "@/components/quiz-detail"

interface QuizPageProps {
  params: {
    id: string
  }
}

export default function QuizPage({ params }: QuizPageProps) {
  return (
    <div className="container py-8">
      <QuizDetail id={params.id} />
    </div>
  )
}
