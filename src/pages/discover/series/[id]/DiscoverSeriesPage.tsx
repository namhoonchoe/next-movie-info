import DiscoverLayout from "@/components/layouts/DiscoverLayout";
import ImageCard from "@/components/ui/ImageCard";
import { movieApi } from "@/libs/api";
import Link from "next/link";
import { useRouter } from "next/router";
import useSWR from "swr";

export default function DiscoverSeriesPage() {
  async function tmdbFetcher(url: string) {
    const {
      data: { results },
    } = await movieApi.get(url);
    return results;
  }

  const {
    query: { id },
  } = useRouter();

  const queryParams = `?include_adult=false&include_video=false&sort_by=popularity.desc&with_genres=${id}`;

  const { data, isLoading } = useSWR(`/discover/tv${queryParams}`, tmdbFetcher);

  return (
    <DiscoverLayout isLoading={isLoading} pageTitle={"장르로 찾아보기 "}>
      {data?.map((series: any) => (
        <Link href={`/series/${series.id}`} key={series.id}>
          <div className="w-44 aspect-[27/40] rounded-md overflow-hidden hover:brightness-75 fade-animation bg-slate-200">
            <ImageCard imageUrl={series.poster_path} title={series.title} />
          </div>
        </Link>
      ))}
    </DiscoverLayout>
  );
}
