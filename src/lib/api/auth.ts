type ResisterProps = {
  email: string;
  userName: string;
  userId: string;
} | null;

export const Resister = async (user: ResisterProps) => {
  if (!user) {
    throw new Error("User is null");
  };

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      userId:    user.userId,
      userName:  user.userName,
      email:     user.email,
    })
  });

  if (!res.ok) {
    throw new Error("ユーザー登録に失敗しました");
  }

  const data = await res.json();
  return data;
}