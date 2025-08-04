// src/app/dashboard/page.tsx (for App Router)
import Profile from "@/components/Profile";
import Enrollments from "@/components/Enrollments";
import Fees from "@/components/Fees";

export default function DashboardPage() {
  return (
    <div className="text-black mt-4 bg-white p-6 min-h-screen">
      <h1 className="text-3xl font-extrabold text-blue-800 tracking-tight">Student Dashboard</h1>
      <Profile />
      <div className="grid md:grid-cols-2 gap-4 grid-cols-1">
      <div className="mb-4"><Enrollments /></div>
      <div><Fees /></div>
      </div>
    </div>
  );
}