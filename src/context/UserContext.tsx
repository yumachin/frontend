"use client"

import { GetProfile } from "@/lib/api/user"
import { UserType } from "@/types/type"
import { createContext, useContext, useState, ReactNode, useEffect, useMemo } from "react"

type UserContextType = {
  user: UserType
  setUser: (user: UserType) => void
}

const UserContext = createContext<UserContextType | undefined>(undefined)

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<UserType>(null)

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

  const contextValue = useMemo(() => ({ user, setUser }), [user])

  return (
    <UserContext.Provider value={contextValue}>
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
