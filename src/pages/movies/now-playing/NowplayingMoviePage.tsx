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

export default function NowplayingMoviePage() {
  const { data, error, isLoading } = useSWR("/movie/now_playing", tmdbFetcher, {
    revalidateOnFocus: false,
  });
  return (
    <SubPagelayout isLoading={isLoading} pageTitle={"현재 상영중인 영화"}>
      {data?.map((movie: any) => (
        <Link href={`/movies/${movie.id}`} key={movie.id}>
          <div className="poster-container">
            <ImageCard imageUrl={movie.poster_path} title={movie.title} />
          </div>
        </Link>
      ))}
    </SubPagelayout>
  );
}
