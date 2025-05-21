import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Bug, Code, BookOpen } from "lucide-react"

export default function Home() {
  return (
    <div className="flex flex-col min-h-[calc(100vh-3.5rem)]">
      <section className="w-full py-8 md:py-16 lg:py-24 xl:py-32">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center space-y-4 text-center">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                バグはどこ？
              </h1>
              <p className="mx-auto max-w-[700px] text-sm sm:text-base md:text-xl text-gray-500 dark:text-gray-400">
                Improve your debugging skills by finding bugs in code snippets. Challenge yourself and learn from your
                mistakes.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 sm:space-x-4">
              <Link href="/quizzes" passHref>
                <Button size="lg" className="w-full sm:w-auto">
                  Start Hunting
                </Button>
              </Link>
              <Link href="/create" passHref>
                <Button variant="outline" size="lg" className="w-full sm:w-auto">
                  Create Quiz
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="w-full py-8 md:py-16 lg:py-24 bg-muted/50">
        <div className="container px-4 md:px-6">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-12">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="bg-primary/10 p-4 rounded-full">
                <Bug className="h-6 w-6 text-primary" />
              </div>
              <div className="space-y-2">
                <h3 className="text-xl font-bold">Find the Bug</h3>
                <p className="text-sm sm:text-base text-gray-500 dark:text-gray-400">
                  Sharpen your debugging skills by identifying bugs in real code examples.
                </p>
              </div>
            </div>
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="bg-primary/10 p-4 rounded-full">
                <Code className="h-6 w-6 text-primary" />
              </div>
              <div className="space-y-2">
                <h3 className="text-xl font-bold">Create Challenges</h3>
                <p className="text-sm sm:text-base text-gray-500 dark:text-gray-400">
                  Share your knowledge by creating bug-finding challenges for others.
                </p>
              </div>
            </div>
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="bg-primary/10 p-4 rounded-full">
                <BookOpen className="h-6 w-6 text-primary" />
              </div>
              <div className="space-y-2">
                <h3 className="text-xl font-bold">Learn & Improve</h3>
                <p className="text-sm sm:text-base text-gray-500 dark:text-gray-400">
                  Read detailed explanations and solutions to understand common bugs.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
