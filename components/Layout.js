import React from "react";
import SideNav from "./SideNav";

const Layout = ({ children }) => {
  return (
    <div className="flex w-full">
      <SideNav />
      {children}
    </div>
  );
};

export default Layout;
