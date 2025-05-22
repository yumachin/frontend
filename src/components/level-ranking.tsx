import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Baby, Skull, Smile, } from "lucide-react"

export default function Level() {
    const navItems = [
        { label: "初級", icon: <Baby className="h-10 w-10 p-0" />, href: "/" },
        { label: "中級", icon: <Smile className="h-10 w-10" />, href: "/ranking" },
        { label: "上級", icon: <Skull className="h-10 w-10" />, href: "/profile" },
    ]

    return (
        <footer className="text-center">
            {/* ナビゲーションボタン */}
            <nav className="flex flex-1 justify-between">
                {navItems.map((item) => (
                    <Link key={item.href} href={item.href} passHref>
                        <div className="flex flex-col items-center w-full">
                            <Button
                                asChild
                                variant="ghost"
                                className="w-full justify-center"
                            >
                                {item.icon}
                            </Button>
                            <span className="text-xs tracking-tight pb-2">{item.label}</span>
                        </div>
                    </Link>
                ))}
            </nav>
        </footer>
    )
}
