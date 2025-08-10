'use client'
import { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { gradeAPI, Grade } from '../lib/api';

export default function StudentGrades() {
  const { user } = useAuth();
  const [grades, setGrades] = useState<Grade[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedSemester, setSelectedSemester] = useState<string>('all');
  const [selectedYear, setSelectedYear] = useState<string>('all');

  useEffect(() => {
    const fetchGrades = async () => {
      if (!user || user.role !== 'STUDENT') {
        setError('Access denied. Only students can view grades.');
        setLoading(false);
        return;
      }

      try {
        const gradesData = await gradeAPI.getByStudent(user.id);
        setGrades(gradesData);
      } catch (err) {
        setError('Failed to load grades');
        console.error('Error fetching grades:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchGrades();
  }, [user]);

  const getUniqueSemesters = () => {
    const semesters = [...new Set(grades.map(grade => grade.semester).filter(Boolean))];
    return semesters.sort();
  };

  const getUniqueYears = () => {
    const years = [...new Set(grades.map(grade => grade.academicYear).filter(Boolean))];
    return years.sort();
  };

  const getFilteredGrades = () => {
    return grades.filter(grade => {
      const semesterMatch = selectedSemester === 'all' || grade.semester === selectedSemester;
      const yearMatch = selectedYear === 'all' || grade.academicYear === selectedYear;
      return semesterMatch && yearMatch;
    });
  };

  const calculateGPA = (gradeList: Grade[]) => {
    if (gradeList.length === 0) return 0.0;
    const totalGradePoints = gradeList.reduce((sum, grade) => sum + (grade.gradeValue || 0), 0);
    return Math.round((totalGradePoints / gradeList.length) * 10) / 10;
  };

  const getGradeColor = (gradeValue: number) => {
    if (gradeValue >= 3.7) return 'text-green-600';
    if (gradeValue >= 3.0) return 'text-blue-600';
    if (gradeValue >= 2.0) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getLetterGradeColor = (letterGrade: string) => {
    if (letterGrade === 'A' || letterGrade === 'A-') return 'bg-green-100 text-green-800';
    if (letterGrade === 'B+' || letterGrade === 'B' || letterGrade === 'B-') return 'bg-blue-100 text-blue-800';
    if (letterGrade === 'C+' || letterGrade === 'C' || letterGrade === 'C-') return 'bg-yellow-100 text-yellow-800';
    if (letterGrade === 'D+' || letterGrade === 'D') return 'bg-orange-100 text-orange-800';
    return 'bg-red-100 text-red-800';
  };

  if (loading) {
    return (
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
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

  if (error) {
    return (
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <div className="text-center text-red-600">
          <p>{error}</p>
        </div>
      </div>
    );
  }

  const filteredGrades = getFilteredGrades();
  const currentGPA = calculateGPA(filteredGrades);
  const totalCredits = filteredGrades.reduce((sum, grade) => sum + grade.course.creditHours, 0);

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">Academic Grades</h3>
          <p className="text-sm text-gray-600 mt-1">View your course grades and academic performance</p>
        </div>
        <div className="text-right">
          <div className="text-2xl font-bold text-indigo-600">{currentGPA}</div>
          <div className="text-xs text-gray-500">Current GPA</div>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-4 mb-6 p-4 bg-gray-50 rounded-lg">
        <div>
          <label className="block text-xs font-medium text-gray-700 mb-1">Semester</label>
          <select
            value={selectedSemester}
            onChange={(e) => setSelectedSemester(e.target.value)}
            className="px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          >
            <option value="all">All Semesters</option>
            {getUniqueSemesters().map(semester => (
              <option key={semester} value={semester}>{semester}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-xs font-medium text-gray-700 mb-1">Academic Year</label>
          <select
            value={selectedYear}
            onChange={(e) => setSelectedYear(e.target.value)}
            className="px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          >
            <option value="all">All Years</option>
            {getUniqueYears().map(year => (
              <option key={year} value={year}>{year}</option>
            ))}
          </select>
        </div>
        <div className="flex items-end">
          <div className="text-sm text-gray-600">
            <span className="font-medium">{filteredGrades.length}</span> courses • 
            <span className="font-medium ml-1">{totalCredits}</span> credits
          </div>
        </div>
      </div>

      {/* Grades Table */}
      {filteredGrades.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Course
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Credits
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Grade
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Letter
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Semester
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredGrades.map((grade, index) => (
                <tr key={grade.id} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                  <td className="px-4 py-4">
                    <div>
                      <div className="text-sm font-medium text-gray-900">
                        {grade.course.courseCode}
                      </div>
                      <div className="text-sm text-gray-500">
                        {grade.course.courseName}
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{grade.course.creditHours}</div>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap">
                    <div className={`text-lg font-bold ${grade.gradeValue ? getGradeColor(grade.gradeValue) : 'text-gray-400'}`}>
                      {grade.gradeValue || 'N/A'}
                    </div>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${grade.letterGrade ? getLetterGradeColor(grade.letterGrade) : 'bg-gray-100 text-gray-800'}`}>
                      {grade.letterGrade || 'N/A'}
                    </span>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{grade.semester || 'N/A'}</div>
                    <div className="text-xs text-gray-500">{grade.academicYear || 'N/A'}</div>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">
                      {grade.gradeDate ? new Date(grade.gradeDate).toLocaleDateString() : 'N/A'}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="text-center py-8">
          <div className="text-gray-400 mb-4">
            <svg className="mx-auto h-12 w-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <p className="text-gray-600">No grades found for the selected filters.</p>
          <p className="text-sm text-gray-500 mt-1">Grades will appear here once they are submitted by your lecturers.</p>
        </div>
      )}

      {/* Summary Stats */}
      {filteredGrades.length > 0 && (
        <div className="mt-6 pt-6 border-t border-gray-200">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-indigo-600">{currentGPA}</div>
              <div className="text-sm text-gray-500">GPA</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">{totalCredits}</div>
              <div className="text-sm text-gray-500">Total Credits</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">{filteredGrades.length}</div>
              <div className="text-sm text-gray-500">Courses</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
