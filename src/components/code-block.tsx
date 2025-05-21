"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Copy } from "lucide-react"

interface CodeBlockProps {
  code: string
  language: string
}

export function CodeBlock({ code, language }: CodeBlockProps) {
  const [copied, setCopied] = useState(false)

  const copyToClipboard = () => {
    navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="relative">
      <pre className={`language-${language} p-2 sm:p-4 rounded-md bg-muted overflow-x-auto text-xs sm:text-sm`}>
        <code>{code}</code>
      </pre>
      <Button
        variant="ghost"
        size="sm"
        className="absolute top-2 right-2 h-6 w-6 sm:h-8 sm:w-8 p-0"
        onClick={copyToClipboard}
      >
        <Copy className="h-3 w-3 sm:h-4 sm:w-4" />
        <span className="sr-only">Copy code</span>
      </Button>
      {copied && (
        <div className="absolute top-2 right-10 sm:right-12 bg-background border rounded-md px-2 py-1 text-xs">
          Copied!
        </div>
      )}
    </div>
  )
}
