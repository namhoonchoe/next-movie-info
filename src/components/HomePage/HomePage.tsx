/* eslint-disable @next/next/no-img-element */
import { movieApi } from "@/libs/api";
import { imageDefaultUrl } from "@/utils/constants";
import { Carousel } from "flowbite-react";
import useSWR from "swr";
import CarouselSlieder from "../ui/CarouselSlieder";
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
  } = useSWR("/trending/movie/week", tmdbFetcher, {
    revalidateOnFocus: false,
  });
  const {
    data: tsData,
    error: tsError,
    isLoading: tsLoading,
  } = useSWR("/trending/tv/week", tmdbFetcher, {
    revalidateOnFocus: false,
  });
  const {
    data: umData,
    error: umError,
    isLoading: umLoading,
  } = useSWR("/movie/upcoming", tmdbFetcher, {
    revalidateOnFocus: false,
  });
  const {
    data: oaData,
    error: oaError,
    isLoading: oaLoading,
  } = useSWR("/tv/on_the_air", tmdbFetcher, {
    revalidateOnFocus: false,
  });

  return (
    <div className="w-full min-h-100vh flex flex-col items-center justify-start">
      <header className="w-full h-[26rem]">
        {/*Styling direct children (*-{modifier}) */}
        <Carousel slide={false} className="*:rounded-none">
          <>
            {tmLoading && <div className="skeleton w-full h-full"></div>}
            {tmData && (
              <HeroHeaderItem backdropPath={tmData[0]?.backdrop_path}>
                <section className="w-1/2 h-full ">
                  <h1 className="text-5xl font-bold">Box Office News!</h1>
                  <p className="py-6">
                    Provident cupiditate voluptatem et in. Quaerat fugiat ut
                    assumenda excepturi exercitationem quasi. In deleniti eaque
                    aut repudiandae et a id nisi.
                  </p>
                  <button className="btn btn-primary">Get Started</button>
                </section>
              </HeroHeaderItem>
            )}
          </>
          <>
            {tsLoading && <div className="skeleton w-full h-full"></div>}
            {tsData && (
              <HeroHeaderItem backdropPath={tsData[0].backdrop_path}>
                <section className="w-1/2 h-full ">
                  <h1 className="text-5xl font-bold">Box Office News!</h1>
                  <p className="py-6">
                    Provident cupiditate voluptatem et in. Quaerat fugiat ut
                    assumenda excepturi exercitationem quasi. In deleniti eaque
                    aut repudiandae et a id nisi.
                  </p>
                  <button className="btn btn-primary">Get Started</button>
                </section>
              </HeroHeaderItem>
            )}
          </>
          <>
            {umLoading && <div className="skeleton w-full h-full"></div>}
            {umData && (
              <HeroHeaderItem backdropPath={umData[0]?.backdrop_path}>
                <section className="w-1/2 h-full ">
                  <h1 className="text-5xl font-bold">Box Office News!</h1>
                  <p className="py-6">
                    Provident cupiditate voluptatem et in. Quaerat fugiat ut
                    assumenda excepturi exercitationem quasi. In deleniti eaque
                    aut repudiandae et a id nisi.
                  </p>
                  <button className="btn btn-primary">Get Started</button>
                </section>
              </HeroHeaderItem>
            )}
            {umLoading && <div className="skeleton w-full h-full"></div>}
          </>
          <>
            {oaData && (
              <HeroHeaderItem backdropPath={oaData[0]?.backdrop_path}>
                <section className="w-1/2 h-full ">
                  <h1 className="text-5xl font-bold">Box Office News!</h1>
                  <p className="py-6">
                    Provident cupiditate voluptatem et in. Quaerat fugiat ut
                    assumenda excepturi exercitationem quasi. In deleniti eaque
                    aut repudiandae et a id nisi.
                  </p>
                  <button className="btn btn-primary">Get Started</button>
                </section>
              </HeroHeaderItem>
            )}
            {tmLoading && <div className="skeleton w-full h-full"></div>}
          </>
        </Carousel>
      </header>
      <main className="w-[72rem] flex flex-col items-start justify-center gap-16 my-12">
        <section className="flex flex-col justify-center items-start w-full">
          <p className="custom-heading">지금 뜨는 영화</p>
          <div className="w-full h-96 border">
            <>
              {tmLoading && <div className="skeleton w-full h-full"></div>}
              {tmData && (
                <CarouselSlieder>
                  {tmData.slice(0, 5).map((trendingMovie: any) => (
                    <div
                      className="w-44 h-60 rounded-md"
                      key={trendingMovie.id}
                    >
                      <img
                        src={`${imageDefaultUrl}/${trendingMovie.poster_path}`}
                        alt={trendingMovie.title}
                        className="w-full h-full overflow-hidden object-cover object-left-top"
                      />
                    </div>
                  ))}
                </CarouselSlieder>
              )}
            </>
          </div>
        </section>
        <section className="flex flex-col justify-center items-start w-full">
          <p className="custom-heading">지금 뜨는 시리즈</p>
          <div className="w-full h-96 border">
            <>
              {tsLoading && <div className="skeleton w-full h-full"></div>}
              {tsData && (
                <CarouselSlieder>
                  {tsData.slice(0, 5).map((trendingSeries: any) => (
                    <div
                      className="w-44 h-60 rounded-md"
                      key={trendingSeries.id}
                    >
                      <img
                        src={`${imageDefaultUrl}/${trendingSeries.poster_path}`}
                        alt={trendingSeries.title}
                        className="w-full h-full overflow-hidden object-cover object-left-top"
                      />
                    </div>
                  ))}
                </CarouselSlieder>
              )}
            </>
          </div>
        </section>
        <section className="flex flex-col justify-center items-start w-full">
          <p className="custom-heading">개봉예정 영화</p>
          <div className="w-full h-96 border">
            <>
              {umLoading && <div className="skeleton w-full h-full"></div>}
              {umData && (
                <CarouselSlieder>
                  {umData.slice(0, 5).map((upcommingMovie: any) => (
                    <div
                      className="w-44 h-60 rounded-md"
                      key={upcommingMovie.id}
                    >
                      <img
                        src={`${imageDefaultUrl}/${upcommingMovie.poster_path}`}
                        alt={upcommingMovie.title}
                        className="w-full h-full overflow-hidden object-cover object-left-top"
                      />
                    </div>
                  ))}
                </CarouselSlieder>
              )}
            </>
          </div>
        </section>
        <section className="flex flex-col justify-center items-start w-full">
          <p className="custom-heading">방영 중인 TV 프로그램</p>
          <div className="w-full h-96 border">
            <>
              {oaLoading && <div className="skeleton w-full h-full"></div>}
              {oaData && (
                <CarouselSlieder>
                  {oaData.slice(0, 5).map((onAir: any) => (
                    <div className="w-44 h-60 rounded-md" key={onAir.id}>
                      <img
                        src={`${imageDefaultUrl}/${onAir.poster_path}`}
                        alt={onAir.title}
                        className="w-full h-full overflow-hidden object-cover object-left-top"
                      />
                    </div>
                  ))}
                </CarouselSlieder>
              )}
            </>
          </div>
        </section>
      </main>
    </div>
  );
};

export default HomePage;
