import { getDate } from "@/helpers/date";
import api from "@/helpers/request";
import { useState, useEffect } from "react";

export const useMessages = (activeChat, profile) => {
  const [messages, setMessages] = useState([]);
  const [userData, setUserData] = useState();

  useEffect(() => {
    const fetchMessages = async () => {
      if (activeChat) {
        try {
          const response = await api.get(`chat/${activeChat.id}`);
          const filteredData =
            response.data.user_id_1 === profile.id
              ? response.data.user2
              : response.data.user1;
          setUserData(filteredData);

          const processedMessages = response.data.messages?.map((msg) => ({
            content: msg.content,
            type: msg.sender_id === profile.id ? "sent" : "received",
            timestamp: getDate(msg.timestamp),
          }));
          setMessages(processedMessages);
        } catch (error) {
          console.error("Error fetching messages:", error);
        }
      }
    };

    fetchMessages();
  }, [activeChat, profile]);

  return { messages, setMessages, userData };
};
