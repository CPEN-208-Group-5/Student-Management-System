// src/app/lecturer/courses/[id]/students/page.tsx
import PageHeader from '@/app/components/PageHeader'

interface StudentsPageProps {
  params: Promise<{
    id: string
  }>
}

export default async function StudentsPage({ params }: StudentsPageProps) {
  const { id: courseId } = await params

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
