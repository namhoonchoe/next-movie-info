import DiscoverLayout from "@/components/layouts/DiscoverLayout";
import ImageCard from "@/components/ui/ImageCard";
import { movieApi } from "@/libs/api";
import Link from "next/link";
import { useRouter } from "next/router";
import useSWR from "swr";

export default function SearchResultsPage() {
  async function tmdbFetcher(url: string) {
    const {
      data: { results },
    } = await movieApi.get(url);
    return results;
  }

  const {
    query: { query },
  } = useRouter();

  const { data: movieData, isLoading: isMovieLoading } = useSWR(
    `/search/movie?query=${query}`,
    tmdbFetcher
  );

  const { data: seriesData, isLoading: isSeriesLoading } = useSWR(
    `/search/tv?query=${query}`,
    tmdbFetcher
  );

  return (
    <div className="flex flex-col justify-start items-center w-full  ">
      <DiscoverLayout
        isLoading={isMovieLoading}
        pageTitle={`영화 검색 결과 `}
      >
        {movieData?.slice(10).map((movie: any) => (
          <Link href={`/movies/${movie.id}`} key={movie.id}>
            <div className="poster-container">
              <ImageCard imageUrl={movie.poster_path} title={movie.title} />
            </div>
          </Link>
        ))}
      </DiscoverLayout>
      <DiscoverLayout
        isLoading={isSeriesLoading}
        pageTitle={`TV프로그램 검색 결과 `}
      >
        {seriesData?.slice(10).map((tv: any) => (
          <Link href={`/series/${tv.id}`} key={tv.id}>
            <div className="poster-container">
              <ImageCard imageUrl={tv.poster_path} title={tv.name} />
            </div>
          </Link>
        ))}
      </DiscoverLayout>
    </div>
  );
}
