import { act, useEffect, useRef, useState } from "react";
import { getDate } from "@/helpers/date";

export const useWebSocket = (activeChat, profile, setMessages) => {
  const [socket, setSocket] = useState(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    if (activeChat?.id) {
      if (socket && socket.readyState === WebSocket.OPEN) {
        return;
      }

      const ws = new WebSocket(
        `ws://localhost:8000/api/v1/ws?chat_id=${activeChat?.id}`
      );

      ws.onmessage = (event) => {
        const newMessage = JSON.parse(event.data);

        if (newMessage.is_online !== undefined) {
          setActive(newMessage.is_online);
        }

        if (!newMessage.content) {
          return;
        }
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
        if (ws.readyState === 1) {
          ws.close();
        }
      };
    }
  }, [activeChat, profile, setMessages]);

  return [socket, active];
};
