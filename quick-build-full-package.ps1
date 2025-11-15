# quick-build-full-package.ps1
# React 빌드 → static 복사 (quick-build.ps1) → Spring Boot JAR 빌드(Gradle)까지 한 번에

Write-Host "🚀 전체 빌드 & 패키징 시작 (React → static → Spring Boot JAR)..." -ForegroundColor Cyan

# 0. 기존 java 프로세스 종료 (로컬 개발 서버 정리용, 선택)
Write-Host "🧹 기존 java 프로세스 종료 시도..." -ForegroundColor DarkGray
Get-Process java -ErrorAction SilentlyContinue | Stop-Process -Force -ErrorAction SilentlyContinue

# 1. React 빌드 + static 복사 (기존 quick-build.ps1 재사용)
if (-Not (Test-Path ".\quick-build.ps1")) {
    Write-Host "❌ quick-build.ps1 파일을 찾을 수 없습니다. 루트 경로에서 실행 중인지 확인하세요." -ForegroundColor Red
    exit 1
}

Write-Host ""
Write-Host "📦 1/2단계: React 빌드 + static 복사 (quick-build.ps1 실행 중)..." -ForegroundColor Yellow
.\quick-build.ps1
if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ quick-build.ps1 실행 중 오류 발생 - JAR 빌드를 중단합니다." -ForegroundColor Red
    exit 1
}

Write-Host "✅ React 빌드 및 static 복사 완료!" -ForegroundColor Green

# 2. Spring Boot JAR 빌드 (Gradle)
Write-Host ""
Write-Host "🛠 2/2단계: Spring Boot JAR 빌드 시작 (Gradle bootJar)..." -ForegroundColor Yellow

# gradlew.bat 기준 (Windows)
if (Test-Path ".\gradlew.bat") {
    Write-Host "➡ gradlew.bat bootJar 실행..." -ForegroundColor DarkGray
    .\gradlew.bat clean bootJar
}
elseif (Test-Path ".\gradlew") {
    Write-Host "➡ gradlew bootJar 실행..." -ForegroundColor DarkGray
    .\gradlew clean bootJar
}
else {
    Write-Host "❌ gradlew(.bat) 파일을 찾을 수 없습니다. Gradle wrapper를 생성했는지 확인하세요." -ForegroundColor Red
    Write-Host "   (gradle wrapper 또는 IDE에서 'Gradle wrapper' 실행)" -ForegroundColor DarkGray
    exit 1
}

if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Gradle 빌드 실패! (clean bootJar)" -ForegroundColor Red
    exit 1
}

Write-Host "✅ Spring Boot JAR 빌드 완료!" -ForegroundColor Green

# 3. build/libs에서 최신 JAR 찾기
Write-Host ""
Write-Host "🔍 build/libs 아래의 최신 JAR 파일 검색 중..." -ForegroundColor DarkGray

$jarFiles = Get-ChildItem -Path "build\libs" -Filter "*.jar" -ErrorAction SilentlyContinue | Sort-Object LastWriteTime -Descending

if (-Not $jarFiles -or $jarFiles.Count -eq 0) {
    Write-Host "⚠️ build/libs 폴더에서 JAR 파일을 찾지 못했습니다." -ForegroundColor Red
    Write-Host "   ▶ build.gradle에서 bootJar 설정과 output 경로를 확인해 주세요." -ForegroundColor DarkGray
    exit 1
}

$latestJar = $jarFiles[0].FullName
$latestJarName = $jarFiles[0].Name

Write-Host "📁 생성된 최신 JAR 파일:" -ForegroundColor Cyan
Write-Host "    $latestJar" -ForegroundColor White

Write-Host ""
Write-Host "✨ 이제 이 JAR 파일을 서버로 업로드해서 실행하면 됩니다." -ForegroundColor Green
Write-Host ""
Write-Host "예시 (Git Bash/WSL/Linux 기준 명령):" -ForegroundColor Yellow
Write-Host "  scp `"$latestJar`" ubuntu@YOUR_SERVER_IP:/opt/myapp/app.jar" -ForegroundColor DarkGray
Write-Host "  ssh ubuntu@YOUR_SERVER_IP 'pkill -f app.jar || true && nohup java -jar /opt/myapp/app.jar > /opt/myapp/app.log 2>&1 &'" -ForegroundColor DarkGray

Write-Host ""
Write-Host "🏁 quick-build-full-package.ps1 완료!" -ForegroundColor Cyan
