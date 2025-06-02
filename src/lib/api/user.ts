export const GetProfile = async (userId: string | undefined, token: string | undefined) => {
  if (!token || !userId) {
    throw new Error("Token or userId is not found in cookies");
  }
  
  console.log("Requesting profile for userId:", userId);
  console.log("Token exists:", !!token);
  console.log(`${process.env.NEXT_PUBLIC_API_URL}/api/users/${userId}`,)
  
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/users/${userId}`, {
    cache: "no-store",
    headers: {
      "Authorization": `Bearer ${token}`,
      "Content-Type": "application/json"
    }
  });

  if (!res.ok) {
    const errorData = await res.text();
    console.error("API Error:", res.status, errorData);
    
    if (res.status === 401) {
      throw new Error("認証に失敗しました。再度ログインしてください。");
    }
    
    throw new Error(`プロフィール取得に失敗しました: ${res.status}`);
  }
  
  const data = await res.json();
  return data;
}

export const UpdateProfile = async (userId: string | undefined, token: string | undefined, userName: string) => {
  if (!token || !userId) {
    throw new Error("Token or userId is not found in cookies");
  }
  console.log("userName", userName)
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
