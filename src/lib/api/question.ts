export const GetQuestion = async (level: string | null, id: string, token: string | undefined) => {
  if (!token) {
    throw new Error("Token not found in cookies");
  }

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/questions/${level}/${id}`, {
    cache: "no-store"
  })

  if (!res.ok) {
    throw new Error("問題の取得に失敗しました");
  }

  const data = await res.json();
  return data;
}

export const PostIfCorrect = async (userId: string, questionLevel: string, isCorrect: boolean, token: string | undefined) => {
  if (!token) {
    throw new Error("Token not found in cookies");
  }

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/questions/isCorrect`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    },
    body: JSON.stringify({
      userId,
      questionLevel,
      isCorrect
    })
  });

  if (!res.ok) {
    throw new Error("正答数ランキングへの登録に失敗しました");
  }

  const data = await res.json();
  return data;
}