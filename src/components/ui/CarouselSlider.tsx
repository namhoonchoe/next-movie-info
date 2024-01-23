/* eslint-disable @next/next/no-img-element */

import { Carousel } from "flowbite-react";
import Link from "next/link";
import React from "react";
import ImageCard from "./ImageCard";

type CarouselProps = {
  dataList: Array<any>;
  isLoading: Boolean;
  dlPrefix: string;
};

const CarouselSlider: React.FC<CarouselProps> = ({
  dataList,
  isLoading,
  dlPrefix,
}) => {
  let offset = 4;

  const totalItems = dataList?.length;

  const divide =
    Math.floor(totalItems / offset) +
    (Math.floor(totalItems % offset) > 0 ? 1 : 0);

  function chunkArray(array: Array<any>, divide: number) {
    const result = [];
    for (let i = 0; i < array?.length; i += divide) {
      result.push(array.slice(i, i + divide));
    }
    return result;
  }

  const dividedArray = chunkArray(dataList, divide);

  if (isLoading) {
    return <div className="skeleton w-full h-full"></div>;
  }

  return (
    <section className="min-w-full h-full flex justify-center items-center ">
      <Carousel slide={false}>
        {dividedArray.map((array, index) => (
          <section
            className="w-full h-full bg-red-400  flex justify-center items-center gap-4 z-20"
            key={index}
          >
            {array.map((item) => (
              <Link key={item.id} href={`${dlPrefix}/${item.id}`}>
                <ImageCard posterPath={item.poster_path} title={item.title} />
              </Link>
            ))}
          </section>
        ))}
      </Carousel>
    </section>
  );
};

export default CarouselSlider;
