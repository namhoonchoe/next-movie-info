import React from "react";
import Footer from "../ui/Footer";
import LayoutHeader from "../ui/LayoutHeader";
import Sidebar from "../ui/Sidebar";

type LayoutProps = {
  children: React.ReactNode;
};

const SidebarLayout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="fit-center">
      <section className="layout-grid w-full relative">
        <LayoutHeader />
        <Sidebar />
        <section className="flex flex-col justify-start items-center h-full w-full grid-main ">
          <div className="w-full flex justify-center">{children}</div>
          <Footer />
        </section>
      </section>
    </div>
  );
};

export default SidebarLayout;
