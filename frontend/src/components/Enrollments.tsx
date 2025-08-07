// src/components/Enrollments.tsx
'use client'
import { useEffect, useState } from 'react';
import { CourseEnrollment, enrollmentAPI } from '../lib/api';
import { useAuth } from '../contexts/AuthContext';

export default function Enrollments() {
  const { user } = useAuth();
  const [enrollments, setEnrollments] = useState<CourseEnrollment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchEnrollments = async () => {
      if (!user || user.role !== 'STUDENT') {
        setError('User not found or not a student');
        setLoading(false);
        return;
      }

      try {
        // Get enrollments for the specific student
        const enrollmentsData = await enrollmentAPI.getByStudent(user.id);
        setEnrollments(enrollmentsData);
      } catch (err) {
        setError('Failed to load enrollments');
        console.error('Error fetching enrollments:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchEnrollments();
  }, [user]);

  if (loading) {
    return (
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/3 mb-4"></div>
          <div className="space-y-4">
            <div className="h-4 bg-gray-200 rounded"></div>
            <div className="h-4 bg-gray-200 rounded w-5/6"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
        <div className="text-center text-red-600">
          <p>{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
      <div className="flex items-center mb-6">
        <div className="bg-gradient-to-r from-blue-500 to-cyan-600 p-3 rounded-full">
          <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
          </svg>
        </div>
        <div className="ml-4">
          <h2 className="text-2xl font-bold text-gray-900">Enrolled Courses</h2>
          <p className="text-gray-600">Your current semester courses</p>
        </div>
      </div>

      <div className="space-y-4">
        {enrollments.length > 0 ? (
          enrollments.map((enrollment, index) => (
            <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
              <div className="flex items-center">
                <div className="bg-blue-100 p-2 rounded-lg">
                  <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <div className="ml-4">
                  <p className="font-semibold text-gray-900">{enrollment.course.courseCode}</p>
                  <p className="text-sm text-gray-600">{enrollment.course.courseName}</p>
                  {enrollment.semester && enrollment.academicYear && (
                    <p className="text-xs text-gray-500">{enrollment.semester} Semester, {enrollment.academicYear}</p>
                  )}
                </div>
              </div>
              <div className="flex items-center">
                <span className="bg-blue-100 text-blue-800 text-xs font-medium px-3 py-1 rounded-full">
                  {enrollment.course.creditHours} credits
                </span>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-8 text-gray-500">
            <p>No courses enrolled yet.</p>
          </div>
        )}
      </div>

      <div className="mt-6 pt-6 border-t border-gray-200">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-gray-600">Total Credits</span>
          <span className="text-lg font-bold text-gray-900">
            {enrollments.reduce((sum, enrollment) => sum + enrollment.course.creditHours, 0)}
          </span>
        </div>
      </div>
    </div>
  );
}
