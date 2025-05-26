export type UserType = {
  userId: string,
  email: string,
  userName: string,
  iconPath: string,
  role: "user" | "admin",
  stats: {
    hardClearNum: number,
    normalClearNum: number,
    easyClearNum: number,
    hardCorrectNum: number,
    normalCorrectNum: number,
    easyCorrectNum: number
  },
  createdAt: string,
  updatedAt: string
} | null

export type QuestionType = {
  questionId: number
  question: string
  option1: string,
  option2: string,
  option3: string,
  option4: string,
  answer: string
  explanation: string
  level: string
}