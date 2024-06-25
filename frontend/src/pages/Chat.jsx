// import { useEffect, useState, useRef } from "react";
// import api from "../helpers/request";
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
// import { Input } from "@/components/ui/input";
// import { ScrollArea } from "@/components/ui/scroll-area";
// import { SmileIcon, SendIcon, ChevronLeft } from "lucide-react";
// import { useDispatch, useSelector } from "react-redux";
// import { getProfile } from "@/store/profile-slice";
// import EmojiPicker from "emoji-picker-react";

// export default function ChatPage() {
//   const [showEmojiPicker, setShowEmojiPicker] = useState(false);
//   const [messages, setMessages] = useState([]);
//   const [chat, setChat] = useState(null);
//   const [socket, setSocket] = useState(null);
//   const dispatch = useDispatch();
//   const profile = useSelector((state) => state.profile.profile);
//   const message = useRef();
//   const [activeChat, setactiveChat] = useState(null);

//   const onEmojiClick = (emojiObject) => {
//     message.current.value += emojiObject.emoji;
//   };

//   useEffect(() => {
//     const getChat = async () => {
//       if (profile?.id) {
//         const response = await api.post("/chat", {
//           user_id_2: profile.id === 2 ? 3 : 2,
//         });
//         setChat(response.data.chat_id);
//       }
//     };

//     getChat();
//     dispatch(getProfile());
//   }, [dispatch, profile?.id]);

//   useEffect(() => {
//     const getMessages = async () => {
//       if (chat) {
//         const response = await api.get(`/chat/${chat}`);
//         const processedMessages = response.data.messages?.map((msg) => ({
//           content: msg.content,
//           type: msg.sender_id === profile.id ? "sent" : "received",
//         }));
//         setMessages(processedMessages);
//       }
//     };

//     getMessages();
//   }, [chat, profile?.id]);

//   useEffect(() => {
//     if (chat) {
//       const ws = new WebSocket(`ws://localhost:8000/api/v1/ws?chat_id=${chat}`);

//       ws.onmessage = (event) => {
//         const newMessage = JSON.parse(event.data);
//         setMessages((prevMessages) => [
//           ...prevMessages,
//           {
//             content: newMessage.content,
//             type: newMessage.sender_id === profile?.id ? "sent" : "received",
//           },
//         ]);
//       };

//       setSocket(ws);

//       return () => {
//         ws.close();
//       };
//     }
//   }, [chat, profile?.id]);

//   const handleSendMessage = (e) => {
//     e.preventDefault();
//     if (socket && message.current.value.trim() !== "") {
//       const newMessage = {
//         content: message.current.value,
//         recipient_id: profile?.id === 2 ? 3 : 2,
//       };
//       socket.send(JSON.stringify(newMessage));
//       setMessages((prevMessages) => [
//         ...prevMessages,
//         { content: newMessage.content, type: "sent" },
//       ]);
//       message.current.value = "";
//     }
//   };

