package com.finalproject.backend.controller;

import com.finalproject.backend.entity.Student;
import com.finalproject.backend.entity.Lecturer;
import com.finalproject.backend.entity.User;
import com.finalproject.backend.service.StudentService;
import com.finalproject.backend.service.LecturerService;
import com.finalproject.backend.service.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "*")
public class AuthController {
    
    private final StudentService studentService;
    private final LecturerService lecturerService;
    private final UserService userService;

    public AuthController(StudentService studentService, LecturerService lecturerService, UserService userService) {
        this.studentService = studentService;
        this.lecturerService = lecturerService;
        this.userService = userService;
    }

    @PostMapping("/register/student")
    public ResponseEntity<?> registerStudent(@RequestBody Map<String, Object> request) {
        try {
            String email = (String) request.get("email");
            String password = (String) request.get("password");
            String firstName = (String) request.get("first_name");
            String lastName = (String) request.get("last_name");
            String program = (String) request.get("program");
            Integer level = Integer.valueOf((String) request.get("year_of_study"));

            // Check if user already exists
            if (userService.existsByEmail(email)) {
                return ResponseEntity.badRequest().body(Map.of("error", "User already exists"));
            }

            // Create student entity
            Student student = Student.builder()
                    .firstName(firstName)
                    .lastName(lastName)
                    .email(email)
                    .program(program)
                    .level(level)
                    .build();

            // Save student to database
            Student savedStudent = studentService.saveStudent(student);
            
            // Create and save user credentials
            User user = User.builder()
                    .email(email)
                    .password(password) // In production, this should be hashed
                    .role("STUDENT")
                    .firstName(firstName)
                    .lastName(lastName)
                    .enabled(true)
                    .build();
            
            userService.saveUser(user);

            return ResponseEntity.ok(Map.of(
                    "message", "Student registered successfully",
                    "user", Map.of(
                            "id", savedStudent.getId(),
                            "email", savedStudent.getEmail(),
                            "firstName", savedStudent.getFirstName(),
                            "lastName", savedStudent.getLastName(),
                            "role", "STUDENT"
                    )
            ));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }

    @PostMapping("/register/staff")
    public ResponseEntity<?> registerStaff(@RequestBody Map<String, Object> request) {
        try {
            String email = (String) request.get("email");
            String password = (String) request.get("password");
            String firstName = (String) request.get("first_name");
            String lastName = (String) request.get("last_name");
            String department = (String) request.get("department");
            String position = (String) request.get("position");
            String employeeId = (String) request.get("employee_id"); // Handle employee_id field

            // Check if user already exists
            if (userService.existsByEmail(email)) {
                return ResponseEntity.badRequest().body(Map.of("error", "User already exists"));
            }

            // Create lecturer entity with employee_id included in office field
            String officeInfo = department + " - " + position;
            if (employeeId != null && !employeeId.trim().isEmpty()) {
                officeInfo += " (ID: " + employeeId + ")";
            }
            
            Lecturer lecturer = Lecturer.builder()
                    .firstName(firstName)
                    .lastName(lastName)
                    .email(email)
                    .office(officeInfo)
                    .build();

            // Save lecturer to database
            Lecturer savedLecturer = lecturerService.saveLecturer(lecturer);
            
            // Create and save user credentials
            User user = User.builder()
                    .email(email)
                    .password(password) // In production, this should be hashed
                    .role("LECTURER")
                    .firstName(firstName)
                    .lastName(lastName)
                    .enabled(true)
                    .build();
            
            userService.saveUser(user);

            return ResponseEntity.ok(Map.of(
                    "message", "Staff registered successfully",
                    "user", Map.of(
                            "id", savedLecturer.getId(),
                            "email", savedLecturer.getEmail(),
                            "firstName", savedLecturer.getFirstName(),
                            "lastName", savedLecturer.getLastName(),
                            "role", "LECTURER"
                    )
            ));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Map<String, Object> request) {
        try {
            String email = (String) request.get("email");
            String password = (String) request.get("password");

            // Check if user exists and password matches
            Optional<User> userOpt = userService.findByEmail(email);
            if (userOpt.isEmpty() || !userOpt.get().getPassword().equals(password)) {
                return ResponseEntity.badRequest().body(Map.of("error", "Invalid email or password"));
            }

            User user = userOpt.get();
            String role = user.getRole();
            
            // Get user details from database
            if ("STUDENT".equals(role)) {
                Optional<Student> student = studentService.getStudentByEmail(email);
                if (student.isPresent()) {
                    return ResponseEntity.ok(Map.of(
                            "message", "Login successful",
                            "user", Map.of(
                                    "id", student.get().getId(),
                                    "email", student.get().getEmail(),
                                    "firstName", student.get().getFirstName(),
                                    "lastName", student.get().getLastName(),
                                    "role", "STUDENT"
                            )
                    ));
                }
            } else if ("LECTURER".equals(role)) {
                Optional<Lecturer> lecturer = lecturerService.getLecturerByEmail(email);
                if (lecturer.isPresent()) {
                    return ResponseEntity.ok(Map.of(
                            "message", "Login successful",
                            "user", Map.of(
                                    "id", lecturer.get().getId(),
                                    "email", lecturer.get().getEmail(),
                                    "firstName", lecturer.get().getFirstName(),
                                    "lastName", lecturer.get().getLastName(),
                                    "role", "LECTURER"
                            )
                    ));
                }
            }

            return ResponseEntity.badRequest().body(Map.of("error", "User not found"));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }
} 