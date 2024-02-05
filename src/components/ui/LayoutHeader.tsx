import Link from "next/link";
import ProfileIcon from "../svgIcons/ProfileIcon";
import SearchBox from "./SearchBox";
export default function LayoutHeader() {
  return (
    <header className="w-full h-14 px-6 py-2 bg-white shadow-[-1px_0px_0_1px_rgba(230,230,230,1)] justify-between items-center inline-flex sticky top-0 z-[999] grid-header  ">
      <p className="text-black text-xl font-bold font-['Inter']">로고</p>
      <section className="w-[332px] h-10 px-2 justify-between items-center flex">
        {/*
        검색 바
        */}
        <SearchBox />
        {/**아이콘만 있는것 보다 로그인 버튼 있는게 더 나을듯! */}
        <Link href={"/login"}>
          <ProfileIcon />
        </Link>
      </section>
    </header>
  );
}
