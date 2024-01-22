import BreadCrumbs from "@/components/ui/BreadCrumbs";
import ImageCard from "@/components/ui/ImageCard";
import { movieApi } from "@/libs/api";
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
    <div className="w-[72rem] mb-32 min-h-screen flex flex-col items-start justify-start  gap-y-12 ">
      <BreadCrumbs />

      {isLoading ? (
        <div className="skeleton w-full h-64"></div>
      ) : (
        <section className="w-full detail-grid justify-items-center gap-y-8 ">
          {data?.map((movie: any) => (
            <ImageCard
              posterPath={movie.poster_path}
              title={movie.title}
              key={movie.id}
            />
          ))}
        </section>
      )}
    </div>
  );
}
