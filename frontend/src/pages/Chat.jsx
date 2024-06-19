import { useEffect, useState } from "react";
import axios from "axios";
import api from "../helpers/request";
import io from "socket.io-client";
import { getToken } from "../helpers/request";

export default function ChatPage() {
  const [messages, setMessages] = useState([]);
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const socket = io("http://localhost:8000", {
      query: { token: getToken() },
    });

    socket.on("connect", () => {
      socket.emit("join");
    });

    socket.on("messages", (fetchedMessages) => {
      setMessages(fetchedMessages);
    });

    socket.on("newMessage", (newMessage) => {
      setMessages((prevMessages) => [...prevMessages, newMessage]);
    });

    setSocket(socket);

    return () => {
      socket.disconnect();
    };
  }, []);

  const handleSendMessage = (content) => {
    if (socket) {
      socket.emit("sendMessage", { content, sender_id: currentUser.id });
    }
  };

  return (
    <div>
      <div>
        {messages.map((message) => (
          <div key={message.id}>
            <strong>
              {message.sender_id === currentUser.id ? "You" : "Other"}:
            </strong>{" "}
            {message.content}
          </div>
        ))}
      </div>
      <MessageInput onSendMessage={handleSendMessage} />
    </div>
  );
}

const MessageInput = ({ onSendMessage }) => {
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (message.trim()) {
      onSendMessage(message);
      setMessage("");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type a message"
      />
      <button type="submit">Send</button>
    </form>
  );
};
