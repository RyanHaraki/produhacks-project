import React, { useEffect } from "react";
import {
  useUser,
  useOrganization,
  UserButton,
} from "@clerk/nextjs";
import { HiHome, HiUserGroup, HiChatBubbleOvalLeft } from "react-icons/hi";
import { useRouter } from "next/router";

const options = [
  {
    name: "Patients",
    url: "/dashboard",
    icon: HiHome
  },
  {
    name: "Past Appointments",
    url: "/dashboard/appointments",
    icon: HiUserGroup
  },
  {
    name: "Messages",
    url: "/dashboard/messages",
    icon: HiChatBubbleOvalLeft 
  }
]


const SideNav = () => {
  const { user } = useUser();
  const { organization, isOrgLoaded } = useOrganization();
  const orgPrepped = isOrgLoaded && organization;
  const router = useRouter();



  return (
  <div className="top-0 sticky flex flex-col w-64 border-r border-solid border-gray-300 h-screen p-3 justify-between">
    <div>
    <div className="flex items-center hover:bg-gray-100 rounded-md transition-all cursor-pointer p-2">
      <>
        {organization?.logo ? (
         <>
         <img
              src={organization?.logoUrl}
              alt="Organization Logo"
              className="h-8 w-8 rounded-md mr-2"
            /> 
         </>
          ) : (
            <div className="h-8 w-8 rounded-md mr-2 bg-gray-300 flex items-center justify-center">
              <p>{organization?.name.substring(0, 1)}</p>
            </div>
          )}
          <h1 className="font-semibold">{organization?.name}</h1>
        </>       
      </div>
      <div className="h-8"></div>
       <div className="flex flex-col space-y-2 mt-4">
            {options.map((option) => (
          <div onClick={() => router.push(option.url)} className="flex items-center hover:bg-gray-100 rounded-md transition-all cursor-pointer p-2">    
          <p>{option.name}</p>
            </div>
            ))}
         </div>
      </div>

      <div className="flex items-center hover:bg-gray-100 rounded-md transition-all cursor-pointer p-2">
        <UserButton />
        <p className="ml-2 font-bold">{user?.fullName}</p>
      </div>
    </div>
    )
};

export default SideNav;


// {organization.logo ? (
//   <img
//     src={organization.logoUrl}
//     alt="Organization Logo"
//     className="h-8 w-8 rounded-md mr-2"
//   />
// ) : (
//   <div className="h-8 w-8 rounded-md mr-2 bg-gray-300 flex items-center justify-center">
//     <p>{organization.name.substring(0, 1)}</p>
//   </div>
// )}