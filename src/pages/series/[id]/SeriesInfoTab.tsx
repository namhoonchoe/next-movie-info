import SeriesDetailLayout from "@/components/layouts/SeriesDetailLayout";
import ImageCard from "@/components/ui/ImageCard";
import ImageSlider from "@/components/ui/ImageSlider";
import { movieApi } from "@/libs/api";
import { useRouter } from "next/router";
import { useRef } from "react";
import useSWR from "swr";

export default function SeriesInfoTab() {
  const sliderRef = useRef(null) as any;

  const {
    query: { id },
  } = useRouter();

  async function creditFetcher(url: string) {
    const { data } = await movieApi.get(url);
    return data;
  }
  async function gallaryFetcher(url: string) {
    const {
      data: { backdrops },
    } = await movieApi.get(url, { params: { language: "" } });
    return backdrops;
  }

  const { data: creditInfo, isLoading: creditsLoading } = useSWR(
    `/tv/${id}/credits`,
    creditFetcher
  );

  const { data: images, isLoading: imagesLoading } = useSWR(
    `/tv/${id}/images`,
    gallaryFetcher
  );

  const arr = Array.from({ length: 7 }, (_, i) => i + 1);

  const crews = creditInfo?.crew;

  const casts = creditInfo?.cast;

  const actors = casts?.filter((cast: any) =>
    Object.keys(cast).includes("character")
  );

  const director = crews?.filter((crew: any) => crew.job === "Director")[0];

  return (
    <section className="w-full flex flex-col justify-start items-start">
      <p className="custom-heading">출연/제작</p>

      {creditsLoading ? (
        <div className="w-full credit-grid gap-8">
          {arr.map((_, index) => (
            <div
              key={index}
              className="w-80 aspect-[4] rounded-md skeleton "
            ></div>
          ))}
        </div>
      ) : (
        <div className="w-full credit-grid gap-8">
          {director && (
            <div className="w-80 aspect-[4] rounded-md flex items-center justify-start gap-2 px-2 py-1 hover:bg-slate-200 fade-animation">
              <div className="avatar">
                <div className="w-16 rounded-full">
                  <ImageCard
                    imageUrl={director.profile_path}
                    title={director.name}
                    isProfile={true}
                  />
                </div>
              </div>
              <div className="w-64 h-full flex flex-col items-start justify-start gap-1">
                <p className="text-lg font-semibold">{director.name}</p>
                <p className="text-sm text-clip text-slate-400 ">
                  {director.job}
                </p>
              </div>
            </div>
          )}

          {actors?.slice(0, 10).map((cast: any) => (
            <div
              key={cast.id}
              className="w-80 aspect-[4] rounded-md flex items-center justify-start gap-2 px-2 py-1 hover:bg-slate-200 fade-animation"
            >
              <div className="avatar">
                <div className="w-16 rounded-full">
                  <ImageCard
                    imageUrl={cast.profile_path}
                    title={cast.name}
                    isProfile={true}
                  />
                </div>
              </div>
              <div className="w-64 h-full flex flex-col items-start justify-start gap-1">
                <p className="text-lg font-semibold">{cast.name}</p>
                <p className="text-sm text-clip text-slate-400 ">
                  {cast.character}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
      <div className="divider"></div>
      <p className="custom-heading">갤러리</p>
      <div className="w-full h-full flex items-start justify-start relative">
        <ImageSlider targetRef={sliderRef} />
        {imagesLoading ? (
          <div className="w-full h-72 skeleton "></div>
        ) : (
          <div className="gallary-slider   gap-x-2" ref={sliderRef}>
            {images?.map((image: any) => (
              <div
                key={image.file_path}
                className={`carousel-item h-72 aspect-[${image.aspect_ratio}]`}
              >
                <ImageCard imageUrl={image.file_path} />
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

SeriesInfoTab.getLayout = function getLayout(page: React.ReactElement) {
  return <SeriesDetailLayout outlet={<>{page}</>} />;
};
