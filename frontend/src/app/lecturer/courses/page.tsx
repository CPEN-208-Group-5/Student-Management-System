// src/app/lecturer/courses/page.tsx
import PageHeader from '../../components/PageHeader'
import Link from 'next/link'

const dummyCourses = [
  { id: 'CPEN101', name: 'Computer Programming', semester: 'Level 100 - First' },
  { id: 'CPEN202', name: 'Computer Systems Design', semester: 'Level 200 - Second' },
  { id: 'CPEN208', name: 'Software Engineering', semester: 'Level 200 - Second' },
]

export default function CoursesPage() {
  return (
    <div className="space-y-6">
      <PageHeader title="Courses" description="Manage your assigned courses." />

      <div className="bg-white shadow rounded-lg overflow-hidden">
        <table className="min-w-full text-sm text-gray-700">
          <thead className="bg-blue-100 text-xs text-left uppercase tracking-wider">
            <tr>
              <th className="px-6 py-3">Course Code</th>
              <th className="px-6 py-3">Course Name</th>
              <th className="px-6 py-3">Semester</th>
              <th className="px-6 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {dummyCourses.map((course) => (
              <tr key={course.id} className="border-b hover:bg-gray-50">
                <td className="px-6 py-4 font-medium">{course.id}</td>
                <td className="px-6 py-4">{course.name}</td>
                <td className="px-6 py-4">{course.semester}</td>
                <td className="px-6 py-4">
                  <Link
                    href={`/lecturer/courses/${course.id}`}
                    className="text-blue-600 hover:underline"
                  >
                    View Details
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
