/* eslint-disable @next/next/no-img-element */
import { movieApi } from "@/libs/api";
import { fullSizeUrl } from "@/utils/constants";
import { Carousel } from "flowbite-react";
import useSWR from "swr";

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
    <main className="w-full min-h-dvh	bg-red-500 flex flex-col items-center justify-start">
      <header className="w-full h-[26rem]">
        {/*Styling direct children (*-{modifier}) */}
        <Carousel slide={false} className="*:rounded-none">
          <section className="hero h-full ">
            <div className="hero-header-container  bg-black">
              <section className="w-1/2 h-full ">
                <h1 className="text-5xl font-bold">Box Office News!</h1>
                <p className="py-6">
                  Provident cupiditate voluptatem et in. Quaerat fugiat ut
                  assumenda excepturi exercitationem quasi. In deleniti eaque
                  aut repudiandae et a id nisi.
                </p>
                <button className="btn btn-primary">Get Started</button>
              </section>
              {tmData && tmData.length > 0 && (
                <div
                  className="bg-left-top bg-cover w-1/2 h-full brightness-75 box-inner-shadow"
                  style={{
                    backgroundImage: `url(${fullSizeUrl}${tmData[0].backdrop_path})`,
                  }}
                />
              )}
            </div>
          </section>
          <section className="hero h-full  bg-black">
            <div className="hero-header-container">
              <section className="w-1/2 h-full ">
                <h1 className="text-5xl font-bold">Box Office News!</h1>
                <p className="py-6">
                  Provident cupiditate voluptatem et in. Quaerat fugiat ut
                  assumenda excepturi exercitationem quasi. In deleniti eaque
                  aut repudiandae et a id nisi.
                </p>
                <button className="btn btn-primary">Get Started</button>
              </section>
              {tsData && tsData.length > 0 && (
                <div
                  className="bg-left-top bg-cover w-1/2 h-full brightness-75 box-inner-shadow"
                  style={{
                    backgroundImage: `url(${fullSizeUrl}${tsData[0].backdrop_path})`,
                  }}
                />
              )}
            </div>
          </section>
          <section className="hero h-full ">
            <div className="hero-header-container  bg-black">
              <section className="w-1/2 h-full ">
                <h1 className="text-5xl font-bold">Box Office News!</h1>
                <p className="py-6">
                  Provident cupiditate voluptatem et in. Quaerat fugiat ut
                  assumenda excepturi exercitationem quasi. In deleniti eaque
                  aut repudiandae et a id nisi.
                </p>
                <button className="btn btn-primary">Get Started</button>
              </section>
              {umData && umData.length > 0 && (
                <div
                  className="bg-left-top bg-cover w-1/2 h-full brightness-75 box-inner-shadow"
                  style={{
                    backgroundImage: `url(${fullSizeUrl}${umData[0].backdrop_path})`,
                  }}
                />
              )}
            </div>
          </section>
          <section className="hero h-full  bg-black">
            <div className="hero-header-container">
              <section className="w-1/2 h-full ">
                <h1 className="text-5xl font-bold">Box Office News!</h1>
                <p className="py-6">
                  Provident cupiditate voluptatem et in. Quaerat fugiat ut
                  assumenda excepturi exercitationem quasi. In deleniti eaque
                  aut repudiandae et a id nisi.
                </p>
                <button className="btn btn-primary">Get Started</button>
              </section>
              {oaData && oaData.length > 0 && (
                <div
                  className="bg-left-top bg-cover w-1/2 h-full brightness-75 box-inner-shadow"
                  style={{
                    backgroundImage: `url(${fullSizeUrl}${oaData[0].backdrop_path})`,
                  }}
                />
              )}
            </div>
          </section>
        </Carousel>
      </header>
      <section></section>
    </main>
  );
};

export default HomePage;
