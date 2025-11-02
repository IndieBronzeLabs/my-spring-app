# quick-build-run-ai.ps1

Write-Host "🚀 스프링 + 리액트 빠른 빌드 시작..." -ForegroundColor Cyan

# 1. 기존 quick-build.ps1 실행 (React 빌드 + static 복사)
.\quick-build.ps1
if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ 빌드 실패! AI 서버는 실행하지 않습니다." -ForegroundColor Red
    exit 1
}

Write-Host ""
Write-Host "🤖 AI(FastAPI) 서버 실행 준비..." -ForegroundColor Cyan

# 2. AI 프로젝트 폴더로 이동
Set-Location -Path "book-ai-bot"

# 3. 가상환경 활성화
.\.venv\Scripts\Activate.ps1

# 4. FastAPI 서버 실행
uvicorn main:app --reload --port 8010