//   return (
//     <div className="max-w-full h-screen md:h-[78vh] bg-gray-900 rounded-3xl overflow-hidden mt-10 md:mr-24 mr-12 text-white flex flex-col md:flex-row">
//       <div className="flex flex-1 overflow-hidden">
//         <aside className="w-1/4 bg-gray-800 p-4 overflow-y-auto">
//           <ScrollArea className="h-full">
//             <h2 className="text-4xl font-semibold mb-12">Chat</h2>
//             <ul>
//               <li className="mb-4">
//                 <div className="flex items-center gap-4 space-x-2">
//                   <Avatar className="h-12 w-12">
//                     <AvatarImage
//                       src="https://raw.githubusercontent.com/magicpatterns/catalog/main/public/placeholder.png"
//                       alt="User Avatar"
//                     />
//                     <AvatarFallback>BS</AvatarFallback>
//                   </Avatar>
//                   <div>
//                     <p className="font-semibold text-4xl">Ben Sullivan</p>
//                     <p className="text-gray-400 ">Typing...</p>
//                   </div>
//                 </div>
//               </li>
//             </ul>
//           </ScrollArea>
//         </aside>
//         <main className="flex-1 bg-black p-10 flex flex-col">
//           <div className="flex items-center space-x-4 mb-4">
//             <Avatar className="h-10 w-10">
//               <AvatarImage
//                 src="https://raw.githubusercontent.com/magicpatterns/catalog/main/public/placeholder.png"
//                 alt="User Avatar"
//               />
//               <AvatarFallback>BS</AvatarFallback>
//             </Avatar>
//             <div>
//               <p className="font-semibold">Ben Sullivan</p>
//               <p className="text-gray-400 text-sm">#CU6789H</p>
//             </div>
//           </div>
//           <ScrollArea className="flex-1 overflow-y-auto">
//             {messages.map((item, index) =>
//               item.type === "sent" ? (
//                 <div className="mb-4 flex justify-end" key={index}>
//                   <div>
//                     <div className="bg-purple text-white rounded-lg p-2">
//                       {item.content}
//                     </div>
//                     <p className="text-gray-400 text-xs mt-1 text-right">
//                       08:00 PM
//                     </p>
//                   </div>
//                 </div>
//               ) : (
//                 <div className="mb-4" key={index}>
//                   <div className="flex items-start space-x-2">
//                     <Avatar className="h-8 w-8">
//                       <AvatarImage
//                         src="https://raw.githubusercontent.com/magicpatterns/catalog/main/public/placeholder.png"
//                         alt="User Avatar"
//                       />
//                       <AvatarFallback>BS</AvatarFallback>
//                     </Avatar>
//                     <div>
//                       <div className="bg-inputGray text-white rounded-lg p-2">
//                         {item.content}
//                       </div>
//                       <p className="text-gray-400 text-xs mt-1">08:30 PM</p>
//                     </div>
//                   </div>
//                 </div>
//               )
//             )}
//           </ScrollArea>
//           <form
//             className="flex items-center relative space-x-4 mt-4"
//             onSubmit={handleSendMessage}
//           >
//             <Input
//               type="text"
//               ref={message}
//               placeholder="Type your message here..."
//               className="flex-1 text-3xl bg-gray-700 text-white rounded-full pl-4 pr-8 py-10 focus:outline-none"
//             />
//             <div>
//               <SmileIcon
//                 className="text-gray-400 cursor-pointer"
//                 onClick={() => setShowEmojiPicker(!showEmojiPicker)}
//               />
//               {showEmojiPicker && (
//                 <div className="absolute -top-[50rem] left-[30%]">
//                   <EmojiPicker onEmojiClick={onEmojiClick} />
//                 </div>
//               )}
//             </div>
//             <button type="submit">
//               <SendIcon className="text-gray-400" />
//             </button>
//           </form>
//         </main>
//       </div>
//     </div>
//   );
// }

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

const mockUsers = [
  // {
  //   id: 1,
  //   name: "Alice Johnson",
  //   avatar: "../../public/UserIcons/1.png",
  //   status: "Online",
  // },
  // {
  //   id: 2,
  //   name: "Bob Smith",
  //   avatar: "../../public/UserIcons/2.png",
  //   status: "Offline",
  // },
  // {
  //   id: 3,
  //   name: "Charlie Brown",
  //   avatar: "../../public/UserIcons/3.png",
  //   status: "Online",
  // },
  // {
  //   id: 4,
  //   name: "David Doe",
  //   avatar: "../../public/UserIcons/4.png",
  //   status: "Offline",
  // },
  // {
  //   id: 5,
  //   name: "Eve Green",
  //   avatar: "../../public/UserIcons/5.png",
  //   status: "Online",
  // },
  // {
  //   id: 6,
  //   name: "Frank White",
  //   avatar: "../../public/UserIcons/6.png",
  //   status: "Offline",
  // },
  // {
  //   id: 7,
  //   name: "Grace Black",
  //   avatar: "../../public/UserIcons/7.png",
  //   status: "Online",
  // },
  // {
  //   id: 8,
  //   name: "Henry Blue",
  //   avatar: "../../public/UserIcons/8.png",
  //   status: "Offline",
  // },
  // {
  //   id: 9,
  //   name: "Ivy Red",
  //   avatar: "../../public/UserIcons/9.png",
  //   status: "Online",
  // },
];

