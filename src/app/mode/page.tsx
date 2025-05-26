"use client"

import Footer from '@/components/footer'
import Link from 'next/link'
import React from 'react'
import { Button } from '@/components/ui/button'
import { PencilLine } from "lucide-react"
import { useUser } from '@/context/UserContext'

const user = {
  userId: "5vcsdvasjhviaer",
  email: "e1922047@oit.ac.jp",
  userName: "中井裕麻",
  iconPath: "default.png",
  role: "user" as "user",
  stats: {
    hardClearNum: 3,
    normalClearNum: 13,
    easyClearNum: 10,
    hardCorrectNum: 2,
    normalCorrectNum: 5,
    easyCorrectNum: 7
  },
  createdAt: "2025-05-24T08:53:18.000Z",
  updatedAt: "2025-05-24T08:53:18.000Z"
}

export default function ModePage() {
	// const { user } = useUser();

  if (!user) {
    return <div className="text-center text-red-500 mt-30">プロフィールの取得に失敗しました。</div>;
  }
  
	return (
		<div className="flex flex-col items-center justify-center min-h-screen px-4 text-center">
			<h1 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl lg:text-6xl mb-12">
				モード選択
			</h1>

			<div className="flex flex-col w-full max-w-xs gap-6 sm:max-w-md">
				<Link href="/quiz/easy" passHref>
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

				<Link href="/quiz/normal" passHref>
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

					<Link href="/quiz/hard" passHref>
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
