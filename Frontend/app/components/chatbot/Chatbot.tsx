import React, { useState, ChangeEvent, FormEvent } from "react";
import useChatbot from '../../hooks/useChatbot';

const Chatbot: React.FC = () => {
  const [userInput, setUserInput] = useState<string>("");
  const { conversation, isBotTyping, sendMessageToChatbot } = useChatbot();

  const handleUserInput = (event: ChangeEvent<HTMLInputElement>) => {
    setUserInput(event.target.value);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (userInput.trim()) {
      sendMessageToChatbot(userInput);
      setUserInput("");
    }
  };

  return (
    <div className="chatbot-container">
      <div className="chatbot-header">
        <h2>OR have a conversation with my digital assistant</h2>
        <p className="chatbot-disclaimer">
          Kindly note that my assistant is undergoing training.. Responses may
          not always be completely accurate.
        </p>
      </div>
      <div className="chatbot-conversation">
        {conversation.length === 0 && (
          <div className="chat-history-placeholder">
            Your conversation will appear here...
          </div>
        )}
        {conversation.map((message, index) => (
          <div key={index} className={`chatbot-message ${message.from}`}>
            <span className="message-sender">
              {message.from === "user" ? "You" : "AI"}:
            </span>
            {message.text}
          </div>
        ))}
        {isBotTyping && (
          <div className="chatbot-message bot-typing">
            Hang on, I'm typing...
          </div>
        )}
      </div>
      <form onSubmit={handleSubmit} className="chatbot-form">
        <input
          className="chatbot-input"
          type="text"
          value={userInput}
          onChange={handleUserInput}
          placeholder="I'm here to help! What can I do for you?"
        />
        <button className="chatbot-button" type="submit">
          Send
        </button>
      </form>
    </div>
  );
};

export default Chatbot;