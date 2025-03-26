import { useState, useEffect, useRef, useCallback } from "react";
import { Entry, Message } from "../types";
import { useSalesforceMessaging } from "./useSalesforceMessaging";

const INACTIVITY_TIMEOUT = 5 * 60 * 1000; // 5 minutes

export function useChat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isConnected, setIsConnected] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [currentAgent, setCurrentAgent] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const eventSourceRef = useRef<EventSource | null>(null);
  const credsRef = useRef<{
    accessToken: string;
    conversationId: string;
  } | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const isInitializedRef = useRef(false);

  const {
    initialize,
    sendMessage: sendMessageToApi,
    closeChat: closeChatApi,
    setupEventSource,
  } = useSalesforceMessaging();

  const resetTimeout = useCallback(() => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);

    timeoutRef.current = setTimeout(async () => {
      if (!credsRef.current || !isConnected) return;

      try {
        await closeChatApi(
          credsRef.current.accessToken,
          credsRef.current.conversationId
        );
        setIsConnected(false);
        setMessages((prev) => [
          ...prev,
          {
            id: crypto.randomUUID(),
            type: "system",
            content: "Chat ended due to inactivity",
            timestamp: new Date(),
          },
        ]);
      } catch (err) {
        console.error("Failed to end chat:", err);
      }
    }, INACTIVITY_TIMEOUT);
  }, [isConnected, closeChatApi]);

  const handleMessage = useCallback(
    (event: MessageEvent) => {
      try {
        const data = JSON.parse(event.data);
        console.log('Received event data:', data);
        
        const sender = data.conversationEntry.sender.role.toLowerCase();
        if (sender === "chatbot") {
          setIsTyping(false);
          const payload = JSON.parse(data.conversationEntry.entryPayload);
          console.log('New message:', {
            sender,
            content: payload.abstractMessage.staticContent.text,
            timestamp: new Date(data.conversationEntry.clientTimestamp)
          });
          
          setMessages((prev) => [...prev, {
            id: payload.abstractMessage.id,
            type: "ai",
            content: payload.abstractMessage.staticContent.text,
            timestamp: new Date(data.conversationEntry.clientTimestamp),
          }]);
          setIsLoading(false);
          resetTimeout();
        }
      } catch (err) {
        console.error("Message parse error:", err);
      }
    },
    [resetTimeout]
  );

  const handleParticipantChange = useCallback((event: MessageEvent) => {
    const data = JSON.parse(event.data);
    const entries = JSON.parse(data.conversationEntry.entryPayload).entries;

    entries.forEach((entry: Entry) => {
      if (
        entry.operation === "add" &&
        entry.participant.role.toLowerCase() === "chatbot"
      ) {
        setCurrentAgent(entry.displayName);
        setMessages((prev) => [
          ...prev,
          {
            id: crypto.randomUUID(),
            type: "system",
            content: `${entry.displayName} has joined the chat`,
            timestamp: new Date(),
          },
        ]);
      }
      if (entry.operation === "remove" && entry.participant.role === "agent") {
        setCurrentAgent(null);
        setMessages((prev) => [
          ...prev,
          {
            id: crypto.randomUUID(),
            type: "system",
            content: `${entry.displayName} has left the chat`,
            timestamp: new Date(),
          },
        ]);
      }
    });
  }, []);

  const setupEventHandlers = useCallback(
    (events: EventSource) => {
      events.onopen = () => {
        setIsConnected(true);
        setError(null);
        resetTimeout();
      };

      events.onerror = () => setIsConnected(false);

      events.addEventListener("CONVERSATION_MESSAGE", handleMessage);
      events.addEventListener(
        "CONVERSATION_PARTICIPANT_CHANGED",
        handleParticipantChange
      );
      events.addEventListener("CONVERSATION_TYPING_STARTED_INDICATOR", () => {
        if (!isLoading) setIsTyping(true);
        resetTimeout();
      });
      events.addEventListener("CONVERSATION_TYPING_STOPPED_INDICATOR", () => {
        setIsTyping(false);
      });
    },
    [isLoading, resetTimeout, handleMessage, handleParticipantChange]
  );

  const startChat = useCallback(async () => {
    try {
      if (eventSourceRef.current) {
        eventSourceRef.current.close();
      }

      setMessages([]);
      setIsLoading(false);
      setIsTyping(false);
      setCurrentAgent(null);
      setError(null);

      const creds = await initialize();
      credsRef.current = creds;

      const events = setupEventSource(creds.accessToken);
      eventSourceRef.current = events;
      setupEventHandlers(events);
    } catch (err) {
      console.error("Chat initialization error:", err);
      setError("Failed to start chat");
      setIsConnected(false);
    }
  }, [initialize, setupEventSource, setupEventHandlers]);

  const sendMessage = async (content: string) => {
    if (!credsRef.current) return;
    resetTimeout();

    const message = {
      id: crypto.randomUUID(),
      type: "user" as const,
      content,
      timestamp: new Date(),
    };

    try {
      setMessages((prev) => [...prev, message]);
      setIsLoading(true);

      await sendMessageToApi(
        credsRef.current.accessToken,
        credsRef.current.conversationId,
        content
      );
    } catch (err) {
      console.error(err);
      setError("Failed to send message");
      setIsLoading(false);
      setMessages((prev) => prev.filter((m) => m.id !== message.id));
    }
  };

  const closeChat = async (onClosed: () => void) => {
    try {
      if (!credsRef.current) return;

      await closeChatApi(
        credsRef.current.accessToken,
        credsRef.current.conversationId
      );

      setIsConnected(false);
      setIsTyping(false);
      setCurrentAgent(null);
      setMessages([]);
      setIsLoading(false);
      setError(null);
      onClosed();
    } catch (err) {
      console.error("Failed to close chat:", err);
      setError("Failed to close chat");
    }
  };

  useEffect(() => {
    if (isInitializedRef.current) return;
    isInitializedRef.current = true;

    const cleanupEventSource = (eventSource: EventSource) => {
      eventSource.removeEventListener("CONVERSATION_MESSAGE", handleMessage);
      eventSource.removeEventListener(
        "HANDLE_PARTICIPANT_CHANGE",
        handleParticipantChange
      );
      eventSource.removeEventListener(
        "CONVERSATION_TYPING_STARTED_INDICATOR",
        () => {
          if (!isLoading) setIsTyping(true);
          resetTimeout();
        }
      );
      eventSource.removeEventListener(
        "CONVERSATION_TYPING_STOPPED_INDICATOR",
        () => {
          setIsTyping(false);
        }
      );

      eventSource.close();
    };
    startChat();
    return () => {
      if (eventSourceRef.current) cleanupEventSource(eventSourceRef.current);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [
    startChat,
    isLoading,
    resetTimeout,
    handleMessage,
    handleParticipantChange,
  ]);

  useEffect(() => {
    console.log('Current messages:', messages);
  }, [messages]);

  return {
    messages,
    isConnected,
    isLoading,
    isTyping,
    currentAgent,
    error,
    sendMessage,
    closeChat,
    startNewChat: startChat,
  };
}
