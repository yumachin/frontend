import { GetQuestion } from "@/lib/api/question"
import EasyQuizClient from "./EasyQuizClient"
import { QuestionType } from "@/types/type";
import { cookies } from "next/headers";
import NotToken from "@/components/not-token";
import NotQuestion from "@/components/not-question";

type EasyQuizPageProps = {
  params: Promise<{ id: string }>
}

export default async function EasyQuizPage({ params }: EasyQuizPageProps) {
  const { id } = await params;

  const cookieStore = await cookies()
  const token = cookieStore.get("token")?.value
  if (!token) return <NotToken />;

  let question: QuestionType | null = null;
  try {
    question = await GetQuestion("easy", id, token);
  } catch (error) {
    console.error("問題の取得中にエラー:", error);
  }
  if (!question) return <NotQuestion />;

  return (
    <EasyQuizClient question={question} id={id} />
  )
}