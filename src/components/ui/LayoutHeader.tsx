import ProfileIcon from "../svgIcons/ProfileIcon";
import SearchIcon from "../svgIcons/SearchIcon";


export default function LayoutHeader() {
  return (
    <header className="w-full h-16 px-6 py-2 bg-white shadow-[-1px_0px_0_1px_rgba(0,0,0,0.3)] justify-between items-center inline-flex sticky top-0 z-[999] grid-header  ">
      <p className="text-black text-xl font-bold font-['Inter']">로고</p>
      <section className="w-[332px] h-12 px-2 justify-between items-center flex">
        {/*
        검색 바
        */}
        <div className="w-[251px] h-12 relative bg-zinc-300 rounded-3xl">
          <div className="w-6 h-6 left-[19px] top-[12px] absolute">
            <SearchIcon/>
          </div>
        </div>
        { /**아이콘만 있는것 보다 로그인 버튼 있는게 더 나을듯! */}
        <ProfileIcon/>
      </section>
    </header>
  );
}
