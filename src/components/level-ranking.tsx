"use client"

import { Baby , Crown, Skull, Smile} from "lucide-react"

type LevelType = "easy" | "normal" | "hard" | "all"

interface LevelProps {
    selectedLevel: LevelType
    onLevelChange: (level: LevelType) => void
}

export default function Level({ selectedLevel, onLevelChange }: LevelProps) {
    const navItems = [
        {
            value: "easy",
            label: "初級",
            icon: <Baby className="w-6 h-6" />,
        },
        {
            value: "normal",
            label: "中級",
            icon: <Smile className="w-6 h-6" />,
        },
        {
            value: "hard",
            label: "上級",
            icon: <Skull className="w-6 h-6" />,
        },
        {
            value: "all",
            label: "総合",
            icon: <Crown className="w-6 h-6" />,
        },
    ] as const

    return (
        <footer className="py-4 border-t">
            <nav className="flex justify-around">
                {navItems.map((item) => {
                    const isSelected = selectedLevel === item.value;
                    return (
                        <button
                            key={item.value}
                            onClick={() => onLevelChange(item.value as "easy" | "normal" | "hard")}
                            className={`flex flex-col items-center space-y-1 text-sm transition-colors ${isSelected ? "text-orange-500 font-bold" : "text-muted-foreground"
                                }`}
                        >
                            <div
                                className={`p-3 rounded-full transition-colors ${isSelected ? "bg-orange-300 text-white" : "bg-muted hover:bg-accent"
                                    }`}
                            >
                                {item.icon}
                            </div>
                            <span>{item.label}</span>
                        </button>

                    )
                })}
            </nav>
        </footer>
    )
}
