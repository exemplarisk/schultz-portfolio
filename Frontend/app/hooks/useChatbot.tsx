import { useState, useCallback } from "react";

type Message = {
  from: "user" | "bot";
  text: string;
};

const useChatbot = () => {
  const [conversation, setConversation] = useState<Message[]>([]);
  const [isBotTyping, setIsBotTyping] = useState(false);

  const sendMessageToChatbot = useCallback(async (message: string) => {
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
        let friendly = "Sorry, something went wrong. Please try again later.";
        try {
          const err = await response.json();
          if (response.status === 429) {
            friendly =
              "The assistant is temporarily unavailable due to rate limits or quota. Please try again in a bit.";
          }
          console.error("Chatbot API error:", err);
        } catch {}
        setConversation((prev) => [
          ...prev,
          { from: "user", text: message },
          { from: "bot", text: friendly },
        ]);
        return;
      }

      const data = await response.json();
      const botMessage: string = data.botMessage;

      setConversation((prevConversations) => [
        ...prevConversations,
        { from: "user", text: message },
        { from: "bot", text: botMessage },
      ]);
    } catch (error) {
      console.error("Error during chatbot communication:", error);
      setConversation((prev) => [
        ...prev,
        { from: "user", text: message },
        { from: "bot", text: "Sorry, something went wrong. Please try again later." },
      ]);
    } finally {
      setIsBotTyping(false);
    }
  }, []);

  return { conversation, isBotTyping, sendMessageToChatbot };
};

export default useChatbot;