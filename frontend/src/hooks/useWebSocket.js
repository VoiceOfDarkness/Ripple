import { useEffect, useState } from "react";
import { getDate } from "@/helpers/date";

export const useWebSocket = (activeChat, profile, setMessages) => {
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    if (activeChat?.id) {
      const ws = new WebSocket(
        `ws://localhost:8000/api/v1/ws?chat_id=${activeChat?.id}`
      );

      ws.onmessage = (event) => {
        const newMessage = JSON.parse(event.data);
        setMessages((prevMessages) => [
          ...prevMessages,
          {
            content: newMessage.content,
            type: newMessage.sender_id === profile?.id ? "sent" : "received",
            timestamp: getDate(),
          },
        ]);
      };

      setSocket(ws);

      return () => {
        ws.close();
      };
    }
  }, [activeChat, profile, setMessages]);

  return socket;
};
