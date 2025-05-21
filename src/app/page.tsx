"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function Home() {
  return (
    <section className="flex flex-col justify-center items-center min-h-screen w-full py-8 md:py-16 lg:py-24 xl:py-32">
      <div className="h-14 lg:h-20"></div>
      <div className="flex flex-col items-center justify-center space-y-4 text-center">
        <div className="space-y-2 lg:space-y-4 mb-16 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none mb-8">
            Let's Go Arena!
          </h1>
          <p className="mx-auto max-w-[700px] text-sm sm:text-base text-gray-500 dark:text-gray-400">
            「学ぶ」がもっと面白くなる、対戦型クイズアプリ。
          </p>
          <p className="mx-auto max-w-[700px] text-sm sm:text-base text-gray-500 dark:text-gray-400">
            Tech Arenaは、プログラミングやIT全般に関する問題を4択式で回答しながら、他のユーザーとリアルタイムでバトルできる学習サービスです。
          </p>
          <p className="mx-auto max-w-[700px] text-sm sm:text-base text-gray-500 dark:text-gray-400">
            ただの学習アプリじゃない。”知識で戦う”新しい体験を、今すぐ。
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-3 sm:space-x-4">
          <Link href="/quizzes" passHref>
            <Button size="lg" className="w-full sm:w-auto font-bold">
              シングルモード
            </Button>
          </Link>
          <Link href="/" passHref>
            <Button variant="outline" size="lg" className="w-full sm:w-auto font-bold">
              マルチモード（開発中）
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}
