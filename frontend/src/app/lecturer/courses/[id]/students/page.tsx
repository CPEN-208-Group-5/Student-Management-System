// src/app/lecturer/courses/[id]/students/page.tsx
import PageHeader from '../../../../components/PageHeader'

interface StudentsPageProps {
  params: {
    id: string
  }
}

export default function StudentsPage({ params }: StudentsPageProps) {
  const courseId = params.id

  return (
    <div className="space-y-6">
      <PageHeader
        title="Enrolled Students"
        description={`List of students enrolled in course ${courseId}`}
      />

      {/* Placeholder for table or student list */}
      <div className="border rounded p-4 text-gray-600">
        No student data yet. This will show a list of enrollments.
      </div>
    </div>
  )
}
