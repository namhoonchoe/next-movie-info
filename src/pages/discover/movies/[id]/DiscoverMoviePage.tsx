import DiscoverLayout from "@/components/layouts/DiscoverLayout";
import ImageCard from "@/components/ui/ImageCard";
import { movieApi } from "@/libs/api";
import Link from "next/link";
import { useRouter } from "next/router";
import useSWR from "swr";

export default function DiscoverMoviePage() {
  async function tmdbFetcher(url: string) {
    const {
      data: { results },
    } = await movieApi.get(url);
    return results;
  }

  const {
    query: { id },
  } = useRouter();

  const queryParams =`?include_adult=false&include_video=false&sort_by=popularity.desc&with_genres=${id}`;

  const { data, error, isLoading } = useSWR(
    `/discover/movie${queryParams}`,
    tmdbFetcher,
    {
      revalidateOnFocus: false,
    }
  );

  return (
    <DiscoverLayout isLoading={isLoading} pageTitle={"장르로 찾아보기 "}>
      {data?.map((movie: any) => (
        <Link href={`/movies/${movie.id}`} key={movie.id}>
          <div className="w-44 aspect-[27/40] rounded-md overflow-hidden hover:brightness-75 bg-slate-200">
            <ImageCard imageUrl={movie.poster_path} title={movie.title} />
          </div>
        </Link>
      ))}
    </DiscoverLayout>
  );
}
