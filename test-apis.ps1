# Test Backend APIs
Write-Host "Testing Backend APIs..." -ForegroundColor Green

# Wait for application to start
Start-Sleep -Seconds 10

# Test endpoints
$baseUrl = "http://localhost:8081/api"

# Test Students API
Write-Host "`nTesting Students API..." -ForegroundColor Yellow
try {
    $response = Invoke-RestMethod -Uri "$baseUrl/students" -Method GET
    Write-Host "✅ Students API working - Found $($response.Count) students" -ForegroundColor Green
} catch {
    Write-Host "❌ Students API failed: $($_.Exception.Message)" -ForegroundColor Red
}

# Test Courses API
Write-Host "`nTesting Courses API..." -ForegroundColor Yellow
try {
    $response = Invoke-RestMethod -Uri "$baseUrl/courses" -Method GET
    Write-Host "✅ Courses API working - Found $($response.Count) courses" -ForegroundColor Green
} catch {
    Write-Host "❌ Courses API failed: $($_.Exception.Message)" -ForegroundColor Red
}

# Test Lecturers API
Write-Host "`nTesting Lecturers API..." -ForegroundColor Yellow
try {
    $response = Invoke-RestMethod -Uri "$baseUrl/lecturers" -Method GET
    Write-Host "✅ Lecturers API working - Found $($response.Count) lecturers" -ForegroundColor Green
} catch {
    Write-Host "❌ Lecturers API failed: $($_.Exception.Message)" -ForegroundColor Red
}

# Test Fee Structures API
Write-Host "`nTesting Fee Structures API..." -ForegroundColor Yellow
try {
    $response = Invoke-RestMethod -Uri "$baseUrl/fee-structures" -Method GET
    Write-Host "✅ Fee Structures API working - Found $($response.Count) fee structures" -ForegroundColor Green
} catch {
    Write-Host "❌ Fee Structures API failed: $($_.Exception.Message)" -ForegroundColor Red
}

Write-Host "`nAPI Testing Complete!" -ForegroundColor Green 