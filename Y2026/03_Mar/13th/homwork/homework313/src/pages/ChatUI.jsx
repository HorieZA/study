import "@styles/chat.css";
import { useState } from "react";
import { api } from "@utils/network.js";

export default function ChatUI() {
  const [messages, setMessages] = useState([
    { role: "assistant", content: "안녕하세요! 무엇을 도와드릴까요?" }
  ]);
  const [input, setInput] = useState("");

  const sendMessage = async () => {
  if (!input.trim()) return;

  const userMessage = { role: "user", content: input };

  // 사용자 메시지 먼저 추가
  setMessages(prev => [...prev, userMessage]);
  setInput("");

  try {
    const res = await api.post("/webhook-test/homework", {
      message: input
    });

    const botMessage = {
      role: "assistant",
      content: res.data.content
    };

    setMessages(prev => [...prev, botMessage]);

  } catch (err) {
    console.log(err);
  }
};

  return (
    <div className="app">

      {/* Sidebar */}
      <aside className="sidebar">
        <h2>Chat</h2>
        <button className="newChat">+ New Chat</button>
      </aside>

      {/* Chat Area */}
      <main className="chat">

        <div className="messages">
          {messages.map((m,i)=>(
            <div key={i} className={`msg ${m.role}`}>
              {m.content}
            </div>
          ))}
        </div>

        {/* Input */}
        <div className="inputArea">
          <input
            value={input}
            onChange={(e)=>setInput(e.target.value)}
            placeholder="메시지를 입력하세요..."
          />
          <button onClick={sendMessage}>Send</button>
        </div>

      </main>
    </div>
  );
}