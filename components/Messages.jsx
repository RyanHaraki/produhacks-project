import React, { useState } from "react";
import {
  Box,
  Input,
  InputGroup,
  InputLeftElement,
  IconButton,
  VStack,
  HStack,
  Text,
} from "@chakra-ui/react";
import { FaPaperPlane } from "react-icons/fa";

function Messages() {
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState("");

  const sendMessage = () => {
    if (inputText.trim() !== "") {
      setMessages([...messages, inputText]);
      setInputText("");
    }
  };

  return (
    <Box width="100%" height="100%" display="flex" flexDirection="column">
      <Box flex="1" overflowY="scroll">
        <VStack spacing="4" align="flex-start" padding="4">
          {messages.map((message, index) => (
            <HStack key={index}>
              <Box
                borderRadius="50%"
                background="gray.100"
                width="2rem"
                height="2rem"
                display="flex"
                justifyContent="center"
                alignItems="center"
              >
                <Text fontWeight="bold">User</Text>
              </Box>
              <Box background="gray.200" padding="2" borderRadius="8px">
                <Text>{message}</Text>
              </Box>
            </HStack>
          ))}
        </VStack>
      </Box>
      <Box padding="4">
        <InputGroup>
          <InputLeftElement pointerEvents="none" children={<FaPaperPlane />} />
          <Input
            placeholder="Type a message"
            value={inputText}
            onChange={(event) => setInputText(event.target.value)}
            onKeyPress={(event) => {
              if (event.key === "Enter") {
                sendMessage();
              }
            }}
          />
          <IconButton
            icon={<FaPaperPlane />}
            onClick={sendMessage}
            ml="2"
            aria-label="Send Message"
            variant="solid"
            colorScheme="blue"
          />
        </InputGroup>
      </Box>
    </Box>
  );
}

export default Messages;
