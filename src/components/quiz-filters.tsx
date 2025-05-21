"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"

export function QuizFilters() {
  const [difficulty, setDifficulty] = useState([1])

  return (
    <div className="space-y-6 p-4 border rounded-lg">
      <div className="space-y-2">
        <h3 className="font-medium">Search</h3>
        <Input placeholder="Search quizzes..." />
      </div>

      <div className="space-y-2">
        <h3 className="font-medium">Language</h3>
        <Select defaultValue="all">
          <SelectTrigger>
            <SelectValue placeholder="Select language" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Languages</SelectItem>
            <SelectItem value="javascript">JavaScript</SelectItem>
            <SelectItem value="python">Python</SelectItem>
            <SelectItem value="java">Java</SelectItem>
            <SelectItem value="csharp">C#</SelectItem>
            <SelectItem value="typescript">TypeScript</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <h3 className="font-medium">Difficulty</h3>
        <div className="pt-2">
          <Slider defaultValue={[1]} max={3} step={1} value={difficulty} onValueChange={setDifficulty} />
          <div className="flex justify-between mt-2 text-xs text-muted-foreground">
            <span>Beginner</span>
            <span>Intermediate</span>
            <span>Advanced</span>
          </div>
        </div>
      </div>

      <div className="space-y-2">
        <h3 className="font-medium">Categories</h3>
        <div className="space-y-2">
          {["Async", "Scope", "Types", "Memory", "Logic"].map((category) => (
            <div key={category} className="flex items-center space-x-2">
              <Checkbox id={`category-${category.toLowerCase()}`} />
              <Label htmlFor={`category-${category.toLowerCase()}`}>{category}</Label>
            </div>
          ))}
        </div>
      </div>

      <Button className="w-full">Apply Filters</Button>
    </div>
  )
}
