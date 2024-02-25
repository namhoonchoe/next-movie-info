/* eslint-disable @next/next/no-img-element */

import { Carousel } from "flowbite-react";
import Link from "next/link";
import React from "react";
import ImageCard from "./ImageCard";

type CarouselProps = {
  dataList: Array<any>;
  isLoading: Boolean;
  navigateTo: string;
};

const CarouselSlider: React.FC<CarouselProps> = ({
  dataList,
  isLoading,
  navigateTo,
}) => {
  let cardsPerSlide = 5;

  function arrayDivider(targetArray: Array<any>, cardsPerSlide: number) {
    const result = [];

    for (let i = 0; i < targetArray?.length; i += cardsPerSlide) {
      result.push(targetArray.slice(i, i + cardsPerSlide));
    }
    return result;
  }

  const dividedArray = arrayDivider(dataList, cardsPerSlide);

  if (isLoading) {
    return <div className="skeleton w-full h-full"></div>;
  }

  return (
    <section className="min-w-full h-full flex justify-center items-center   ">
      <Carousel
        theme={{
          root: {
            leftControl:
              "absolute top-0 left-0 flex h-full items-center justify-center px-3 focus:outline-none hover:bg-slate-700 opacity-75 transition duration-300 ease-in-out group",
            rightControl:
              "absolute top-0 right-0 flex h-full items-center justify-center  px-3 focus:outline-none hover:bg-slate-700 opacity-75 transition duration-300 ease-in-out group",
          },
        }}
        slide={false}
        indicators={false}
        leftControl={<p className="text-black group-hover:text-white text-lg fade-animation">❮</p>}
        rightControl={<p className="text-black group-hover:text-white  text-lg fade-animation">❯</p>}
      >
        {dividedArray.map((array, index) => (
          <section
            className="w-full h-full flex mx-10 gap-12 items-center z-20"
            key={index}
          >
            {array.map((item) => (
              <Link key={item.id} href={`${navigateTo}/${item.id}`}>
                <div className="poster-container ">
                  <ImageCard imageUrl={item.poster_path} title={item.title} />
                </div>
              </Link>
            ))}
          </section>
        ))}
      </Carousel>
    </section>
  );
};

export default CarouselSlider;
