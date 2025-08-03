// src/app/lecturer/courses/[id]/page.tsx
import PageHeader from '../../../components/PageHeader'
import Link from 'next/link'

interface CourseDetailPageProps {
  params: {
    id: string
  }
}

export default function CourseDetailPage({ params }: CourseDetailPageProps) {
  const courseId = params.id

  return (
    <div className="space-y-6">
      <PageHeader
        title={`Course: ${courseId}`}
        description="Manage course details, student enrollments, and materials."
      />

      <div className="grid gap-4 md:grid-cols-2">
        <Link
          href={`/lecturer/courses/${courseId}/students`}
          className="block border rounded-lg p-4 hover:bg-gray-50 transition"
        >
          <h3 className="text-lg font-semibold text-blue-600">View Students</h3>
          <p className="text-gray-600 text-sm">See students enrolled in this course</p>
        </Link>

        <Link
          href="#"
          className="block border rounded-lg p-4 hover:bg-gray-50 transition"
        >
          <h3 className="text-lg font-semibold text-blue-600">Upload Materials</h3>
          <p className="text-gray-600 text-sm">Add lecture slides, assignments, etc.</p>
        </Link>

        <Link
            href={`/lecturer/courses/${courseId}/grades`}

          className="block border rounded-lg p-4 hover:bg-gray-50 transition"
        >
          <h3 className="text-lg font-semibold text-blue-600">Submit Grades</h3>
          <p className="text-gray-600 text-sm">Enter and update student grades</p>
        </Link>
      </div>
    </div>
  )
}
