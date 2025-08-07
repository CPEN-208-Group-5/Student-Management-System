# Simple Integration Test
Write-Host "Testing Integration..." -ForegroundColor Green

# Test backend connectivity
try {
    $response = Invoke-RestMethod -Uri "http://localhost:8081/api/students" -Method GET -TimeoutSec 10
    Write-Host "✅ Backend connected - Found $($response.Count) students" -ForegroundColor Green
} catch {
    Write-Host "❌ Backend connection failed: $($_.Exception.Message)" -ForegroundColor Red
    Write-Host "   Please ensure the backend is running on port 8081" -ForegroundColor Yellow
}

# Test registration endpoint
$testData = @{
    email = "test@example.com"
    password = "testpass123"
    first_name = "Test"
    last_name = "User"
    program = "Computer Engineering"
    year_of_study = "400"
}

try {
    $response = Invoke-RestMethod -Uri "http://localhost:8081/api/auth/register/student" -Method POST -Body ($testData | ConvertTo-Json) -ContentType "application/json" -TimeoutSec 10
    Write-Host "✅ Registration successful" -ForegroundColor Green
    Write-Host "   User ID: $($response.user.id)" -ForegroundColor Cyan
} catch {
    Write-Host "❌ Registration failed: $($_.Exception.Message)" -ForegroundColor Red
}

Write-Host "`n🎉 Integration test complete!" -ForegroundColor Green 