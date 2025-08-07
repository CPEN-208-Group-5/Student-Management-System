// src/app/lecturer/courses/[id]/grades/page.tsx
import PageHeader from '../../../../components/PageHeader'

interface GradesPageProps {
  params: Promise<{
    id: string
  }>
}

export default async function SubmitGradesPage({ params }: GradesPageProps) {
  const { id: courseId } = await params

  return (
    <div className="space-y-6">
      <PageHeader
        title="Submit Grades"
        description={`Enter and submit final grades for course ${courseId}`}
      />

      {/* Placeholder: Form or table to enter grades */}
      <div className="border rounded p-4 text-gray-600">
        Grade entry feature coming soon.
      </div>
    </div>
  )
}


