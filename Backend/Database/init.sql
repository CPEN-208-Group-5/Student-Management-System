-- Drop tables if they exist (in reverse order to respect FK constraints)
DROP TABLE IF EXISTS lecturer_courses, student_courses, payments, courses, lecturers, students, departments CASCADE;

-- Create Departments
CREATE TABLE departments (
    department_id SERIAL PRIMARY KEY,
    department_name VARCHAR(100),
    head_of_department INT
);

-- Create Students
CREATE TABLE students (
    student_id SERIAL PRIMARY KEY,
    first_name VARCHAR(50),
    last_name VARCHAR(50),
    gender VARCHAR(10),
    date_of_birth DATE,
    email VARCHAR(100) UNIQUE,
    phone_number VARCHAR(20),
    address TEXT,
    registration_date DATE DEFAULT CURRENT_DATE
);

-- Create Lecturers
CREATE TABLE lecturers (
    lecturer_id SERIAL PRIMARY KEY,
    first_name VARCHAR(50),
    last_name VARCHAR(50),
    email VARCHAR(100) UNIQUE,
    phone_number VARCHAR(20),
    department VARCHAR(50),
    department_id INT REFERENCES departments(department_id),
    hire_date DATE
);

-- Add FK constraint to departments (head_of_department now that lecturers exist)
ALTER TABLE departments ADD CONSTRAINT fk_hod FOREIGN KEY (head_of_department) REFERENCES lecturers(lecturer_id);

-- Create Courses
CREATE TABLE courses (
    course_id SERIAL PRIMARY KEY,
    course_code VARCHAR(10) UNIQUE,
    course_name VARCHAR(100),
    credit_hours INT CHECK (credit_hours > 0),
    department VARCHAR(50),
    department_id INT REFERENCES departments(department_id)
);

-- Create Student_Courses (Junction)
CREATE TABLE student_courses (
    student_id INT REFERENCES students(student_id),
    course_id INT REFERENCES courses(course_id),
    enrollment_date DATE DEFAULT CURRENT_DATE,
    grade CHAR(2),
    PRIMARY KEY (student_id, course_id)
);

-- Create Lecturer_Courses (Junction)
CREATE TABLE lecturer_courses (
    lecturer_id INT REFERENCES lecturers(lecturer_id),
    course_id INT REFERENCES courses(course_id),
    assigned_date DATE DEFAULT CURRENT_DATE,
    PRIMARY KEY (lecturer_id, course_id)
);

-- Create Payments
CREATE TABLE payments (
    payment_id SERIAL PRIMARY KEY,
    student_id INT REFERENCES students(student_id),
    payment_date DATE DEFAULT CURRENT_DATE,
    amount NUMERIC(10, 2),
    payment_method VARCHAR(50),
    payment_status VARCHAR(20) CHECK (payment_status IN ('Pending', 'Completed', 'Failed'))
);

-- Indexes for quick lookup
CREATE INDEX idx_students_email ON students(email);
CREATE INDEX idx_courses_code ON courses(course_code);
CREATE INDEX idx_lecturers_email ON lecturers(email);
CREATE INDEX idx_payments_student ON payments(student_id);
CREATE INDEX idx_student_courses_student ON student_courses(student_id);
CREATE INDEX idx_lecturer_courses_lecturer ON lecturer_courses(lecturer_id);

-- Departments
INSERT INTO departments (department_name) VALUES
('Computer Science'),
('Mathematics'),
('Engineering');

-- Students
INSERT INTO students (first_name, last_name, gender, date_of_birth, email, phone_number, address)
VALUES
('John', 'Doe', 'Male', '2002-04-10', 'john.doe@example.com', '1234567890', 'Accra, Ghana'),
('Jane', 'Smith', 'Female', '2003-07-21', 'jane.smith@example.com', '0987654321', 'Kumasi, Ghana');

-- Lecturers
INSERT INTO lecturers (first_name, last_name, email, phone_number, department, department_id, hire_date)
VALUES
('Dr. Kwame', 'Mensah', 'kwame.mensah@university.edu', '111222333', 'Computer Science', 1, '2020-08-01'),
('Dr. Akua', 'Boateng', 'akua.boateng@university.edu', '444555666', 'Mathematics', 2, '2018-01-15');

-- Update head_of_department
UPDATE departments SET head_of_department = 1 WHERE department_id = 1;

-- Courses
INSERT INTO courses (course_code, course_name, credit_hours, department, department_id)
VALUES
('CS101', 'Intro to CS', 3, 'Computer Science', 1),
('MATH201', 'Calculus II', 4, 'Mathematics', 2);

-- Student Course Enrollments
INSERT INTO student_courses (student_id, course_id, grade)
VALUES
(1, 1, 'A'),
(2, 2, 'B');

-- Lecturer Course Assignments
INSERT INTO lecturer_courses (lecturer_id, course_id)
VALUES
(1, 1),
(2, 2);

-- Payments
INSERT INTO payments (student_id, amount, payment_method, payment_status)
VALUES
(1, 1500.00, 'Mobile Money', 'Completed'),
(2, 1450.00, 'Credit Card', 'Pending');
