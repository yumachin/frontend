"use client"

import { createContext, useContext, useState, ReactNode, useEffect } from "react"

type User = {
  email: string
  userName: string
  token: string
} | null

type UserContextType = {
  user: User
  setUser: (user: User) => void
}

const UserContext = createContext<UserContextType | undefined>(undefined)

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User>(null)

  useEffect(() => {
    const stored = localStorage.getItem("user")
    if (stored) {
      try {
        const parsed = JSON.parse(stored)
        setUser(parsed)
      } catch (e) {
        console.error("ユーザーデータの読み込みに失敗しました", e)
        localStorage.removeItem("user")
      }
    }
  }, [])

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  )
}

export const useUser = () => {
  const context = useContext(UserContext)
  if (!context) {
    throw new Error("useUser must be used within a UserProvider")
  }
  return context
}
