import { useEffect, useState } from "react";
import axios from "axios";
import api from "../helpers/request";
import io from "socket.io-client";
import { getToken } from "../helpers/request";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  SearchIcon,
  FilterIcon,
  BellIcon,
  UserIcon,
  SmileIcon,
  SendIcon,
  MoonIcon,
} from "lucide-react";
import Cookies from "js-cookie";

export default function ChatPage() {
  const [messages, setMessages] = useState([]);
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await api.get("/message");
        setMessages(response.data);
      } catch (error) {
        console.error("Error fetching messages", error);
      }
    };

    fetchMessages();
  }, []);

  useEffect(() => {
    const ws = new WebSocket(`ws://localhost:8000/api/v1/ws`);
    ws.onmessage = (event) => {
      const newMessage = JSON.parse(event.data);
      setMessages((prevMessages) => [...prevMessages, newMessage]);
    };
    setSocket(ws);

    return () => {
      ws.close();
    };
  }, []);

  const handleSendMessage = (content) => {
    if (socket) {
      socket.send(JSON.stringify({ content, sender_id: currentUser.id }));
    }
  };

  // return (
  //   <div>
  //     <div>
  //       {messages.map((message) => (
  //         <div key={message.id}>
  //           <strong>
  //             {message.sender_id === currentUser.id ? "You" : "Other"}:
  //           </strong>{" "}
  //           {message.content}
  //         </div>
  //       ))}
  //     </div>
  //     <MessageInput onSendMessage={handleSendMessage} />
  //   </div>
  // );
  return (
    <div className="max-w-full h-[78vh] bg-gray-900 rounded-3xl overflow-hidden mt-10 mr-24 text-white flex flex-col">
      <div className="flex flex-1 overflow-hidden">
        <aside className="w-1/4 bg-gray-800 p-4 overflow-y-auto">
          <ScrollArea className="h-full">
            <h2 className="text-4xl font-semibold mb-12">Chat</h2>
            <ul>
              <li className="mb-4">
                <div className="flex items-center gap-4 space-x-2">
                  <Avatar className="h-12 w-12">
                    <AvatarImage
                      src="https://raw.githubusercontent.com/magicpatterns/catalog/main/public/placeholder.png"
                      alt="User Avatar"
                    />
                    <AvatarFallback>BS</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-semibold text-4xl">Ben Sullivan</p>
                    <p className="text-gray-400 ">Typing...</p>
                  </div>
                </div>
              </li>
            </ul>
          </ScrollArea>
        </aside>
        <main className="flex-1 bg-black p-10 flex flex-col">
          <div className="flex items-center space-x-4 mb-4">
            <Avatar className="h-10 w-10">
              <AvatarImage
                src="https://raw.githubusercontent.com/magicpatterns/catalog/main/public/placeholder.png"
                alt="User Avatar"
              />
              <AvatarFallback>BS</AvatarFallback>
            </Avatar>
            <div>
              <p className="font-semibold">Ben Sullivan</p>
              <p className="text-gray-400 text-sm">#CU6789H</p>
            </div>
          </div>
          <ScrollArea className="flex-1 overflow-y-auto">
            <div className="mb-4">
              <div className="flex items-start space-x-2">
                <Avatar className="h-8 w-8">
                  <AvatarImage
                    src="https://raw.githubusercontent.com/magicpatterns/catalog/main/public/placeholder.png"
                    alt="User Avatar"
                  />
                  <AvatarFallback>BS</AvatarFallback>
                </Avatar>
                <div>
                  <div className="bg-inputGray text-white rounded-lg p-2">
                    Hi, how are you? Let's talk.
                  </div>
                  <p className="text-gray-400 text-xs mt-1">08:30 PM</p>
                </div>
              </div>
            </div>

            <div className="mb-4 flex justify-end">
              <div>
                <div className="bg-purple text-white rounded-lg p-2">
                  No, I wasn't.
                </div>
                <p className="text-gray-400 text-xs mt-1 text-right">
                  08:00 PM
                </p>
              </div>
            </div>
          </ScrollArea>
          <div className="flex items-center space-x-4 mt-4">
            <Input
              type="text"
              placeholder="Type your message here..."
              className="flex-1 text-3xl bg-gray-700 text-white rounded-full pl-4 pr-8 py-10 focus:outline-none"
            />
            <SmileIcon className="text-gray-400" />
            <SendIcon className="text-gray-400" />
          </div>
        </main>
      </div>
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
