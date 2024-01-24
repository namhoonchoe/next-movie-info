import HeroHeaderItem from "@/components/ui/HeroHeaderItem";
import ImageCard from "@/components/ui/ImageCard";
import { movieApi } from "@/libs/api";
import {
  getOneDecimalPlaceNumber,
  releaseYear,
  runningTimeConverter,
} from "@/utils/utilFunctions";
import { Rating } from "flowbite-react";
import { useRouter } from "next/router";
import useSWR from "swr";

async function tmdbFetcher(url: string) {
  const { data } = await movieApi.get(url);
  return data;
}

async function creditFetcher(url: string) {
  const {
    data: { cast },
  } = await movieApi.get(url);
  return cast;
}

async function gallaryFetcher(url: string) {
  const {
    data: { backdrops },
  } = await movieApi.get(url, { params: { language: "" } });
  return backdrops;
}

export default function MovieDetailPage() {
  const {
    query: { id },
  } = useRouter();

  const { data: movieDetail, isLoading: mdLoading } = useSWR(
    `/movie/${id}`,
    tmdbFetcher,
    {
      revalidateOnFocus: false,
    }
  );

  const { data: credits, isLoading: creditsLoading } = useSWR(
    `/movie/${id}/credits`,
    creditFetcher,
    {
      revalidateOnFocus: false,
    }
  );

  const { data: images, isLoading: imagesLoading } = useSWR(
    `/movie/${id}/images`,
    gallaryFetcher,
    {
      revalidateOnFocus: false,
    }
  );

  const arr = Array.from({ length: 7 }, (_, i) => i + 1);

  const actors = credits?.filter((cast: any) =>
    Object.keys(cast).includes("character")
  );

  return (
    <div className="w-full min-h-screen flex flex-col items-center justify-start">
      <header className="w-full h-[26rem]">
        {mdLoading ? (
          <div className="skeleton w-full h-full" />
        ) : (
          <HeroHeaderItem backdropPath={movieDetail?.backdrop_path}>
            <section className="w-full h-full flex flex-col items-start justify-start pt-12 *:text-white gap-8">
              <h1 className="text-3xl font-semibold	">{movieDetail?.title}</h1>
              <p className="italic"> {movieDetail?.tagline}</p>
              <div className="flex justify-start items-center gap-2">
                <Rating className="flex items-center justify-start gap-1">
                  <Rating.Star />
                  <p className="text-sm font-bold text-white dark:text-white">
                    {getOneDecimalPlaceNumber(movieDetail?.vote_average)}
                  </p>

                  <a
                    href="#"
                    className="text-sm  font-semibold text-white underline "
                  >
                    ({movieDetail?.vote_count})
                  </a>
                </Rating>
                <p className="text-sm  font-semibold text-white   ">
                  {runningTimeConverter(movieDetail?.runtime)}
                </p>
                <p className="text-sm  font-semibold text-white   ">
                  {releaseYear(movieDetail?.release_date)}
                </p>
              </div>
              <div className="flex justify-start items-center">
                {movieDetail?.overview.length > 100 ? (
                  <p className="text-pretty">
                    {movieDetail?.overview.slice(0, 100)} ...
                    <p className="btn btn-sm btn-active btn-ghost">더보기</p>
                  </p>
                ) : (
                  <p>{movieDetail?.overview}</p>
                )}
              </div>
              <div className="flex justify-start items-center gap-3">
                {movieDetail?.genres.map((genre: any) => (
                  <p
                    key={genre.id}
                    className="text-sm px-3 py-1 rounded-xl  border border-2"
                  >
                    {genre.name}
                  </p>
                ))}
              </div>
            </section>
          </HeroHeaderItem>
        )}
      </header>
      <main className="w-[72rem] mb-32 min-h-1/2 flex flex-col items-center justify-center gap-y-8 pt-12">
        <header className="w-64 h-12 flex items-center justify-center gap-4 rounded-lg border">
          <div className="flex items-center justify-center">
            <p className="font-semibold">컨텐츠 정보</p>
          </div>
          <div className="flex items-center justify-center">
            <p className="font-semibold">비슷한 컨텐츠</p>
          </div>
        </header>
        <section className="w-full flex flex-col justify-start items-start">
          <p className="custom-heading">출연</p>

          {creditsLoading ? (
            <div className="w-full credit-grid gap-8">
              {arr.map((_, index) => (
                <div
                  key={index}
                  className="w-80 aspect-[4] rounded-md skeleton "
                ></div>
              ))}
            </div>
          ) : (
            <div className="w-full credit-grid gap-8">
              {actors?.slice(0, 10).map((cast: any) => (
                <div
                  key={cast.id}
                  className="w-80 aspect-[4] rounded-md flex items-center justify-start gap-2 px-2 py-1 hover:bg-slate-200"
                >
                  <div className="avatar">
                    <div className="w-16 rounded-full">
                      <ImageCard
                        imageUrl={cast.profile_path}
                        title={cast.name}
                        isProfile={true}
                      />
                    </div>
                  </div>
                  <div className="w-64 h-full flex flex-col items-start justify-start gap-1">
                    <p className="text-lg font-semibold">{cast.name}</p>
                    <p className="text-sm text-clip text-slate-400 ">
                      {cast.character}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
        <div className="divider"></div>
        <section className="w-full flex flex-col justify-start items-start">
          <p className="custom-heading">갤러리</p>

          {imagesLoading ? (
            <div className="carousel carousel-end gap-x-2">
              {arr.map((_, index) => (
                <div key={index} className="carousel-item h-72 skeleton "></div>
              ))}
            </div>
          ) : (
            <div className="carousel carousel-end gap-x-2">
              {images.map((image: any) => (
                <div
                  key={image.file_path}
                  className={`carousel-item h-72 aspect-[${image.aspect_ratio}] skeleton`}
                >
                  <ImageCard imageUrl={image.file_path} />
                </div>
              ))}
            </div>
          )}
        </section>
      </main>
    </div>
  );
}
