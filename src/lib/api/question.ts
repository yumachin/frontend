export const GetQuestion = async (mode: string, id: string) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/questions/${mode}/${id}`, {
    cache: "no-store" 
  })

  if (!res.ok) return null
  const data = await res.json()
  return data;
}