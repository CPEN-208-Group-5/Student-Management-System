// src/app/lecturer/layout.tsx
import Sidebar from '../components/Sidebar'
import type { ReactNode } from 'react'

export default function LecturerLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen text-gray-800 bg-white">
      <Sidebar />
      <main className="flex-1 p-6">{children}</main>
    </div>
  )
}
