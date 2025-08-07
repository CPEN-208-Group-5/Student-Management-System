# Database Setup for Student Management System

## 🗄️ PostgreSQL Database Configuration

### Requirements
- Docker
- Docker Compose

### Quick Start

1. **Start the PostgreSQL container:**
   ```bash
   docker-compose up -d
   ```

2. **Access the database:**
   - **Host**: localhost
   - **Port**: 5433
   - **Database Name**: student_management
   - **Username**: admin
   - **Password**: admin123
   - **Schema**: department

3. **Stop the container:**
   ```bash
   docker-compose down
   ```

## 📊 Database Schema

The database includes the following tables in the `department` schema:

### Core Entities
- **students** - Student information (ID, name, email, phone, level, program)
- **courses** - Course information (ID, code, name, credit hours)
- **lecturers** - Lecturer information (ID, name, email, office)
- **tas** - Teaching Assistant information (ID, name, email, level)

### Relationship Tables
- **course_enrollments** - Student course enrollments
- **fee_payments** - Student fee payments
- **fee_structure** - Fee structure by level
- **lecturer_courses** - Lecturer-course assignments
- **lecturer_tas** - Lecturer-TA assignments

## 📝 Sample Data

The database comes pre-populated with:
- 2 sample students
- 2 sample lecturers  
- 2 sample TAs
- 2 sample courses
- Sample enrollments and payments
- Fee structure for level 400

## 🔧 Configuration

### Docker Configuration
- **Image**: postgres:15
- **Container Name**: student-db
- **Port Mapping**: 5433:5432
- **Volume**: postgres_data for data persistence
- **Initialization**: init.sql script runs on first startup

### Connection Details
- **Host**: localhost
- **Port**: 5433
- **Database**: student_management
- **Username**: admin
- **Password**: admin123
- **Schema**: department

## 🧪 Testing

### Test Database Connection
```bash
# Using psql (if installed)
psql -h localhost -p 5433 -U admin -d student_management

# Using Docker
docker exec -it student-db psql -U admin -d student_management
```

### Sample Queries
```sql
-- View all students
SELECT * FROM department.students;

-- View all courses
SELECT * FROM department.courses;

-- View enrollments with student and course names
SELECT s.first_name, s.last_name, c.course_name 
FROM department.students s 
JOIN department.course_enrollments ce ON s.student_id = ce.student_id 
JOIN department.courses c ON ce.course_id = c.course_id;
```

## 🐛 Troubleshooting

### Common Issues

1. **Port Already in Use**
   - Check if port 5433 is available: `netstat -ano | findstr :5433`
   - Stop existing containers: `docker-compose down`

2. **Container Won't Start**
   - Check Docker logs: `docker-compose logs postgres`
   - Ensure Docker Desktop is running
   - Check available disk space

3. **Connection Refused**
   - Wait for container to fully start (may take 30-60 seconds)
   - Check container status: `docker ps`
   - Verify port mapping: `docker port student-db`

## ✅ Status

**Database is fully operational and ready for use!**
- ✅ PostgreSQL 15 running on port 5433
- ✅ All tables created with proper relationships
- ✅ Sample data populated
- ✅ Ready for backend connection
    