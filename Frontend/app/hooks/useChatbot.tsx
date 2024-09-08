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
      if (!response.ok) throw new Error("Network response was not ok");

      const data = await response.json();
      const botMessage: string = data.botMessage;

      setConversation((prevConversations) => [
        ...prevConversations,
        { from: "user", text: message },
        { from: "bot", text: botMessage },
      ]);
    } catch (error) {
      console.error("Error during chatbot communication:", error);
    } finally {
      setIsBotTyping(false);
    }
  }, []);

  return { conversation, isBotTyping, sendMessageToChatbot };
};

export default useChatbot;