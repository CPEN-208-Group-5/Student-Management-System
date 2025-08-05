// API service for connecting to backend
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080/api';

export interface Student {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  level?: number;
  program?: string;
}

export interface Course {
  id: number;
  courseCode: string;
  courseName: string;
  creditHours: number;
}

export interface Lecturer {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  office?: string;
}

export interface FeeStructure {
  level: number;
  amountDue: number;
}

export interface CourseEnrollment {
  id: number;
  student: Student;
  course: Course;
  semester?: string;
  academicYear?: string;
}

export interface FeePayment {
  id: number;
  student: Student;
  amountPaid: number;
  paymentDate: string;
}

// Generic API functions
async function apiRequest<T>(endpoint: string, options?: RequestInit): Promise<T> {
  const url = `${API_BASE_URL}${endpoint}`;
  const response = await fetch(url, {
    headers: {
      'Content-Type': 'application/json',
      ...options?.headers,
    },
    ...options,
  });

  if (!response.ok) {
    throw new Error(`API request failed: ${response.status} ${response.statusText}`);
  }

  return response.json();
}

// Student API functions
export const studentAPI = {
  getAll: () => apiRequest<Student[]>('/students'),
  getById: (id: number) => apiRequest<Student>(`/students/${id}`),
  getByEmail: (email: string) => apiRequest<Student>(`/students/email/${email}`),
  create: (student: Omit<Student, 'id'>) => apiRequest<Student>('/students', {
    method: 'POST',
    body: JSON.stringify(student),
  }),
  update: (id: number, student: Partial<Student>) => apiRequest<Student>(`/students/${id}`, {
    method: 'PUT',
    body: JSON.stringify(student),
  }),
  delete: (id: number) => apiRequest<void>(`/students/${id}`, {
    method: 'DELETE',
  }),
};

// Course API functions
export const courseAPI = {
  getAll: () => apiRequest<Course[]>('/courses'),
  getById: (id: number) => apiRequest<Course>(`/courses/${id}`),
  getByCode: (courseCode: string) => apiRequest<Course>(`/courses/code/${courseCode}`),
  create: (course: Omit<Course, 'id'>) => apiRequest<Course>('/courses', {
    method: 'POST',
    body: JSON.stringify(course),
  }),
  update: (id: number, course: Partial<Course>) => apiRequest<Course>(`/courses/${id}`, {
    method: 'PUT',
    body: JSON.stringify(course),
  }),
  delete: (id: number) => apiRequest<void>(`/courses/${id}`, {
    method: 'DELETE',
  }),
};

// Lecturer API functions
export const lecturerAPI = {
  getAll: () => apiRequest<Lecturer[]>('/lecturers'),
  getById: (id: number) => apiRequest<Lecturer>(`/lecturers/${id}`),
  getByEmail: (email: string) => apiRequest<Lecturer>(`/lecturers/email/${email}`),
  create: (lecturer: Omit<Lecturer, 'id'>) => apiRequest<Lecturer>('/lecturers', {
    method: 'POST',
    body: JSON.stringify(lecturer),
  }),
  update: (id: number, lecturer: Partial<Lecturer>) => apiRequest<Lecturer>(`/lecturers/${id}`, {
    method: 'PUT',
    body: JSON.stringify(lecturer),
  }),
  delete: (id: number) => apiRequest<void>(`/lecturers/${id}`, {
    method: 'DELETE',
  }),
};

// Fee Structure API functions
export const feeStructureAPI = {
  getAll: () => apiRequest<FeeStructure[]>('/fee-structures'),
  getByLevel: (level: number) => apiRequest<FeeStructure>(`/fee-structures/${level}`),
  create: (feeStructure: FeeStructure) => apiRequest<FeeStructure>('/fee-structures', {
    method: 'POST',
    body: JSON.stringify(feeStructure),
  }),
  update: (level: number, feeStructure: Partial<FeeStructure>) => apiRequest<FeeStructure>(`/fee-structures/${level}`, {
    method: 'PUT',
    body: JSON.stringify(feeStructure),
  }),
  delete: (level: number) => apiRequest<void>(`/fee-structures/${level}`, {
    method: 'DELETE',
  }),
};

// Enrollment API functions
export const enrollmentAPI = {
  getAll: () => apiRequest<CourseEnrollment[]>('/enrollments'),
  getById: (id: number) => apiRequest<CourseEnrollment>(`/enrollments/${id}`),
  getByStudent: (studentId: number) => apiRequest<CourseEnrollment[]>(`/enrollments/student/${studentId}`),
  create: (enrollment: Omit<CourseEnrollment, 'id'>) => apiRequest<CourseEnrollment>('/enrollments', {
    method: 'POST',
    body: JSON.stringify(enrollment),
  }),
  update: (id: number, enrollment: Partial<CourseEnrollment>) => apiRequest<CourseEnrollment>(`/enrollments/${id}`, {
    method: 'PUT',
    body: JSON.stringify(enrollment),
  }),
  delete: (id: number) => apiRequest<void>(`/enrollments/${id}`, {
    method: 'DELETE',
  }),
};

// Payment API functions
export const paymentAPI = {
  getAll: () => apiRequest<FeePayment[]>('/payments'),
  getById: (id: number) => apiRequest<FeePayment>(`/payments/${id}`),
  getByStudent: (studentId: number) => apiRequest<FeePayment[]>(`/payments/student/${studentId}`),
  create: (payment: Omit<FeePayment, 'id'>) => apiRequest<FeePayment>('/payments', {
    method: 'POST',
    body: JSON.stringify(payment),
  }),
  update: (id: number, payment: Partial<FeePayment>) => apiRequest<FeePayment>(`/payments/${id}`, {
    method: 'PUT',
    body: JSON.stringify(payment),
  }),
  delete: (id: number) => apiRequest<void>(`/payments/${id}`, {
    method: 'DELETE',
  }),
}; 