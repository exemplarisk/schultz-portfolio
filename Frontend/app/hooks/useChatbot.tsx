import { useState, useCallback } from "react";

type Message = {
  from: "user" | "bot";
  text: string;
};

const useChatbot = () => {
  const [conversation, setConversation] = useState<Message[]>([]);
  const [isBotTyping, setIsBotTyping] = useState(false);

  const sendMessageToChatbot = useCallback(async (message: string) => {
    const trimmed = message.trim();
    if (!trimmed) {
      return;
    }

    setConversation((prev) => [...prev, { from: "user", text: trimmed }]);
    setIsBotTyping(true);

    try {
      const response = await fetch("/api/chatbot", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: trimmed }),
      });

      let payload: { botMessage?: string; error?: string } = {};
      try {
        payload = await response.json();
      } catch {
        payload = {};
      }

      if (!response.ok) {
        if (response.status === 429) {
          console.error("Chatbot API rate limited:", payload);
        } else {
          console.error("Chatbot API error:", payload);
        }

        setConversation((prev) => [
          ...prev,
          {
            from: "bot",
            text:
              payload.botMessage ||
              (response.status === 429
                ? "The assistant is temporarily unavailable due to rate limits or quota. Please try again in a bit."
                : "Sorry, something went wrong. Please try again later."),
          },
        ]);
        return;
      }

      const botMessage = payload.botMessage?.trim();
      setConversation((prev) => [
        ...prev,
        {
          from: "bot",
          text: botMessage || "I blanked for a second. Please try that question again.",
        },
      ]);
    } catch (error) {
      console.error("Error during chatbot communication:", error);
      setConversation((prev) => [
        ...prev,
        {
          from: "bot",
          text: "Sorry, something went wrong. Please try again later.",
        },
      ]);
    } finally {
      setIsBotTyping(false);
    }
  }, []);

  return { conversation, isBotTyping, sendMessageToChatbot };
};

export default useChatbot;
