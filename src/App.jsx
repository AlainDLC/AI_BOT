import { ChatbotIcon } from "./components/ChatbotIcon";

export const App = () => {
  return (
    <div className="container">
      <div className="chatbot-popup">
        {/* Chatbot Header */}
        <div className="chat-header">
          <div className="header-info">
            <ChatbotIcon />
            <h2 className="logo-text">AI CHATBOT</h2>
          </div>
          <button type="button" className="material-symbols-outlined">
            keyboard_arrow_down
          </button>
        </div>

        {/* Chatbot Body */}
        <div className="chat-body">
          <div className="message bot-message">
            <ChatbotIcon />
            <p className="message-text">
              Hola, 😀 ¿en qué puedo asistirle el día de hoy?
            </p>
          </div>
          <div className="message user-message">
            <p className="message-text">👑👑👑👑👑👑 Lorem ipsum dolor</p>
          </div>
        </div>

        {/* Chatbot Footer */}
        <div className="chat-footer">
          <form action="#" className="chat-form">
            <input
              type="text"
              placeholder="Message..."
              className="message-input"
              required
            />
            <button type="submit" className="material-symbols-outlined">
              keyboard_arrow_up
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
