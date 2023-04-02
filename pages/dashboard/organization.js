import Layout from "@/components/Layout";
import { OrganizationProfile } from "@clerk/clerk-react";

const OrganizationProfilePage = () => {
  return (
    <Layout>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "2rem",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
        }}
      >
        <OrganizationProfile />
      </div>
    </Layout>
  );
};

export default OrganizationProfilePage;
