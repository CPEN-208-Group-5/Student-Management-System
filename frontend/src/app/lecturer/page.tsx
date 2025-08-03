// src/app/lecturer/page.tsx
import PageHeader from '../components/PageHeader'

export default function LecturerDashboard() {
  return (
    <div>
      <PageHeader title="Dashboard" description="Overview of your teaching activities" />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-blue p-4 rounded shadow">
          <h2 className="text-lg font-semibold">Assigned Courses</h2>
          <p className="text-gray-500">3 courses this semester</p>
        </div>
        <div className="bg-white p-4 rounded shadow">
          <h2 className="text-lg font-semibold">Total Students</h2>
          <p className="text-gray-500">120 enrolled students</p>
        </div>
        <div className="bg-white p-4 rounded shadow">
          <h2 className="text-lg font-semibold">Pending Grades</h2>
          <p className="text-gray-500">2 courses left to grade</p>
        </div>
      </div>
    </div>
  )
}
