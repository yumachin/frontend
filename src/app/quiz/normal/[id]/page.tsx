import { GetQuestion } from "@/lib/api/question"
import NormalQuizClient from "./NormalQuizClient"
import { QuestionType } from "@/types/type";
import { cookies } from "next/headers";
import NotToken from "@/components/not-token";
import NotQuestion from "@/components/not-question";

type NormalQuizPageProps = {
  params: Promise<{ id: string }>
}

export default async function NormalQuizPage({ params }: NormalQuizPageProps) {
  const { id } = await params;

  const cookieStore = await cookies()
  const token = cookieStore.get("token")?.value
  if (!token) return <NotToken />;

  let question: QuestionType | null = null;
    try {
      question = await GetQuestion("normal", id, token);
    } catch (error) {
      console.error("問題の取得中にエラー:", error);
    }
    if (!question) return <NotQuestion />;

  return (
    <NormalQuizClient question={question} id={id} />
  )
}