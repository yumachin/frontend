"use client"

import Footer from '@/components/footer'
import Link from 'next/link'
import React from 'react'
import { Button } from '@/components/ui/button'
import { PencilLine } from "lucide-react" // 解答数アイコン

const user = {
    userId: "5",
    email: "e1922047@oit.ac.jp",
    userName: "中井裕麻",
    iconPath: "/images/user.png",
    role: "user",
    stats: {
        hardClearNum: 3,
        normalClearNum: 13,
        easyClearNum: 10,
        hardCorrectNum: 2,
        normalCorrectNum: 5,
        easyCorrectNum: 7
    },
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-01-01T00:00:00Z"
}

export default function Mode() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen px-4 text-center">
            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl lg:text-6xl mb-12">
                モード選択
            </h1>

            <div className="flex flex-col w-full max-w-xs gap-6 sm:max-w-md">
                {/* 初級 */}
                <Link href="/quizzes?level=beginner" passHref>
                    <Button
                        size="lg"
                        className="w-full h-20 text-xl font-semibold shadow-md light:bg-black-900 relative transition-all light:text-white dark:hover:bg-gray-100"
                    >
                        初級
                        <span className="absolute right-4 bottom-2 text-sm flex items-center gap-1">
                            <PencilLine size={16} />
                            {user.stats.easyClearNum}
                        </span>
                    </Button>
                </Link>

                {/* 中級 */}
                <Link href="/quizzes?level=intermediate" passHref>
                    <Button
                        size="lg"
                        className="w-full h-20 text-xl font-semibold shadow-md light:bg-black-900 relative transition-all light:text-white dark:hover:bg-gray-100"
                    >
                        中級
                        <span className="absolute right-4 bottom-2 text-sm flex items-center gap-1">
                            <PencilLine size={16} />
                            {user.stats.normalClearNum}
                        </span>
                    </Button>
                </Link>

                {/* 上級 */}
                <Link href="/quizzes?level=advanced" passHref>
                    <Button
                        size="lg"
                        className="w-full h-20 text-xl font-semibold shadow-md light:bg-black-900 relative transition-all light:text-white dark:hover:bg-gray-100"
                    >
                        上級
                        <span className="absolute right-4 bottom-2 text-sm flex items-center gap-1">
                            <PencilLine size={16} />
                            {user.stats.hardClearNum}
                        </span>
                    </Button>
                </Link>
            </div>

            <div className="mt-16 w-full">
                <Footer />
            </div>
        </div>
    )
}
