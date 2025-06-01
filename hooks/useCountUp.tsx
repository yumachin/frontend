// ──────────────────────

import { useEffect, useState } from "react"

// スコアアニメ（count up）hook
export function useCountUp(target: number, duration = 800) {
  const [value, setValue] = useState(target)
  useEffect(() => {
    const start = value
    const diff = target - start
    if (diff === 0) return
    const startTime = performance.now()
    let raf: number
    const tick = (now: number) => {
      const progress = Math.min((now - startTime) / duration, 1)
      setValue(Math.floor(start + diff * progress))
      if (progress < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [target])
  return value
}
