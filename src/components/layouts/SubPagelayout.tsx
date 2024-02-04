import BreadCrumbs from "@/components/ui/BreadCrumbs";
import React from "react";

type SubpageProps = {
  children: React.ReactNode;
  isLoading: boolean;
  pageTitle:string
};

const arr = Array.from({ length: 20 }, (_, i) => i + 1);

const SubPagelayout: React.FC<SubpageProps> = ({ children, isLoading, pageTitle }) => {
  return (
    <div className="w-[72rem]  min-h-screen flex flex-col items-start justify-start gap-y-8 ">
      <BreadCrumbs />
      <p className="custom-heading mb-0">{pageTitle}</p>
      {isLoading ? (
        <section className="w-full detail-grid justify-items-center gap-y-12 ">
          {arr.map((_, index) => (
            <div
              key={index}
              className="w-44 aspect-[27/40] rounded-md skeleton "
            ></div>
          ))}
        </section>
      ) : (
        <section className="w-full detail-grid justify-items-center gap-y-12 ">
          {children}
        </section>
      )}
    </div>
  );
};

export default SubPagelayout;
