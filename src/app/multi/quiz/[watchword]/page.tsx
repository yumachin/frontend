"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { useParams, useRouter } from "next/navigation"
import { socket } from '../../../../lib/socket';
import Cookies from "js-cookie"

// オプションの色とホバー色の定義
const optionStyles = [
  {
    color: "bg-red-500 dark:bg-red-600",
    hoverColor: "hover:bg-red-600 dark:hover:bg-red-700",
  },
  {
    color: "bg-blue-500 dark:bg-blue-600",
    hoverColor: "hover:bg-blue-600 dark:hover:bg-blue-700",
  },
  {
    color: "bg-yellow-500 dark:bg-yellow-600",
    hoverColor: "hover:bg-yellow-600 dark:hover:bg-yellow-700",
  },
  {
    color: "bg-green-500 dark:bg-green-600",
    hoverColor: "hover:bg-green-600 dark:hover:bg-green-700",
  },
];

type QuizState = {
  question: string;
  options: string[]; // 配列形式
  timeLeft: number;
  waitingForUsers: string[];
  allUsersReady: boolean;
  gamePhase: 'waiting' | 'showQuestion' | 'answering' | 'results';
  questionNumber: number;
  totalQuestions: number;
  correctAnswer?: number;
  correctAnswerText?: string;
  level?: string;
  explanation?: string;
}

// オプションデータを生成する関数
const generateOptionsWithStyles = (options: string[] | undefined) => {
  if (!options || !Array.isArray(options)) {
    return [];
  }
  return options.map((option, index) => ({
    text: option,
    index: index,
    ...optionStyles[index % optionStyles.length]
  }));
};

