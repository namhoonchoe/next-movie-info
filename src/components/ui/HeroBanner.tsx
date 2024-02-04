import { Rating } from "flowbite-react";
import React from "react";

type HomeBannerProps = {
  heading: string;
  dataTitle: string;
  overView: string;
  navigateTo: string;
  voteAverage: number;
  voteCount: number;
};

const HomeBanner: React.FC<HomeBannerProps> = ({
  heading,
  dataTitle,
  overView,
  navigateTo,
  voteAverage,
  voteCount,
}) => {
  return (
    <section className="w-full h-full *:text-white  flex flex-col gap-8 relative ">
      <header className="flex justify-start items-center">
        <h1 className="text-xl font-bold">{heading}</h1>
        <button className="btn btn-ghost text-xs">전체 목록 확인하기 </button>
      </header>
      <section className="w-full flex flex-col items-start justify-between  *:text-white ">
        <div className="flex flex-col gap-4 items-start justify-start">
          <h1 className="text-3xl font-semibold text-pretty break-normal 	">
            {dataTitle}
          </h1>

          <div className="flex justify-start items-center gap-2">
            <Rating className="flex items-center justify-start gap-1">
              <Rating.Star />
              <p className="text-sm font-bold text-white dark:text-white">
                {voteAverage}
              </p>

              <a
                href="#"
                className="text-sm  font-semibold text-white underline "
              >
                ({voteCount})
              </a>
            </Rating>
          </div>
        </div>
      </section>
      <div className="w-3/4 flex flex-col items-start justify-between *:text-white text-sm">
        {overView.length > 200 ? (
          <p className="text-pretty">
            {overView.slice(0, 200)} ...
            <p className="btn btn-sm btn-active btn-ghost">더보기</p>
          </p>
        ) : (
          <p>{overView}</p>
        )}
      </div>
    </section>
  );
};

export default HomeBanner;
