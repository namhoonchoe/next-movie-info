import { useRouter } from "next/router";

export default function BreadCrumbs() {
  const { pathname } = useRouter();
  const splitPath = pathname.split("/").splice(1);

  return (
    <div className="prose prose-sm prose-slate font-bold capitalize breadcrumbs my-2">
      <ul className="my-0 p-0 *:my-0 flex items-center">
        <li className="*:my-0">
          <p>Home</p>
        </li>
        {splitPath.map((path, index) => (
          <li key={index} className="*:my-0">
            <p>{path}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
