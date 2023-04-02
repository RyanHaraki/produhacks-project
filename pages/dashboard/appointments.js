import Layout from "@/components/Layout";
import { Button, Textarea } from "@chakra-ui/react";
import React from "react";
import { useRouter } from "next/router";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
} from "@chakra-ui/react";

const mockAppointments = [
  {
    id: 1,
    title: "Appointment 1",
    date: "2021-05-01",
    startTime: "12:00",
    endTime: "13:00",
    patientName: "Alison Hardy",
    meetingMinutes: "",
    meetingLink: "https://zoom.com",
    old: true,
  },
  {
    id: 2,
    title: "Appointment 1",
    date: "2023-04-02",
    startTime: "12:00",
    endTime: "13:00",
    patientName: "Ryan Haraki",
    meetingMinutes: "",
    meetingLink: "https://zoom.com",
    old: false,
  },
];

const Appointments = () => {
  const [meetingMinutes, setMeetingMinutes] = React.useState(
    typeof window !== "undefined" && localStorage.getItem("meetingMinutes")
  );
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleMeetingChange = (e) => {
    setMeetingMinutes(e.target.value);
  };

  const handleSave = () => {
    localStorage.setItem("meetingMinutes", meetingMinutes);
    onClose();
  };

  const router = useRouter();
  return (
    <Layout>
      <div className="py-10 px-20 w-full">
        <p className="text-2xl font-bold mb-24">Appointments</p>
        <div className="flex flex-col">
          <h2 className="text-xl font-bold mb-4">Upcoming</h2>
          <div className="grid grid-cols-3 mb-8">
            {mockAppointments.map((appointment) => {
              {
                return (
                  !appointment.old && (
                    <div className="flex flex-col rounded-md border border-gray-300 border-solid">
                      <div className="p-2 border-b border-solid border-gray-300 bg-gray-100">
                        <p className="text-lg font-bold">
                          {appointment.patientName}
                        </p>
                      </div>
                      <div className="p-2">
                        <p className="text-sm">
                          <strong> Topic:</strong> {appointment.title}
                        </p>

                        <p className="text-sm">
                          {appointment.date} from {appointment.startTime} -{" "}
                          {appointment.endTime}
                        </p>

                        <Button
                          onClick={() => router.push(appointment.meetingLink)}
                          colorScheme="blue"
                          className="mt-2 text-sm"
                        >
                          Join Meeting
                        </Button>
                      </div>
                    </div>
                  )
                );
              }
            })}
          </div>
          <h2 className="text-xl font-bold mb-4">Previous Meetings</h2>
          <div className="grid grid-cols-3">
            {mockAppointments.map((appointment) => {
              {
                return (
                  appointment.old && (
                    <div className="flex flex-col rounded-md border border-gray-300 border-solid">
                      <div className="p-2 border-b border-solid border-gray-300 bg-gray-100">
                        <p className="text-lg font-bold">
                          {appointment.patientName}
                        </p>
                      </div>
                      <div className="p-2">
                        <p className="text-sm">
                          <strong> Topic:</strong> {appointment.title}
                        </p>

                        <p className="text-sm">
                          {appointment.date} from {appointment.startTime} -{" "}
                          {appointment.endTime}
                        </p>

                        <Button onClick={onOpen} className="mt-2 text-sm">
                          Physician Notes
                        </Button>
                      </div>
                    </div>
                  )
                );
              }
            })}
          </div>
        </div>

        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Meeting Minutes</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Textarea
                placeContent={"Meeting Minutes will be saved here"}
                value={meetingMinutes}
                onChange={(e) => handleMeetingChange(e)}
                size={"lg"}
                height={"150px"}
              />
            </ModalBody>

            <ModalFooter>
              <Button mr={3} onClick={onClose}>
                Cancel
              </Button>
              <Button onClick={handleSave} colorScheme="blue">
                Save
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </div>
    </Layout>
  );
};

export default Appointments;
