import Cookies from "js-cookie";

export const GetProfile = async () => {
  const token = Cookies.get("token");
  if (!token) {
    throw new Error("Token not found in cookies");
  }

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/users/me`, {
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