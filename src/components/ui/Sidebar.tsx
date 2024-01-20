import Link from "next/link";
import DiscoverIcon from "../svgIcons/DiscoverIcon";
import HomeIcon from "../svgIcons/HomeIcon";
import InboxIcon from "../svgIcons/InboxIcon";
import MovieIcon from "../svgIcons/MovieIcon";
import SeriesIcon from "../svgIcons/SeriesIcon";

export default function Sidebar() {
  return (
    <section className="flex flex-col items-center py-8 px-1.5 shrink-0 gap-4 w-56 h-[calc(100vh-64px)] shadow-[0.1px_0px_0px_1px_rgba(0,0,0,0.3)]  sticky top-16 grid-side-bar ">
      <Link href="/">
        <div className="nav-button w-52 gap-x-4 ">
          <HomeIcon />
          <p className=" subpixel-antialiased    font-medium">홈</p>
        </div>
      </Link>

      <details className="w-52  collapse collapse-arrow open:border">
        <summary className="collapse-title w-full pl-3 ">
          <div className=" text-sm font-medium flex items-center gap-x-4   ">
            <MovieIcon />
            <p className=" subpixel-antialiased  font-medium">영화</p>
          </div>
        </summary>

        <section className="collapse-content flex flex-col justify-start items-start gap-y-3 ">
          <Link href="/movies/now-playing" className="w-full">
            <div className="nav-button">
              <p className=" subpixel-antialiased   ">현재 상영중</p>
            </div>
          </Link>
          <Link href="/movies/popular" className="w-full">
            <div className="nav-button">
              <p className=" subpixel-antialiased   ">인기</p>
            </div>
          </Link>
          <Link href="/movies/top-rated" className="w-full">
            <div className="nav-button">
              <p className=" subpixel-antialiased   ">높은 평점</p>
            </div>
          </Link>
        </section>
      </details>

      <details className="w-52  collapse collapse-arrow open:border  ">
        <summary className="collapse-title w-full  pl-3 ">
          <div className=" text-sm font-medium flex items-center gap-x-4 ">
            <SeriesIcon />
            <p className=" subpixel-antialiased   ">시리즈</p>
          </div>
        </summary>

        <section className="collapse-content flex flex-col justify-start items-start gap-y-3 ">
          <Link href="/series/airing-today" className="w-full">
            <div className="nav-button ">
              <p>오늘 방영</p>
            </div>
          </Link>
          <Link href="/series/popular" className="w-full">
            <div className="nav-button">
              <p>인기</p>
            </div>
          </Link>
          <Link href="/series/top-rated" className="w-full">
            <div className="nav-button">
              <p>높은 평점</p>
            </div>
          </Link>
        </section>
      </details>

      <Link href="/discover">
        <div className="nav-button w-52 gap-x-4 ">
          <DiscoverIcon />
          <p className=" subpixel-antialiased  font-medium">탐색</p>
        </div>
      </Link>
      <Link href="/inbox">
        <div className="nav-button w-52 gap-x-4 ">
          <InboxIcon />
          <p className=" subpixel-antialiased  font-medium">보관함</p>
        </div>
      </Link>
    </section>
  );
}
