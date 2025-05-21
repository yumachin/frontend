"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ModeToggle } from "@/components/mode-toggle"
import logo from "../../public/logo.png"
import Image from "next/image"
import { Menu } from "lucide-react"
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet"
import { useState } from "react"

export default function Header() {
  const [open, setOpen] = useState(false)

  const navItems = [
    { label: "Home", href: "/" },
    { label: "Ranking", href: "/ranking" },
    { label: "Profile", href: "/profile" },
  ]

  return (
    <header className="fixed top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-14 lg:h-20 items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* ロゴ */}
        <Link href="/" className="flex items-center gap-2 font-bold">
          <Image
            src={logo}
            alt="Logo"
            width={200}
            height={200}
            className="h-8 w-36 lg:h-10 lg:w-48"
          />
        </Link>

        {/* モバイルメニュー */}
        <div className="sm:hidden">
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Menu className="w-6 h-6" />
            </SheetTrigger>
            <SheetContent side="right" className="w-72 bg-muted p-5">
              <SheetHeader>
                <SheetTitle className="text-sm font-semibold flex items-center gap-2">
                  Menu
                </SheetTitle>
              </SheetHeader>

              {/* ナビゲーション */}
              <nav className="mt-6 flex flex-col gap-3">
                {navItems.map((item) => (
                  <Link key={item.href} href={item.href} passHref>
                    <Button
                      asChild
                      variant="ghost"
                      onClick={() => setOpen(false)}
                      className="w-full justify-start text-lg"
                    >
                      <span>{item.label}</span>
                    </Button>
                  </Link>
                ))}
              </nav>

              {/* Appearance セクション */}
              <div className="mt-8 border-t pt-4">
                <p className="text-xs text-muted-foreground mb-2">Appearance</p>
                <ModeToggle />
              </div>
            </SheetContent>
          </Sheet>
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
