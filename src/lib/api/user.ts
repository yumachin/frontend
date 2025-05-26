export const GetProfile = async (userId: string, token: string) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/users/${userId}`, {
    cache: "no-store",
    headers: {
      "Authorization": `Bearer ${token}`
    }
  });

  if (!res.ok) {
    throw new Error("プロフィール取得に失敗しました");
  }
  
  const data = await res.json();
  return data;
}