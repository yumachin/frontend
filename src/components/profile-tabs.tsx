"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { Code2, Edit, ExternalLink, ThumbsUp, Trash2 } from "lucide-react"
import Link from "next/link"

// Mock data for user profile
const MOCK_USER = {
  name: "Tanaka Yamada",
  username: "tanaka_dev",
  email: "tanaka@example.com",
  avatar: "/placeholder.svg?height=40&width=40",
  stats: {
    quizzesSolved: 42,
    quizzesCreated: 8,
    correctRate: 68,
  },
}

// Mock data for created quizzes
const MOCK_CREATED_QUIZZES = [
  {
    id: "1",
    title: "JavaScript Async/Await Bug",
    language: "javascript",
    difficulty: 2,
    likes: 42,
    createdAt: "2023-05-15",
  },
  {
    id: "2",
    title: "React useEffect Cleanup Bug",
    language: "typescript",
    difficulty: 3,
    likes: 28,
    createdAt: "2023-06-02",
  },
]

// Mock data for solved quizzes
const MOCK_SOLVED_QUIZZES = [
  {
    id: "3",
    title: "Python List Comprehension Error",
    language: "python",
    difficulty: 1,
    author: "Suzuki",
    solvedAt: "2023-06-10",
    isCorrect: true,
  },
  {
    id: "4",
    title: "Java Concurrency Issue",
    language: "java",
    difficulty: 3,
    author: "Sato",
    solvedAt: "2023-06-08",
    isCorrect: false,
  },
  {
    id: "5",
    title: "TypeScript Type Narrowing Problem",
    language: "typescript",
    difficulty: 2,
    author: "Watanabe",
    solvedAt: "2023-06-05",
    isCorrect: true,
  },
]

