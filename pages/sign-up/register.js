import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useUser } from "@clerk/nextjs";
import { createNewUser } from "@/utils/db";
import { Button, Input, createToastFn } from "@chakra-ui/react";

const Register = () => {
  const { user, isLoading } = useUser();
  const [calendarLink, setCalendarLink] = useState("");
  const router = useRouter();

  const isLoaded = !isLoading && user;

  const createUser = async () => {
    createNewUser(
      user.id,
      user.primaryEmailAddress.emailAddress,
      user.fullName,
      calendarLink
    );
  };

  const handleSignup = () => {
    createUser();
    router.push("/sign-up/organization");
  };

  return (
    <div className="flex h-screen w-full justify-center items-center">
      <div className="flex flex-col space-y-3">
        <p className="text-2xl font-bold">Enter your Booking Link</p>
        <Input
          placeholder="https://calendly.com/practice/15minutes"
          onChange={(e) => setCalendarLink(e.target.value)}
        />
        <Button colorScheme="blue" onClick={handleSignup}>
          Submit
        </Button>
      </div>
    </div>
  );
};

export default Register;
