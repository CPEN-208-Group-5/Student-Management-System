# 🎓 Student Management System

A full-stack web application for managing student records, courses, and enrollments. Built with **Next.js 15**, **Spring Boot 3.2.0**, and **PostgreSQL 15**, containerized using **Docker**, and integrated with **Jenkins** for CI/CD.

## 🚀 Features

- Student registration and profile management
- Course creation and enrollment tracking
- Lecturer and Teaching Assistant management
- Fee structure and payment tracking
- Admin dashboard for managing users and courses
- Secure authentication with JWT
- Responsive UI with Tailwind CSS 4
- RESTful API with comprehensive endpoints
- Dockerized services for easy deployment
- Real-time grade management system

## 🛠️ Tech Stack

| Layer       | Technology                    | Version    |
|-------------|-------------------------------|------------|
| Frontend    | Next.js, React, TypeScript    | 15.4.5, 19.1.0, 5 |
| Backend API | Spring Boot, Java             | 3.2.0, 21  |
| Database    | PostgreSQL                    | 15         |
| Styling     | Tailwind CSS                  | 4          |
| DevOps      | Docker, Docker Compose        | Latest     |

## 📦 Installation

### Prerequisites
- Node.js 18+ (v22.13.1 recommended)
- Java 21+
- PostgreSQL 15 (or Docker)
- Docker & Docker Compose

### Quick Start

1. **Clone the repository:**
   ```bash
   git clone https://github.com/your-org/student-management-system.git
   cd student-management-system
   ```

2. **Start all services with Docker Compose:**
   ```bash
   docker-compose up -d
   ```

3. **Access the applications:**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:8081/api
   - Database: localhost:5433

### Manual Setup

#### Backend Setup
```bash
cd Backend/spring-boot-app
./mvnw spring-boot:run
```

#### Frontend Setup
```bash
cd frontend
npm install
npm run dev
```

## 🧪 Testing

### API Testing
```bash
# Test Students API
curl http://localhost:8081/api/students

# Test Courses API
curl http://localhost:8081/api/courses

# Test Lecturers API
curl http://localhost:8081/api/lecturers
```

### Frontend Testing
- Navigate to http://localhost:3000
- Test student/staff registration and login
- Test course management features
- Test grade submission system

## 📊 Available APIs

### Core Entities
- **Students**: Complete CRUD operations
- **Lecturers**: Complete CRUD operations  
- **Teaching Assistants**: Complete CRUD operations
- **Courses**: Complete CRUD operations
- **Enrollments**: Student-course enrollment management
- **Fee Payments**: Payment tracking system
- **Fee Structure**: Level-based fee management
- **Lecturer Assignments**: Course and TA assignments

### Authentication
- JWT-based authentication
- Role-based access control
- Secure password encryption with BCrypt

## 🗄️ Database Schema

The system uses PostgreSQL with a comprehensive schema:
- **9 main entities** with proper relationships
- **Foreign key constraints** for data integrity
- **Sample data** pre-populated for testing
- **Stored procedures** for complex queries

## 🔧 Configuration

### Backend Configuration
- **Port**: 8081
- **Database**: PostgreSQL on localhost:5433
- **Database name**: `student_management`
- **Schema**: `department`
- **JWT**: Configured with secure tokens

### Frontend Configuration
- **Port**: 3000
- **API URL**: `http://localhost:8081/api`
- **Next.js**: 15.4.5 with SWC compiler
- **TypeScript**: Fully configured

## 🐛 Troubleshooting

### Common Issues & Solutions

1. **SWC Binary Download Issues**
   - Network connectivity problems
   - Solution: Manual download and placement in correct directories

2. **Database Connection Issues**
   - Ensure PostgreSQL is running on port 5433
   - Check credentials in `application.properties`

3. **Frontend Build Issues**
   - Ensure Node.js 18+ is installed
   - Clear npm cache if needed: `npm cache clean --force`

4. **Port Conflicts**
   - Frontend: 3000
   - Backend: 8081
   - Database: 5433

## 📝 Recent Updates

### ✅ Fixed Issues
- **Backend**: Completed incomplete `pom.xml` with all dependencies
- **JWT**: Fixed API compatibility issues in JWT utility
- **Frontend**: Updated all components for Next.js 15 async params
- **SWC**: Successfully downloaded and configured SWC binary
- **TypeScript**: Resolved all compilation errors

### ✅ Current Status
- **Backend**: ✅ Fully functional and tested
- **Frontend**: ✅ Running successfully
- **Database**: ✅ Connected with sample data
- **APIs**: ✅ All endpoints working
- **Authentication**: ✅ JWT implementation complete

## 🚀 Deployment

The system is production-ready with:
- Complete Docker containerization
- Environment variable configuration
- Security best practices implemented
- Comprehensive error handling
- Scalable architecture

---

**Status: 🟢 FULLY OPERATIONAL** - All systems running and tested successfully!
