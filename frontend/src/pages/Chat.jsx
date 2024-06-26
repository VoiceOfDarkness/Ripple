import { useEffect, useState, useRef } from "react";
import api from "../helpers/request";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useDispatch, useSelector } from "react-redux";
import { SmileIcon, SendIcon, ChevronLeft } from "lucide-react";
import { getProfile } from "@/store/profile-slice";
import EmojiPicker from "emoji-picker-react";
import { chatActions } from "@/store/chat-slice";

export default function ChatPage() {
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [messages, setMessages] = useState([]);
  const [allChat, setAllChat] = useState([]);
  const [socket, setSocket] = useState(null);
  const [activeChat, setActiveChat] = useState(null);

  const [userData, setUserData] = useState();
  const reciver = useSelector((state) => state.chat.reciver);
  const dispatch = useDispatch();
  const profile = useSelector((state) => state.profile.profile);
  const message = useRef();

  const getDate = (date = null) => {
    const hours = date ? new Date(date) : new Date();
    const minutes =
      Number(hours.getMinutes()) / 10 <= 1
        ? `0${hours.getMinutes()}`
        : `${hours.getMinutes()}`;

    return `${hours.getHours() + (date ? 4 : 0)}:${minutes}`;
  };

  const onEmojiClick = (emojiObject) => {
    message.current.value += emojiObject.emoji;
  };

  useEffect(() => {
    const getChat = async () => {
      if (profile?.id && reciver) {
        try {
          const response = await api.post("/chat", {
            user_id_2: reciver,
          });
          setActiveChat({ id: response.data.chat_id, user_id: reciver });
          dispatch(chatActions.clearReciver());
        } catch (error) {
          console.error("Error fetching chat:", error);
        }
      }
    };

    getChat();
  });

  useEffect(() => {
    dispatch(getProfile());
  }, [dispatch]);

  useEffect(() => {
    const getMessages = async () => {
      if (activeChat) {
        try {
          const response = await api.get(`/chat/${activeChat.id}`);
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

    const getAllChat = async () => {
      try {
        const response = await api.get(`/chat`);
        if (profile?.id) {
          const filteredData = response.data
            .map((item) => {
              if (item.user_id_1 === profile.id) {
                return {
                  id: item.id,
                  user_id: item.user_id_2,
                  user_data: item.user2,
                };
              } else if (item.user_id_2 === profile.id) {
                return {
                  id: item.id,
                  user_id: item.user_id_1,
                  user_data: item.user1,
                };
              }
            })
            .filter((item) => item !== null);
          setAllChat(filteredData);
        }
      } catch (error) {
        console.error("Error fetching all chats:", error);
      }
    };

    getMessages();
    getAllChat();
  }, [profile?.id, activeChat]);

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
  }, [profile?.id, activeChat]);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (socket && message.current.value.trim() !== "" && activeChat) {
      const newMessage = {
        content: message.current.value,
        recipient_id: activeChat.user_id,
      };
      socket.send(JSON.stringify(newMessage));
      setMessages((prevMessages) => [
        ...prevMessages,
        {
          content: newMessage.content,
          type: "sent",
          timestamp: getDate(),
        },
      ]);
      message.current.value = "";
    }
  };

  return (
    <div className="max-w-full h-[78vh] bg-gray-900 rounded-3xl overflow-hidden mt-10 md:mr-24 mr-12 text-white flex flex-col md:flex-row">
      <aside
        className={`bg-gray-900 ${
          activeChat
            ? "hidden md:block w-full md:w-1/3"
            : "md:block w-full md:w-1/3"
        }`}
      >
        <div className="bg-gray-900 pb-6 pl-6 pt-5 md:pb-6">
          <h2 className="text-6xl m-6 flex md:text-2xl font-extrabold ">
            RippleChat
          </h2>
        </div>

        <hr className="border-gray-700" />
        <ScrollArea className="h-[calc(100%-78px)]">
          {" "}
          {/* Adjusted height */}
          <ul className="overflow-y-auto flex flex-col pt-4 bg-gray-900 gap-4 md:block">
            {allChat.map((user, index) => (
              <li
                key={index}
                className={`mb-4 p-4 cursor-pointer pl-5 ${
                  user.user_id === activeChat?.user_id ? "bg-gray-700" : ""
                }`}
                onClick={() => setActiveChat(user)}
              >
                <div className="flex items-center gap-4 space-x-2">
                  {user.user_data?.user_image ? (
                    <img
                      src={`${
                        user.user_data?.user_image.includes("http")
                          ? ""
                          : import.meta.env.VITE_APP_MEDIA_URL
                      }${user.user_data.user_image}`}
                      className=" w-16 h-16 rounded-full"
                    />
                  ) : (
                    <div className="w-16 h-16 rounded-full flex justify-center items-center bg-purple">
                      {user.user_data.user_name[0].toUpperCase()}
                    </div>
                  )}
                  <div className="w-full pr-5">
                    <p className="font-normal text-5xl md:text-xl">
                      {user.user_data.user_name}
                    </p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </ScrollArea>
      </aside>
      <main
        className={` bg-black flex flex-1 flex-col ${
          activeChat ? "block  h-full p-4 md:p-10" : "hidden md:block"
        }`}
      >
        {activeChat && (
          <>
            <div className="flex  ml-4 mt-4 md:ml-0 items-center space-x-4 mb-4">
              <button className="md:hidden" onClick={() => setActiveChat(null)}>
                <ChevronLeft className="text-white w-20 h-20" />
              </button>
              {userData?.user_image ? (
                <img
                  src={`${
                    userData?.user_image.includes("http")
                      ? ""
                      : import.meta.env.VITE_APP_MEDIA_URL
                  }${userData?.user_image}`}
                  className=" w-16 h-16 rounded-full"
                />
              ) : (
                <div className="w-16 h-16 rounded-full flex justify-center items-center bg-purple">
                  {userData?.user_name[0].toUpperCase()}
                </div>
              )}
              <div>
                <p className="font-bold text-4lg md:text-base">
                  {userData?.user_name}
                </p>
              </div>
            </div>
            <ScrollArea className="flex-1 overflow-x-auto p-5 md:pr-3 ">
              {messages.map((item, index) => (
                <div
                  key={index}
                  className={`mb-4 flex ${
                    item.type === "sent" ? "justify-end" : ""
                  }`}
                >
                  <div className="flex flex-col">
                    <div
                      className={`rounded-3xl md:text-base md:p-3 p-4 text-3xl ${
                        item.type === "sent"
                          ? "bg-purple text-white"
                          : "bg-gray-700 text-white"
                      }`}
                    >
                      {item.content}
                    </div>
                    <p
                      className={`text-gray-400 text-xl md:text-sm mt-1 ${
                        item.type === "sent" ? "text-right" : ""
                      }`}
                    >
                      {item.timestamp}
                    </p>
                  </div>
                </div>
              ))}
            </ScrollArea>
            <form
              className="flex items-center relative space-x-10 mr-6 ml-6 mb-3 mt-4"
              onSubmit={handleSendMessage}
            >
              <Input
                type="text"
                ref={message}
                placeholder="Type your message here..."
                className="flex-1 text-4xl md:text-xl bg-gray-700 text-white rounded-full pl-10 pr-10 py-10 md:py-6 focus:outline-none"
              />
              <div className="relative">
                <SmileIcon
                  className="text-gray-400 cursor-pointer"
                  onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                />
                {showEmojiPicker && (
                  <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2">
                    <EmojiPicker onEmojiClick={onEmojiClick} />
                  </div>
                )}
              </div>
              <button type="submit">
                <SendIcon className="text-gray-400" />
              </button>
            </form>
          </>
        )}
      </main>
    </div>
  );
}
