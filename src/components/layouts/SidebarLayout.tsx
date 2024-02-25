import useCheckXL from "@/hooks/useCheckXL";
import Link from "next/link";
import React from "react";
import NavigationIcon from "../svgIcons/NavigationIcon";
import Footer from "../ui/Footer";
import LayoutHeader from "../ui/LayoutHeader";
import Sidebar from "../ui/Sidebar";

type LayoutProps = {
  children: React.ReactNode;
};

const SidebarLayout: React.FC<LayoutProps> = ({ children }) => {
  const { isExtraLarge } = useCheckXL();
  return (
    <>
      <div className="fit-center">
        <section className="layout-grid w-full relative">
          <LayoutHeader />
          {isExtraLarge && <Sidebar />}
          <section className="flex flex-col justify-start items-center h-full grid-main  ">
            {children}

            <Footer />
          </section>
        </section>
      </div>
      {!isExtraLarge && (
        <div className="drawer z-10">
          <input id="my-drawer" type="checkbox" className="drawer-toggle" />
          <div className="drawer-content ">
            {/* Page content here */}
            <label
              htmlFor="my-drawer"
              className="btn  btn-active btn-ghost btn-circle drawer-button fixed bottom-4 right-4"
            >
              <div className="tooltip tooltip-left" data-tip="사이드바 열기">
                <NavigationIcon fill={"#ffffff"} />
              </div>
            </label>
          </div>
          <div className="drawer-side hide-scroll">
            <label
              htmlFor="my-drawer"
              aria-label="close sidebar"
              className="drawer-overlay"
            ></label>
            <section className="flex flex-col items-start justify-start w-56 min-h-dvh ">
              <div className="w-full shadow-[0.1px_0px_0px_1px_rgba(230,230,230,1)] h-14 flex items-center pl-4 bg-white">
                <Link href={"/"}>
                  <p className="text-black text-xl font-bold font-['Inter']">
                    로고
                  </p>
                </Link>
              </div>
              <Sidebar />
            </section>
          </div>
        </div>
      )}
    </>
  );
};

export default SidebarLayout;
