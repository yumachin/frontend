"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ModeToggle } from "@/components/mode-toggle"
import { Bug } from "lucide-react"

export default function Header() {
  const pathname = usePathname()

  // 表示したくないパス一覧
  const hiddenPaths = ["/signIn", "/sign-up", "/reset-password"]

  if (hiddenPaths.includes(pathname)) {
    return <div /> // または return null; にしてもOK
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <Link href="/" className="flex items-center gap-2 font-bold">
          <Bug className="h-5 w-5" />
          <span className="hidden sm:inline-block">BugHunt</span>
        </Link>
        <nav className="flex items-center gap-1 sm:gap-2 ml-auto">
          <Link href="/" passHref>
            <Button variant={pathname === "/" ? "default" : "ghost"} size="sm" className="text-xs sm:text-sm">
              Home
            </Button>
          </Link>
          <Link href="/quizzes" passHref>
            <Button
              variant={pathname.startsWith("/quizzes") ? "default" : "ghost"}
              size="sm"
              className="text-xs sm:text-sm"
            >
              Quizzes
            </Button>
          </Link>
          <Link href="/create" passHref>
            <Button variant={pathname === "/create" ? "default" : "ghost"} size="sm" className="text-xs sm:text-sm">
              Create
            </Button>
          </Link>
          <Link href="/profile" passHref>
            <Button variant={pathname === "/profile" ? "default" : "ghost"} size="sm" className="text-xs sm:text-sm">
              Profile
            </Button>
          </Link>
          <ModeToggle />
        </nav>
      </div>
    </header>
  )
}
