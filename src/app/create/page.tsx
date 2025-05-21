import { CreateQuizForm } from "@/components/create-quiz-form"

export default function CreateQuizPage() {
  return (
    <div className="container py-8">
      <h1 className="text-3xl font-bold mb-6">Create a Bug Quiz</h1>
      <CreateQuizForm />
    </div>
  )
}