"use client"

import Footer from '@/components/footer'
import Link from 'next/link'
import React from 'react'
import { Button } from '@/components/ui/button'
import { PencilLine } from "lucide-react"
import { useUser } from '@/context/UserContext'
import Loading from '@/components/loading'

export default function ModePage() {
	const { user } = useUser();

  if (!user) return <Loading />

	const isEasyDone = user.stats.easyCorrectNum >= Number(process.env.NEXT_PUBLIC_QUESTION_COUNT);
  const isNormalDone = user.stats.normalCorrectNum >= Number(process.env.NEXT_PUBLIC_QUESTION_COUNT);
  const isHardDone = user.stats.hardCorrectNum >= Number(process.env.NEXT_PUBLIC_QUESTION_COUNT);

  const renderButtonContent = (levelName: string, correctNum: number, isDone: boolean) => (
    <>
      <span className={isDone ? "text-red-500 dark:text-red-400 font-bold" : ""}>
				{isDone ? "完了" : levelName}
			</span>
      <span className="absolute right-2 lg:right-4 bottom-2 text-sm flex items-center">
        <span className="flex items-center gap-2 text-xs lg:text-sm">
          <PencilLine size={16} />
          {correctNum} / {Number(process.env.NEXT_PUBLIC_QUESTION_COUNT)}
        </span>
      </span>
    </>
  );
  
	return (
		<div className="fixed inset-0 flex flex-col items-center justify-center min-h-screen px-4 text-center">
      <div className='h-18'></div>
      <h1 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl lg:text-6xl mb-12">
        難易度選択
      </h1>

      <div className="flex flex-col w-full max-w-xs gap-6 sm:max-w-md">

        {/* 初級 */}
        {isEasyDone ? (
          <button
            className="w-full h-20 text-xl font-semibold shadow-md rounded-xl relative cursor-not-allowed dark:border-gray border-2"
            disabled
          >
            {renderButtonContent("初級", user.stats.easyCorrectNum, true)}
          </button>
        ) : (
          <Link href="/quiz/easy" passHref>
            <Button
              size="lg"
              className="w-full h-20 text-xl font-semibold shadow-md relative bg-gray-500 hover:bg-gray-600 dark:bg-white dark:hover:bg-gray-100"
            >
              {renderButtonContent("初級", user.stats.easyCorrectNum, false)}
            </Button>
          </Link>
        )}

        {/* 中級 */}
        {isNormalDone ? (
          <button
            className="w-full h-20 text-xl font-semibold shadow-md rounded-xl relative cursor-not-allowed dark:border-gray border-2"
            disabled
          >
            {renderButtonContent("中級", user.stats.normalCorrectNum, true)}
          </button>
        ) : (
          <Link href="/quiz/normal" passHref>
            <Button
              size="lg"
              className="w-full h-20 text-xl font-semibold shadow-md relative bg-gray-500 hover:bg-gray-600 dark:bg-white dark:hover:bg-gray-100"
            >
              {renderButtonContent("中級", user.stats.normalCorrectNum, false)}
            </Button>
          </Link>
        )}

        {/* 上級 */}
        {isHardDone ? (
          <button
            className="w-full h-20 text-xl font-semibold shadow-md rounded-xl relative cursor-not-allowed dark:border-gray border-2"
            disabled
          >
            {renderButtonContent("上級", user.stats.hardCorrectNum, true)}
          </button>
        ) : (
          <Link href="/quiz/hard" passHref>
            <Button
              size="lg"
              className="w-full h-20 text-xl font-semibold shadow-md relative bg-gray-500 hover:bg-gray-600 dark:bg-white dark:hover:bg-gray-100"
            >
              {renderButtonContent("上級", user.stats.hardCorrectNum, false)}
            </Button>
          </Link>
        )}

      </div>

      <div className="mt-16 w-full">
        <Footer />
      </div>
    </div>
	)
}
