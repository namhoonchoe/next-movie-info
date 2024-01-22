import BreadCrumbs from "@/components/ui/BreadCrumbs";
import { movieApi } from "@/libs/api";
import useSWR from "swr";

export default function DiscoverPage() {
  async function tmdbFetcher(url: string) {
    const { data } = await movieApi.get(url);
    return data;
  }

  const {
    data: movieData,
    error: movieError,
    isLoading: movieLoading,
  } = useSWR("/genre/movie/list", tmdbFetcher, {
    revalidateOnFocus: false,
  });

  const {
    data: tvData,
    error: tvError,
    isLoading: tvLoading,
  } = useSWR("/genre/tv/list", tmdbFetcher, {
    revalidateOnFocus: false,
  });

  const arr = Array.from({ length: 20 }, (_, i) => i + 1);

  return (
    <div className="w-[72rem] mb-32 min-h-screen flex flex-col items-start justify-start gap-y-8 ">
      <BreadCrumbs />
      <p className="custom-heading mb-0">탐색</p>
      <div className="w-full flex flex-col items-start justify-start ">
        <p>영화 장르 목록</p>

        {movieLoading ? (
          <section className="w-full detail-grid justify-items-center gap-y-12">
            {arr.map((_, index) => (
              <div
                key={index}
                className="w-44 aspect-square rounded-lg   skeleton "
              ></div>
            ))}
          </section>
        ) : (
          <section className="w-full detail-grid justify-items-center gap-y-12">
            {movieData.genres.map((genre: any) => (
              <div
                className="w-44 aspect-square rounded-lg flex items-center justify-center border "
                key={genre.id}
              >
                {genre.name}
              </div>
            ))}
          </section>
        )}
      </div>
      <div className="w-full flex flex-col items-start justify-start ">
        <p>시리즈 장르 목록</p>

        {tvLoading ? (
          <section className="w-full detail-grid justify-items-center gap-y-12">
            {arr.map((_, index) => (
              <div
                key={index}
                className="w-44 aspect-[27/40] rounded-md skeleton "
              ></div>
            ))}
          </section>
        ) : (
          <section className="w-full detail-grid justify-items-center gap-y-12">
            {tvData.genres.map((genre: any) => (
              <div
                className="w-44 aspect-square rounded-lg flex items-center justify-center border "
                key={genre.id}
              >
                {genre.name}
              </div>
            ))}
          </section>
        )}
      </div>
    </div>
  );
}
