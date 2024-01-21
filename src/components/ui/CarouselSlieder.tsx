import { AnimatePresence, motion } from "framer-motion";
import React, { useState } from "react";

type CarouselProps = {
  children: React.ReactNode;
};

{
  /* 

브라우저 안인지 아닌지 체크해야함....

**/
}

const CarouselSlieder: React.FC<CarouselProps> = ({ children }) => {
  const rowVariants = {
    hidden: {
      x: window.outerWidth + 10,
    },
    visible: {
      x: 0,
    },
    exit: {
      x: -window.outerWidth - 10,
    },
  };

  const [index, setIndex] = useState<number>(0);
  const [leaving, setLeaving] = useState(false);

  let offset = 5;

  const incraseIndex = (dataLength:number) => {
    if (dataLength !== 0) {
      if (leaving) return;
      toggleLeaving();
      const totalMovies = dataLength - 1;
      const maxIndex = Math.floor(totalMovies / offset) - 1;
      setIndex((prev) => (prev === maxIndex ? 0 : prev + 1));
    }
  };

  const toggleLeaving = () => setLeaving((prev) => !prev);

  return (
    <section className="min-w-full h-full flex justify-center items-center overflow-hidden relative">
      <AnimatePresence initial={false} onExitComplete={toggleLeaving}>
        <motion.div
          className="flex flex-nowrap gap-6"
          variants={rowVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          transition={{ type: "tween", duration: 1 }}
          key={index}
        >
          {children}
        </motion.div>
      </AnimatePresence>
      <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
        <a href="#slide4" className="btn btn-circle">
          ❮
        </a>
        <a href="#slide2" className="btn btn-circle" onClick={() => incraseIndex(20)}>
          ❯
        </a>
      </div>
    </section>
  );
};

export default CarouselSlieder;
