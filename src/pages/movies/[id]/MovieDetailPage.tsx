import HeroHeaderItem from "@/components/ui/HeroHeaderItem";
import { movieApi } from "@/libs/api";
import { useRouter } from "next/router";
import useSWR from "swr";

async function tmdbFetcher(url: string) {
  const { data } = await movieApi.get(url);
  return data;
}

export default function MovieDetailPage() {
  const {
    query: { id },
  } = useRouter();

  const { data, error, isLoading } = useSWR(
    `/movie/${id}`,
    tmdbFetcher,
    {
      revalidateOnFocus: false,
    }
  );
 

  return (
    <div className="w-full min-h-screen flex flex-col items-center justify-start">
      <header className="w-full h-[26rem]">
        <HeroHeaderItem backdropPath={data?.backdrop_path}>
          <section className="w-1/2 h-full ">
            <h1 className="text-5xl font-bold">Box Office News!</h1>
            <p className="py-6">
              Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
              excepturi exercitationem quasi. In deleniti eaque aut repudiandae
              et a id nisi.
            </p>
            <button className="btn btn-primary">Get Started</button>
          </section>
        </HeroHeaderItem>
      </header>
    </div>
  );
}
