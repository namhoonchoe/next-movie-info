import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import ProfileIcon from "../svgIcons/ProfileIcon";
import SearchBox from "./SearchBox";

export default function LayoutHeader() {
  const { status } = useSession();
  console.log(status);
  return (
    <header className="w-full h-14 px-6 py-2 bg-white shadow-[-1px_0px_0_1px_rgba(230,230,230,1)] justify-between items-center inline-flex sticky top-0 z-[999] grid-header  ">
      <p className="text-black text-xl font-bold font-['Inter']">로고</p>
      <section className="h-10 px-2 justify-between items-center flex gap-4">
        <SearchBox />

        {status === "authenticated" ? (
          <details className="dropdown dropdown-bottom dropdown-end">
          <summary className="m-1 btn btn-circle"> <ProfileIcon /></summary>
          <ul className="p-2 shadow menu dropdown-content z-[1] bg-base-100 rounded-box w-52">
            <li onClick={() => signOut({callbackUrl:"/"})}><a>로그아웃</a></li>
            <li><a>Item 2</a></li>
          </ul>
        </details>
        ) : (
          <div className="flex justify-start items-center gap-2 ">
            <Link href={"/signin"}>
              <button className="btn btn-sm btn-primary">
                <p className="text-sm"> 로그인</p>
              </button>
            </Link>
            <Link href={"/signup"}>
              <button className="btn btn-sm btn-accent">
                <p className="text-sm"> 회원가입</p>
              </button>
            </Link>
          </div>
        )}
      </section>
    </header>
  );
}
