"use client"

import { GetProfile } from "@/lib/api/user"
import { createContext, useContext, useState, ReactNode, useEffect } from "react"

type User = {
  userId: string,
  email: string,
  userName: string,
  iconPath: string,
  role: "user" | "admin",
  stats: {
    hardClearNum: number,
    normalClearNum: number,
    easyClearNum: number,
    hardCorrectNum: number,
    normalCorrectNum: number,
    easyCorrectNum: number
  },
  createdAt: string,
  updatedAt: string
} | null

type UserContextType = {
  user: User
  setUser: (user: User) => void
}

const UserContext = createContext<UserContextType | undefined>(undefined)

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User>(null)

  // useEffect(() => {
  //   const fetchUser = async () => {
  //     try {
  //       const profile = await GetProfile()
  //       setUser(profile)
  //     } catch (err) {
  //       console.error("ユーザー情報の取得に失敗しました:", err)
  //       setUser(null)
  //     }
  //   };

  //   fetchUser();
  // }, []);

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
