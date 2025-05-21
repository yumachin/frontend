import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Crown, House, User } from "lucide-react"

export default function Footer() {
  const navItems = [
    { label: "Home", icon: <House className="h-10 w-10 p-0" />, href: "/" },
    { label: "Ranking", icon: <Crown className="h-10 w-10" />, href: "/ranking" },
    { label: "Profile", icon: <User className="h-10 w-10" />, href: "/profile" },
  ]

  return (
    <footer className="sm:hidden fixed bottom-0 left-0 w-full border-t bg-muted px-6 py-1 flex items-center justify-between z-50">
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
              <span className="text-xs tracking-tight">{item.label}</span>
            </div>
          </Link>
        ))}
      </nav>
    </footer>
  )
}
