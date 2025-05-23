"use client"

import { useState } from "react"
import Footer from "@/components/footer"
import Level from "@/components/level-ranking"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"

const ranking = [
  { userId: "1", userName: "Onishi", stats: { hardCorrectNum: 30, normalCorrectNum: 25, easyCorrectNum: 20 } },
  { userId: "2", userName: "Kudo", stats: { hardCorrectNum: 30, normalCorrectNum: 20, easyCorrectNum: 20 } },
  { userId: "3", userName: "Takahashi", stats: { hardCorrectNum: 25, normalCorrectNum: 15, easyCorrectNum: 20 } },
  { userId: "4", userName: "Takami", stats: { hardCorrectNum: 25, normalCorrectNum: 15, easyCorrectNum: 15 } },
  { userId: "5", userName: "Nakai", stats: { hardCorrectNum: 20, normalCorrectNum: 15, easyCorrectNum: 15 } },
  { userId: "6", userName: "Noki", stats: { hardCorrectNum: 20, normalCorrectNum: 10, easyCorrectNum: 15 } },
  { userId: "7", userName: "Yokoyama", stats: { hardCorrectNum: 15, normalCorrectNum: 10, easyCorrectNum: 10 } },
  { userId: "8", userName: "Over", stats: { hardCorrectNum: 5, normalCorrectNum: 15, easyCorrectNum: 5 } },
];

export default function RankingPage() {
  const userId = "5";
  const [level, setLevel] = useState<"easy" | "normal" | "hard">("easy");
  const [selectedLevel, setSelectedLevel] = useState<"easy" | "normal" | "hard">("normal")

  const sortedRanking = [...ranking].map(user => (
    { ...user, isMe: user.userId === userId }
  )).sort((a, b) => {
    const totalA = a.stats[`${level}CorrectNum`];
    const totalB = b.stats[`${level}CorrectNum`];
    return totalB - totalA;
  });

  return (
    <div className="min-h-screen py-25 lg:pb-12 px-6 lg:px-96">
      <h1 className="text-2xl font-bold mb-4 text-center">正答数ランキング</h1>
      <p className="text-sm text-muted-foreground text-center mb-6">
        Tech Arena のトッププレイヤーたち（{level === "easy" ? "初級" : level === "normal" ? "中級" : "上級"}）
      </p>

      <Level onLevelChange={setSelectedLevel} selectedLevel={selectedLevel} />

      <ScrollArea className="lg:h-[70vh] mt-4">
        <div className="space-y-6">
          {(() => {
            let prevScore: number | null = null;
            let rank = 0;
            let sameRankCount = 0;

            return sortedRanking.map((user) => {
              const score = user.stats[`${level}CorrectNum`];

              if (score === prevScore) {
                sameRankCount++;
              } else {
                rank += sameRankCount + 1;
                sameRankCount = 0;
              }

              prevScore = score;

              return (
                <Card
                  key={user.userId}
                  className={`w-full ${user.isMe ? "dark:border-white border-orange-500 bg-orange-50" : ""}`}
                >
                  <CardContent className={`flex items-center py-4 px-4 lg:px-8 gap-4 ${user.isMe ? "text-black" : ""}`}>
                    <div className="text-xl font-bold w-6 text-center">{rank}</div>
                    <Avatar>
                      <AvatarImage src={`https://api.dicebear.com/7.x/thumbs/svg?seed=${user.userName}`} />
                      <AvatarFallback>{user.userName.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className={`text-sm ${user.isMe ? "text-black font-bold" : "font-medium"}`}>
                        {user.isMe ? "あなた" : user.userName}
                      </div>
                    </div>
                    <div className={`text-sm font-semibold text-gray-700 dark:text-gray-300 ${user.isMe ? "dark:text-gray-900" : ""}`}>
                      {score} pt
                    </div>
                  </CardContent>
                </Card>
              );
            });
          })()}
        </div>
      </ScrollArea>

      <Footer />
    </div>
  );
}
