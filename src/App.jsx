import { useEffect, useRef, useState } from "react";
import { ChatbotIcon } from "./components/ChatbotIcon";
import { ChatForm } from "./components/CHatForm";
import { ChatMessage } from "./components/ChatMessage";

export const App = () => {
  const [chatHistory, setChatHistory] = useState([]);
  const [showChatBot, setShowChatbot] = useState(false);
  const chatBodyRef = useRef();

  const updateHistory = (text, isError = false) => {
    setChatHistory((prev) => [
      ...prev.filter((msg) => msg.text != "Hmmmm...."),
      { role: "model", text, isError },
    ]);
  };

  // key API REQUEST
  const generateBotResponse = async (history) => {
    history = history?.map(({ role, text }) => ({ role, parts: [{ text }] }));
    const reguestResponse = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ contents: history }),
    };

    try {
      const respone = await fetch(
        import.meta.env.VITE_API_URL,
        reguestResponse
      );
      const data = await respone.json();

      if (!respone.ok) throw new Error(data.error.message || "Nåt hände fel");

      const apiResponseText = data.candidates[0].content.parts[0].text
        .replace(/\*\*(.*?)\*\*/g, "$1")
        .trim();

      updateHistory(apiResponseText);
    } catch (error) {
      updateHistory(error.message, true);
    }
  };

  useEffect(() => {
    chatBodyRef.current.scrollTo({
      top: chatBodyRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [chatHistory]);

  return (
    <div className={`container ${showChatBot ? "show-chatbot" : ""}`}>
      <button
        onClick={() => setShowChatbot((prev) => !prev)}
        id="chatbot-toogler"
      >
        <span className="material-symbols-outlined">mode_comment</span>
        <span className="material-symbols-outlined">close</span>
      </button>
      <div className="chatbot-popup">
        {/* Chatbot Header */}
        <div className="chat-header">
          <div className="header-info">
            <ChatbotIcon />
            <h2 className="logo-text">AI CHATBOT</h2>
          </div>
          <button
            onClick={() => setShowChatbot((prev) => !prev)}
            type="button"
            className="material-symbols-outlined"
          >
            keyboard_arrow_down
          </button>
        </div>

        {/* Chatbot Body */}
        <div ref={chatBodyRef} className="chat-body">
          <div className="message bot-message">
            <ChatbotIcon />
            <p className="message-text">AI CHATBOT</p>
          </div>
          {/* Render chat history dynamisk text */}
          {chatHistory.map((chat, index) => (
            <ChatMessage key={index} chat={chat} />
          ))}
        </div>

        {/* Chatbot Footer */}
        <div className="chat-footer">
          <ChatForm
            chatHistory={chatHistory}
            setChatHistory={setChatHistory}
            generateBotResponse={generateBotResponse}
          />
        </div>
      </div>
    </div>
  );
};
