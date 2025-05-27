export const GetProfile = async (userId: string | undefined, token: string | undefined) => {
  if (!token || !userId) {
    throw new Error("Token or userId is not found in cookies");
  }
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

export const UpdateProfile = async (userId: string | undefined, token: string | undefined, userName: string) => {
  if (!token || !userId) {
    throw new Error("Token or userId is not found in cookies");
  }
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/users/${userId}`,{
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        userName,
        iconPath: "default.png" 
      })
    });
    
    if (!res.ok) {
      throw new Error("名前の更新に失敗しました");
    }

    const data = await res.json();
    return data;
  } catch (error) {
    console.error("名前の更新に失敗しました", error);
  }
};
