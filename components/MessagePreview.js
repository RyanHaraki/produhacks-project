import React from "react";
import { ChevronRightIcon } from "@chakra-ui/icons";
import { useRouter } from "next/router";

const MessagePreview = ({ conversation }) => {
  const router = useRouter();

  return (
    <div
      onClick={() => router.push(`/dashboard/messages/${conversation.id}`)}
      className="flex justify-between items-center w-full cursor-pointer hover:bg-gray-100 transition-all p-4 rounded-md border border-gray-300 border-solid shadow-sm"
    >
      <div className="flex items-center">
        <div className="rounded-full bg-gray-300 p-2 w-10 h-10 flex justify-center items-center mr-4">
          {conversation?.patientName
            ?.split(" ")
            .map((word) => word.charAt(0))
            .join("")}
        </div>
        <div className="flex flex-col items-start">
          <h2 className="font-bold text-lg">{conversation.patientName}</h2>
          <p className="text-sm text-gray-600">{conversation.lastMessage}</p>
        </div>
      </div>
      <ChevronRightIcon boxSize={"1.5em"} />
    </div>
  );
};

export default MessagePreview;
