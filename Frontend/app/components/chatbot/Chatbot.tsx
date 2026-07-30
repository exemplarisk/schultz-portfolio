import React, { useEffect, useRef, useState, ChangeEvent, FormEvent } from "react";
import useChatbot from "../../hooks/useChatbot";

const SUGGESTIONS = [
  "What do you build?",
  "Where have you lived?",
  "How can I contact you?",
  "What's your stack?",
];

const Chatbot: React.FC = () => {
  const [userInput, setUserInput] = useState("");
  const { conversation, isBotTyping, sendMessageToChatbot } = useChatbot();
  const threadRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    const thread = threadRef.current;
    if (!thread) {
      return;
    }
    thread.scrollTop = thread.scrollHeight;
  }, [conversation, isBotTyping]);

  const handleUserInput = (event: ChangeEvent<HTMLInputElement>) => {
    setUserInput(event.target.value);
  };

  const submitMessage = (message: string) => {
    const value = message.trim();
    if (!value || isBotTyping) {
      return;
    }
    sendMessageToChatbot(value);
    setUserInput("");
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    submitMessage(userInput);
  };

  const statusLabel = isBotTyping
    ? "Assistant is thinking…"
    : conversation.length > 0
      ? "Conversation live"
      : "Awaiting your message";

  const statusState = isBotTyping ? "thinking" : conversation.length > 0 ? "ready" : "idle";

  return (
    <div className="ideaMachine chatbotPanel" aria-label="Digital assistant">
      <div className="ideaMachine__chrome">
        <div className="ideaMachine__traffic" aria-hidden="true">
          <span />
          <span />
          <span />
        </div>
        <p className="ideaMachine__title">Digital Assistant</p>
        <p className="ideaMachine__version">beta</p>
      </div>

      <div className="ideaMachine__body chatbotPanel__body">
        <div className="ideaMachine__statusRow">
          <span className={`ideaMachine__led ideaMachine__led--${statusState}`} aria-hidden="true" />
          <p className="ideaMachine__status" aria-live="polite">
            {statusLabel}
          </p>
          <span className="ideaMachine__runs" aria-hidden="true">
            msgs {String(conversation.length).padStart(2, "0")}
          </span>
        </div>

        <p className="chatbotPanel__disclaimer">
          Still in training. Answers can be off sometimes.
        </p>

        <div
          ref={threadRef}
          className="chatbotPanel__thread ideaMachine__output"
          role="log"
          aria-live="polite"
        >
          {conversation.length === 0 && !isBotTyping && (
            <p className="ideaMachine__placeholder">
              Ask about my work, background, or how to get in touch. I&apos;ll do my best.
            </p>
          )}

          {conversation.map((message, index) => (
            <div
              key={`${message.from}-${index}-${message.text.slice(0, 12)}`}
              className={`chatbotPanel__message chatbotPanel__message--${message.from}`}
            >
              <span className="chatbotPanel__sender">
                {message.from === "user" ? "You" : "Assistant"}
              </span>
              <p className="chatbotPanel__text">{message.text}</p>
            </div>
          ))}

          {isBotTyping && (
            <div className="chatbotPanel__message chatbotPanel__message--bot">
              <span className="chatbotPanel__sender">Assistant</span>
              <p className="ideaMachine__thinking" aria-label="Assistant is typing">
                <span />
                <span />
                <span />
              </p>
            </div>
          )}
        </div>

        <div className="ideaMachine__prompts" role="group" aria-label="Suggested questions">
          {SUGGESTIONS.map((suggestion) => (
            <button
              key={suggestion}
              type="button"
              className="ideaMachine__chip"
              disabled={isBotTyping}
              onClick={() => {
                setUserInput(suggestion);
                submitMessage(suggestion);
                inputRef.current?.focus();
              }}
            >
              {suggestion}
            </button>
          ))}
        </div>

        <form className="ideaMachine__form" onSubmit={handleSubmit}>
          <label className="ideaMachine__label" htmlFor="digital-assistant-input">
            Your message
          </label>
          <div className="ideaMachine__field">
            <input
              ref={inputRef}
              id="digital-assistant-input"
              className="ideaMachine__input"
              type="text"
              value={userInput}
              maxLength={500}
              autoComplete="off"
              placeholder="Ask me anything about Jonatan…"
              onChange={handleUserInput}
              disabled={isBotTyping}
            />
            <button
              type="submit"
              className="ideaMachine__submit"
              disabled={!userInput.trim() || isBotTyping}
            >
              Send
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Chatbot;
