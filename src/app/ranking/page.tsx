"use client";

import { useCallback, useEffect, useState } from "react";
import Footer from "@/components/footer";
import Level from "@/components/level-ranking";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";

// const ranking = [
//   {
//     userId: "1",
//     userName: "Onishi",
//     stats: { hardCorrectNum: 30, normalCorrectNum: 25, easyCorrectNum: 20 },
//   },
//   {
//     userId: "2",
//     userName: "Kudo",
//     stats: { hardCorrectNum: 30, normalCorrectNum: 20, easyCorrectNum: 20 },
//   },
//   {
//     userId: "3",
//     userName: "Takahashi",
//     stats: { hardCorrectNum: 25, normalCorrectNum: 15, easyCorrectNum: 20 },
//   },
//   {
//     userId: "4",
//     userName: "Takami",
//     stats: { hardCorrectNum: 25, normalCorrectNum: 15, easyCorrectNum: 15 },
//   },
//   {
//     userId: "5",
//     userName: "Nakai",
//     stats: { hardCorrectNum: 20, normalCorrectNum: 15, easyCorrectNum: 15 },
//   },
//   {
//     userId: "6",
//     userName: "Noki",
//     stats: { hardCorrectNum: 20, normalCorrectNum: 10, easyCorrectNum: 15 },
//   },
//   {
//     userId: "7",
//     userName: "Yokoyama",
//     stats: { hardCorrectNum: 15, normalCorrectNum: 10, easyCorrectNum: 10 },
//   },
//   {
//     userId: "8",
//     userName: "Over",
//     stats: { hardCorrectNum: 5, normalCorrectNum: 15, easyCorrectNum: 5 },
//   },
// ];

type Score = {
  userId: string;
  userName: string;
  rank: number;
  correctNum: number;
};

type RankingData = {
  hard: Score[];
  normal: Score[];
  easy: Score[];
};

type UserScore = {
  userId: string;
  userName: string;
  isMe: boolean;
  score: number;
};

type RankingSummary = {
  all: UserScore[];
  hard: UserScore[];
  normal: UserScore[];
  easy: UserScore[];
};

const WEIGHT = {
  easy: 1,
  normal: 2,
  hard: 3,
  all: 1
} as const;

export default function RankingPage() {
  const userId = "5";
  const [selectedLevel, setSelectedLevel] = useState<
    "easy" | "normal" | "hard" | "all"
  >("all");
  const [rankingData, setRankingData] = useState<RankingData | undefined>(
    undefined
  );
  const [sortedRanking, setSortedRanking] = useState<UserScore[]>([]);
  const [rankingSummary, setRankingSummary] = useState<RankingSummary>({
    all: [],
    hard: [],
    normal: [],
    easy: [],
  });

  useEffect(() => {
    (async () => {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/rankings/`, {
        cache: "no-store"
      });
      const data = (await res.json()) as RankingData;
      setRankingData(data);
    })();
  }, []);

  useEffect(() => {
    console.log(rankingData);
    convertData();
  }, [rankingData]);

  useEffect(() => {
    setSortedRanking(rankingSummary[selectedLevel]);
  }, [rankingSummary, selectedLevel]);

  const convertData = useCallback(() => {
    if (rankingData === undefined) {
      return;
    }
    const userScoreMap = {} as Record<string, UserScore>;

    for (const level in rankingData) {
      for (const score of rankingData[level]) {
        if (userScoreMap[score.userId] === undefined) {
          userScoreMap[score.userId] = {
            userId: score.userId,
            userName: score.userName,
            isMe: score.userId === userId,
            score: 0,
          };
        }
        userScoreMap[score.userId].score +=
          score.correctNum * WEIGHT[level as keyof typeof WEIGHT];
      }
    }
    const userScoreMapFn = (score: Score): UserScore => ({
      userId: score.userId,
      userName: score.userName,
      isMe: score.userId === userId,
      score: score.correctNum * WEIGHT[selectedLevel],
    });

    setRankingSummary({
      hard: rankingData.hard.map(userScoreMapFn),
      normal: rankingData.normal.map(userScoreMapFn),
      easy: rankingData.easy.map(userScoreMapFn),
      all: Object.values(userScoreMap),
    });
  }, [rankingData]);

  // const sortedRanking = [...rankingData].map(user => {
  //   const { hardCorrectNum, normalCorrectNum, easyCorrectNum } = user.stats;

  //   // スコア計算
  //   const score =

  //     selectedLevel === "easy"
  //       ? easyCorrectNum
  //       : selectedLevel === "normal"
  //         ? normalCorrectNum
  //         : selectedLevel === "hard"
  //           ? hardCorrectNum
  //           : // "all" の場合は重み付きスコア
  //           easyCorrectNum * 1 + normalCorrectNum * 2 + hardCorrectNum * 3;

  //   return {
  //     ...user,
  //     isMe: user.userId === userId,
  //     score,
  //   };
  // }).sort((a, b) => b.score - a.score);

  return (
    <div className="min-h-screen py-25 lg:pb-12 px-6 lg:px-96">
      <h1 className="text-2xl font-bold mb-4 text-center">正答数ランキング</h1>
      <p className="text-sm text-muted-foreground text-center">
        Tech Arena のトッププレイヤーたち（
        {selectedLevel === "easy"
          ? "初級"
          : selectedLevel === "normal"
            ? "中級"
            : selectedLevel === "hard"
              ? "上級"
              : "総合"}
        ）
      </p>
      <p className="text-xs text-muted-foreground text-center mb-6">
        ＊初級は１pt、中級は２pt、上級は３pt換算
      </p>

      <Level onLevelChange={setSelectedLevel} selectedLevel={selectedLevel} />

      <ScrollArea className="lg:h-[70vh] mt-4">
        <div className="space-y-6">
          {(() => {
            let prevScore: number | null = null;
            let rank = 0;
            let sameRankCount = 0;

            return sortedRanking.map((user) => {
              const score = user.score;

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
                  className={`w-full ${user.isMe
                      ? "dark:border-white border-orange-500 bg-orange-50"
                      : ""
                    }`}
                >
                  <CardContent
                    className={`flex items-center py-4 px-4 lg:px-8 gap-4 ${user.isMe ? "text-black" : ""
                      }`}
                  >
                    <div className="text-xl font-bold w-6 text-center">
                      {rank}
                    </div>
                    <Avatar>
                      <AvatarImage
                        src={`https://api.dicebear.com/7.x/thumbs/svg?seed=${user.userName}`}
                      />
                      <AvatarFallback>{user.userName.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div
                        className={`text-sm ${user.isMe ? "text-black font-bold" : "font-medium"
                          }`}
                      >
                        {user.isMe ? "あなた" : user.userName}
                      </div>
                    </div>
                    <div
                      className={`text-sm font-semibold text-gray-700 dark:text-gray-300 ${user.isMe ? "dark:text-gray-900" : ""
                        }`}
                    >
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
