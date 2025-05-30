import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Crown, House, User } from "lucide-react"

export default function Footer() {
  const navItems = [
    { label: "ホーム", icon: House, href: "/" },
    { label: "ランキング", icon: Crown, href: "/ranking" },
    { label: "プロフィール", icon: User, href: "/profile" },
  ]

  return (
    <footer className="sm:hidden fixed bottom-0 left-0 w-full border-t bg-muted flex items-center justify-between z-50">
      {/* ナビゲーションボタン */}
      <nav className="flex flex-1 justify-between px-4 pt-1">
        {navItems.map((item) => (
          <Link key={item.label} href={item.href}>
            <div className="flex flex-col items-center w-full">
              <Button
                asChild
                variant="ghost"
                className="w-full justify-center"
              >
                <item.icon />
              </Button>
              <span className="text-xs tracking-tight pb-4">{item.label}</span>
            </div>
          </Link>
        ))}
      </nav>
    </footer>
  )
}
