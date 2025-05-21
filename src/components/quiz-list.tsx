"use client"

import Link from "next/link"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Clock, Code2, ThumbsUp, User } from "lucide-react"

// Mock data for quizzes
const MOCK_QUIZZES = [
  {
    id: "1",
    title: "JavaScript Async/Await Bug",
    language: "javascript",
    difficulty: 2,
    tags: ["Async", "Promises"],
    author: "Tanaka",
    likes: 42,
    createdAt: "2023-05-15",
  },
  {
    id: "2",
    title: "Python List Comprehension Error",
    language: "python",
    difficulty: 1,
    tags: ["Lists", "Syntax"],
    author: "Suzuki",
    likes: 28,
    createdAt: "2023-06-02",
  },
  {
    id: "3",
    title: "React useEffect Cleanup Bug",
    language: "typescript",
    difficulty: 3,
    tags: ["React", "Hooks", "Memory"],
    author: "Yamada",
    likes: 56,
    createdAt: "2023-04-20",
  },
  {
    id: "4",
    title: "Java Concurrency Issue",
    language: "java",
    difficulty: 3,
    tags: ["Threading", "Concurrency"],
    author: "Sato",
    likes: 35,
    createdAt: "2023-05-28",
  },
  {
    id: "5",
    title: "TypeScript Type Narrowing Problem",
    language: "typescript",
    difficulty: 2,
    tags: ["Types", "TypeScript"],
    author: "Watanabe",
    likes: 31,
    createdAt: "2023-06-10",
  },
]

export function QuizList() {
  return (
    <div className="space-y-4">
      {MOCK_QUIZZES.map((quiz) => (
        <Card key={quiz.id}>
          <CardHeader className="pb-2">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2">
              <CardTitle className="text-lg sm:text-xl">{quiz.title}</CardTitle>
              <Badge
                variant={quiz.difficulty === 1 ? "secondary" : quiz.difficulty === 2 ? "default" : "destructive"}
                className="self-start"
              >
                {quiz.difficulty === 1 ? "Beginner" : quiz.difficulty === 2 ? "Intermediate" : "Advanced"}
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2 mb-4">
              <Badge variant="outline" className="flex items-center gap-1">
                <Code2 className="h-3 w-3" />
                {quiz.language}
              </Badge>
              {quiz.tags.map((tag) => (
                <Badge key={tag} variant="outline">
                  {tag}
                </Badge>
              ))}
            </div>
            <div className="flex flex-wrap items-center text-sm text-muted-foreground gap-2 sm:gap-4">
              <div className="flex items-center gap-1">
                <User className="h-3 w-3" />
                {quiz.author}
              </div>
              <div className="flex items-center gap-1">
                <ThumbsUp className="h-3 w-3" />
                {quiz.likes}
              </div>
              <div className="flex items-center gap-1">
                <Clock className="h-3 w-3" />
                {quiz.createdAt}
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Link href={`/quizzes/${quiz.id}`} passHref className="w-full">
              <Button className="w-full">Solve This Quiz</Button>
            </Link>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}
