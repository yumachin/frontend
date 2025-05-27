"use client"

import { GetProfile } from "@/lib/api/user"
import { UserType } from "@/types/type"
import { createContext, useContext, useState, ReactNode, useEffect, useMemo } from "react"
import Cookies from "js-cookie"
import { useRouter } from "next/navigation"

type UserContextType = {
  user: UserType
  setUser: (user: UserType) => void
}

const UserContext = createContext<UserContextType | undefined>(undefined)

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<UserType>(null)
  
  const router = useRouter()

  useEffect(() => {
    const fetchUser = async () => {
      const userId = Cookies.get("userId")
      const token = Cookies.get("token")
      if (!userId || !token) {
        console.warn("userId or token not found in cookies")
        router.push("/signIn")
        return
      }
      
      try {
        const profile = await GetProfile(userId, token)
        setUser(profile)
      } catch (err) {
        console.error("ユーザー情報の取得に失敗しました:", err)
        setUser(null)
      }
    };

    fetchUser();
  }, []);

  console.log("Userは(状態管理debug)", user)
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
