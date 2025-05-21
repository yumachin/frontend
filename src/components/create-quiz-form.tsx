"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { X } from "lucide-react"
import { CodeBlock } from "@/components/code-block"

export function CreateQuizForm() {
  const [title, setTitle] = useState("")
  const [code, setCode] = useState("")
  const [language, setLanguage] = useState("")
  const [difficulty, setDifficulty] = useState("")
  const [answer, setAnswer] = useState("")
  const [explanation, setExplanation] = useState("")
  const [isPublic, setIsPublic] = useState(true)
  const [tagInput, setTagInput] = useState("")
  const [tags, setTags] = useState<string[]>([])
  const [previewMode, setPreviewMode] = useState(false)

  const addTag = () => {
    if (tagInput.trim() && !tags.includes(tagInput.trim())) {
      setTags([...tags, tagInput.trim()])
      setTagInput("")
    }
  }

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter((tag) => tag !== tagToRemove))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real app, we would submit the form data to an API
    console.log({
      title,
      code,
      language,
      difficulty,
      answer,
      explanation,
      isPublic,
      tags,
    })
    alert("Quiz created successfully! (This is a demo)")
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-end">
        <Button variant="outline" onClick={() => setPreviewMode(!previewMode)}>
          {previewMode ? "Edit Mode" : "Preview Mode"}
        </Button>
      </div>

      {previewMode ? (
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>{title || "Quiz Title"}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2 mb-4">
                {language && <Badge variant="outline">{language}</Badge>}
                {difficulty && (
                  <Badge variant={difficulty === "1" ? "secondary" : difficulty === "2" ? "default" : "destructive"}>
                    {difficulty === "1" ? "Beginner" : difficulty === "2" ? "Intermediate" : "Advanced"}
                  </Badge>
                )}
                {tags.map((tag) => (
                  <Badge key={tag} variant="outline">
                    {tag}
                  </Badge>
                ))}
              </div>

              {code ? (
                <CodeBlock code={code} language={language || "javascript"} />
              ) : (
                <div className="p-4 border rounded-md text-muted-foreground">Your code will appear here</div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Answer & Explanation</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h3 className="font-medium mb-2">Correct Answer:</h3>
                  <p className="p-3 bg-muted rounded-md">{answer || "Your answer will appear here"}</p>
                </div>

                <div>
                  <h3 className="font-medium mb-2">Explanation:</h3>
                  <p className="p-3 bg-muted rounded-md">{explanation || "Your explanation will appear here"}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Button onClick={() => setPreviewMode(false)}>Back to Edit Mode</Button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Quiz Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">Quiz Title</Label>
                <Input
                  id="title"
                  placeholder="e.g., JavaScript Async/Await Bug"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                />
              </div>

              <div className="grid grid-cols-1 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="language">Programming Language</Label>
                  <Select value={language} onValueChange={setLanguage} required>
                    <SelectTrigger id="language">
                      <SelectValue placeholder="Select language" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="javascript">JavaScript</SelectItem>
                      <SelectItem value="typescript">TypeScript</SelectItem>
                      <SelectItem value="python">Python</SelectItem>
                      <SelectItem value="java">Java</SelectItem>
                      <SelectItem value="csharp">C#</SelectItem>
                      <SelectItem value="go">Go</SelectItem>
                      <SelectItem value="rust">Rust</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="difficulty">Difficulty Level</Label>
                  <Select value={difficulty} onValueChange={setDifficulty} required>
                    <SelectTrigger id="difficulty">
                      <SelectValue placeholder="Select difficulty" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">Beginner</SelectItem>
                      <SelectItem value="2">Intermediate</SelectItem>
                      <SelectItem value="3">Advanced</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="tags">Tags</Label>
                <div className="flex gap-2">
                  <Input
                    id="tags"
                    placeholder="e.g., Async, Promises"
                    value={tagInput}
                    onChange={(e) => setTagInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault()
                        addTag()
                      }
                    }}
                  />
                  <Button type="button" onClick={addTag}>
                    Add
                  </Button>
                </div>

                {tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-2">
                    {tags.map((tag) => (
                      <Badge key={tag} variant="secondary" className="flex items-center gap-1">
                        {tag}
                        <button
                          type="button"
                          onClick={() => removeTag(tag)}
                          className="rounded-full hover:bg-muted p-1"
                        >
                          <X className="h-3 w-3" />
                          <span className="sr-only">Remove {tag}</span>
                        </button>
                      </Badge>
                    ))}
                  </div>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="code">Code with Bug</Label>
                <Textarea
                  id="code"
                  placeholder="Paste your code with a bug here..."
                  className="font-mono min-h-[200px]"
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  required
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Answer & Explanation</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="answer">Correct Answer (Short)</Label>
                <Input
                  id="answer"
                  placeholder="e.g., Missing await before fetchUserData()"
                  value={answer}
                  onChange={(e) => setAnswer(e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="explanation">Detailed Explanation</Label>
                <Textarea
                  id="explanation"
                  placeholder="Explain why this is a bug and how to fix it..."
                  className="min-h-[150px]"
                  value={explanation}
                  onChange={(e) => setExplanation(e.target.value)}
                  required
                />
              </div>

              <div className="flex items-center space-x-2">
                <Switch id="public" checked={isPublic} onCheckedChange={setIsPublic} />
                <Label htmlFor="public">Make this quiz public</Label>
              </div>
            </CardContent>
            <CardFooter className="flex flex-col sm:flex-row gap-2 sm:justify-between">
              <Button type="button" variant="outline" className="w-full sm:w-auto">
                Save as Draft
              </Button>
              <Button type="submit" className="w-full sm:w-auto">
                Create Quiz
              </Button>
            </CardFooter>
          </Card>
        </form>
      )}
    </div>
  )
}
