export default function Loading() {
  return (
    <div className="flex flex-col justify-center items-center min-h-screen text-gray-500 dark:text-gray-300">
      <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-orange-500 mb-4"></div>
      <p className="text-xl font-semibold tracking-wide">Loading Arena...</p>
    </div>
  )
}
