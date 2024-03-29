import SidebarLayout from "@/components/layouts/SidebarLayout";
import HeroHeaderItem from "@/components/ui/HeroHeaderItem";
import { movieApi } from "@/libs/api";
import { getOneDecimalPlaceNumber } from "@/utils/utilFunctions";
import { Rating } from "flowbite-react";
import Link from "next/link";
import { useRouter } from "next/router";
import useSWR from "swr";

async function tmdbFetcher(url: string) {
  const { data } = await movieApi.get(url);
  return data;
}

type LayoutProps = {
  outlet: React.ReactNode;
};

const SeriesDetailLayout: React.FC<LayoutProps> = ({ outlet }) => {
  const {
    query: { id },
  } = useRouter();

  const {
    data: seriesDetail,
     
    isLoading,
  } = useSWR(`/tv/${id}`, tmdbFetcher, {
    revalidateOnFocus: false,
  });

  return (
    <SidebarLayout>
      <div className="w-full min-h-screen flex flex-col items-center justify-start">
        <header className="w-full h-[26rem]">
          {isLoading ? (
            <div className="skeleton rounded-none w-full h-full" />
          ) : (
            <HeroHeaderItem backdropPath={seriesDetail?.backdrop_path}>
              <section className="w-full h-full flex flex-col items-start justify-between py-8 *:text-white ">
                <div className="flex flex-col gap-8 items-start justify-start">
                  <h1 className="text-3xl font-semibold	">
                    {seriesDetail?.name}
                  </h1>
                  <p> </p>
                  <div className="flex flex-row items-center justify-start gap-2">
                    <Rating className="flex  items-center justify-start gap-1">
                      <Rating.Star />
                      <p className="text-sm font-bold text-white dark:text-white">
                        {getOneDecimalPlaceNumber(seriesDetail?.vote_average)}
                      </p>

                      <a
                        href="#"
                        className="text-sm  font-semibold text-white underline "
                      >
                        ({seriesDetail?.vote_count})
                      </a>
                    </Rating>
                    <p className="text-sm  font-semibold text-white   ">
                      {seriesDetail?.number_of_seasons} 시즌
                    </p>
                    <p className="text-sm  font-semibold text-white   ">
                      {seriesDetail?.number_of_episodes} 에피소드
                    </p>
                  </div>
                </div>
                <div className="flex justify-start items-center">
                  {seriesDetail?.overview.length > 100 ? (
                    <p className="text-pretty">
                      {seriesDetail?.overview.slice(0, 100)} ...
                      <p className="btn btn-sm btn-active btn-ghost">더보기</p>
                    </p>
                  ) : (
                    <p>{seriesDetail?.overview}</p>
                  )}
                </div>
                <div className="flex justify-start items-center gap-3">
                  {seriesDetail?.genres.slice(0, 3).map((genre: any) => (
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
        <main className="w-[72rem] min-h-1/2 flex flex-col items-center justify-center gap-y-12 pt-12">
          <header className="w-64 h-12 flex items-center justify-center gap-4 rounded-lg border">
            <Link href={`/series/${id}`}>
              <div className="flex items-center justify-center">
                <p className="font-semibold">컨텐츠 정보</p>
              </div>
            </Link>
            <Link href={`/series/${id}/similar-content`}>
              <div className="flex items-center justify-center">
                <p className="font-semibold">비슷한 컨텐츠</p>
              </div>
            </Link>
          </header>
          {outlet}
        </main>
      </div>
    </SidebarLayout>
  );
};

export default SeriesDetailLayout;
