"use client"
import { motion, AnimatePresence } from "framer-motion"
import { useTheme } from "next-themes"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Trophy, Zap } from "lucide-react"
import { cn } from "@/lib/utils"
import Confetti from "react-confetti"
import { useCountUp } from "../../../../../../hooks/useCountUp"
import { useParams, useSearchParams, useRouter } from "next/navigation"
// 仮データ
const players = [
  {
    id: "1",
    name: "TechMaster",
    avatar: "https://api.dicebear.com/7.x/thumbs/svg?seed=TechMaster",
    score: 850,
    correctAnswers: 8,
    totalQuestions: 10,
    responseTime: 2.3,
    isCurrentUser: false,
  },
  {
    id: "2",
    name: "CodeNinja",
    avatar: "https://api.dicebear.com/7.x/thumbs/svg?seed=CodeNinja",
    score: 920,
    correctAnswers: 9,
    totalQuestions: 10,
    responseTime: 1.8,
    isCurrentUser: true,
  },
  {
    id: "3",
    name: "DevGuru",
    avatar: "https://api.dicebear.com/7.x/thumbs/svg?seed=DevGuru",
    score: 780,
    correctAnswers: 7,
    totalQuestions: 10,
    responseTime: 3.1,
    isCurrentUser: false,
  },
  {
    id: "4",
    name: "AlgoExpert",
    avatar: "https://api.dicebear.com/7.x/thumbs/svg?seed=AlgoExpert",
    score: 690,
    correctAnswers: 6,
    totalQuestions: 10,
    responseTime: 4.2,
    isCurrentUser: false,
  },
  {
    id: "5",
    name: "AlgoExpert",
    avatar: "https://api.dicebear.com/7.x/thumbs/svg?seed=AlgoExpert",
    score: 590,
    correctAnswers: 6,
    totalQuestions: 10,
    responseTime: 4.2,
    isCurrentUser: false,
  },
]


const showNextButton = true

// ─────────────────────────────
// メインコンポーネント
// ─────────────────────────────


