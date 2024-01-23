import HeroHeaderItem from "@/components/ui/HeroHeaderItem";
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

export default function MovieDetailPage() {
  const {
    query: { id },
  } = useRouter();

  const { data, error, isLoading } = useSWR(`/movie/${id}`, tmdbFetcher, {
    revalidateOnFocus: false,
  });

  return (
    <div className="w-full min-h-screen flex flex-col items-center justify-start">
      <header className="w-full h-[26rem]">
        {isLoading ? (
          <div className="skeleton w-full h-full" />
        ) : (
          <HeroHeaderItem backdropPath={data?.backdrop_path}>
            <section className="w-full h-full flex flex-col items-start justify-start pt-12 *:text-white gap-8">
              <h1 className="text-3xl font-semibold	">{data?.title}</h1>
              <p className="italic"> {data?.tagline}</p>
              <div className="flex justify-start items-center gap-2">
                <Rating className="flex items-center justify-start gap-1">
                  <Rating.Star />
                  <p className="text-sm font-bold text-white dark:text-white">
                    {getOneDecimalPlaceNumber(data?.vote_average)}
                  </p>

                  <a
                    href="#"
                    className="text-sm  font-semibold text-white underline "
                  >
                    ({data?.vote_count})
                  </a>
                </Rating>
                <p className="text-sm  font-semibold text-white   ">
                  {runningTimeConverter(data?.runtime)}
                </p>
                <p className="text-sm  font-semibold text-white   ">
                  {releaseYear(data?.release_date)}
                </p>
              </div>
              <div className="flex justify-start items-center">
                {data?.overview.length > 100 ? (
                  <p className="text-pretty">
                    {data?.overview.slice(0, 100)} ...
                    <p className="btn btn-sm btn-active btn-ghost">더보기</p>
                  </p>
                ) : (
                  <p>{data?.overview}</p>
                )}
              </div>
              <div className="flex justify-start items-center gap-3">
                {data?.genres.map((genre: any) => (
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
    </div>
  );
}
