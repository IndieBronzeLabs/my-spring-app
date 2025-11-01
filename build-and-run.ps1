Write-Host "================================================" -ForegroundColor Cyan
Write-Host "   React + Spring Boot 자동 빌드 스크립트" -ForegroundColor Cyan
Write-Host "================================================" -ForegroundColor Cyan
Write-Host ""

# 1. 스프링부트 프로세스 종료
Write-Host "🛑 기존 스프링부트 프로세스 종료 중..." -ForegroundColor Yellow
$javaProcesses = Get-Process java -ErrorAction SilentlyContinue
if ($javaProcesses) {
    $javaProcesses | ForEach-Object { Stop-Process -Id $_.Id -Force -ErrorAction SilentlyContinue }
    Start-Sleep -Seconds 2
    Write-Host "✅ 스프링부트 프로세스 종료 완료" -ForegroundColor Green
} else {
    Write-Host "✅ 실행 중인 프로세스 없음" -ForegroundColor Green
}
Write-Host ""

# 2. 빌드 폴더 삭제
Write-Host "🧹 기존 빌드 폴더 삭제 중..." -ForegroundColor Yellow
Remove-Item -Path "build" -Recurse -Force -ErrorAction SilentlyContinue
Remove-Item -Path "src\main\resources\static\*" -Recurse -Force -ErrorAction SilentlyContinue
Write-Host "✅ 빌드 폴더 삭제 완료" -ForegroundColor Green
Write-Host ""

# 3. React 빌드
Write-Host "⚛️  React 프로젝트 빌드 중..." -ForegroundColor Cyan
Set-Location -Path "frontend"

npm run build

if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ React 빌드 실패!" -ForegroundColor Red
    Set-Location -Path ".."
    exit 1
}

Write-Host "✅ React 빌드 완료" -ForegroundColor Green
Write-Host ""

# 4. static 폴더로 복사
Write-Host "📦 빌드 파일을 static 폴더로 복사 중..." -ForegroundColor Yellow
Copy-Item -Path "build\*" -Destination "..\src\main\resources\static" -Recurse -Force

# 복사 확인
if (Test-Path "..\src\main\resources\static\index.html") {
    Write-Host "✅ 파일 복사 완료" -ForegroundColor Green
} else {
    Write-Host "❌ 파일 복사 실패!" -ForegroundColor Red
    Set-Location -Path ".."
    exit 1
}

# 프로젝트 루트로 이동
Set-Location -Path ".."
Write-Host ""

# 5. 옵션: Gradle 빌드 여부 선택
Write-Host "🔨 Gradle 빌드를 수행하시겠습니까? (y/n)" -ForegroundColor Cyan
$gradleBuild = Read-Host "선택"

if ($gradleBuild -eq "y" -or $gradleBuild -eq "Y") {
    Write-Host "🔨 Gradle 빌드 중..." -ForegroundColor Cyan
    .\gradlew.bat clean build -x test

    if ($LASTEXITCODE -ne 0) {
        Write-Host "❌ Gradle 빌드 실패!" -ForegroundColor Red
        exit 1
    }
    Write-Host "✅ Gradle 빌드 완료" -ForegroundColor Green
    Write-Host ""
}

# 6. 스프링부트 실행 여부 선택
Write-Host "🚀 스프링부트를 실행하시겠습니까? (y/n)" -ForegroundColor Cyan
$runSpringBoot = Read-Host "선택"

if ($runSpringBoot -eq "y" -or $runSpringBoot -eq "Y") {
    Write-Host "🚀 스프링부트 실행 중..." -ForegroundColor Green
    Write-Host "💡 브라우저에서 http://localhost:8080 으로 접속하세요!" -ForegroundColor Yellow
    Write-Host "💡 종료하려면 Ctrl+C를 누르세요" -ForegroundColor Yellow
    Write-Host ""
    .\gradlew.bat bootRun
} else {
    Write-Host ""
    Write-Host "================================================" -ForegroundColor Cyan
    Write-Host "✅ 빌드 완료!" -ForegroundColor Green
    Write-Host "💡 실행하려면: .\gradlew.bat bootRun" -ForegroundColor Yellow
    Write-Host "💡 또는 IntelliJ에서 Run 버튼 클릭" -ForegroundColor Yellow
    Write-Host "================================================" -ForegroundColor Cyan
}