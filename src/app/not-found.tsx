"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, Code, Home } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4 md:p-8">
      <div className="max-w-[800px] w-full space-y-8 text-center">
        {isClient && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="relative"
          >
            <motion.div
              className="text-[8rem] md:text-[12rem] font-bold text-primary opacity-90 select-none relative z-10"
              animate={{
                x: [0, -2, 2, -2, 0],
                y: [0, 1, -1, 1, 0],
              }}
              transition={{
                duration: 0.5,
                repeat: Infinity,
                repeatType: "mirror",
                repeatDelay: 5,
              }}
            >
              404
            </motion.div>
            
            <div className="absolute inset-0 flex items-center justify-center z-0">
              <div className="w-[90%] h-[40%] bg-chart-1/10 blur-3xl rounded-full"></div>
            </div>
          </motion.div>
        )}

        <div className="space-y-4 relative">
          <h1 className="text-2xl md:text-4xl font-bold text-foreground">
            ページが見つかりません
          </h1>
          
          <div className="space-y-3 max-w-[700px] mx-auto">
            <p className="mx-auto max-w-[700px] text-sm sm:text-base text-gray-500 dark:text-gray-400">
              お探しのページは存在しないか、移動した可能性があります。
            </p>
            <p className="mx-auto max-w-[700px] text-sm sm:text-base text-gray-500 dark:text-gray-400">
              URLが正しいかご確認いただくか、以下のリンクからホームページにお戻りください。
            </p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-6">
          <Link href="/">
            <Button 
              size="lg" 
              className="w-full sm:w-auto group relative overflow-hidden"
            >
              <Home className="mr-2 h-4 w-4" />
              ホームに戻る
              <span className="absolute inset-0 bg-primary/10 group-hover:bg-transparent rounded-md transform scale-0 group-hover:scale-100 transition-transform duration-300"></span>
            </Button>
          </Link>
          
          <div>
            <Button 
              variant="outline" 
              size="lg" 
              className="w-full sm:w-auto"
              onClick={() => window.history.back()}
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              前のページに戻る
            </Button>
          </div>
        </div>

        <div className="relative mt-12 pt-8 border-t border-border">
          <div className="flex items-center justify-center gap-2 text-muted-foreground">
            <Code className="h-5 w-5" />
            <p className="text-sm">
              TechArena | バトルで学ぶ、プログラミングの世界
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}