// src/components/Sidebar.tsx
'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '../lib/utils'

const navLinks = [
  { href: '/lecturer', label: 'Dashboard' },
  { href: '/lecturer/courses', label: 'Courses' },
]

export default function Sidebar() {
  const pathname = usePathname()

  return (
    <aside className="w-64 bg-white border-r p-6 space-y-4">
      <h2 className="text-xl font-bold">Lecturer Panel</h2>
      <nav className="flex flex-col gap-2">
        {navLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={cn(
              'px-3 py-2 rounded hover:bg-gray-100',
              pathname === link.href ? 'bg-blue-200 font-semibold' : ''
            )}
          >
            {link.label}
          </Link>
        ))}
      </nav>
    </aside>
  )
}
