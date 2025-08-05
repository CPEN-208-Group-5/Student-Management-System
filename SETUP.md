# Student Management System - Setup Guide

## 🚀 Quick Start

### Prerequisites
- Java 21+
- Node.js 18+
- PostgreSQL (or Docker)
- Maven

### Option 1: Docker Setup (Recommended)

1. **Start all services with Docker Compose:**
   ```bash
   docker-compose up -d
   ```

2. **Access the applications:**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:8080/api
   - Database: localhost:5432

### Option 2: Manual Setup

#### 1. Database Setup
```bash
cd Backend/Database
docker-compose up -d
```

#### 2. Backend Setup
```bash
cd Backend/spring-boot-app
./mvnw spring-boot:run
```

#### 3. Frontend Setup
```bash
cd frontend
npm install
npm run dev
```

## 🧪 Testing the APIs

### Test Backend APIs
```bash
# Run the test script
powershell -ExecutionPolicy Bypass -File test-backend-local.ps1
```

### Manual API Testing
```bash
# Test Students API
curl http://localhost:8080/api/students

# Test Courses API
curl http://localhost:8080/api/courses

# Test Lecturers API
curl http://localhost:8080/api/lecturers

# Test Fee Structures API
curl http://localhost:8080/api/fee-structures
```

## 📊 Available APIs

### Students
- `GET /api/students` - Get all students
- `GET /api/students/{id}` - Get student by ID
- `GET /api/students/email/{email}` - Get student by email
- `POST /api/students` - Create new student
- `PUT /api/students/{id}` - Update student
- `DELETE /api/students/{id}` - Delete student

### Courses
- `GET /api/courses` - Get all courses
- `GET /api/courses/{id}` - Get course by ID
- `GET /api/courses/code/{courseCode}` - Get course by code
- `POST /api/courses` - Create new course
- `PUT /api/courses/{id}` - Update course
- `DELETE /api/courses/{id}` - Delete course

### Lecturers
- `GET /api/lecturers` - Get all lecturers
- `GET /api/lecturers/{id}` - Get lecturer by ID
- `GET /api/lecturers/email/{email}` - Get lecturer by email
- `POST /api/lecturers` - Create new lecturer
- `PUT /api/lecturers/{id}` - Update lecturer
- `DELETE /api/lecturers/{id}` - Delete lecturer

### Fee Structures
- `GET /api/fee-structures` - Get all fee structures
- `GET /api/fee-structures/{level}` - Get fee structure by level
- `POST /api/fee-structures` - Create new fee structure
- `PUT /api/fee-structures/{level}` - Update fee structure
- `DELETE /api/fee-structures/{level}` - Delete fee structure

### Enrollments
- `GET /api/enrollments` - Get all enrollments
- `GET /api/enrollments/{id}` - Get enrollment by ID
- `GET /api/enrollments/student/{studentId}` - Get enrollments by student
- `POST /api/enrollments` - Create new enrollment
- `PUT /api/enrollments/{id}` - Update enrollment
- `DELETE /api/enrollments/{id}` - Delete enrollment

### Payments
- `GET /api/payments` - Get all payments
- `GET /api/payments/{id}` - Get payment by ID
- `GET /api/payments/student/{studentId}` - Get payments by student
- `POST /api/payments` - Create new payment
- `PUT /api/payments/{id}` - Update payment
- `DELETE /api/payments/{id}` - Delete payment

## 🗄️ Database Schema

The system uses PostgreSQL with the following main tables:
- `students` - Student information
- `courses` - Course information
- `lecturers` - Lecturer information
- `tas` - Teaching Assistant information
- `course_enrollments` - Student course enrollments
- `fee_payments` - Student fee payments
- `fee_structure` - Fee structure by level
- `lecturer_courses` - Lecturer-course assignments
- `lecturer_tas` - Lecturer-TA assignments

## 🔧 Configuration

### Backend Configuration
- Database: PostgreSQL on localhost:5432
- Database name: `student_management`
- Username: `admin`
- Password: `admin123`
- Schema: `department`

### Frontend Configuration
- API URL: `http://localhost:8080/api`
- Port: 3000

## 🐛 Troubleshooting

### Common Issues

1. **Database Connection Failed**
   - Ensure PostgreSQL is running
   - Check database credentials in `application.properties`
   - Verify database exists: `student_management`

2. **API Returns 403 Forbidden**
   - Restart the Spring Boot application
   - Check if database is properly initialized
   - Verify CORS configuration

3. **Frontend Can't Connect to Backend**
   - Ensure backend is running on port 8080
   - Check API URL configuration
   - Verify CORS is enabled

4. **Docker Issues**
   - Ensure Docker Desktop is running
   - Check if ports 3000, 8080, 5432 are available
   - Restart Docker containers: `docker-compose down && docker-compose up -d`

## 📝 Development Notes

- Backend uses Spring Boot 3.5.4 with Java 21
- Frontend uses Next.js 15 with React 19
- Database uses PostgreSQL 15
- All APIs support CORS for frontend integration
- Entity relationships are properly mapped with JPA
- API responses use proper HTTP status codes 