// @ts-ignore
import React, { useState } from "react";

type ChatMessage = {
    role: "user" | "assistant";
    text: string;
};

const Chatbot: React.FC = () => {
    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const [input, setInput] = useState("");
    const [loading, setLoading] = useState(false);

    // 나중에 로그인 사용자 ID나 세션 값 넣고 싶으면 여기서 꺼내서 넘기면 됨
    const userId: number | null = null;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const trimmed = input.trim();
        if (!trimmed || loading) return;

        // 1) 사용자 메시지를 화면에 추가
        const userMsg: ChatMessage = { role: "user", text: trimmed };
        setMessages((prev) => [...prev, userMsg]);
        setInput("");
        setLoading(true);

        const isLocal = window.location.hostname === "localhost";
        const API_BASE = isLocal ? "http://localhost:8010" : ""; // 로컬에서는 localhost의 8010포트 : AWS에서는 nginx 통해 같은 도메인으로 감

        try {
            // 2) 백엔드(FastAPI)로 요청
            const res = await fetch(`${API_BASE}/ai/chat/simple`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    message: trimmed,
                    user_id: userId, // 필요 없으면 null 또는 생략 가능
                }),
            });

            if (!res.ok) {
                throw new Error(`HTTP error: ${res.status}`);
            }

            const data = await res.json();
            const replyText: string = data.reply ?? "(응답이 없습니다.)";

            const aiMsg: ChatMessage = { role: "assistant", text: replyText };
            setMessages((prev) => [...prev, aiMsg]);
        } catch (err) {
            console.error(err);
            setMessages((prev) => [
                ...prev,
                {
                    role: "assistant",
                    text: "⚠️ 서버 요청 중 오류가 발생했어요. 잠시 후 다시 시도해주세요.",
                },
            ]);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div
            style={{
                border: "1px solid #ddd",
                borderRadius: 8,
                width: 400,
                height: 500,
                display: "flex",
                flexDirection: "column",
                backgroundColor: "#fafafa",
                fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI'",
            }}
        >
            {/* 헤더 */}
            <div
                style={{
                    padding: "8px 12px",
                    borderBottom: "1px solid #eee",
                    fontWeight: 600,
                    fontSize: 14,
                }}
            >
                🤖 도서 추천 챗봇
            </div>

            {/* 메시지 영역 */}
            <div
                style={{
                    flex: 1,
                    padding: 12,
                    overflowY: "auto",
                    display: "flex",
                    flexDirection: "column",
                    gap: 8,
                }}
            >
                {messages.length === 0 && (
                    <div style={{ color: "#999", fontSize: 13 }}>
                        읽고 싶은 책이나 상황을 입력해 보세요.
                    </div>
                )}

                {messages.map((m, idx) => (
                    <div
                        key={idx}
                        style={{
                            alignSelf: m.role === "user" ? "flex-end" : "flex-start",
                            maxWidth: "75%",
                            padding: "8px 10px",
                            borderRadius: 12,
                            backgroundColor: m.role === "user" ? "#4f46e5" : "white",
                            color: m.role === "user" ? "white" : "#111827",
                            fontSize: 13,
                            whiteSpace: "pre-wrap",
                        }}
                    >
                        {m.text}
                    </div>
                ))}

                {loading && (
                    <div
                        style={{
                            alignSelf: "flex-start",
                            fontSize: 12,
                            color: "#666",
                        }}
                    >
                        ...생각 중...
                    </div>
                )}
            </div>

            {/* 입력 영역 */}
            <form
                onSubmit={handleSubmit}
                style={{
                    display: "flex",
                    gap: 8,
                    padding: 8,
                    borderTop: "1px solid #eee",
                }}
            >
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="메시지를 입력하세요"
                    style={{
                        flex: 1,
                        padding: "6px 8px",
                        fontSize: 13,
                        borderRadius: 6,
                        border: "1px solid #ddd",
                    }}
                />
                <button
                    type="submit"
                    disabled={loading || !input.trim()}
                    style={{
                        padding: "6px 12px",
                        fontSize: 13,
                        borderRadius: 6,
                        border: "none",
                        backgroundColor:
                            loading || !input.trim() ? "#ccc" : "#2563eb",
                        color: "white",
                        cursor:
                            loading || !input.trim() ? "not-allowed" : "pointer",
                    }}
                >
                    전송
                </button>
            </form>
        </div>
    );
};

export default Chatbot;
