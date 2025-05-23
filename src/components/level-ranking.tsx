"use client"

import { Baby, Skull, Smile } from "lucide-react"

type LevelProps = {
    onLevelChange: (level: "easy" | "normal" | "hard") => void
    selectedLevel: "easy" | "normal" | "hard"
}

export default function Level({ onLevelChange, selectedLevel }: LevelProps) {
    const navItems = [
        { label: "初級", icon: <Baby className="h-6 w-6" />, value: "easy" },
        { label: "中級", icon: <Smile className="h-6 w-6" />, value: "normal" },
        { label: "上級", icon: <Skull className="h-6 w-6" />, value: "hard" },
    ];

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
