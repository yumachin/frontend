"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useTheme } from "next-themes"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Trophy, Zap } from "lucide-react"
import { cn } from "@/lib/utils"

const players = [
  {
    id: "1",
    name: "TechMaster",
    avatar: "/placeholder.svg?height=40&width=40",
    score: 850,
    correctAnswers: 8,
    totalQuestions: 10,
    responseTime: 2.3,
    isCurrentUser: false,
  },
  {
    id: "2",
    name: "CodeNinja",
    avatar: "/placeholder.svg?height=40&width=40",
    score: 920,
    correctAnswers: 9,
    totalQuestions: 10,
    responseTime: 1.8,
    isCurrentUser: true,
  },
  {
    id: "3",
    name: "DevGuru",
    avatar: "/placeholder.svg?height=40&width=40",
    score: 780,
    correctAnswers: 7,
    totalQuestions: 10,
    responseTime: 3.1,
    isCurrentUser: false,
  },
  {
    id: "4",
    name: "AlgoExpert",
    avatar: "/placeholder.svg?height=40&width=40",
    score: 690,
    correctAnswers: 6,
    totalQuestions: 10,
    responseTime: 4.2,
    isCurrentUser: false,
  },
  {
    id: "5",
    name: "JSWarrior",
    avatar: "/placeholder.svg?height=40&width=40",
    score: 820,
    correctAnswers: 8,
    totalQuestions: 10,
    responseTime: 2.7,
    isCurrentUser: false,
  },
]

