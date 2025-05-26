"use client";

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ModeToggle } from "@/components/mode-toggle"
import darkLogo from "../../public/dark-logo.png"
import lightLogo from "../../public/light-logo.png"
import Image from "next/image"
import { useTheme } from "next-themes"
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation"

export default function Header() {
  const { resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const [imageLoaded, setImageLoaded] = useState(false)

  const navItems = [
    { label: "ホーム", href: "/" },
    { label: "ランキング", href: "/ranking" },
    { label: "プロフィール", href: "/profile" },
  ]

  const logo = resolvedTheme === "dark" ? darkLogo : lightLogo

  useEffect(() => {
    setMounted(true)
  }, [])

  const pathname = usePathname()
  // 表示したくないパス一覧
  const hiddenPaths = ["/signIn", "/sign-up", "/reset-password", "/quiz/easy/", "/quiz/normal/", "/quiz/hard/"]

  if (hiddenPaths.some(prefix => pathname.startsWith(prefix))) {
    return null
  }
  
  return (
    <header className="fixed top-0 z-50 w-full border-b bg-background">
      <div className="container mx-auto flex h-18 items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* ロゴ */}
        {mounted ? (
          <Link href="/" className="flex items-center gap-2 font-bold">
            <Image
              src={logo}
              alt="Logo"
              width={200}
              height={40}
              className="h-8 w-38 lg:h-10 lg:w-48"
              priority
              onLoad={() => setImageLoaded(true)}
            />
          </Link>
        ) : (
          // プレースホルダー（透明の空ボックス）
          <div style={{ width: 200, height: 40 }} />
        )}

        {imageLoaded && (
          <>
            <div className="sm:hidden">
              <ModeToggle />
            </div>
            <nav className="hidden sm:flex items-center gap-1 sm:gap-6">
              {navItems.map((item) => (
                <Link key={item.href} href={item.href} passHref>
                  <Button variant="ghost" size="sm" className="text-xs sm:text-sm">
                    {item.label}
                  </Button>
                </Link>
              ))}
              <ModeToggle />
            </nav>
          </>
        )}
      </div>
    </header>
  )
}
