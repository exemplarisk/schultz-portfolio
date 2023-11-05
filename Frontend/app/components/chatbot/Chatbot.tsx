import React, {
  useEffect,
  useRef,
  useState,
  ChangeEvent,
  FormEvent,
} from "react";

type Message = {
  from: "user" | "bot";
  text: string;
};

const ChatbotComponent: React.FC = () => {
  const [userInput, setUserInput] = useState<string>("");
  const [conversation, setConversation] = useState<Message[]>([]);
  const [isBotTyping, setIsBotTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "center",
    });
  };

  useEffect(() => {
    scrollToBottom();
  }, [conversation]);

  const sendMessageToChatbot = async (message: string) => {
    setIsBotTyping(true);
    try {
      const response = await fetch("/api/chatbot", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message }),
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      const botMessage: string = data.botMessage;
      setConversation((prevConversations) => [
        ...prevConversations,
        { from: "user", text: message },
        { from: "bot", text: botMessage },
      ]);
      setIsBotTyping(false);
    } catch (error) {
      console.error("Error during chatbot communication:", error);
    }
  };

  const handleUserInput = (event: ChangeEvent<HTMLInputElement>) => {
    setUserInput(event.target.value);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    sendMessageToChatbot(userInput);
    setUserInput("");
  };

  return (
    <div>
      <div className="chatbot-header">
        <h2>OR have a conversation with my digital assistant</h2>
        <p className="chatbot-disclaimer">
          Kindly note that my assistant is undergoing training.. Responses may not always be completely accurate.
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
        <div id="scrollref" ref={messagesEndRef} />
        {isBotTyping && (
          <div className="chatbot-message bot-typing">
            Hang on, im typing...
          </div>
        )}
      </div>
      <form onSubmit={handleSubmit} className="chatbot-form">
        <input
          className="chatbot-input"
          type="text"
          value={userInput}
          onChange={handleUserInput}
          placeholder="Ask your question here..."
        />
        <button className="chatbot-button" type="submit">
          Send
        </button>
      </form>
    </div>
  );
};

export default ChatbotComponent;