export default function ChatPage() {
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [messages, setMessages] = useState([]);
  const [chat, setChat] = useState(null);
  const [allChat, setAllChat] = useState([]);
  const [socket, setSocket] = useState(null);
  const [activeChat, setActiveChat] = useState(null);
  const reciver = useSelector((state) => state.chat.reciver);
  const dispatch = useDispatch();
  const profile = useSelector((state) => state.profile.profile);
  const message = useRef();

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
          console.log(response);
          setChat(response.data.chat_id);
          setActiveChat({ id: response.data.chat_id, user_id: reciver });
          dispatch(chatActions.clearReciver());
        } catch (error) {
          console.error("Error fetching chat:", error);
        }
      }
    };

    if (profile?.id && reciver) {
      getChat();
    }

    dispatch(getProfile());
  }, [dispatch, profile?.id]);

  useEffect(() => {
    const getMessages = async () => {
      if (activeChat) {
        try {
          const response = await api.get(`/chat/${activeChat.id}`);
          const processedMessages = response.data.messages?.map((msg) => ({
            content: msg.content,
            type: msg.sender_id === profile.id ? "sent" : "received",
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
                };
              } else if (item.user_id_2 === profile.id) {
                return {
                  id: item.id,
                  user_id: item.user_id_1,
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
          },
        ]);
      };

      setSocket(ws);

      return () => {
        ws.close();
      };
    }
  }, [profile?.id, activeChat, messages]);

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
        { content: newMessage.content, type: "sent" },
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
            {allChat.map((user) => (
              <li
                key={user.user_id}
                className={`mb-4 cursor-pointer pl-5 ${
                  user.user_id === activeChat?.user_id ? "bg-gray-700" : ""
                }`}
                onClick={() => setActiveChat(user)}
              >
                <div className="flex items-center gap-4 space-x-2">
                  {/* <Avatar className="h-28 w-28 md:h-16 md:w-16 bg-purple">
                    <AvatarImage
                      src={
                        user.avatar ||
                        "https://raw.githubusercontent.com/magicpatterns/catalog/main/public/placeholder.png"
                      }
                      alt="User Avatar"
                    />
                    <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                  </Avatar> */}
                  <div className="w-full pr-5">
                    <p className="font-normal text-5xl md:text-xl">
                      {user.user_id}
                    </p>
                    {/* <p className="text-gray-400 text-3xl md:text-base mb-2">
                      {user.status}
                    </p> */}
                    <hr className="border-gray-700" />
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
              <button className="md:hidden" onClick={() => setactiveChat(null)}>
                <ChevronLeft className="text-white w-20 h-20" />
              </button>
              {/* <Avatar className="h-24 w-24 md:h-14 md:w-14 bg-purple">
                <AvatarImage
                  src={
                    activeChat.avatar ||
                    "https://raw.githubusercontent.com/magicpatterns/catalog/main/public/placeholder.png"
                  }
                  alt="User Avatar"
                />
                <AvatarFallback>{activeChat.name.charAt(0)}</AvatarFallback>
              </Avatar> */}
              <div>
                <p className="font-bold text-4lg md:text-base">
                  {activeChat.user_id}
                </p>
                {/* <p className="text-gray-400 text-2lg md:text-sm">
                  #{activeChat.id}
                </p> */}
              </div>
            </div>
            <ScrollArea className="flex-1 overflow-x-auto p-5 md:pr-3">
              {messages.map((item, index) => (
                <div
                  key={index}
                  className={`mb-4 flex ${
                    item.type === "sent" ? "justify-end" : ""
                  }`}
                >
                  <div>
                    <div
                      className={`rounded-3xl md:text-base md:p-3 p-4 text-3xl ${
                        item.type === "sent"
                          ? "bg-purple text-white"
                          : "bg-gray-700 text-white"
                      }`}
                    >
                      {item.content}
                    </div>
                    <p className="text-gray-400 text-xl md:text-sm mt-1 text-right">
                      08:00 PM
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
