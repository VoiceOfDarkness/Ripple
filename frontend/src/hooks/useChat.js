import { getProfile } from "@/store/profile-slice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import api from "../helpers/request";
import { chatActions } from "@/store/chat-slice";

export const useProfile = () => {
  const dispatch = useDispatch();
  const profile = useSelector((state) => state.profile.profile);

  useEffect(() => {
    dispatch(getProfile());
  }, [dispatch]);

  return profile;
};

export const useChat = (profile, reciver) => {
  const [activeChat, setActiveChat] = useState(null);
  const [allChat, setAllChat] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchChat = async () => {
      if (profile?.id && reciver) {
        try {
          const response = await api.post("/chat", { user_id_2: reciver });
          setActiveChat({ id: response.data.chat_id, user_id: reciver });
          dispatch(chatActions.clearReciver());
        } catch (error) {
          console.error("Error fetching chat:", error);
        }
      }
    };

    fetchChat();
  });

  useEffect(() => {
    const fetchAllChats = async () => {
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

    fetchAllChats();
  }, [profile]);

  return { activeChat, setActiveChat, allChat };
};
