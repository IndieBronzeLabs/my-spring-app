from fastapi import FastAPI
from pydantic import BaseModel
from typing import Optional
from dotenv import load_dotenv
from openai import OpenAI
import os
from fastapi.middleware.cors import CORSMiddleware

load_dotenv()
client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

app = FastAPI(
    title="Book AI Test API",
    docs_url="/ai/docs",          # ★ Swagger 문서 경로
    openapi_url="/ai/openapi.json"  # ★ OpenAPI JSON 경로
)


# CORS 추가
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:8080",   # 스프링이 띄운 페이지
        "http://localhost:3000",   # 혹시 CRA dev 서버 쓸 때
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class ChatRequest(BaseModel):
    message: str
    user_id: Optional[int] = None

class ChatResponse(BaseModel):
    reply: str

@app.post("/ai/chat/simple", response_model=ChatResponse)
async def simple_chat(req: ChatRequest):
    completion = client.chat.completions.create(
        model="gpt-4.1-mini",
        messages=[
            {
                "role": "system",
                "content": "너는 한국어로 대답하는 친절한 도서 추천 도우미야."
            },
            {"role": "user", "content": req.message},
        ],
        temperature=0.7,
    )
    reply = completion.choices[0].message.content
    return ChatResponse(reply=reply)
