Write-Host "🚀 빠른 빌드 시작..." -ForegroundColor Cyan

# 기존 프로세스 종료
Get-Process java -ErrorAction SilentlyContinue | Stop-Process -Force -ErrorAction SilentlyContinue

# 폴더 삭제
Remove-Item -Path "build" -Recurse -Force -ErrorAction SilentlyContinue
Remove-Item -Path "src\main\resources\static\*" -Recurse -Force -ErrorAction SilentlyContinue

# React 빌드
Set-Location -Path "frontend"
npm run build
if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ 빌드 실패!" -ForegroundColor Red
    Set-Location -Path ".."
    exit 1
}

# 복사
Copy-Item -Path "build\*" -Destination "..\src\main\resources\static" -Recurse -Force
Set-Location -Path ".."

Write-Host "✅ 빌드 완료!" -ForegroundColor Green
Write-Host "💡 IntelliJ에서 Run 버튼을 눌러주세요!" -ForegroundColor Yellow