export function ProfileTabs() {
  return (
    <Tabs defaultValue="overview" className="space-y-4">
      <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 gap-1">
        <TabsTrigger value="overview">Overview</TabsTrigger>
        <TabsTrigger value="created">Created</TabsTrigger>
        <TabsTrigger value="solved">Solved</TabsTrigger>
        <TabsTrigger value="settings">Settings</TabsTrigger>
      </TabsList>

      <TabsContent value="overview">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card className="col-span-2">
            <CardHeader>
              <CardTitle>Profile</CardTitle>
            </CardHeader>
            <CardContent className="flex items-center gap-4">
              <Avatar className="h-20 w-20">
                <AvatarImage src={MOCK_USER.avatar || "/placeholder.svg"} alt={MOCK_USER.name} />
                <AvatarFallback>{MOCK_USER.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div>
                <h3 className="text-xl font-bold">{MOCK_USER.name}</h3>
                <p className="text-muted-foreground">@{MOCK_USER.username}</p>
                <p className="text-muted-foreground">{MOCK_USER.email}</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Quizzes Solved</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{MOCK_USER.stats.quizzesSolved}</div>
              <p className="text-xs text-muted-foreground">+5 from last week</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Quizzes Created</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{MOCK_USER.stats.quizzesCreated}</div>
              <p className="text-xs text-muted-foreground">+2 from last month</p>
            </CardContent>
          </Card>

          <Card className="col-span-4">
            <CardHeader>
              <CardTitle>Performance</CardTitle>
              <CardDescription>Your quiz solving performance over time</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="text-sm font-medium">Correct Rate</div>
                    <div className="text-sm text-muted-foreground">{MOCK_USER.stats.correctRate}%</div>
                  </div>
                  <Progress value={MOCK_USER.stats.correctRate} />
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="text-sm font-medium">JavaScript</div>
                    <div className="text-sm text-muted-foreground">75%</div>
                  </div>
                  <Progress value={75} />
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="text-sm font-medium">Python</div>
                    <div className="text-sm text-muted-foreground">60%</div>
                  </div>
                  <Progress value={60} />
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="text-sm font-medium">TypeScript</div>
                    <div className="text-sm text-muted-foreground">82%</div>
                  </div>
                  <Progress value={82} />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </TabsContent>

      <TabsContent value="created">
        <Card>
          <CardHeader>
            <CardTitle>Quizzes You Created</CardTitle>
            <CardDescription>Manage and edit the quizzes you've created</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {MOCK_CREATED_QUIZZES.map((quiz) => (
                <div
                  key={quiz.id}
                  className="flex flex-col sm:flex-row sm:items-center justify-between p-4 border rounded-lg gap-4"
                >
                  <div className="flex items-center gap-4">
                    <div className="bg-muted rounded-md flex items-center justify-center aspect-square w-12">
                      <Code2 className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="font-medium">{quiz.title}</h3>
                      <div className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
                        <Badge variant="outline">{quiz.language}</Badge>
                        <Badge
                          variant={
                            quiz.difficulty === 1 ? "secondary" : quiz.difficulty === 2 ? "default" : "destructive"
                          }
                        >
                          {quiz.difficulty === 1 ? "Beginner" : quiz.difficulty === 2 ? "Intermediate" : "Advanced"}
                        </Badge>
                        <span className="flex items-center gap-1">
                          <ThumbsUp className="h-3 w-3" />
                          {quiz.likes}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 self-end sm:self-auto">
                    <Button variant="outline" size="icon">
                      <Edit className="h-4 w-4" />
                      <span className="sr-only">Edit</span>
                    </Button>
                    <Button variant="outline" size="icon">
                      <ExternalLink className="h-4 w-4" />
                      <span className="sr-only">View</span>
                    </Button>
                    <Button variant="outline" size="icon">
                      <Trash2 className="h-4 w-4" />
                      <span className="sr-only">Delete</span>
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
          <CardFooter>
            <Link href="/create" passHref>
              <Button>Create New Quiz</Button>
            </Link>
          </CardFooter>
        </Card>
      </TabsContent>

      <TabsContent value="solved">
        <Card>
          <CardHeader>
            <CardTitle>Quizzes You've Solved</CardTitle>
            <CardDescription>Track your progress and review quizzes you've attempted</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {MOCK_SOLVED_QUIZZES.map((quiz) => (
                <div
                  key={quiz.id}
                  className="flex flex-col sm:flex-row sm:items-center justify-between p-4 border rounded-lg gap-4"
                >
                  <div className="flex items-center gap-4">
                    <div
                      className={`rounded-md flex items-center justify-center aspect-square w-12 ${
                        quiz.isCorrect ? "bg-green-500/10" : "bg-red-500/10"
                      }`}
                    >
                      <Code2 className={`h-6 w-6 ${quiz.isCorrect ? "text-green-500" : "text-red-500"}`} />
                    </div>
                    <div>
                      <h3 className="font-medium">{quiz.title}</h3>
                      <div className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
                        <Badge variant="outline">{quiz.language}</Badge>
                        <Badge
                          variant={
                            quiz.difficulty === 1 ? "secondary" : quiz.difficulty === 2 ? "default" : "destructive"
                          }
                        >
                          {quiz.difficulty === 1 ? "Beginner" : quiz.difficulty === 2 ? "Intermediate" : "Advanced"}
                        </Badge>
                        <span>by {quiz.author}</span>
                        <span>{quiz.solvedAt}</span>
                      </div>
                    </div>
                  </div>
                  <div className="self-end sm:self-auto">
                    <Badge variant={quiz.isCorrect ? "secondary" : "destructive"}>
                      {quiz.isCorrect ? "Correct" : "Incorrect"}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
          <CardFooter>
            <Link href="/quizzes" passHref>
              <Button>Find More Quizzes</Button>
            </Link>
          </CardFooter>
        </Card>
      </TabsContent>

      <TabsContent value="settings">
        <Card>
          <CardHeader>
            <CardTitle>Account Settings</CardTitle>
            <CardDescription>Manage your account settings and preferences</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <h3 className="font-medium">Profile Information</h3>
              <p className="text-sm text-muted-foreground">
                Update your profile information and how others see you on the platform
              </p>
              <Button variant="outline">Edit Profile</Button>
            </div>

            <div className="space-y-2">
              <h3 className="font-medium">Email Notifications</h3>
              <p className="text-sm text-muted-foreground">Manage your email notification preferences</p>
              <Button variant="outline">Notification Settings</Button>
            </div>

            <div className="space-y-2">
              <h3 className="font-medium">Account Security</h3>
              <p className="text-sm text-muted-foreground">Update your password and security settings</p>
              <Button variant="outline">Security Settings</Button>
            </div>

            <div className="space-y-2">
              <h3 className="font-medium">Connected Accounts</h3>
              <p className="text-sm text-muted-foreground">Connect your account with GitHub or Google</p>
              <div className="flex gap-2">
                <Button variant="outline">Connect GitHub</Button>
                <Button variant="outline">Connect Google</Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  )
}
