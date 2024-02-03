 
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

export default function AiringTodayPage() {
  const { data, error, isLoading } = useSWR("/tv/airing_today", tmdbFetcher, {
    revalidateOnFocus: false,
  });
  return (
    <SubPagelayout isLoading={isLoading} pageTitle={"오늘 방영중인 프로그램"}>
      {data?.map((movie: any) => (
        <Link href={`/series/${movie.id}`} key={movie.id}>
        <div className="poster-container">
            <ImageCard imageUrl={movie.poster_path} title={movie.title} />
          </div>
        </Link>
      ))}
    </SubPagelayout>
  )
}