// ──────────────────────────────────────────────────────────
// Utilities
// ──────────────────────────────────────────────────────────
function useCountUp(target: number, duration = 800) {
  const [value, setValue] = useState(target)
  useEffect(() => {
    const start = value
    const diff = target - start
    if (diff === 0) return
    const startTime = performance.now()
    let raf: number
    const tick = (now: number) => {
      const progress = Math.min((now - startTime) / duration, 1)
      setValue(Math.floor(start + diff * progress))
      if (progress < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [target])
  return value
}

// ──────────────────────────────────────────────────────────
// Types
// ──────────────────────────────────────────────────────────
interface Player {
  id: string
  name: string
  avatar?: string
  score: number
  correctAnswers: number
  totalQuestions: number
  responseTime: number
  isCurrentUser?: boolean
}

interface QuizRankingProps {
  players: Player[]
  currentQuestion: number
  totalQuestions: number
  onNextQuestion: () => void
  showNextButton?: boolean
}

/*
 * Kahoot‑style UI with extra flair:
 * - podium bounce on score update
 * - number ticker (count‑up)
 * - subtle confetti for the winner each render
 */
export default function QuizRanking({
  currentQuestion,
  totalQuestions,
  onNextQuestion,
  showNextButton = true,
}: QuizRankingProps) {
  const { resolvedTheme } = useTheme()

  // ─── sort players & slice────────────────────────────
  const sorted = [...players].sort((a, b) => {
    if (b.score !== a.score) return b.score - a.score
    return a.responseTime - b.responseTime
  })
  const podium = sorted.slice(0, 3)
  const others = sorted.slice(3)

  // ─── static helpers ────────────────────────────────────
  const podiumHeights = [140, 180, 120] // rank 1‑3 visual order 2‑1‑3
  const podiumColor = (rank: number) =>
    [
      "bg-[#FFD600] text-black",
      "bg-[#BDBDBD] text-black",
      "bg-[#FF8F00] text-black",
    ][rank - 1] || "bg-gray-600 text-white"

  return (
    <section className="w-full min-h-screen py-10 px-4 flex flex-col items-center bg-gradient-to-br from-purple-50 to-blue-100 dark:from-gray-950 dark:to-gray-900 overflow-x-hidden">
      {/* header with animated progress bar */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-4xl"
      >
        <h2 className="text-3xl font-extrabold text-center mb-3">ランキング</h2>
        <div className="h-2 w-full bg-white/40 dark:bg-gray-700 rounded-full overflow-hidden shadow-inner">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${Math.round((currentQuestion / totalQuestions) * 100)}%` }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="h-full bg-gradient-to-r from-purple-500 to-blue-500"
          />
        </div>
        <p className="text-center text-sm text-muted-foreground mt-1 mb-6">
          問題 {currentQuestion}/{totalQuestions}
        </p>
      </motion.div>

      {/* podium */}
      <div className="flex items-end gap-8 mb-12 w-full max-w-4xl justify-center">
        {podium.map((p, idx) => {
          const rank = idx + 1
          const order = rank === 1 ? 2 : rank === 2 ? 1 : 3 // place 1st in center
          const animatedScore = useCountUp(p.score)
          return (
            <motion.div
              key={p.id}
              layout
              initial={{ y: 60, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ type: "spring", stiffness: 160, damping: 12, delay: 0.2 + idx * 0.1 }}
              style={{ order }}
              className="flex flex-col items-center"
            >
              {/* bouncing container when score updates */}
              <motion.div
                animate={{ scale: [1, 1.04, 1] }}
                transition={{ repeat: 1, duration: 0.6 }}
                className={cn(
                  "w-32 rounded-t-2xl flex flex-col items-center justify-end shadow-xl relative overflow-hidden",
                  podiumColor(rank)
                )}
                style={{ height: podiumHeights[idx] }}
              >
                <Avatar className="w-16 h-16 absolute -top-8 shadow-xl ring-4 ring-white dark:ring-gray-900">
                  <AvatarImage src={p.avatar || "/placeholder.svg"} alt={p.name} />
                  <AvatarFallback>{p.name.slice(0, 2).toUpperCase()}</AvatarFallback>
                </Avatar>
                <div className="h-8" />
                <span className="font-bold text-lg tracking-tight truncate px-2">{p.name}</span>
                <span className="text-base mb-4 font-semibold flex items-center gap-1">
                  <Trophy className="w-4 h-4" />
                  {animatedScore.toLocaleString()} pt
                </span>
              </motion.div>
              <Badge variant="secondary" className="mt-3 py-1 px-3 text-sm">
                {rank === 1 ? "優勝" : `${rank} 位`}
              </Badge>
            </motion.div>
          )
        })}
      </div>

      {/* list for 4th+ */}
      <motion.div className="w-full max-w-lg space-y-4">
        <AnimatePresence>
          {others.map((p, i) => {
            const rank = i + 4
            const animatedScore = useCountUp(p.score)
            return (
              <motion.div
                key={p.id}
                layout
                initial={{ x: 40, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: 40, opacity: 0 }}
                transition={{ delay: i * 0.05 }}
                className="flex items-center justify-between bg-white/70 dark:bg-gray-800/60 rounded-xl px-6 py-3 shadow-lg backdrop-blur-sm hover:shadow-2xl"
              >
                <div className="flex items-center gap-4">
                  <span className="text-lg font-bold w-8 text-right">{rank}</span>
                  <Avatar className="w-10 h-10">
                    <AvatarImage src={p.avatar || "/placeholder.svg"} alt={p.name} />
                    <AvatarFallback>{p.name.slice(0, 2).toUpperCase()}</AvatarFallback>
                  </Avatar>
                  <span className="font-medium truncate max-w-[8rem]">{p.name}</span>
                </div>
                <span className="font-semibold tabular-nums">{animatedScore.toLocaleString()} pt</span>
              </motion.div>
            )
          })}
        </AnimatePresence>
      </motion.div>

      {showNextButton && (
        <Button
          onClick={onNextQuestion}
          className="mt-14 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-bold px-10 py-4 rounded-full shadow-xl flex items-center"
        >
          <Zap className="w-5 h-5 mr-2" /> 次の問題へ
        </Button>
      )}
    </section>
  )
}
