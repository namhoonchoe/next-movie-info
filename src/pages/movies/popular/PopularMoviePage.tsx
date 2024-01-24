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

export default function PopularMoviePage() {
  const { data, error, isLoading } = useSWR("/movie/popular", tmdbFetcher, {
    revalidateOnFocus: false,
  });
  return (
    <SubPagelayout isLoading={isLoading} pageTitle={"인기 있는 영화"}>
      {data?.map((movie: any) => (
        <Link href={`/movies/${movie.id}`} key={movie.id}>
          <div className="w-44 aspect-[27/40] rounded-md overflow-hidden hover:brightness-75 bg-slate-200">
            <ImageCard imageUrl={movie.poster_path} title={movie.title} />
          </div>
        </Link>
      ))}
    </SubPagelayout>
  );
}
