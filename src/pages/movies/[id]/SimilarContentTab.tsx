import ImageCard from "@/components/ui/ImageCard";
import { movieApi } from "@/libs/api";
import Link from "next/link";
import { useRouter } from "next/router";
import useSWR from "swr";

const arr = Array.from({ length: 20 }, (_, i) => i + 1);

export default function SimilarContentTab() {
  async function tmdbFetcher(url: string) {
    const {
      data: { results },
    } = await movieApi.get(url);
    return results;
  }

  const {
    query: { id },
  } = useRouter();

  const { data, isLoading } = useSWR(`/movie/${id}/similar`, tmdbFetcher, {
    revalidateOnFocus: false,
  });

  return (
    <section className=" w-full flex flex-col justify-start items-start  mb-16">
      {isLoading ? (
        <section className="w-full detail-grid justify-items-center gap-y-16 ">
          {arr.map((_, index) => (
            <div
              key={index}
              className="w-44 aspect-[27/40] rounded-md skeleton "
            ></div>
          ))}
        </section>
      ) : (
        <section className="w-full detail-grid justify-items-center gap-y-12 ">
          {data?.map((movie: any) => (
            <Link href={`/movies/${movie.id}`} key={movie.id}>
              <div className="w-44 aspect-[27/40] rounded-md overflow-hidden hover:brightness-75 bg-slate-200">
                <ImageCard imageUrl={movie.poster_path} title={movie.title} />
              </div>
            </Link>
          ))}
        </section>
      )}
    </section>
  );
}
