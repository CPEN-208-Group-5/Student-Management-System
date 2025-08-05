package com.finalproject.backend.controller;

import com.finalproject.backend.entity.Student;
import com.finalproject.backend.entity.Lecturer;
import com.finalproject.backend.service.StudentService;
import com.finalproject.backend.service.LecturerService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "*")
public class AuthController {
    
    private final StudentService studentService;
    private final LecturerService lecturerService;
    
    // Simple in-memory storage for testing (replace with database later)
    private final Map<String, String> userPasswords = new HashMap<>();
    private final Map<String, String> userRoles = new HashMap<>();

    public AuthController(StudentService studentService, LecturerService lecturerService) {
        this.studentService = studentService;
        this.lecturerService = lecturerService;
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
            if (userPasswords.containsKey(email)) {
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

            // Save to database
            Student savedStudent = studentService.saveStudent(student);
            
            // Store password for login (in production, this should be hashed)
            userPasswords.put(email, password);
            userRoles.put(email, "STUDENT");

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

            // Check if user already exists
            if (userPasswords.containsKey(email)) {
                return ResponseEntity.badRequest().body(Map.of("error", "User already exists"));
            }

            // Create lecturer entity
            Lecturer lecturer = Lecturer.builder()
                    .firstName(firstName)
                    .lastName(lastName)
                    .email(email)
                    .office(department + " - " + position)
                    .build();

            // Save to database
            Lecturer savedLecturer = lecturerService.saveLecturer(lecturer);
            
            // Store password for login (in production, this should be hashed)
            userPasswords.put(email, password);
            userRoles.put(email, "LECTURER");

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
            if (!userPasswords.containsKey(email) || !userPasswords.get(email).equals(password)) {
                return ResponseEntity.badRequest().body(Map.of("error", "Invalid email or password"));
            }

            String role = userRoles.get(email);
            
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