export default function MultiQuizPage() {
  const params = useParams();
  const router = useRouter();
  const encodedPassword = params.watchword as string;
  const password = decodeURIComponent(encodedPassword);
  const [currentQuestion, setCurrentQuestion] = useState(1);
  const [quizState, setQuizState] = useState<QuizState | null>(null);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [questionDisplayTime, setQuestionDisplayTime] = useState(5);
  const [canAnswer, setCanAnswer] = useState(false);
  const [currentTimeLeft, setCurrentTimeLeft] = useState(15);

  useEffect(() => {
    // Cookieからユーザー情報を取得
    const userId = Cookies.get('userId');
    const userName = Cookies.get('userName');

    if (!userId || !userName) {
      router.push('/');
      return;
    }

    // 接続が確立されていることを確認
    if (!socket.connected) {
      socket.connect();
    }

    const handleConnect = () => {
      socket.emit('setUserInfo', { userId, userName });
      // ゲームページに到達したことをサーバーに通知
      socket.emit('userReadyForGame', { watchword: password, userId });
    };

    if (socket.connected) {
      handleConnect();
    } else {
      socket.on('connect', handleConnect);
    }

    // ゲーム状態の更新
    socket.on('gameStateUpdate', (data) => {
      console.log('Game state updated:', data);
      setQuizState(data);

      if (data.timeLeft !== undefined) {
        setCurrentTimeLeft(data.timeLeft);
      }
      if (data.questionNumber !== undefined) {
        setCurrentQuestion(data.questionNumber);
      }
      if (data.gamePhase === 'showQuestion') {
        setSelectedAnswer(null);
        setCanAnswer(false);
        setQuestionDisplayTime(5);

        // 5秒間問題を表示してから回答可能にする
        const timer = setInterval(() => {
          setQuestionDisplayTime(prev => {
            if (prev <= 1) {
              clearInterval(timer);
              setCanAnswer(true);
              return 0;
            }
            return prev - 1;
          });
        }, 1000);

        return () => clearInterval(timer);
      }
    });

    // 時間更新の受信
    socket.on('timeUpdate', (data: { timeLeft: number; totalTimeLeft: number }) => {
      setCurrentTimeLeft(data.timeLeft);
    });

    // エラーハンドリング
    socket.on('error', (data) => {
      alert(data.message);
      console.log('Errorが出ました:', data);
      router.push('/');
    });

    // ゲーム終了
    socket.on('gameEnded', (results) => {
      alert('ゲーム終了！結果: ' + JSON.stringify(results));
      router.push(`/multi/lobby/${encodeURIComponent(password)}`);
    });

    return () => {
      socket.off('connect', handleConnect);
      socket.off('gameStateUpdate');
      socket.off('timeUpdate');
      socket.off('error');
      socket.off('gameEnded');
    };
  }, [password, router]);

  const handleAnswerSelect = (answerIndex: number) => {
    if (!canAnswer || selectedAnswer !== null || quizState?.gamePhase !== 'showQuestion') return;

    setSelectedAnswer(answerIndex);
    const userId = Cookies.get('userId');
    socket.emit('submitAnswer', {
      watchword: password,
      userId,
      answerIndex,
      timeLeft: currentTimeLeft
    });
  };

  if (!quizState) {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        flexDirection: 'column'
      }}>
        <h2>ゲームを読み込み中...</h2>
        <div>少々お待ちください</div>
      </div>
    );
  }

  if (quizState.gamePhase === 'waiting') {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        flexDirection: 'column'
      }}>
        <h2>ユーザーを待っています...</h2>
        <p>もし長い場合は更新してください</p>
        <div style={{ marginTop: '20px' }}>
          <p>準備完了: {quizState.waitingForUsers ?
            quizState.waitingForUsers.length : 0} 人</p>
          {quizState.waitingForUsers && (
            <ul>
              {quizState.waitingForUsers.map((userName, index) => (
                <li key={index}>{userName}</li>
              ))}
            </ul>
          )}
        </div>
        <div style={{ marginTop: '20px' }}>
          <div className="loading-spinner">⏳</div>
        </div>
      </div>
    );
  }

  // 問題表示フェーズ（5秒間のカウントダウン）
  if (quizState.gamePhase === 'showQuestion' && !canAnswer) {
    return (
      <div className="min-h-screen flex flex-col justify-center items-center gap-30 px-6 bg-background transition-colors duration-300">
        <Card className="relative w-full max-w-4xl text-center shadow-xl py-8 lg:py-12 bg-slate-50 dark:bg-black border-slate-200 dark:border-slate-900 text-slate-700 dark:text-slate-300">
          <div className="absolute top-1 left-0 lg:top-2 lg:left-2 font-semibold dark:text-white text-sm lg:text-base px-4 py-1 rounded-full">
            Q{quizState.questionNumber} / {quizState.totalQuestions}
          </div>
          <h1 className="px-6 text-sm lg:text-2xl font-bold leading-tight mb-8">
            {quizState.question}
          </h1>
          <div className="text-6xl font-bold text-blue-500 animate-pulse">
            {questionDisplayTime}
          </div>
          <p className="mt-4 text-lg text-muted-foreground">
            問題をよく読んでください...
          </p>
        </Card>
      </div>
    );
  }

  // 結果表示フェーズ
  if (quizState.gamePhase === 'results') {
    const optionsWithStyles = generateOptionsWithStyles(quizState.options);

    // オプションが存在しない場合のフォールバック
    if (optionsWithStyles.length === 0) {
      return (
        <div className="min-h-screen flex flex-col justify-center items-center gap-30 px-6 bg-background transition-colors duration-300">
          <Card className="relative w-full max-w-4xl text-center shadow-xl py-8 lg:py-12 bg-slate-50 dark:bg-black border-slate-200 dark:border-slate-900 text-slate-700 dark:text-slate-300">
            <h1 className="px-6 text-sm lg:text-2xl font-bold leading-tight mb-4">
              結果を読み込み中...
            </h1>
          </Card>
        </div>
      );
    }

    return (
      <div className="min-h-screen flex flex-col justify-center items-center gap-30 px-6 bg-background transition-colors duration-300">
        <Card className="relative w-full max-w-4xl text-center shadow-xl py-8 lg:py-12 bg-slate-50 dark:bg-black border-slate-200 dark:border-slate-900 text-slate-700 dark:text-slate-300">
          <div className="absolute top-1 left-0 lg:top-2 lg:left-2 font-semibold dark:text-white text-sm lg:text-base px-4 py-1 rounded-full">
            Q{quizState.questionNumber} / {quizState.totalQuestions}
          </div>
          <h1 className="px-6 text-sm lg:text-2xl font-bold leading-tight mb-4">
            {quizState.question}
          </h1>
          <div className="text-green-600 text-xl font-bold">
            正解: {quizState.correctAnswerText}
          </div>
          {quizState.explanation && (
            <p className="mt-4 text-sm text-muted-foreground">
              {quizState.explanation}
            </p>
          )}
        </Card>

        <div className="w-full max-w-4xl grid grid-cols-1 sm:grid-cols-2 gap-8 lg:gap-12">
          {optionsWithStyles.map((option) => (
            <Button
              key={option.index}
              className={`
                ${option.color} ${option.hoverColor} text-white 
                h-12 lg:h-24 
                text-lg lg:text-2xl font-bold
                transition-all duration-200
                shadow-lg
                ${selectedAnswer === option.index ? "ring-4 ring-white dark:ring-gray-200 scale-105 shadow-2xl" : ""}
                ${quizState.correctAnswer === option.index ? "ring-4 ring-green-400 animate-pulse" : ""}
                ${quizState.correctAnswer !== option.index ? "opacity-50" : ""}
                border-0
              `}
              disabled={true}
            >
              <div className="flex items-center gap-2 sm:gap-4">
                <span className="font-bold text-base lg:text-xl">{option.text}</span>
                {quizState.correctAnswer === option.index && <span>✓</span>}
              </div>
            </Button>
          ))}
        </div>
      </div>
    );
  }

  // 回答フェーズ
  const optionsWithStyles = generateOptionsWithStyles(quizState.options);

  // オプションが存在しない場合のフォールバック
  if (optionsWithStyles.length === 0) {
    return (
      <div className="min-h-screen flex flex-col justify-center items-center gap-30 px-6 bg-background transition-colors duration-300">
        <Card className="relative w-full max-w-4xl text-center shadow-xl py-8 lg:py-12 bg-slate-50 dark:bg-black border-slate-200 dark:border-slate-900 text-slate-700 dark:text-slate-300">
          <h1 className="px-6 text-sm lg:text-2xl font-bold leading-tight">
            問題を読み込み中...
          </h1>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col justify-center items-center gap-30 px-6 bg-background transition-colors duration-300">
      {/* Question Area */}
      <Card className="relative w-full max-w-4xl text-center shadow-xl py-8 lg:py-12 bg-slate-50 dark:bg-black border-slate-200 dark:border-slate-900 text-slate-700 dark:text-slate-300">
        <div className="absolute top-1 left-0 lg:top-2 lg:left-2 font-semibold dark:text-white text-sm lg:text-base px-4 py-1 rounded-full">
          Q{quizState.questionNumber} / {quizState.totalQuestions}
        </div>
        <div className="absolute top-1 right-0 lg:top-2 lg:right-2 font-semibold dark:text-white text-sm lg:text-base px-4 py-1 rounded-full">
          残り時間: {currentTimeLeft}秒
        </div>
        <h1 className="px-6 text-sm lg:text-2xl font-bold leading-tight">
          {quizState.question}
        </h1>
      </Card>

      {/* Answer Options */}
      <div className="w-full max-w-4xl grid grid-cols-1 sm:grid-cols-2 gap-8 lg:gap-12">
        {optionsWithStyles.map((option) => (
          <Button
            key={option.index}
            onClick={() => handleAnswerSelect(option.index)}
            className={`
              ${option.color} ${option.hoverColor} text-white 
              h-12 lg:h-24 
              text-lg lg:text-2xl font-bold
              transition-all duration-200 transform hover:scale-105 active:scale-95
              shadow-lg hover:shadow-xl
              ${selectedAnswer === option.index ? "ring-4 ring-white dark:ring-gray-200 scale-105 shadow-2xl" : ""}
              ${selectedAnswer !== null && selectedAnswer !== option.index ? "opacity-50 scale-95" : ""}
              border-0
            `}
            disabled={selectedAnswer !== null || !canAnswer}
          >
            <div className="flex items-center gap-2 sm:gap-4">
              <span className="font-bold text-base lg:text-xl">{option.text}</span>
            </div>
          </Button>
        ))}
      </div>

      {selectedAnswer !== null && (
        <div className="mt-6 sm:mt-8 text-center animate-fade-in">
          <div className="bg-card dark:bg-card border border-border rounded-lg p-4 shadow-lg">
            <p className="text-base sm:text-lg text-muted-foreground">
              回答を送信しました！次の問題をお待ちください...
            </p>
          </div>
        </div>
      )}
    </div>
  )
}
