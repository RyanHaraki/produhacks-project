import React, { useEffect, useState } from "react";
import { Input, HStack, Select, Button } from "@chakra-ui/react";
import PatientCard from "@/components/PatientCard";
import { useRouter } from "next/router";
import Layout from "@/components/Layout";
import { AddIcon } from "@chakra-ui/icons";
import { updateUser, getUser } from "@/utils/db";
import { useUser } from "@clerk/nextjs";

const Dashboard = () => {
  const router = useRouter();
  const [currentUser, setCurrentUser] = useState(null);
  const { user, isLoading } = useUser();
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    if (user) {
      getUser(user.id).then((user) => {
        setCurrentUser(user);
      });
    }
  }, []);

  return (
    <Layout>
      <div className="py-10 px-20 w-full">
        <div className="flex justify-between mb-10 w-full">
          <p className="text-2xl font-bold">Hello, Dr. {user?.lastName}</p>
          <div className="w-1/2">
            <Input
              className="ml-auto"
              placeholder="Search Patients"
              size="md"
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <div>
          <HStack>
            <div className="w-2/5">
              <p>Filter By</p>
            </div>
            <Select variant="filled" placeholder="Sex" className="w-1/6">
              <option value="option1">Option 1</option>
            </Select>
            <Select variant="filled" placeholder="Location" className="w-1/6">
              <option value="option1">Option 1</option>
            </Select>
            <Select variant="filled" placeholder="Languages" className="w-1/6">
              <option value="option1">Option 1</option>
            </Select>
            <Select variant="filled" placeholder="Insurances" className="w-1/6">
              <option value="option1">Option 1</option>
            </Select>
          </HStack>
          {router.pathname === "/messages" && <Messages />}
        </div>

        <div className="py-4 flex flex-row-reverse mt-4">
          <Button
            onClick={() => router.push("/dashboard/add")}
            rightIcon={<AddIcon />}
            colorScheme="blue"
          >
            Add Patient
          </Button>
        </div>

        <div className="grid lg:grid-cols-3 gap-4 my-20">
          {currentUser?.patients?.map((patient) => (
            <>
              {patient.name
                .toLowerCase()
                .includes(searchTerm.toLowerCase()) && (
                <PatientCard patient={patient} />
              )}
            </>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
