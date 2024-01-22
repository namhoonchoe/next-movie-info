import { fullSizeUrl } from "@/utils/constants";
import React from "react";

type HeroHeaderProps = {
  backdropPath?: string;
  children: React.ReactElement;
};

const HeroHeaderItem: React.FC<HeroHeaderProps> = ({
  backdropPath,
  children,
}) => {
 
  return (
    <section className="hero h-full ">
      <div className="hero-header-container bg-black">
        <section className="w-1/2 h-full bg-black ">{children}</section>
        {backdropPath && (
          <div
            className="bg-left-top bg-cover w-1/2 h-full brightness-75 box-inner-shadow"
            style={{
              backgroundImage: `url(${fullSizeUrl}${backdropPath})`,
            }}
          />
        )}
      </div>
    </section>
  );
};

export default HeroHeaderItem;
