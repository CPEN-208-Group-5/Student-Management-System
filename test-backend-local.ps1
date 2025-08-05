# Test Backend APIs Locally
Write-Host "Testing Backend APIs Locally..." -ForegroundColor Green

# Test if application is running
$baseUrl = "http://localhost:8080"

# Test health endpoint first
Write-Host "`nTesting application health..." -ForegroundColor Yellow
try {
    $response = Invoke-WebRequest -Uri "$baseUrl/actuator/health" -Method GET -UseBasicParsing
    Write-Host "✅ Application is running" -ForegroundColor Green
} catch {
    Write-Host "❌ Application not running or health endpoint not available" -ForegroundColor Red
    Write-Host "Starting application..." -ForegroundColor Yellow
    
    # Start the application in background
    Start-Process -FilePath "java" -ArgumentList "-jar", "Backend/spring-boot-app/target/backend-0.0.1-SNAPSHOT.jar" -WindowStyle Hidden
    
    # Wait for application to start
    Start-Sleep -Seconds 30
}

# Test API endpoints
$apiBaseUrl = "$baseUrl/api"

# Test Students API
Write-Host "`nTesting Students API..." -ForegroundColor Yellow
try {
    $response = Invoke-RestMethod -Uri "$apiBaseUrl/students" -Method GET
    Write-Host "✅ Students API working - Found $($response.Count) students" -ForegroundColor Green
    if ($response.Count -gt 0) {
        Write-Host "   First student: $($response[0].firstName) $($response[0].lastName)" -ForegroundColor Cyan
    }
} catch {
    Write-Host "❌ Students API failed: $($_.Exception.Message)" -ForegroundColor Red
}

# Test Courses API
Write-Host "`nTesting Courses API..." -ForegroundColor Yellow
try {
    $response = Invoke-RestMethod -Uri "$apiBaseUrl/courses" -Method GET
    Write-Host "✅ Courses API working - Found $($response.Count) courses" -ForegroundColor Green
    if ($response.Count -gt 0) {
        Write-Host "   First course: $($response[0].courseCode) - $($response[0].courseName)" -ForegroundColor Cyan
    }
} catch {
    Write-Host "❌ Courses API failed: $($_.Exception.Message)" -ForegroundColor Red
}

# Test Lecturers API
Write-Host "`nTesting Lecturers API..." -ForegroundColor Yellow
try {
    $response = Invoke-RestMethod -Uri "$apiBaseUrl/lecturers" -Method GET
    Write-Host "✅ Lecturers API working - Found $($response.Count) lecturers" -ForegroundColor Green
    if ($response.Count -gt 0) {
        Write-Host "   First lecturer: $($response[0].firstName) $($response[0].lastName)" -ForegroundColor Cyan
    }
} catch {
    Write-Host "❌ Lecturers API failed: $($_.Exception.Message)" -ForegroundColor Red
}

# Test Fee Structures API
Write-Host "`nTesting Fee Structures API..." -ForegroundColor Yellow
try {
    $response = Invoke-RestMethod -Uri "$apiBaseUrl/fee-structures" -Method GET
    Write-Host "✅ Fee Structures API working - Found $($response.Count) fee structures" -ForegroundColor Green
    if ($response.Count -gt 0) {
        Write-Host "   Level $($response[0].level): GH₵$($response[0].amountDue)" -ForegroundColor Cyan
    }
} catch {
    Write-Host "❌ Fee Structures API failed: $($_.Exception.Message)" -ForegroundColor Red
}

Write-Host "`nAPI Testing Complete!" -ForegroundColor Green 