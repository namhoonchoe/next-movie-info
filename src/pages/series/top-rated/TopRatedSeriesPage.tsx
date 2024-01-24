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

export default function TopRatedSeriesPage() {
  const { data, error, isLoading } = useSWR("/tv/top_rated", tmdbFetcher, {
    revalidateOnFocus: false,
  });
  return (
    <SubPagelayout isLoading={isLoading} pageTitle={"높은 평점"}>
      {data?.map((movie: any) => (
        <Link href={`/series/${movie.id}`} key={movie.id}>
           <div className="w-44 aspect-[27/40] rounded-md overflow-hidden hover:brightness-75 bg-slate-200">
            <ImageCard imageUrl={movie.poster_path} title={movie.title} />
          </div>
        </Link>
      ))}
    </SubPagelayout>
  )
}