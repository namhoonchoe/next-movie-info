import { useRouter } from "next/router";

export default function BreadCrumbs() {
  const { pathname } = useRouter();
  const splitPath = pathname.split("/");

  return (
    <div className="text-md capitalize breadcrumbs  ">
      <ul>
        <p>home</p>
        {splitPath.map((path, index) => (
          <li key={index}>
            <p>{path}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
