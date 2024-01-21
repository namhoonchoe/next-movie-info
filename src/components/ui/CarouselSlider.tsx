/* eslint-disable @next/next/no-img-element */
import { imageDefaultUrl } from "@/utils/constants";
import { Carousel } from "flowbite-react";
import React from "react";

type CarouselProps = {
  dataList: Array<any>;
  isLoading: Boolean;
};

const CarouselSlider: React.FC<CarouselProps> = ({ dataList, isLoading }) => {
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
    console.log(result);
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
            className="w-full h-full bg-red-400  flex justify-center items-center gap-4"
            key={index}
          >
            {array.map((item) => (
              <div className="w-44 aespect-[27/40] rounded-md" key={item.id}>
                <img
                  src={`${imageDefaultUrl}/${item.poster_path}`}
                  alt={item.title}
                  className="w-full h-full overflow-hidden object-cover object-center"
                />
              </div>
            ))}
          </section>
        ))}
      </Carousel>
    </section>
  );
};

export default CarouselSlider;
