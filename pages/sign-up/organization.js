import { CreateOrganization } from "@clerk/nextjs";

const Organization = () => {
  return (
    <div className="flex items-center justify-center h-screen">
      <CreateOrganization
        afterCreateOrganizationUrl="/dashboard"
        path="/sign-up/organization"
      />
    </div>
  );
};

export default Organization;
