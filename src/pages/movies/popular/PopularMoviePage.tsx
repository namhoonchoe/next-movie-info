import SubPagelayout from "@/components/layouts/SubPagelayout";
import ImageCard from "@/components/ui/ImageCard";
import { movieApi } from "@/libs/api";
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
        <ImageCard
          posterPath={movie.poster_path}
          title={movie.title}
          key={movie.id}
        />
      ))}
    </SubPagelayout>
  )
}
