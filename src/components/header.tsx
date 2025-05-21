"use client";

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ModeToggle } from "@/components/mode-toggle"
import darkLogo from "../../public/dark-logo.png"
import lightLogo from "../../public/light-logo.png"
import Image from "next/image"
import { useTheme } from "next-themes"
import { useEffect, useState } from "react";

export default function Header() {
  const { resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const navItems = [
    { label: "Home", href: "/" },
    { label: "Ranking", href: "/ranking" },
    { label: "Profile", href: "/profile" },
  ]
  const logo = resolvedTheme === "dark" ? darkLogo : lightLogo
  useEffect(() => {
    setMounted(true)
  }, [])
  
  return (
    <header className="fixed top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-18 items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* ロゴ */}
        {mounted && (
          <Link href="/" className="flex items-center gap-2 font-bold">
            <Image
              src={logo}
              alt="Logo"
              width={200}
              height={200}
              className="h-8 w-36 lg:h-10 lg:w-48"
            />
          </Link>
        )}

        <div className="sm:hidden">
          <ModeToggle />
        </div>
        
        {/* PCナビゲーション */}
        <nav className="hidden sm:flex items-center gap-1 sm:gap-6">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href} passHref>
              <Button
                variant="ghost"
                size="sm"
                className="text-xs sm:text-sm"
              >
                {item.label}
              </Button>
            </Link>
          ))}
          <ModeToggle />
        </nav>
      </div>
    </header>
  )
}
