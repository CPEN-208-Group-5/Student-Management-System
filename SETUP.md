# Student Management System - Setup Guide

## 🚀 Quick Start

### Prerequisites
- Java 21+ (OpenJDK 21 recommended)
- Node.js 18+ (v22.13.1 tested and working)
- PostgreSQL 15 (or Docker)
- Maven (or use Maven wrapper)

### Option 1: Docker Setup (Recommended)

1. **Start all services with Docker Compose:**
   ```bash
   docker-compose up -d
   ```

2. **Access the applications:**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:8081/api
   - Database: localhost:5433

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

**Note**: If you encounter SWC download issues, the binary has been pre-downloaded and placed in the correct locations.

## 🧪 Testing the APIs

### Test Backend APIs
```bash
# Run the test script
powershell -ExecutionPolicy Bypass -File test-backend-local.ps1
```

### Manual API Testing
```bash
# Test Students API
curl http://localhost:8081/api/students

# Test Courses API
curl http://localhost:8081/api/courses

# Test Lecturers API
curl http://localhost:8081/api/lecturers

# Test Fee Structures API
curl http://localhost:8081/api/fee-structures

# Test Teaching Assistants API
curl http://localhost:8081/api/tas

# Test Enrollments API
curl http://localhost:8081/api/enrollments

# Test Payments API
curl http://localhost:8081/api/payments
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

### Teaching Assistants
- `GET /api/tas` - Get all TAs
- `GET /api/tas/{id}` - Get TA by ID
- `GET /api/tas/email/{email}` - Get TA by email
- `POST /api/tas` - Create new TA
- `PUT /api/tas/{id}` - Update TA
- `DELETE /api/tas/{id}` - Delete TA

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

### Lecturer Assignments
- `GET /api/lecturer-courses` - Get all lecturer-course assignments
- `GET /api/lecturer-tas` - Get all lecturer-TA assignments
- `POST /api/lecturer-courses` - Assign lecturer to course
- `POST /api/lecturer-tas` - Assign TA to lecturer
- `DELETE /api/lecturer-courses/{id}` - Remove lecturer from course
- `DELETE /api/lecturer-tas/{id}` - Remove TA from lecturer

## 🗄️ Database Schema

The system uses PostgreSQL with the following main tables:
- `students` - Student information (ID, name, email, phone, level, program)
- `courses` - Course information (ID, code, name, credit hours)
- `lecturers` - Lecturer information (ID, name, email, office)
- `tas` - Teaching Assistant information (ID, name, email, level)
- `course_enrollments` - Student course enrollments (student_id, course_id, semester, year)
- `fee_payments` - Student fee payments (student_id, amount, date)
- `fee_structure` - Fee structure by level (level, amount)
- `lecturer_courses` - Lecturer-course assignments (lecturer_id, course_id)
- `lecturer_tas` - Lecturer-TA assignments (lecturer_id, ta_id)

### Sample Data
The database comes pre-populated with:
- 2 sample students
- 2 sample lecturers
- 2 sample TAs
- 2 sample courses
- Sample enrollments and payments

## 🔧 Configuration

### Backend Configuration
- **Database**: PostgreSQL on localhost:5433
- **Database name**: `student_management`
- **Username**: `admin`
- **Password**: `admin123`
- **Schema**: `department`
- **Port**: 8081
- **JWT Secret**: Configured in application.properties
- **JWT Expiration**: 24 hours (86400000ms)

### Frontend Configuration
- **API URL**: `http://localhost:8081/api`
- **Port**: 3000
- **Next.js Version**: 15.4.5
- **React Version**: 19.1.0
- **TypeScript Version**: 5
- **Tailwind CSS**: 4

## 🐛 Troubleshooting

### Common Issues

1. **Database Connection Failed**
   - Ensure PostgreSQL is running on port 5433
   - Check database credentials in `application.properties`
   - Verify database exists: `student_management`
   - Check if Docker container is running: `docker ps`

2. **Backend Won't Start**
   - Ensure Java 21+ is installed: `java -version`
   - Check if port 8081 is available
   - Verify Maven wrapper exists: `./mvnw --version`
   - Check application.properties configuration

3. **Frontend Won't Start**
   - Ensure Node.js 18+ is installed: `node --version`
   - Check if port 3000 is available
   - Clear npm cache: `npm cache clean --force`
   - Reinstall dependencies: `rm -rf node_modules && npm install`

4. **SWC Binary Issues**
   - **Issue**: Network timeout during download
   - **Solution**: SWC binary has been pre-downloaded and placed in:
     - `C:\Users\[username]\AppData\Local\next-swc\@next\swc-win32-x64-msvc\`
     - `node_modules\next\next-swc-fallback\@next\swc-win32-x64-msvc\`

5. **API Returns 403 Forbidden**
   - Restart the Spring Boot application
   - Check if database is properly initialized
   - Verify CORS configuration in SecurityConfig.java

6. **Frontend Can't Connect to Backend**
   - Ensure backend is running on port 8081
   - Check API URL configuration in frontend
   - Verify CORS is enabled in backend
   - Test backend directly: `curl http://localhost:8081/api/students`

7. **Docker Issues**
   - Ensure Docker Desktop is running
   - Check if ports 3000, 8081, 5433 are available
   - Restart Docker containers: `docker-compose down && docker-compose up -d`
   - Check Docker logs: `docker-compose logs`

8. **TypeScript Errors**
   - **Issue**: Next.js 15 async params compatibility
   - **Solution**: All components have been updated for async params
   - Run: `npm run build` to check for any remaining issues

## 📝 Development Notes

### Backend
- **Spring Boot**: 3.2.0 with Java 21
- **JPA/Hibernate**: 6.3.1.Final
- **Security**: Spring Security with JWT
- **Database**: PostgreSQL 15 with department schema
- **Build Tool**: Maven with wrapper
- **All APIs support CORS** for frontend integration
- **Entity relationships** are properly mapped with JPA
- **API responses** use proper HTTP status codes

### Frontend
- **Next.js**: 15.4.5 with React 19.1.0
- **TypeScript**: 5 with strict type checking
- **Styling**: Tailwind CSS 4
- **Build Tool**: SWC compiler (pre-configured)
- **All components** updated for Next.js 15 async params
- **Responsive design** with modern UI components

### Database
- **PostgreSQL**: 15 with comprehensive schema
- **Sample Data**: Pre-populated for testing
- **Stored Procedures**: For complex queries
- **Foreign Keys**: Proper relationships and constraints

## ✅ Current Status

**All systems are fully operational:**
- ✅ Backend API running on port 8081
- ✅ Frontend running on port 3000
- ✅ Database connected and populated
- ✅ All APIs functional and tested
- ✅ Authentication system working
- ✅ SWC compiler configured
- ✅ TypeScript compilation successful
- ✅ Docker containers ready

**Ready for development and production deployment! 🚀** 