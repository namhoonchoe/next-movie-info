import SeriesDetailLayout from "@/components/layouts/SeriesDetailLayout";
import ImageCard from "@/components/ui/ImageCard";
import { movieApi } from "@/libs/api";
import Link from "next/link";
import { useRouter } from "next/router";
import useSWR from "swr";

const arr = Array.from({ length: 20 }, (_, i) => i + 1);

export default function SimilarSeriesTab() {
  async function tmdbFetcher(url: string) {
    const {
      data: { results },
    } = await movieApi.get(url);
    return results;
  }

  const {
    query: { id },
  } = useRouter();

  const { data, isLoading } = useSWR(`/tv/${id}/similar`, tmdbFetcher );

  return (
    <section className=" w-full flex flex-col justify-start items-start   ">
      {isLoading ? (
        <section className="w-full detail-grid justify-items-center gap-y-16 ">
          {arr.map((_, index) => (
            <div
              key={index}
              className="w-44 aspect-[27/40] rounded-md skeleton "
            ></div>
          ))}
        </section>
      ) : (
        <section className="w-full detail-grid justify-items-center gap-y-12 ">
          {data?.map((series: any) => (
            <Link href={`/series/${series.id}`} key={series.id}>
              <div className="poster-container">
                <ImageCard imageUrl={series.poster_path} title={series.title} />
              </div>
            </Link>
          ))}
        </section>
      )}
    </section>
  );
}

SimilarSeriesTab.getLayout = function getLayout(page: React.ReactElement) {
  return <SeriesDetailLayout outlet={<>{page}</>} />;
};
