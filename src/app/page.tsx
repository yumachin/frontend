"use client"

import { useEffect, useState } from "react"
import { useTheme } from "next-themes"
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter"
import { vscDarkPlus, oneLight } from "react-syntax-highlighter/dist/esm/styles/prism"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import Footer from "@/components/footer"
import Loading from "@/components/loading"

const codeString = `
<p className="mx-auto max-w-[700px] text-sm sm:text-base text-gray-500 dark:text-gray-400">
  「学ぶ」がもっと面白くなる、対戦型クイズアプリ。
</p>
<p className="mx-auto max-w-[700px] text-sm sm:text-base text-gray-500 dark:text-gray-400">
  Tech Arenaは、プログラミングやIT全般に関する問題を4択式で回答しながら、他のユーザーとリアルタイムでバトルできる学習サービスです。
</p>
<p className="mx-auto max-w-[700px] text-sm sm:text-base text-gray-500 dark:text-gray-400">
  ただの学習アプリじゃない。”知識で戦う”新しい体験を、今すぐ。
</p>`

export default function HomePage() {
  const { theme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const syntaxStyle = theme === "dark" ? vscDarkPlus : oneLight

  if (!mounted) return <Loading />

  return (
    <>
      <section className="fixed inset-0 flex flex-col justify-center items-center min-h-screen w-full py-8 md:py-16 lg:py-24 xl:py-32">
        <div className="h-8" />
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2 lg:space-y-4 mb-16 px-4 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none mb-8">
              Let&apos;s Go Arena!
            </h1>
            <div className="max-w-sm lg:max-w-6xl mx-auto px-3">
              <SyntaxHighlighter
                language="jsx"
                style={syntaxStyle}
                wrapLongLines
              >
                {codeString}
              </SyntaxHighlighter>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 sm:space-x-4">
            <Link href="/mode" passHref>
              <Button size="lg" className="w-full sm:w-auto font-bold">
                シングルモード
              </Button>
            </Link>
            <Button
              variant="outline"
              size="lg"
              className="w-full sm:w-auto font-bold"
              onClick={() => alert("マルチモードは現在開発中です。")}
            >
              マルチモード（開発中）
            </Button>
          </div>
        </div>
      </section>
      <Footer />
    </>
  )
}
