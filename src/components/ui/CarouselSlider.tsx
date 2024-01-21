/* eslint-disable @next/next/no-img-element */
import { imageDefaultUrl } from "@/utils/constants";
import { AnimatePresence, motion } from "framer-motion";
import React, { useState } from "react";

type CarouselProps = {
  dataList: Array<any>;
  isLoading: Boolean;
};


  /* 

브라우저 안인지 아닌지 체크해야함....

**/


const CarouselSlider: React.FC<CarouselProps> = ({ dataList, isLoading }) => {

  const isClient = typeof window === "object";

  const rowVariants = {
    hidden: {
      x: isClient ? window.outerWidth + 5 : 0,
    },
    visible: {
      x: 0,
    },
    exit: {
      x: isClient ? -window.outerWidth - 5 : 0
    },
  };

  const [index, setIndex] = useState<number>(0);
  const [leaving, setLeaving] = useState(false);

  let offset = 5;

  const totalItems = dataList?.length;
  const maxIndex = Math.floor(totalItems / offset) - 1;

  const incraseIndex = () => {
    if (dataList) {
      if (leaving) return;
      toggleLeaving();

      setIndex((prev) => (prev === maxIndex ? 0 : prev + 1));
    }
  };

  const decreaseIndex = () => {
    if (dataList) {
      if (leaving) return;
      toggleLeaving();
      setIndex((prev) => (prev === 0 ? 0 : prev - 1));
    }
  };

  const toggleLeaving = () => setLeaving((prev) => !prev);

  if (isLoading) {
    return <div className="skeleton w-full h-full"></div>;
  }

  return (
    <section className="min-w-full h-full flex justify-center items-center overflow-hidden relative">
      <AnimatePresence initial={false} onExitComplete={toggleLeaving}>
        <motion.div
          className="flex flex-nowrap gap-6"
          variants={rowVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          transition={{ ease: "easeOut", duration: 0.5 }}
          key={index}
        >
          {dataList
            .slice(1)
            .slice(offset * index, offset * index + offset)
            .map((carouselItem: any) => (
              <div className="w-44 aespect-[27/40] rounded-md" key={carouselItem.id}>
                <img
                  src={`${imageDefaultUrl}/${carouselItem.poster_path}`}
                  alt={carouselItem.title}
                  className="w-full h-full overflow-hidden object-cover object-center"
                />
              </div>
            ))}
        </motion.div>
      </AnimatePresence>
      <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
        {index === 0 ? (
          <a className="btn btn-circle opacity-0">❮</a>
        ) : (
          <a className="btn btn-circle" onClick={() => decreaseIndex()}>
            ❮
          </a>
        )}

        {index === maxIndex ? (
          <a className="btn btn-circle opacity-0">❯</a>
        ) : (
          <a className="btn btn-circle" onClick={() => incraseIndex()}>
            ❯
          </a>
        )}
      </div>
    </section>
  );
};

export default CarouselSlider;
