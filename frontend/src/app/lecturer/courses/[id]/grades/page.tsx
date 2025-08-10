// src/app/lecturer/courses/[id]/grades/page.tsx
import PageHeader from '@/app/components/PageHeader'
import GradeEntryForm from '@/components/GradeEntryForm'

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

      <GradeEntryForm courseId={courseId} />
    </div>
  )
}


