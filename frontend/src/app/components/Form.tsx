'use client'

interface FormProps {
  children: React.ReactNode;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

export default function Form({ children, handleSubmit }: FormProps) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-blue-50 p-4">
      <div className="max-w-md w-full">
        <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-xl">
          {children}
        </form>
      </div>
    </div>
  );
} 