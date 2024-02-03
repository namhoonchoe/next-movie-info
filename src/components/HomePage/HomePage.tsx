/* eslint-disable @next/next/no-img-element */
import { movieApi } from "@/libs/api";
import { MovieResult } from "@/types/MovieResult";
import { TrendingMovie } from "@/types/TrendingMovie";
import { TrendingSeries } from "@/types/TrendingSeries";
import { getOneDecimalPlaceNumber } from "@/utils/utilFunctions";
import { Carousel } from "flowbite-react";
import useSWR from "swr";
import CarouselSlider from "../ui/CarouselSlider";
import HeroBanner from "../ui/HeroBanner";
import HeroHeaderItem from "../ui/HeroHeaderItem";

async function tmdbFetcher(url: string) {
  const {
    data: { results },
  } = await movieApi.get(url);
  return results;
}

const HomePage: React.FC = () => {
  const {
    data: tmData,
    error: tmError,
    isLoading: tmLoading,
  } = useSWR<Array<TrendingMovie>>("/trending/movie/week", tmdbFetcher, {
    revalidateOnFocus: false,
  });
  const {
    data: tsData,
    error: tsError,
    isLoading: tsLoading,
  } = useSWR<Array<TrendingSeries>>("/trending/tv/week", tmdbFetcher, {
    revalidateOnFocus: false,
  });
  const {
    data: umData,
    error: umError,
    isLoading: umLoading,
  } = useSWR<Array<MovieResult>>("/movie/upcoming", tmdbFetcher, {
    revalidateOnFocus: false,
  });

  return (
    <div className="w-full min-h-screen flex flex-col items-center justify-start">
      <header className="w-full h-[26rem]">
        {/*Styling direct children (*-{modifier}) */}
        <Carousel
          slide={false}
          className="*:rounded-none"
          leftControl={<p className="text-white  text-lg">❮</p>}
          rightControl={<p className="text-white  text-lg">❯</p>}
        >
          <>
            {tmLoading && (
              <div className="skeleton rounded-none w-full h-full"></div>
            )}
            {tmData && (
              <HeroHeaderItem backdropPath={tmData[0].backdrop_path}>
                <HeroBanner
                  heading={"지금 뜨는 영화"}
                  dataTitle={tmData[0].title}
                  voteAverage={getOneDecimalPlaceNumber(tmData[0].vote_average)}
                  voteCount={tmData[0].vote_count}
                  overView={tmData[0].overview}
                  navigateTo=""
                />
              </HeroHeaderItem>
            )}
          </>
          <>
            {tsLoading && (
              <div className="skeleton rounded-none w-full h-full"></div>
            )}
            {tsData && (
              <HeroHeaderItem backdropPath={tsData[0].backdrop_path}>
                <HeroBanner
                  heading={"지금 뜨는 시리즈"}
                  dataTitle={tsData[0].name}
                  voteAverage={getOneDecimalPlaceNumber(tsData[0].vote_average)}
                  voteCount={tsData[0].vote_count}
                  overView={tsData[0].overview}
                  navigateTo=""
                />
              </HeroHeaderItem>
            )}
          </>
          <>
            {umLoading && (
              <div className="skeleton rounded-none w-full h-full"></div>
            )}
            {umData && (
              <HeroHeaderItem backdropPath={umData[0]?.backdrop_path}>
                <HeroBanner
                  heading={"개봉 예정 영화"}
                  dataTitle={umData[0].title}
                  voteAverage={getOneDecimalPlaceNumber(umData[0].vote_average)}
                  voteCount={umData[0].vote_count}
                  overView={umData[0].overview}
                  navigateTo=""
                />
              </HeroHeaderItem>
            )}
            {umLoading && (
              <div className="skeleton rounded-none w-full h-full"></div>
            )}
          </>
        </Carousel>
      </header>
      <main className="w-[72rem] flex flex-col items-start justify-center gap-16 my-12">
        <section className="flex flex-col justify-center items-start w-full">
          <p className="custom-heading">지금 뜨는 영화</p>
          <div className="w-full h-80">
            {tmData && (
              <CarouselSlider
                dataList={tmData}
                isLoading={tmLoading}
                navigateTo={"/movies"}
              />
            )}
          </div>
        </section>
        <section className="flex flex-col justify-center items-start w-full">
          <p className="custom-heading">지금 뜨는 시리즈</p>
          <div className="w-full h-80  ">
            {tsData && (
              <CarouselSlider
                dataList={tsData}
                isLoading={tsLoading}
                navigateTo={"/series"}
              />
            )}
          </div>
        </section>
        <section className="flex flex-col justify-center items-start w-full">
          <p className="custom-heading">개봉예정 영화</p>
          <div className="w-full h-80  ">
            {umData && (
              <CarouselSlider
                dataList={umData}
                isLoading={umLoading}
                navigateTo={"/movies"}
              />
            )}
          </div>
        </section>
      </main>
    </div>
  );
};

export default HomePage;
