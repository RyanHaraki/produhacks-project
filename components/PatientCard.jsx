import React, { useEffect, useState } from "react";
import { useDisclosure, Card, CardBody, CardFooter, Divider, ButtonGroup, Button, Image, Stack, Heading, Text } from '@chakra-ui/react';
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
  } from '@chakra-ui/react'
  import { updateUser, getUser } from "@/utils/db";
  import { useUser } from "@clerk/nextjs";
  import { useRouter } from "next/router";
  import { uuid } from 'uuidv4';

const PatientCard = ({ patient }) => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const router = useRouter();
    const [currentUser, setCurrentUser] = useState(null);
    const { user, isLoading } = useUser();

    useEffect(() => {
      if (user) {
        getUser(user.id).then((user) => {
          setCurrentUser(user);
        });
      }
    }, []);


    const addConversation = (id) => {
      updateUser(currentUser.uid, {
        conversations: [
          ...currentUser.conversations,
          {
            id: id,
            patientName: patient.name,
            patientEmail: patient.email,
            lastMessage: "",
            messages: [],
          },
        ],
      });
  
      router.push(`/dashboard/messages/${id}`);
    };
  

  return (
    <Card>
    <CardBody className="text-center">
      <div className="bg-gray-200 flex items-center justify-center rounded-full p-2 w-12 h-12 m-auto">
          {patient.name.split(' ').map(word => word.charAt(0)).join('')}
      </div>
      <Stack mt='4' spacing='3'>
        <Heading size='md'>{patient.name}</Heading>
        <Text>
          {patient.description}
        </Text>
      </Stack>
    </CardBody>
    <CardFooter>
      <ButtonGroup spacing='2' className="mx-auto">
        <Button onClick={() => addConversation(uuid())} variant='solid' colorScheme="blue"  >
          New Message
        </Button>
        <Button variant='solid' colorScheme='gray' onClick={onOpen} >
          View Data
        </Button>
      </ButtonGroup>
    </CardFooter>

    {/* MODAL */}
    <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{patient.name}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <p className="text-sm  text-gray-600"><strong>Insurance Provider:</strong> {patient.insuranceProvider}</p>
            <p className="text-sm text-gray-600"><strong>Preferred Lanugage:</strong> {patient.language}</p>
            <p className="text-sm text-gray-600"><strong>Address:</strong> {patient.address}</p>
            <p className="text-sm text-gray-600"><strong>Email:</strong> {patient.email}</p>
            <p className="text-sm text-gray-600"><strong>Age:</strong> {patient.age}</p>
            <p className="mb-4 text-sm text-gray-600"><strong>Sex:</strong> {patient.sex}</p>

            <Divider />

            <p>{patient.description}</p>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme='blue' mr={3} onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
  </Card>
    )
};

export default PatientCard;