import React from "react";
import Footer from "../ui/Footer";
import LayoutHeader from "../ui/LayoutHeader";
import Sidebar from "../ui/Sidebar";

type LayoutProps = {
  children: React.ReactNode;
};

const SidebarLayout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <section className="fit-center">
      <LayoutHeader />
      <main className="flex flex-row justify-start items-start w-full h-dvh pt-16  ">
        <Sidebar />
        <section className="flex flex-col justify-start items-center h-full w-[calc(100%-224px)]">
          <div className="w-full">{children}</div>
          <Footer />
        </section>
      </main>
    </section>
  );
};

export default SidebarLayout;
