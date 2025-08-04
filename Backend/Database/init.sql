-- Schema
CREATE SCHEMA department;

-- Tables
-- 1. Students
CREATE TABLE department.students (
    student_id SERIAL PRIMARY KEY,
    first_name VARCHAR(100),
    last_name VARCHAR(100),
    email VARCHAR(100) UNIQUE NOT NULL,
    phone VARCHAR(20),
    level INT,
    program VARCHAR(100)
);

-- 2. Lecturers
CREATE TABLE department.lecturers (
    lecturer_id SERIAL PRIMARY KEY,
    first_name VARCHAR(100),
    last_name VARCHAR(100),
    email VARCHAR(100) UNIQUE NOT NULL,
    office VARCHAR(50)
);

-- 3. Teaching Assistants (TAs)
CREATE TABLE department.tas (
    ta_id SERIAL PRIMARY KEY,
    first_name VARCHAR(100),
    last_name VARCHAR(100),
    email VARCHAR(100) UNIQUE NOT NULL,
    level INT
);

-- 4. Courses
CREATE TABLE department.courses (
    course_id SERIAL PRIMARY KEY,
    course_code VARCHAR(10) UNIQUE NOT NULL,
    course_name VARCHAR(100) NOT NULL,
    credit_hours INT NOT NULL
);

-- 5. Course Enrollment
CREATE TABLE department.course_enrollments (
    enrollment_id SERIAL PRIMARY KEY,
    student_id INT REFERENCES department.students(student_id) ON DELETE CASCADE,
    course_id INT REFERENCES department.courses(course_id) ON DELETE CASCADE,
    semester VARCHAR(20),
    academic_year VARCHAR(20)
);

-- 6. Fee Payments
CREATE TABLE department.fee_payments (
    payment_id SERIAL PRIMARY KEY,
    student_id INT REFERENCES department.students(student_id) ON DELETE CASCADE,
    amount_paid DECIMAL(10, 2),
    payment_date DATE
);

-- 7. Fee Structure (based on level)
CREATE TABLE department.fee_structure (
    level INT PRIMARY KEY,
    amount_due DECIMAL(10, 2)
);

-- 8. Lecturer to Course Assignment
CREATE TABLE department.lecturer_courses (
    id SERIAL PRIMARY KEY,
    lecturer_id INT REFERENCES department.lecturers(lecturer_id) ON DELETE CASCADE,
    course_id INT REFERENCES department.courses(course_id) ON DELETE CASCADE
);

-- 9. Lecturer to TA Assignment
CREATE TABLE department.lecturer_tas (
    id SERIAL PRIMARY KEY,
    lecturer_id INT REFERENCES department.lecturers(lecturer_id) ON DELETE CASCADE,
    ta_id INT REFERENCES department.tas(ta_id) ON DELETE CASCADE
);

-- Sample Data
-- Students
INSERT INTO department.students (first_name, last_name, email, phone, level, program) VALUES
('Daniel', 'Fugar', 'dfugar@ug.edu.gh', '0550000001', 400, 'Computer Engineering'),
('Akosua', 'Mensah', 'amensah@ug.edu.gh', '0550000002', 400, 'Computer Engineering');

-- Lecturers
INSERT INTO department.lecturers (first_name, last_name, email, office) VALUES
('John', 'Doe', 'jdoe@ug.edu.gh', 'CSB12'),
('Jane', 'Smith', 'jsmith@ug.edu.gh', 'CSB15');

-- TAs
INSERT INTO department.tas (first_name, last_name, email, level) VALUES
('Kojo', 'Owusu', 'kowusu@ug.edu.gh', 600),
('Ama', 'Baah', 'abaah@ug.edu.gh', 600);

-- Courses
INSERT INTO department.courses (course_code, course_name, credit_hours) VALUES
('CPEN401', 'Embedded Systems', 3),
('CPEN402', 'Computer Networks', 3);

-- Enrollments
INSERT INTO department.course_enrollments (student_id, course_id, semester, academic_year) VALUES
(1, 1, 'First', '2024/2025'),
(2, 2, 'First', '2024/2025');

-- Fee Structure
INSERT INTO department.fee_structure (level, amount_due) VALUES
(400, 2500.00);

-- Payments
INSERT INTO department.fee_payments (student_id, amount_paid, payment_date) VALUES
(1, 2000.00, '2025-01-10'),
(1, 300.00, '2025-03-15'),
(2, 2500.00, '2025-01-12');

-- Lecturer-Course Assignments
INSERT INTO department.lecturer_courses (lecturer_id, course_id) VALUES
(1, 1),
(2, 2);

-- Lecturer-TA Assignments
INSERT INTO department.lecturer_tas (lecturer_id, ta_id) VALUES
(1, 1),
(2, 2);

-- Function to calculate outstanding fees
CREATE OR REPLACE FUNCTION department.get_outstanding_fees()
RETURNS JSON AS $$
DECLARE
    result JSON;
BEGIN
    SELECT json_agg(t)
    INTO result
    FROM (
        SELECT 
            s.student_id,
            s.first_name,
            s.last_name,
            fs.amount_due,
            COALESCE(SUM(fp.amount_paid), 0) AS total_paid,
            fs.amount_due - COALESCE(SUM(fp.amount_paid), 0) AS outstanding_balance
        FROM department.students s
        JOIN department.fee_structure fs ON s.level = fs.level
        LEFT JOIN department.fee_payments fp ON s.student_id = fp.student_id
        GROUP BY s.student_id, s.first_name, s.last_name, fs.amount_due
        HAVING fs.amount_due - COALESCE(SUM(fp.amount_paid), 0) > 0
    ) t;

    RETURN result;
END;
$$ LANGUAGE plpgsql; 

-- Example usage:
SELECT department.get_outstanding_fees();
