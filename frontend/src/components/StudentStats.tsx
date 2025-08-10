'use client'
import { useEffect, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { enrollmentAPI, paymentAPI, feeStructureAPI, gradeAPI } from '../lib/api';

interface StudentStats {
  coursesEnrolled: number;
  totalCredits: number;
  gpa: number;
  feeStatus: string;
}

export default function StudentStats() {
  const { user } = useAuth();
  const [stats, setStats] = useState<StudentStats>({
    coursesEnrolled: 0,
    totalCredits: 0,
    gpa: 0.0,
    feeStatus: 'UNKNOWN'
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStudentStats = async () => {
      if (!user || user.role !== 'STUDENT') {
        setError('User not found or not a student');
        setLoading(false);
        return;
      }

      try {
        // Fetch enrollments to get course count and credits
        const enrollments = await enrollmentAPI.getByStudent(user.id);
        const coursesEnrolled = enrollments.length;
        const totalCredits = enrollments.reduce((sum, enrollment) => sum + enrollment.course.creditHours, 0);

        // Fetch payments to determine fee status
        const payments = await paymentAPI.getByStudent(user.id);
        const totalPaid = payments.reduce((sum, payment) => sum + payment.amountPaid, 0);
        
        // Get fee structure for student's level (assuming level 400 for now)
        let feeStatus = 'UNKNOWN';
        try {
          const feeStructure = await feeStructureAPI.getByLevel(400);
          if (totalPaid >= feeStructure.amountDue) {
            feeStatus = 'PAID';
          } else if (totalPaid > 0) {
            feeStatus = 'PARTIAL';
          } else {
            feeStatus = 'UNPAID';
          }
        } catch (feeErr) {
          // If fee structure not available, use payment data to estimate
          if (totalPaid > 0) {
            feeStatus = 'PARTIAL';
          } else {
            feeStatus = 'UNPAID';
          }
        }

        // Fetch real GPA from the grades API
        let gpa = 0.0;
        try {
          gpa = await gradeAPI.getStudentGPA(user.id);
        } catch (gpaErr) {
          console.log('GPA not available yet, showing 0.0');
          gpa = 0.0;
        }

        setStats({
          coursesEnrolled,
          totalCredits,
          gpa,
          feeStatus
        });
      } catch (err) {
        setError('Failed to load student statistics');
        console.error('Error fetching student stats:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchStudentStats();
  }, [user]);

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <div className="animate-pulse">
              <div className="h-8 bg-gray-200 rounded w-1/3 mb-4"></div>
              <div className="h-6 bg-gray-200 rounded w-1/2"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <div className="text-center text-red-600">
          <p>{error}</p>
        </div>
      </div>
    );
  }

  const getFeeStatusColor = (status: string) => {
    switch (status) {
      case 'PAID': return 'bg-green-100 text-green-800';
      case 'PARTIAL': return 'bg-yellow-100 text-yellow-800';
      case 'UNPAID': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getFeeStatusIcon = (status: string) => {
    switch (status) {
      case 'PAID': return (
        <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      );
      case 'PARTIAL': return (
        <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
        </svg>
      );
      case 'UNPAID': return (
        <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      );
      default: return (
        <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      );
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Academic Overview</h2>
        <div className="text-sm text-gray-500">
          Real-time data • Updates automatically
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Courses Enrolled */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow">
          <div className="flex items-center">
            <div className="bg-green-100 p-3 rounded-full">
              <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Courses Enrolled</p>
              <p className="text-2xl font-bold text-gray-900">{stats.coursesEnrolled}</p>
            </div>
          </div>
          {stats.coursesEnrolled > 0 && (
            <div className="mt-4">
              <div className="flex items-center justify-between text-xs text-gray-500 mb-1">
                <span>Progress</span>
                <span>{Math.min((stats.coursesEnrolled / 6) * 100, 100).toFixed(0)}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-green-500 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${Math.min((stats.coursesEnrolled / 6) * 100, 100)}%` }}
                ></div>
              </div>
            </div>
          )}
        </div>

        {/* Total Credits */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow">
          <div className="flex items-center">
            <div className="bg-blue-100 p-3 rounded-full">
              <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
              </svg>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Credits</p>
              <p className="text-2xl font-bold text-gray-900">{stats.totalCredits}</p>
            </div>
          </div>
          {stats.totalCredits > 0 && (
            <div className="mt-4">
              <div className="flex items-center justify-between text-xs text-gray-500 mb-1">
                <span>Progress</span>
                <span>{Math.min((stats.totalCredits / 120) * 100, 100).toFixed(0)}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${Math.min((stats.totalCredits / 120) * 100, 100)}%` }}
                ></div>
              </div>
            </div>
          )}
        </div>

        {/* GPA */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow">
          <div className="flex items-center">
            <div className="bg-purple-100 p-3 rounded-full">
              <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">GPA</p>
              <p className="text-2xl font-bold text-gray-900">
                {stats.gpa > 0 ? stats.gpa.toFixed(1) : 'N/A'}
              </p>
              {stats.gpa === 0 && (
                <p className="text-xs text-gray-500">No grades recorded yet</p>
              )}
            </div>
          </div>
          {stats.gpa > 0 && (
            <div className="mt-4">
              <div className="flex items-center justify-between text-xs text-gray-500 mb-1">
                <span>Performance</span>
                <span className={stats.gpa >= 3.5 ? 'text-green-600' : stats.gpa >= 3.0 ? 'text-yellow-600' : 'text-red-600'}>
                  {stats.gpa >= 3.5 ? 'Excellent' : stats.gpa >= 3.0 ? 'Good' : 'Needs Improvement'}
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className={`h-2 rounded-full transition-all duration-300 ${
                    stats.gpa >= 3.5 ? 'bg-green-500' : stats.gpa >= 3.0 ? 'bg-yellow-500' : 'bg-red-500'
                  }`}
                  style={{ width: `${(stats.gpa / 4.0) * 100}%` }}
                ></div>
              </div>
            </div>
          )}
        </div>

        {/* Fee Status */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow">
          <div className="flex items-center">
            <div className={`p-3 rounded-full ${getFeeStatusColor(stats.feeStatus).replace('text-', 'bg-').replace('800', '100')}`}>
              {getFeeStatusIcon(stats.feeStatus)}
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Fee Status</p>
              <p className={`text-2xl font-bold ${getFeeStatusColor(stats.feeStatus).split(' ')[1]}`}>
                {stats.feeStatus}
              </p>
            </div>
          </div>
          {stats.feeStatus !== 'UNKNOWN' && (
            <div className="mt-4">
              <div className="flex items-center justify-between text-xs text-gray-500 mb-1">
                <span>Status</span>
                <span className={stats.feeStatus === 'PAID' ? 'text-green-600' : stats.feeStatus === 'PARTIAL' ? 'text-yellow-600' : 'text-red-600'}>
                  {stats.feeStatus === 'PAID' ? 'All Clear' : stats.feeStatus === 'PARTIAL' ? 'Partial Payment' : 'Payment Required'}
                </span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
