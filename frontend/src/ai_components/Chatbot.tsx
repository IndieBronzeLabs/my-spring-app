import React, { useState, useEffect, useRef } from "react";
import { MessageCircle, X, Send, Bot } from "lucide-react";

type ChatMessage = {
    role: "user" | "assistant";
    content: string;
};

const Chatbot: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<ChatMessage[]>([
        {
            role: "assistant",
            content:
                "안녕하세요. 📚\n읽고 싶은 분위기나 주제, 최근에 인상 깊게 읽은 책이 있다면 말씀해 주세요.",
        },
    ]);
    const [input, setInput] = useState("");
    const [isSending, setIsSending] = useState(false);
    const [error, setError] = useState("");
    const scrollRef = useRef<HTMLDivElement | null>(null);

    const userId = null; // 필요하면 나중에 로그인 정보랑 연동

    // 메시지 추가 시 스크롤을 맨 아래로
    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages, isOpen]);

    const toggleOpen = () => {
        setIsOpen((prev) => !prev);
        setError("");
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const trimmed = input.trim();
        if (!trimmed || isSending) return;

        const newUserMessage: ChatMessage = {
            role: "user",
            content: trimmed,
        };

        setMessages((prev) => [...prev, newUserMessage]);
        setInput("");
        setIsSending(true);
        setError("");

        try {
            // ✅ 로컬/서버 분기
            const isLocal = window.location.hostname === "localhost";
            const API_BASE = isLocal ? "http://localhost:8010" : ""; // 로컬: 8010, AWS: nginx 통해 같은 도메인

            const res = await fetch(`${API_BASE}/ai/chat/simple`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    message: trimmed,
                    user_id: userId, // 필요 없으면 null 또는 생략 가능
                }),
            });

            if (!res.ok) {
                throw new Error("서버 응답이 올바르지 않습니다.");
            }

            const data = await res.json();
            const replyText: string =
                data?.reply ?? "죄송해요, 잠시 후 다시 시도해 주세요.";

            const botMessage: ChatMessage = {
                role: "assistant",
                content: replyText,
            };

            setMessages((prev) => [...prev, botMessage]);
        } catch (err: any) {
            console.error(err);
            setError(
                "⚠️ 서버 요청 중 오류가 발생했어요. 잠시 후 다시 시도해 주세요."
            );
        } finally {
            setIsSending(false);
        }
    };

    return (
        <div className="fixed bottom-6 right-6 z-50">
            {/* 열려 있을 때의 채팅창 */}
            {isOpen && (
                <div className="mb-3 w-[360px] h-[480px] rounded-2xl shadow-2xl border border-zinc-800/70 bg-zinc-950/90 backdrop-blur-xl flex flex-col overflow-hidden">
                    {/* 헤더 */}
                    <div className="flex items-center justify-between px-4 py-3 border-b border-zinc-800/80 bg-gradient-to-r from-zinc-900/80 via-zinc-900/80 to-zinc-800/70">
                        <div className="flex items-center space-x-3">
                            <div className="w-8 h-8 rounded-full bg-zinc-100 flex items-center justify-center">
                                <Bot className="w-4 h-4 text-zinc-900" />
                            </div>
                            <div>
                                <div className="text-xs uppercase tracking-[0.18em] text-zinc-400">
                                    BIBLIOTHECA
                                </div>
                                <div className="text-sm text-zinc-100">
                                    도서 큐레이션 어시스턴트
                                </div>
                            </div>
                        </div>
                        <button
                            onClick={toggleOpen}
                            className="p-1.5 rounded-full hover:bg-zinc-700/60 transition-colors text-zinc-300"
                        >
                            <X className="w-4 h-4" />
                        </button>
                    </div>

                    {/* 메시지 영역 */}
                    <div
                        ref={scrollRef}
                        className="flex-1 px-4 py-3 space-y-3 overflow-y-auto text-sm"
                    >
                        {messages.map((m, idx) => (
                            <div
                                key={idx}
                                className={`flex ${
                                    m.role === "user" ? "justify-end" : "justify-start"
                                }`}
                            >
                                {m.role === "assistant" && (
                                    <div className="mr-2 mt-1 flex items-start">
                                        <div className="w-6 h-6 rounded-full bg-zinc-800 flex items-center justify-center">
                                            <Bot className="w-3 h-3 text-zinc-200" />
                                        </div>
                                    </div>
                                )}
                                <div
                                    className={`max-w-[80%] whitespace-pre-wrap leading-relaxed rounded-2xl px-3 py-2 border text-[13px] ${
                                        m.role === "user"
                                            ? "bg-gradient-to-r from-zinc-100 to-zinc-200 text-zinc-900 border-zinc-200"
                                            : "bg-zinc-900/80 text-zinc-100 border-zinc-800"
                                    }`}
                                    style={{
                                        fontFamily:
                                            "'Noto Sans KR', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
                                        fontWeight: 300,
                                    }}
                                >
                                    {m.content}
                                </div>
                            </div>
                        ))}

                        {isSending && (
                            <div className="flex items-center text-xs text-zinc-500 mt-2">
                                <div className="w-2 h-2 rounded-full bg-zinc-500 animate-pulse mr-1" />
                                생각을 정리하는 중이에요…
                            </div>
                        )}

                        {error && (
                            <div className="mt-2 text-xs text-amber-300 bg-amber-900/40 border border-amber-700/60 rounded-lg px-3 py-2">
                                {error}
                            </div>
                        )}
                    </div>

                    {/* 입력 영역 */}
                    <form
                        onSubmit={handleSubmit}
                        className="border-t border-zinc-800/80 bg-zinc-950/90 px-3 py-2"
                    >
                        <div className="flex items-end space-x-2">
              <textarea
                  className="flex-1 resize-none bg-transparent text-sm text-zinc-100 placeholder-zinc-500 outline-none border border-zinc-700/80 rounded-xl px-3 py-2 max-h-24 min-h-[40px] scrollbar-thin scrollbar-thumb-zinc-700 scrollbar-track-transparent"
                  rows={1}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="예: ‘조금 무거운데 재밌게 읽히는 역사책 추천해줘’"
              />
                            <button
                                type="submit"
                                disabled={!input.trim() || isSending}
                                className="w-9 h-9 rounded-full bg-zinc-100 text-zinc-900 flex items-center justify-center hover:bg-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                <Send className="w-4 h-4" />
                            </button>
                        </div>
                    </form>
                </div>
            )}

            {/* 플로팅 버튼 */}
            <button
                onClick={toggleOpen}
                className="w-14 h-14 rounded-full shadow-2xl bg-zinc-900 text-zinc-100 flex items-center justify-center hover:bg-zinc-800 transition-all duration-300 border border-zinc-700/80 relative"
            >
                <MessageCircle className="w-6 h-6" />
                {/* 작은 뱃지 */}
                <span className="absolute -top-1 -right-1 text-[9px] px-2 py-0.5 rounded-full bg-emerald-500 text-zinc-950 font-semibold tracking-wide">
          AI
        </span>
            </button>
        </div>
    );
};

export default Chatbot;
