import { useRef } from "react";

export const ChatForm = ({
  setChatHistory,
  generateBotResponse,
  chatHistory,
}) => {
  const inputRef = useRef();

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const userMessage = inputRef.current.value.trim();
    if (!userMessage) return;
    inputRef.current.value = "";

    setChatHistory((history) => [
      ...history,
      {
        role: "user",
        text: userMessage,
      },
    ]);

    setTimeout(
      () =>
        setChatHistory((history) => [
          ...history,
          {
            role: "model",
            text: "Thinking....",
          },
        ]),
      generateBotResponse([
        ...chatHistory,
        {
          role: "user",
          text: `Using the details provided above, please adress this query ${userMessage}`,
        },
      ]),
      600
    );
  };

  return (
    <form action="#" className="chat-form" onSubmit={handleFormSubmit}>
      <input
        type="text"
        placeholder="Message..."
        className="message-input"
        required
        ref={inputRef}
      />
      <button type="submit" className="material-symbols-outlined">
        keyboard_arrow_up
      </button>
    </form>
  );
};
