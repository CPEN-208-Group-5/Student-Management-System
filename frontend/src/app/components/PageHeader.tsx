// src/components/PageHeader.tsx
type PageHeaderProps = {
  title: string
  description?: string
}

export default function PageHeader({ title, description }: PageHeaderProps) {
  return (
    <div className="mb-6">
      <h1 className="text-3xl font-extrabold text-blue-800 tracking-tight">
        {title}
      </h1>

      {description && (
        <p className="mt-1 text-base text-gray-700 leading-relaxed">
          {description}
        </p>
      )}
    </div>
  )
}
