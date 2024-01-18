import Link from "next/link";
import DiscoverIcon from "../svgIcons/DiscoverIcon";
import HomeIcon from "../svgIcons/HomeIcon";
import InboxIcon from "../svgIcons/InboxIcon";
import MovieIcon from "../svgIcons/MovieIcon";
import SeriesIcon from "../svgIcons/SeriesIcon";

export default function Sidebar() {
  return (
    <section className="flex flex-col items-center py-8 px-1.5 shrink-0 gap-4 w-60 h-full shadow-[0px_-1px_0_1px_rgba(0,0,0,0.3)]">
      <Link href="/">
        <div className="flex items-center p-2 w-56 gap-x-4">
          <HomeIcon />
          <p>홈</p>
        </div>
      </Link>

      <div tabIndex={0} className="collapse collapse-arrow border  ">
        <input type="checkbox" className="peer" />
        <div className="collapse-title text-sm font-medium flex items-center gap-x-4   ">
          <MovieIcon />
          <p>영화</p>
        </div>
        <section className="collapse-content  flex flex-col justify-start items-start gap-y-3">
          <Link href="/movies/now-playing">
            <div className="flex items-center justify-start p-2 w-full ">
              <p>지금 상영중</p>
            </div>
          </Link>
          <Link href="/movies/popular">
            <div className="flex items-center justify-start p-2 w-full  ">
              <p>인기</p>
            </div>
          </Link>
          <Link href="/movies/top-rated">
            <div className="flex items-center justify-start p-2 w-full ">
              <p>평가가 좋은</p>
            </div>
          </Link>
        </section>
      </div>
      <div tabIndex={0} className="collapse collapse-arrow border ">
        <input type="checkbox" className="peer" />
        <div className="collapse-title text-sm font-medium flex items-center gap-x-4   ">
          <SeriesIcon />
          <p>시리즈</p>
        </div>
        <section className="collapse-content  flex flex-col justify-start items-start gap-y-3">
          <Link href="/series/airing-today">
            <div className="flex items-center justify-start p-2 w-full ">
              <p>지금 방송중</p>
            </div>
          </Link>
          <Link href="/series/popular">
            <div className="flex items-center justify-start p-2 w-full  ">
              <p>인기</p>
            </div>
          </Link>
          <Link href="/series/top-rated">
            <div className="flex items-center justify-start p-2 w-full ">
              <p>평가가 좋은</p>
            </div>
          </Link>
        </section>
      </div>
      <Link href="/discover">
        <div className="flex items-center p-2 w-56 gap-x-4">
          <DiscoverIcon />
          <p>탐색</p>
        </div>
      </Link>
      <Link href="/inbox">
        <div className="flex items-center p-2 w-56 gap-x-4">
          <InboxIcon />
          <p>보관함</p>
        </div>
      </Link>
    </section>
  );
}
