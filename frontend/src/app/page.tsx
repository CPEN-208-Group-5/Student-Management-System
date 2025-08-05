import { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Academic Portal - Computer Engineering Department',
  description: 'Access your academic dashboard. Login as a student or staff member to view your information.',
  keywords: 'student login, staff login, academic portal, computer engineering, university dashboard', 
  authors: [{ name: 'Computer Engineering Department' }],
  openGraph: {
    title: 'Academic Portal - Computer Engineering Department',
    description: 'Access your academic dashboard and information',
    type: 'website',
  },
}

export default function Home() {
    return (
        <div className="h-screen flex flex-col justify-center items-center bg-gradient-to-br from-green-50 to-blue-50">
            <div className="text-center mb-8">
                <h1 className="text-6xl font-bold text-green-950 mb-4">Academic Portal</h1>
                <p className="text-xl text-gray-600">Computer Engineering Department</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-4xl px-4">
                {/* Student Section */}
                <div className="bg-white rounded-2xl shadow-lg p-8">
                    <div className="text-center mb-6">
                        <div className="bg-green-100 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                            <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                            </svg>
                        </div>
                        <h2 className="text-2xl font-bold text-green-950 mb-2">Student Portal</h2>
                        <p className="text-gray-600">Access your academic dashboard, view courses, fees, and grades</p>
                    </div>
                    <div className="space-y-4">
                        <Link href="/student/login" className="block w-full bg-green-600 text-white py-3 px-4 rounded-lg hover:bg-green-700 transition duration-200 text-center font-medium">
                            Student Login
                        </Link>
                        <Link href="/student/register" className="block w-full bg-green-100 text-green-700 py-3 px-4 rounded-lg hover:bg-green-200 transition duration-200 text-center font-medium">
                            Student Registration
                        </Link>
                    </div>
                </div>

                {/* Staff Section */}
                <div className="bg-white rounded-2xl shadow-lg p-8">
                    <div className="text-center mb-6">
                        <div className="bg-blue-100 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                            <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                            </svg>
                        </div>
                        <h2 className="text-2xl font-bold text-blue-950 mb-2">Staff Portal</h2>
                        <p className="text-gray-600">Manage courses, grades, and student information</p>
                    </div>
                    <div className="space-y-4">
                        <Link href="/staff/login" className="block w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition duration-200 text-center font-medium">
                            Staff Login
                        </Link>
                        <Link href="/staff/register" className="block w-full bg-blue-100 text-blue-700 py-3 px-4 rounded-lg hover:bg-blue-200 transition duration-200 text-center font-medium">
                            Staff Registration
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}
