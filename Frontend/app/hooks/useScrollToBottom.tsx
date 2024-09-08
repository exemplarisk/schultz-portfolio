import { useEffect, useRef, useState, useCallback } from "react";

const useScrollToBottom = (dependency: any) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
    });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [dependency, scrollToBottom]);

  return messagesEndRef;
};

export default useScrollToBottom;