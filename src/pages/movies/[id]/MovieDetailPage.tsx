import HeroHeaderItem from "@/components/ui/HeroHeaderItem";
import { movieApi } from "@/libs/api";
import {
  getOneDecimalPlaceNumber,
  releaseYear,
  runningTimeConverter,
} from "@/utils/utilFunctions";
import { Rating } from "flowbite-react";
import { useRouter } from "next/router";
import { useState } from "react";
import useSWR from "swr";
import ContentInfoTab from "./ContentInfoTab";
import SimilarContentTab from "./SimilarContentTab";

async function tmdbFetcher(url: string) {
  const { data } = await movieApi.get(url);
  return data;
}

export default function MovieDetailPage() {
  const [toggleDefault, setToggleDefault] = useState<Boolean>(true);
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

  return (
    <div className="w-full min-h-screen flex flex-col items-center justify-start  ">
      <header className="w-full h-[26rem]">
        {mdLoading ? (
          <div className="skeleton rounded-none w-full h-full" />
        ) : (
          <HeroHeaderItem backdropPath={movieDetail?.backdrop_path}>
            <section className="w-full h-full flex flex-col items-start justify-between py-8 *:text-white ">
              <div className="flex flex-col gap-8 items-start justify-start">
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
              </div>

              <div className="flex justify-start items-center gap-3">
                {movieDetail?.genres.slice(0, 3).map((genre: any) => (
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
      <main className="w-[72rem]   min-h-1/2 flex flex-col items-center justify-center gap-y-12 pt-12 ">
        <header className="w-64 h-12 flex items-center justify-center gap-4 rounded-lg border ">
          <div
            className="flex items-center justify-center"
            onClick={() => setToggleDefault(!toggleDefault)}
          >
            <p className="font-semibold">컨텐츠 정보</p>
          </div>
          <div
            className="flex items-center justify-center"
            onClick={() => setToggleDefault(!toggleDefault)}
          >
            <p className="font-semibold">비슷한 컨텐츠</p>
          </div>
        </header>
        {toggleDefault ? <ContentInfoTab /> : <SimilarContentTab />}
      </main>
    </div>
  );
}
