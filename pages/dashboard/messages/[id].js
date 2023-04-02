import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Layout from "@/components/Layout";
import { IconButton, Input } from "@chakra-ui/react";
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

  useEffect(() => {
    if (user) {
      getUser(user.id).then((user) => {
        setCurrentUser(user);
        setConversation(user.conversations.find((c) => c.id === id));
      });
    }
  }, []);

  const sendMessage = async (e) => {
    e.preventDefault();

    await updateUser(currentUser.uid, {
      conversations: currentUser.conversations.map((c) => {
        if (c.id === id) {
          setConversation({
            ...c,
            lastMessage: message,
            messages: [
              ...c.messages,
              {
                sender: "Doctor",
                content: message,
              },
            ],
          });

          return {
            ...c,
            lastMessage: message,
            messages: [
              ...c.messages,
              {
                sender: "Doctor",
                content: message,
              },
            ],
          };
        } else {
          return c;
        }
      }),
    });

    setMessage("");
  };

  return (
    <Layout>
      <div className="flex h-screen w-full p-12">
        <div className="w-full h-full rounded-md border border-gray-300 border-solid flex flex-col">
          <div className="bg-gray-50 border-b border-gray-300 border-solid flex items-center justify-between p-3 ">
            <h2 className="text-lg font-bold">{conversation?.patientName}</h2>
            <p className="text-sm text-gray-600">
              {conversation?.patientEmail}
            </p>
          </div>
          <div className="w-full h-full">
            {/* CHAT UI */}
            {conversation?.messages.map((m) => (
              <div
                className={`flex items-center justify-start p-3 m-2 rounded-md ${
                  m.sender === "Doctor" && "bg-gray-100"
                }`}
              >
                <div className="flex flex-col items-start justify-start">
                  <p className="text-sm text-gray-600">{m.sender}</p>
                  <p className="text-sm">{m.content}</p>
                </div>
              </div>
            ))}
          </div>
          <form
            onSubmit={(e) => sendMessage(e)}
            className=" border-t border-gray-300 border-solid flex items-start justify-between p-3 space-x-2"
          >
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
