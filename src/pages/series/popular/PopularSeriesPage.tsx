import SubPagelayout from "@/components/layouts/SubPagelayout";
import ImageCard from "@/components/ui/ImageCard";
import { movieApi } from "@/libs/api";
import Link from "next/link";
import useSWR from "swr";

async function tmdbFetcher(url: string) {
  const {
    data: { results },
  } = await movieApi.get(url);
  return results;
}

export default function PopularSeriesPage() {
  const { data, error, isLoading } = useSWR("/tv/popular", tmdbFetcher, {
    revalidateOnFocus: false,
  });
  return (
    <SubPagelayout isLoading={isLoading} pageTitle={"인기있는 프로그램"}>
      {data?.map((movie: any) => (
        <Link href={`/series/${movie.id}`} key={movie.id}>
          <ImageCard posterPath={movie.poster_path} title={movie.title} />
        </Link>
      ))}
    </SubPagelayout>
  );
}
