import React, { useEffect } from "react";
import { useRouter } from "next/router";
import { useUser } from "@clerk/nextjs";
import { createNewUser } from "@/utils/db";

const Register = () => {
  const { user, isLoading } = useUser();
  const router = useRouter();

  const isLoaded = !isLoading && user;

  const createUser = async () => {
    createNewUser(
      user.id,
      user.primaryEmailAddress.emailAddress,
      user.fullName
    );
    console.log("user created");
  };

  useEffect(() => {
    if (user) {
      // User is not signed in
      // User is signed in
      console.log("uesr singed");
      createUser();
      router.push("/sign-up/organization");
    } else {
      console.log("NO USER");
    }
  }, [user, isLoaded]);

  return <div>Register</div>;
};

export default Register;
