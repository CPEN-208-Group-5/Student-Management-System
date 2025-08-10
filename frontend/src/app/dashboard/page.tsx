// src/app/dashboard/page.tsx (for App Router)
import Profile from "@/components/Profile";
import Enrollments from "@/components/Enrollments";
import Fees from "@/components/Fees";
import StudentStats from "@/components/StudentStats";
import StudentGrades from "@/components/StudentGrades";
import Settings from "@/components/Settings";

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Header Section */}
      <div className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-100 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                Student Dashboard
              </h1>
              <p className="text-gray-600 dark:text-gray-300 mt-2">Welcome back! Here&apos;s your academic overview</p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="bg-indigo-100 dark:bg-indigo-900 p-3 rounded-full">
                <svg className="w-6 h-6 text-indigo-600 dark:text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <Settings />
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Profile Section */}
        <div className="mb-8">
          <Profile />
        </div>

        {/* Dashboard Cards Grid */}
        <div className="grid lg:grid-cols-2 gap-8">
          <div className="space-y-6">
            <Enrollments />
          </div>
          <div className="space-y-6">
            <Fees />
          </div>
        </div>

        {/* Quick Stats - Now using live data */}
        <div className="mt-12">
          <StudentStats />
        </div>

        {/* Student Grades - New Section */}
        <div className="mt-12">
          <StudentGrades />
        </div>
      </div>
    </div>
  );
}