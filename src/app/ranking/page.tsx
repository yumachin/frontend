"use client"

import Footer from "@/components/footer"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"

const dummyRanking = [
  { id: 1, name: "Onishi", score: 100 },
  { id: 2, name: "Kudo", score: 95 },
  { id: 3, name: "Takahashi", score: 90 },
  { id: 4, name: "Takami", score: 80 },
  { id: 5, name: "You", score: 70, isMe: true },
  { id: 6, name: "Noki", score: 60 },
  { id: 7, name: "Yokoyama", score: 55 }
]

export default function RankingPage() {
  return (
    <div className="min-h-screen py-25 lg:pb-12 px-6 lg:px-96">
      <h1 className="text-2xl font-bold mb-4 text-center">正当数ランキング</h1>
      <p className="text-sm text-muted-foreground text-center mb-6">
        Tech Arena のトッププレイヤーたち
      </p>
      <ScrollArea className="lg:h-[70vh]">
        <div className="space-y-6">
          {dummyRanking.map((user, index) => (
            <Card
              key={user.id}
              className={`w-full ${
                user.isMe ? "border-orange-500 bg-orange-50" : ""
              }`}
            >
              <CardContent className={`flex items-center py-4 px-4 lg:px-8 gap-4 ${user.isMe ? "text-black" : ""}`}>
                <div className="text-xl font-bold w-6 text-center">{index + 1}</div>
                <Avatar>
                  <AvatarImage src={`https://api.dicebear.com/7.x/thumbs/svg?seed=${user.name}`} />
                  <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className={`text-sm ${user.isMe ? "text-black font-bold" : "font-medium "}`}>
                    {user.isMe ? "あなた" : user.name}
                  </div>
                </div>
                <div className={`text-sm font-semibold text-gray-700 dark:text-gray-300 ${user.isMe ? "dark:text-gray-900" : ""}`}>
                  {user.score} pt
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </ScrollArea>
      <Footer />
    </div>
  )
}
