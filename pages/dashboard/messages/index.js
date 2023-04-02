import Layout from "@/components/Layout";
import React, { useEffect, useState } from "react";
import MessagePreview from "@/components/MessagePreview";
import { Button } from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";
import { useUser } from "@clerk/nextjs";
import { updateUser, getUser } from "@/utils/db";

const messages = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const { user, isLoading } = useUser();

  useEffect(() => {
    if (user) {
      getUser(user.id).then((user) => {
        setCurrentUser(user);
      });
    }
  }, []);

  const addConversation = () => {
    console.log(currentUser);
  };

  return (
    <Layout>
      <div className="py-10 px-20 w-full">
        <p className="text-2xl font-bold mb-24">Messages</p>
        <div className="flex flex-col space-y-3">
          <Button
            onClick={addConversation}
            className="w-fit"
            rightIcon={<AddIcon />}
          >
            New Message
          </Button>
          {currentUser?.conversations.map((conversation) => (
            <MessagePreview conversation={conversation} />
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default messages;
