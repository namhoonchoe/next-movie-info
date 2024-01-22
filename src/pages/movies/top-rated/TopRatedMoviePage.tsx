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

export default function TopRatedMoviePage() {
  const { data, error, isLoading } = useSWR("/movie/top_rated", tmdbFetcher, {
    revalidateOnFocus: false,
  });
  return (
    <SubPagelayout isLoading={isLoading} pageTitle={"높은 평점"}>
      {data?.map((movie: any) => (
        <Link href={`/movies/${movie.id}`} key={movie.id}>
          <ImageCard posterPath={movie.poster_path} title={movie.title} />
        </Link>
      ))}
    </SubPagelayout>
  );
}
