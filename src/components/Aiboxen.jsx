import { useEffect, useRef, useState } from "react";
import { ChatbotIcon } from "./ChatbotIcon";
import { ChatForm } from "./CHatForm";
import { ChatMessage } from "./ChatMessage";
import { companyInfo } from "./companyinfo";

export const Aiboxen = () => {
  // gör denna till en komponent iställt så man kan sätta inbäddad script
  const [chatHistory, setChatHistory] = useState([
    {
      hideInChat: true,
      role: "model",
      text: companyInfo,
    },
  ]);
  const [showChatBot, setShowChatbot] = useState(false);
  const chatBodyRef = useRef();

  const updateHistory = (text, isError = false) => {
    setChatHistory((prev) => [
      ...prev.filter((msg) => msg.text != "Thinking...."),
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
            <h2 className="logo-text">DLC T PIXE SYSTEM</h2>
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
            <p className="message-text">
              Hi there! 👋 Welcome to DLC-PIXE-SYSTEM. Are you looking for help
              to grow or improve your business with expert frontend or fullstack
              development?
            </p>
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
