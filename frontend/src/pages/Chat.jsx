import { useEffect, useState, useRef } from "react";
import api from "../helpers/request";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { SmileIcon, SendIcon } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { getProfile } from "@/store/profile-slice";
import EmojiPicker from "emoji-picker-react";

export default function ChatPage() {
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [messages, setMessages] = useState([]);
  const [chat, setChat] = useState(null);
  const [socket, setSocket] = useState(null);
  const dispatch = useDispatch();
  const profile = useSelector((state) => state.profile.profile);
  const message = useRef();

  const onEmojiClick = (emojiObject) => {
    message.current.value += emojiObject.emoji;
  };

  useEffect(() => {
    const getChat = async () => {
      if (profile?.id) {
        const response = await api.post("/chat", {
          user_id_2: profile.id === 1 ? 2 : 1,
        });
        setChat(response.data.chat_id);
      }
    };

    getChat();
    dispatch(getProfile());
  }, [dispatch, profile?.id]);

  useEffect(() => {
    const getMessages = async () => {
      if (chat) {
        const response = await api.get(`/chat/${chat}`);
        const processedMessages = response.data.messages?.map((msg) => ({
          content: msg.content,
          type: msg.sender_id === profile.id ? "sent" : "received",
        }));
        setMessages(processedMessages);
      }
    };

    getMessages();
  }, [chat, profile?.id]);

  useEffect(() => {
    if (chat) {
      const ws = new WebSocket(`ws://localhost:8000/api/v1/ws?chat_id=${chat}`);

      ws.onmessage = (event) => {
        const newMessage = JSON.parse(event.data);
        setMessages((prevMessages) => [
          ...prevMessages,
          {
            content: newMessage.content,
            type: newMessage.sender_id === profile?.id ? "sent" : "received",
          },
        ]);
      };

      setSocket(ws);

      return () => {
        ws.close();
      };
    }
  }, [chat, profile?.id]);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (socket && message.current.value.trim() !== "") {
      const newMessage = {
        content: message.current.value,
        recipient_id: profile?.id === 1 ? 2 : 1,
      };
      socket.send(JSON.stringify(newMessage));
      setMessages((prevMessages) => [
        ...prevMessages,
        { content: newMessage.content, type: "sent" },
      ]);
      message.current.value = "";
    }
  };

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
            {messages.map((item, index) =>
              item.type === "sent" ? (
                <div className="mb-4 flex justify-end" key={index}>
                  <div>
                    <div className="bg-purple text-white rounded-lg p-2">
                      {item.content}
                    </div>
                    <p className="text-gray-400 text-xs mt-1 text-right">
                      08:00 PM
                    </p>
                  </div>
                </div>
              ) : (
                <div className="mb-4" key={index}>
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
                        {item.content}
                      </div>
                      <p className="text-gray-400 text-xs mt-1">08:30 PM</p>
                    </div>
                  </div>
                </div>
              )
            )}
          </ScrollArea>
          <form
            className="flex items-center relative space-x-4 mt-4"
            onSubmit={handleSendMessage}
          >
            <Input
              type="text"
              ref={message}
              placeholder="Type your message here..."
              className="flex-1 text-3xl bg-gray-700 text-white rounded-full pl-4 pr-8 py-10 focus:outline-none"
            />
            <div>
              <SmileIcon
                className="text-gray-400 cursor-pointer"
                onClick={() => setShowEmojiPicker(!showEmojiPicker)}
              />
              {showEmojiPicker && (
                <div className="absolute -top-[50rem] left-[30%]">
                  <EmojiPicker onEmojiClick={onEmojiClick} />
                </div>
              )}
            </div>
            <button type="submit">
              <SendIcon className="text-gray-400" />
            </button>
          </form>
        </main>
      </div>
    </div>
  );
}
