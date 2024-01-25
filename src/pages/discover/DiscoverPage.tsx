import BreadCrumbs from "@/components/ui/BreadCrumbs";
import { movieApi } from "@/libs/api";
import { movieBackgrounds, seriesBackgrounds } from "@/styles/patternCover";
import Link from "next/link";
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

      <div className="w-full flex flex-col items-start justify-start mb-12 ">
        <p className="custom-heading">영화 장르 목록</p>

        {movieLoading ? (
          <section className="w-full detail-grid justify-items-center gap-y-12">
            {arr.map((_, index) => (
              <div
                key={index}
                className="w-44 aspect-[15/8] rounded-lg   skeleton "
              ></div>
            ))}
          </section>
        ) : (
          <section className="w-full detail-grid justify-items-center gap-y-12">
            {movieData.genres.map((genre: any, index: number) => (
              <Link
                href={{
                  pathname: `/discover/movies/${genre.id}`,
                }}
                key={genre.id}
              >
                <div className="w-44 aspect-[15/8] rounded-xl p-3 border relative  hover:brightness-50 overflow-hidden">
                  <div
                    className="w-full h-full absolute top-0 left-0 -z-10"
                    style={
                      index + 1 > 9
                        ? movieBackgrounds[(index + 1) % 9]
                        : movieBackgrounds[index]
                    }
                  ></div>
                  <p className="text-white font-semibold text-sm	 ">
                    {genre.name}
                  </p>
                </div>
              </Link>
            ))}
          </section>
        )}
      </div>
      <div className="w-full flex flex-col items-start justify-start ">
        <p className="custom-heading">시리즈 장르 목록</p>

        {tvLoading ? (
          <section className="w-full detail-grid justify-items-center gap-y-12">
            {arr.map((_, index) => (
              <div
                key={index}
                className="w-44 aspect-[15/8] rounded-xl skeleton "
              ></div>
            ))}
          </section>
        ) : (
          <section className="w-full detail-grid justify-items-center gap-y-12">
            {tvData.genres.map((genre: any, index: number) => (
              <Link
                href={{ pathname:`/discover/series/${genre.id}` }}
                key={genre.id}
              >
                <div className="w-44 aspect-[15/8] rounded-xl p-3 border relative  hover:brightness-50 overflow-hidden">
                  <div
                    className="w-full h-full absolute top-0 left-0 -z-10"
                    style={
                      index + 1 > 9
                        ? seriesBackgrounds[(index + 1) % 9]
                        : seriesBackgrounds[index]
                    }
                  ></div>
                  <p className="text-white font-semibold text-sm">
                    {genre.name}
                  </p>
                </div>
              </Link>
            ))}
          </section>
        )}
      </div>
    </div>
  );
}
