"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircle, CheckCircle2, Code2, Share2, ThumbsUp, User } from "lucide-react"
import { CodeBlock } from "@/components/code-block"

// Mock data for a single quiz
const MOCK_QUIZ = {
  id: "1",
  title: "JavaScript Async/Await Bug",
  language: "javascript",
  difficulty: 2,
  tags: ["Async", "Promises"],
  author: "Tanaka",
  likes: 42,
  createdAt: "2023-05-15",
  code: `async function fetchUserData() {
  const response = await fetch('https://api.example.com/users');
  const data = response.json();
  return data;
}

async function displayUserData() {
  const userData = fetchUserData();
  console.log(userData.name); // This line has a bug!
  document.getElementById('user-name').textContent = userData.name;
}

displayUserData();`,
  answer:
    "The bug is in the displayUserData function. It's not awaiting the fetchUserData promise, so userData is a Promise object, not the resolved data. Also, response.json() returns a promise that needs to be awaited.",
  correctAnswer: "Missing await before fetchUserData() and response.json()",
}

interface QuizDetailProps {
  id: string
}

export function QuizDetail({ id }: QuizDetailProps) {
  const [userAnswer, setUserAnswer] = useState("")
  const [submitted, setSubmitted] = useState(false)
  const [isCorrect, setIsCorrect] = useState(false)

  const handleSubmit = () => {
    // In a real app, we would validate the answer against the correct answer
    // For demo purposes, let's just check if the answer contains some keywords
    const isAnswerCorrect =
      userAnswer.toLowerCase().includes("await") &&
      (userAnswer.toLowerCase().includes("promise") || userAnswer.toLowerCase().includes("async"))

    setIsCorrect(isAnswerCorrect)
    setSubmitted(true)
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
        <h1 className="text-2xl sm:text-3xl font-bold">{MOCK_QUIZ.title}</h1>
        <div className="flex flex-wrap items-center gap-2">
          <Badge
            variant={MOCK_QUIZ.difficulty === 1 ? "secondary" : MOCK_QUIZ.difficulty === 2 ? "default" : "destructive"}
          >
            {MOCK_QUIZ.difficulty === 1 ? "Beginner" : MOCK_QUIZ.difficulty === 2 ? "Intermediate" : "Advanced"}
          </Badge>
          <Badge variant="outline" className="flex items-center gap-1">
            <Code2 className="h-3 w-3" />
            {MOCK_QUIZ.language}
          </Badge>
          <Button variant="outline" size="sm" className="gap-1">
            <Share2 className="h-4 w-4" />
            <span className="hidden sm:inline">Share</span>
          </Button>
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        {MOCK_QUIZ.tags.map((tag) => (
          <Badge key={tag} variant="outline">
            {tag}
          </Badge>
        ))}
      </div>

      <div className="flex items-center text-sm text-muted-foreground gap-4">
        <div className="flex items-center gap-1">
          <User className="h-3 w-3" />
          {MOCK_QUIZ.author}
        </div>
        <div className="flex items-center gap-1">
          <ThumbsUp className="h-3 w-3" />
          {MOCK_QUIZ.likes}
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Find the Bug in This Code</CardTitle>
        </CardHeader>
        <CardContent>
          <CodeBlock code={MOCK_QUIZ.code} language={MOCK_QUIZ.language} />
        </CardContent>
      </Card>

      {!submitted ? (
        <Card>
          <CardHeader>
            <CardTitle>Your Answer</CardTitle>
          </CardHeader>
          <CardContent>
            <Textarea
              placeholder="Describe the bug and how to fix it..."
              className="min-h-[150px]"
              value={userAnswer}
              onChange={(e) => setUserAnswer(e.target.value)}
            />
          </CardContent>
          <CardFooter>
            <Button onClick={handleSubmit} disabled={!userAnswer.trim()}>
              Submit Answer
            </Button>
          </CardFooter>
        </Card>
      ) : (
        <Tabs defaultValue="result">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="result">Result</TabsTrigger>
            <TabsTrigger value="explanation">Explanation</TabsTrigger>
          </TabsList>
          <TabsContent value="result">
            <Card>
              <CardHeader>
                <CardTitle>Your Result</CardTitle>
              </CardHeader>
              <CardContent>
                {isCorrect ? (
                  <Alert className="border-green-500 bg-green-500/10">
                    <CheckCircle2 className="h-4 w-4 text-green-500" />
                    <AlertTitle>Correct!</AlertTitle>
                    <AlertDescription>Great job! You found the bug correctly.</AlertDescription>
                  </Alert>
                ) : (
                  <Alert variant="destructive">
                    <AlertCircle className="h-4 w-4" />
                    <AlertTitle>Not quite right</AlertTitle>
                    <AlertDescription>Try again or check the explanation to learn more.</AlertDescription>
                  </Alert>
                )}

                <div className="mt-4">
                  <h4 className="font-medium mb-2">Your Answer:</h4>
                  <p className="p-3 bg-muted rounded-md">{userAnswer}</p>
                </div>

                <div className="mt-4">
                  <h4 className="font-medium mb-2">Correct Answer:</h4>
                  <p className="p-3 bg-muted rounded-md">{MOCK_QUIZ.correctAnswer}</p>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" onClick={() => setSubmitted(false)}>
                  Try Again
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
          <TabsContent value="explanation">
            <Card>
              <CardHeader>
                <CardTitle>Explanation</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="prose dark:prose-invert">
                  <p>{MOCK_QUIZ.answer}</p>
                  <h4>Corrected Code:</h4>
                  <CodeBlock
                    code={`async function fetchUserData() {
  const response = await fetch('https://api.example.com/users');
  const data = await response.json();
  return data;
}

async function displayUserData() {
  const userData = await fetchUserData();
  console.log(userData.name); // Now it works!
  document.getElementById('user-name').textContent = userData.name;
}

displayUserData();`}
                    language={MOCK_QUIZ.language}
                  />
                  <h4>Why This Happens:</h4>
                  <p>
                    This is a common mistake when working with async/await in JavaScript. When you call an async
                    function, it always returns a Promise, regardless of whether you use await or not. If you don't
                    await the Promise, you're trying to access properties on the Promise object itself, not the resolved
                    value.
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      )}
    </div>
  )
}
