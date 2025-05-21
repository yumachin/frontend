"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"

const dummyRanking = [
  { id: 1, name: "Taro", score: 950 },
  { id: 2, name: "Hanako", score: 870 },
  { id: 3, name: "Ken", score: 860 },
  { id: 4, name: "You", score: 850, isMe: true },
  { id: 5, name: "Mika", score: 830 },
]

export default function RankingPage() {
  return (
    <div className="min-h-screen pt-20 pb-20 px-4">
      <h1 className="text-2xl font-bold mb-4 text-center">ランキング</h1>
      <p className="text-sm text-muted-foreground text-center mb-6">
        Tech Arena のトッププレイヤーたち
      </p>

      <ScrollArea className="h-[70vh]">
        <div className="space-y-3">
          {dummyRanking.map((user, index) => (
            <Card
              key={user.id}
              className={`w-full ${
                user.isMe ? "border-orange-500 bg-orange-50" : ""
              }`}
            >
              <CardContent className="flex items-center py-4 px-3 gap-4">
                <div className="text-xl font-bold w-6 text-center">{index + 1}</div>
                <Avatar>
                  <AvatarImage src={`https://api.dicebear.com/7.x/thumbs/svg?seed=${user.name}`} />
                  <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="font-medium text-sm">
                    {user.isMe ? "あなた" : user.name}
                  </div>
                </div>
                <div className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                  {user.score} pts
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </ScrollArea>
    </div>
  )
}
