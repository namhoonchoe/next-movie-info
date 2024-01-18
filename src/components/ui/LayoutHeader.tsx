export default function LayoutHeader() {
  return (
    <header className="w-full h-16 px-6 py-2 bg-white shadow-[-1px_0px_0_1px_rgba(0,0,0,0.3)] justify-between items-center inline-flex z-10 fixed top-0">
      <p className="text-black text-xl font-bold font-['Inter']">로고</p>
      <section className="w-[332px] h-12 px-2 justify-between items-center flex">
        <div className="w-[251px] h-12 relative bg-zinc-300 rounded-3xl">
          <div className="w-6 h-6 left-[19px] top-[12px] absolute">
            <div className="w-6 h-6 left-0 top-0 absolute bg-zinc-300" />
          </div>
        </div>
        <div className="w-12 h-12 relative">
          <div className="w-12 h-12 left-0 top-0 absolute bg-zinc-300" />
        </div>
      </section>
    </header>
  );
}
