import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/router";
import Layout from "@/components/Layout";
import { Button, IconButton, Input } from "@chakra-ui/react";
import { HiChatBubbleOvalLeftEllipsis } from "react-icons/hi2";
import { useUser } from "@clerk/nextjs";
import { updateUser, getUser } from "@/utils/db";

const MessageInterface = () => {
  const router = useRouter();
  const { id } = router.query;
  const [message, setMessage] = useState("");
  const [currentUser, setCurrentUser] = useState(null);
  const [conversation, setConversation] = useState(null);
  const { user, isLoading } = useUser();
  const bottomRef = useRef(null);

  useEffect(() => {
    if (user) {
      getUser(user.id).then((user) => {
        setCurrentUser(user);
        setConversation(user.conversations.find((c) => c.id === id));
      });
    }
  }, []);

  useEffect(() => {
    // 👇️ scroll to bottom every time messages change
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [conversation?.messages]);

  const sendCalendar = async (e) => {
    e.preventDefault();
    const newMessage = {
      sender: "Doctor",
      content: currentUser.calendarLink,
    };

    const newConversation = {
      ...conversation,
      messages: [...conversation.messages, newMessage],
    };

    const newConversations = currentUser.conversations.map((c) =>
      c.id === id ? newConversation : c
    );

    const updatedUser = {
      ...currentUser,
      conversations: newConversations,
    };

    await updateUser(user.id, updatedUser);
    setCurrentUser(updatedUser);
    setConversation(newConversation);

    setMessage("");
  };

  const sendMessage = async (e) => {
    e.preventDefault();
    if (message === "") return;
    const newMessage = {
      sender: "Doctor",
      content: message,
    };

    const newConversation = {
      ...conversation,
      messages: [...conversation.messages, newMessage],
    };

    const newConversations = currentUser.conversations.map((c) =>
      c.id === id ? newConversation : c
    );

    const updatedUser = {
      ...currentUser,
      conversations: newConversations,
    };

    await updateUser(user.id, updatedUser);
    setCurrentUser(updatedUser);
    setConversation(newConversation);

    setMessage("");
  };

  return (
    <Layout>
      <div className="flex h-screen w-full p-12">
        <div className="w-full h-full rounded-md border border-gray-300 border-solid flex flex-col">
          <div className="bg-gray-50 rounded-t-md border-b border-gray-300 border-solid flex items-center justify-between p-3 ">
            <h2 className="text-lg font-bold">{conversation?.patientName}</h2>
            <p className="text-sm text-gray-600">
              {conversation?.patientEmail}
            </p>
          </div>
          <div className="w-full h-full py-2 overflow-y-scroll">
            {/* CHAT UI */}
            {conversation?.messages.map((m) => (
              <div
                className={`flex items-center justify-start p-3 m-2 rounded-md ${
                  m.sender === "Doctor" && "bg-gray-100"
                }`}
              >
                <div className="flex flex-col items-start justify-start">
                  <p className="text-sm text-gray-600">{m.sender}</p>
                  {m.content.includes("https://") ? (
                    <a
                      href={m.content}
                      target="_blank"
                      className="text-sm text-blue-600"
                    >
                      {m.content}
                    </a>
                  ) : (
                    <p className="text-sm text-gray-600">{m.content}</p>
                  )}
                </div>
                <div ref={bottomRef}></div>
              </div>
            ))}
          </div>
          <form
            onSubmit={(e) => sendMessage(e)}
            className=" border-t border-gray-300 border-solid flex items-start justify-between p-3 space-x-2"
          >
            <Button onClick={sendCalendar}>Send Calendar</Button>
            <Input
              placeholder="Message..."
              onChange={(e) => setMessage(e.target.value)}
              value={message}
            />
            <IconButton
              icon={<HiChatBubbleOvalLeftEllipsis />}
              fontSize={"1.5em"}
              colorScheme="blue"
              type="submit"
            />
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default MessageInterface;
