import { ProfileTabs } from "@/components/profile-tabs"

export default function ProfilePage() {
  return (
    <div className="container py-8">
      <h1 className="text-3xl font-bold mb-6">My Profile</h1>
      <ProfileTabs />
    </div>
  )
}
