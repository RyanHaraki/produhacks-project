import Layout from "@/components/Layout";
import React, { useEffect, useState } from "react";
import {
  Button,
  FormControl,
  FormLabel,
  IconButton,
  Input,
  Select,
  Stack,
} from "@chakra-ui/react";
import { ChevronLeftIcon } from "@chakra-ui/icons";
import { useRouter } from "next/router";
import { updateUser, getUser } from "@/utils/db";
import { useUser } from "@clerk/nextjs";

const AddPatient = () => {
  const router = useRouter();
  const { user, isLoading } = useUser();
  const [currentUser, setCurrentUser] = useState(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [description, setDescription] = useState("");
  const [age, setAge] = useState("");
  const [sex, setSex] = useState("");
  const [address, setAddress] = useState("");
  const [language, setLanguage] = useState("");
  const [insuranceProvider, setInsuranceProvider] = useState("");

  useEffect(() => {
    if (user) {
      getUser(user.id).then((user) => {
        setCurrentUser(user);
      });
    }
  }, []);

  const addPatient = async (e) => {
    await updateUser(currentUser.uid, {
      patients: [
        ...currentUser.patients,
        {
          name: name,
          age: age,
          description: description,
          email: email,
          sex: sex,
          address: address,
          language: language,
          insuranceProvider: insuranceProvider,
        },
      ],
    });

    router.push("/dashboard");
  };

  return (
    <Layout>
      <div className="flex items-center justify-center h-screen w-full">
        <div className="rounded-md border border-gray-300 border-solid p-4 w-5/6 lg:w-1/2">
          <IconButton
            icon={<ChevronLeftIcon />}
            className="mb-4"
            onClick={() => router.push("/dashboard")}
          />
          <h1 className="text-3xl font-bold">Add Patient</h1>
          <span className="hover:underline text-blue-500 cursor-pointer text-sm">
            Or import a CSV
          </span>
          <div className="my-6"></div>
          <form action="">
            <Stack spacing={2}>
              <FormControl>
                <FormLabel>Name</FormLabel>
                <Input
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Ryan Haraki"
                />
              </FormControl>
              <FormControl>
                <FormLabel>Email</FormLabel>
                <Input
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="ryan.harak@gmail.com"
                  type="email"
                />
              </FormControl>

              <FormControl>
                <FormLabel>Description</FormLabel>
                <Input
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Reporting sore throat, fever and headache. Potential signs of the flu."
                />
              </FormControl>

              <FormControl>
                <FormLabel>Age</FormLabel>
                <Input
                  onChange={(e) => setAge(e.target.value)}
                  placeholder="17"
                />
              </FormControl>
              <FormControl>
                <FormLabel>Sex</FormLabel>

                <Select
                  placeholder="Select Sex"
                  onChange={(e) => {
                    setSex(e.target.value);
                    console.log(sex);
                  }}
                >
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </Select>
              </FormControl>

              <FormControl>
                <FormLabel>Address</FormLabel>
                <Input
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="1234 San Francisco Avenue, San Francisco, CA"
                />
              </FormControl>
              <FormControl>
                <FormLabel>Language</FormLabel>
                <Select
                  placeholder="Select Language"
                  onChange={(e) => {
                    setSex(e.target.value);
                  }}
                >
                  <option value="English">English</option>
                  <option value="Arabic">Arabic</option>
                  <option value="French">French</option>
                  <option value="Chinese">Chinese</option>
                </Select>
              </FormControl>
              <FormControl>
                <FormLabel>Insurance Provider</FormLabel>
                <Select
                  placeholder="Select Provider"
                  onChange={(e) => {
                    setSex(e.target.value);
                  }}
                >
                  <option value="United Health Group">
                    UnitedHealth Group
                  </option>
                  <option value="Anthem">Anthem</option>
                  <option value="Entene">Centene</option>
                </Select>
              </FormControl>
              <div className="h-4"></div>
              <Button onClick={addPatient} colorScheme="gray">
                Add Patient
              </Button>
            </Stack>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default AddPatient;
