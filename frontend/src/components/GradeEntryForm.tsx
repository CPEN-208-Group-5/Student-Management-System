'use client'
import { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { enrollmentAPI, gradeAPI, Student, Course } from '../lib/api';

interface StudentGrade {
  studentId: number;
  studentName: string;
  studentNumber: string;
  gradeValue: number | null;
  letterGrade: string;
  semester: string;
  academicYear: string;
}

interface GradeEntryFormProps {
  courseId: string;
}

export default function GradeEntryForm({ courseId }: GradeEntryFormProps) {
  const { user } = useAuth();
  const [enrolledStudents, setEnrolledStudents] = useState<Array<{id: number; name: string; studentNumber: string}>>([]);
  const [grades, setGrades] = useState<StudentGrade[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  // Get current semester and academic year
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentSemester = currentDate.getMonth() < 6 ? 'First' : 'Second';
  const defaultSemester = `${currentYear}/${currentYear + 1} - ${currentSemester} Semester`;

  useEffect(() => {
    const fetchEnrolledStudents = async () => {
      if (!user || user.role !== 'LECTURER') {
        setError('Access denied. Only lecturers can submit grades.');
        setLoading(false);
        return;
      }

      try {
        // Fetch students enrolled in this course
        const enrollments = await enrollmentAPI.getByCourse(parseInt(courseId));
        const students = enrollments.map(enrollment => ({
          id: enrollment.student.id,
          name: `${enrollment.student.firstName} ${enrollment.student.lastName}`,
          studentNumber: enrollment.student.id.toString()
        }));

        setEnrolledStudents(students);

        // Initialize grades array with default values
        const initialGrades: StudentGrade[] = students.map(student => ({
          studentId: student.id,
          studentName: student.name,
          studentNumber: student.studentNumber,
          gradeValue: null,
          letterGrade: '',
          semester: defaultSemester,
          academicYear: `${currentYear}/${currentYear + 1}`
        }));

        setGrades(initialGrades);
      } catch (err) {
        setError('Failed to load enrolled students');
        console.error('Error fetching students:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchEnrolledStudents();
  }, [courseId, user, currentYear, currentSemester, defaultSemester]);

  const handleGradeChange = (studentId: number, field: keyof StudentGrade, value: string | number | null) => {
    setGrades(prev => prev.map(grade => {
      if (grade.studentId === studentId) {
        const updatedGrade = { ...grade, [field]: value };
        
        // Auto-calculate letter grade if grade value changes
        if (field === 'gradeValue' && typeof value === 'number') {
          updatedGrade.letterGrade = calculateLetterGrade(value);
        }
        
        return updatedGrade;
      }
      return grade;
    }));
  };

  const calculateLetterGrade = (gradeValue: number): string => {
    if (gradeValue >= 3.7) return 'A';
    if (gradeValue >= 3.3) return 'A-';
    if (gradeValue >= 3.0) return 'B+';
    if (gradeValue >= 2.7) return 'B';
    if (gradeValue >= 2.3) return 'B-';
    if (gradeValue >= 2.0) return 'C+';
    if (gradeValue >= 1.7) return 'C';
    if (gradeValue >= 1.3) return 'C-';
    if (gradeValue >= 1.0) return 'D+';
    if (gradeValue >= 0.7) return 'D';
    return 'F';
  };

  const validateGrades = (): boolean => {
    for (const grade of grades) {
      if (grade.gradeValue === null || grade.gradeValue < 0 || grade.gradeValue > 4.0) {
        setError(`Please enter a valid grade (0.0-4.0) for ${grade.studentName}`);
        return false;
      }
      if (!grade.semester || !grade.academicYear) {
        setError(`Please fill in semester and academic year for all students`);
        return false;
      }
    }
    return true;
  };

  const handleSubmit = async () => {
    if (!validateGrades()) return;

    setSubmitting(true);
    setError(null);
    setSuccess(null);

    try {
      // Submit grades for each student
      const gradePromises = grades.map(grade => 
        gradeAPI.create({
          student: { id: grade.studentId } as Student,
          course: { id: parseInt(courseId) } as Course,
          semester: grade.semester,
          academicYear: grade.academicYear,
          gradeValue: grade.gradeValue!,
          letterGrade: grade.letterGrade,
          gradeDate: new Date().toISOString().split('T')[0]
        })
      );

      await Promise.all(gradePromises);
      setSuccess('Grades submitted successfully!');
      
      // Clear form after successful submission
      setGrades(prev => prev.map(grade => ({
        ...grade,
        gradeValue: null,
        letterGrade: ''
      })));
    } catch (err) {
      setError('Failed to submit grades. Please try again.');
      console.error('Error submitting grades:', err);
    } finally {
      setSubmitting(false);
    }
  };

  const handleBulkGradeChange = (field: keyof StudentGrade, value: string | number) => {
    setGrades(prev => prev.map(grade => {
      if (field === 'semester' || field === 'academicYear') {
        return { ...grade, [field]: value };
      }
      return grade;
    }));
  };

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow p-6">
        <div className="animate-pulse space-y-4">
          <div className="h-6 bg-gray-200 rounded w-1/3"></div>
          <div className="space-y-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-16 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error && !loading) {
    return (
      <div className="bg-white rounded-lg shadow p-6">
        <div className="text-center text-red-600">
          <p className="text-lg font-medium">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 px-4 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  if (enrolledStudents.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow p-6">
        <div className="text-center text-gray-600">
          <p className="text-lg">No students are currently enrolled in this course.</p>
          <p className="text-sm mt-2">Students must be enrolled before grades can be submitted.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow">
      {/* Header */}
      <div className="px-6 py-4 border-b border-gray-200">
        <h3 className="text-lg font-medium text-gray-900">Grade Entry Form</h3>
        <p className="text-sm text-gray-600 mt-1">
          Enter grades for {enrolledStudents.length} enrolled student{enrolledStudents.length !== 1 ? 's' : ''}
        </p>
      </div>

      {/* Bulk Settings */}
      <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Semester
            </label>
            <select
              value={grades[0]?.semester || ''}
              onChange={(e) => handleBulkGradeChange('semester', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            >
              <option value="">Select Semester</option>
              <option value={`${currentYear}/${currentYear + 1} - First Semester`}>
                {currentYear}/{currentYear + 1} - First Semester
              </option>
              <option value={`${currentYear}/${currentYear + 1} - Second Semester`}>
                {currentYear}/{currentYear + 1} - Second Semester
              </option>
              <option value={`${currentYear - 1}/${currentYear} - First Semester`}>
                {currentYear - 1}/{currentYear} - First Semester
              </option>
              <option value={`${currentYear - 1}/${currentYear} - Second Semester`}>
                {currentYear - 1}/{currentYear} - Second Semester
              </option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Academic Year
            </label>
            <input
              type="text"
              value={grades[0]?.academicYear || ''}
              onChange={(e) => handleBulkGradeChange('academicYear', e.target.value)}
              placeholder="e.g., 2024/2025"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <div className="flex items-end">
            <button
              onClick={handleSubmit}
              disabled={submitting}
              className="w-full px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {submitting ? 'Submitting...' : 'Submit All Grades'}
            </button>
          </div>
        </div>
      </div>

      {/* Grades Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Student
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Student Number
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Grade Value (0.0-4.0)
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Letter Grade
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {grades.map((grade, index) => (
              <tr key={grade.studentId} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">
                    {grade.studentName}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-500">
                    {grade.studentNumber}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <input
                    type="number"
                    min="0"
                    max="4"
                    step="0.1"
                    value={grade.gradeValue || ''}
                    onChange={(e) => handleGradeChange(grade.studentId, 'gradeValue', parseFloat(e.target.value) || null)}
                    className="w-20 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    placeholder="0.0"
                  />
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900 font-medium">
                    {grade.letterGrade || '-'}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Success/Error Messages */}
      {success && (
        <div className="px-6 py-4 bg-green-50 border-t border-green-200">
          <div className="flex items-center">
            <svg className="w-5 h-5 text-green-400 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <span className="text-green-800 font-medium">{success}</span>
          </div>
        </div>
      )}

      {error && (
        <div className="px-6 py-4 bg-red-50 border-t border-red-200">
          <div className="flex items-center">
            <svg className="w-5 h-5 text-red-400 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
            <span className="text-red-800 font-medium">{error}</span>
          </div>
        </div>
      )}

      {/* Instructions */}
      <div className="px-6 py-4 bg-blue-50 border-t border-blue-200">
        <div className="text-sm text-blue-800">
          <p className="font-medium mb-2">Instructions:</p>
          <ul className="list-disc list-inside space-y-1">
            <li>Grade values range from 0.0 to 4.0 (4.0 = A, 3.7 = A-, 3.3 = B+, etc.)</li>
            <li>Letter grades are automatically calculated based on grade values</li>
            <li>Use the bulk settings above to set semester and academic year for all students</li>
            <li>All fields must be completed before submission</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