export default function ResultPage() {
  const params = useParams();
  const id = params?.id ; 
  const searchParams = useSearchParams();
  let currentQuestion = parseInt(searchParams.get("num") ?? "1") || 1;

  // ...省略（onNextQuestion等も同様に使える）...
  const router = useRouter();
  const onNextQuestion = () => {
    router.push(`/multi/quiz/${id}`);
  }
  const totalQuestions = 10 // 仮の値、実際はAPIやコンテキストから取得する
  const { resolvedTheme } = useTheme()
  // スコア順+タイムでソート
  const sorted = [...players].sort((a, b) => {
    if (b.score !== a.score) return b.score - a.score
    return a.responseTime - b.responseTime
  })
  const podium = sorted.slice(0, 3)
  const others = sorted.slice(3)

  // 表彰台の順番（中央・左・右）
  const podiumOrder = [1, 0, 2]
  const podiumColors = [
    "from-[#FFD700] to-[#FFFBEA]", // 1st: Gold
    "from-[#C0C0C0] to-[#F8F9FA]", // 2nd: Silver
    "from-[#CD7F32] to-[#F3E1C7]", // 3rd: Bronze
  ];
  const podiumHeights = [120, 170, 100]

  // confetti: 1位の人がいたら出す
  const winner = podium[0]
  const isDark = resolvedTheme === "dark"

  return (
    <section className="w-full min-h-screen py-10 px-4 flex flex-col items-center bg-gradient-to-br from-purple-50 to-blue-100 dark:from-gray-950 dark:to-gray-900 overflow-x-hidden relative">
      {/* confetti: 1位の時のみ */}
      {winner && winner.isCurrentUser && (
        <Confetti numberOfPieces={180} recycle={false} />
      )}
      {/* ヘッダーがあるので上に余白を入れる */}
      <div className="mt-16" />
      {/* Podium */}
      {totalQuestions === currentQuestion ? (
        <h1 className="text-3xl font-bold mb-24 text-center mb-8">
          {winner ? `${winner.name} さんが優勝！` : "全員お疲れ様でした！"}
        </h1>
      ) : (
        <h1 className="text-3xl font-bold mb-24 text-center">
          {currentQuestion} / {totalQuestions} 問終了！
        </h1>
      )}
      <div className="flex items-end gap-8 mb-12 w-full max-w-3xl justify-center">
        {podiumOrder.map((idx, i) => {
          const p = podium[idx]
          const rank = idx + 1
          const animatedScore = useCountUp(p.score)
          return (
            <motion.div
              key={p.id}
              className="flex flex-col items-center"
              style={{ zIndex: rank === 1 ? 20 : 10 }}
              layout initial={{ y: 80, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
              transition={{ type: "spring", stiffness: 180, damping: 18, delay: i * 0.1 }}
            >
              <motion.div
                animate={{ scale: [1, 1.08, 1] }}
                transition={{ repeat: 1, duration: 0.6 }}
                className={cn(
                  "rounded-t-3xl flex flex-col items-center justify-end shadow-2xl w-32 relative pt-4 border-4",
                  `bg-gradient-to-b ${podiumColors[i]}`,
                  rank === 1 ? "border-yellow-400" : rank === 2 ? "border-gray-300" : "border-amber-700"
                )}
                style={{ height: podiumHeights[i] }}
              >
                {/* アバター */}
                <div className="absolute -top-10 left-1/2 -translate-x-1/2 rounded-full border-4 border-white shadow-lg bg-white"
                  style={{ width: 72, height: 72 }}>
                  <Avatar className="w-16 h-16">
                    <AvatarImage src={p.avatar} alt={p.name} style={{ objectFit: "cover" }} />
                    <AvatarFallback>{p.name.slice(0, 2).toUpperCase()}</AvatarFallback>
                  </Avatar>
                </div>
                <div className="h-8" />
                <span className={cn(
                  "font-bold text-lg tracking-tight truncate px-2",
                  rank === 1 ? "text-yellow-800" : rank === 2 ? "text-gray-700" : "text-amber-800"
                )}>{p.name}</span>
                <span className={cn(
                  "text-base mb-4 font-semibold flex items-center gap-1",
                  rank === 1 ? "text-yellow-700" : rank === 2 ? "text-gray-700" : "text-amber-900"
                )}>
                  <Trophy className="w-4 h-4" />
                  {animatedScore.toLocaleString()} pt
                </span>
              </motion.div>
              <Badge variant="secondary" className={cn(
                "mt-3 py-1 px-3 text-sm shadow font-bold",
                rank === 1 ? "bg-yellow-100 text-yellow-800" : rank === 2 ? "bg-gray-100 text-gray-700" : "bg-amber-100 text-amber-800"
              )}>
                {rank === 1 ? "優勝" : `${rank} 位`}
              </Badge>
            </motion.div>
          )
        })}
      </div>

      {/* 4位以下リスト */}
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
                className="flex items-center justify-between bg-white/70 dark:bg-gray-800/60 rounded-xl px-6 py-3 shadow-lg backdrop-blur-md hover:shadow-2xl"
              >
                <div className="flex items-center gap-4">
                  <span className="text-lg font-bold w-8 text-right">{rank}</span>
                  <div className="rounded-full border-2 border-white bg-white" style={{ width: 44, height: 44 }}>
                    <Avatar className="w-10 h-10">
                      <AvatarImage src={p.avatar} alt={p.name} style={{ objectFit: "cover" }} />
                      <AvatarFallback>{p.name.slice(0, 2).toUpperCase()}</AvatarFallback>
                    </Avatar>
                  </div>
                  <span className="font-medium truncate max-w-[8rem]">{p.name}</span>
                </div>
                <span className="font-semibold tabular-nums">{animatedScore.toLocaleString()} pt</span>
              </motion.div>
            )
          })}
        </AnimatePresence>
      </motion.div>

      {/* 次の問題ボタン */}
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
