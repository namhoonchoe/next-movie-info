import { Kbd } from "flowbite-react";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import CloseIcon from "../svgIcons/CloseIcon";
import SearchIcon from "../svgIcons/SearchIcon";

export default function SearchBox() {
  const modalRef = useRef<HTMLDialogElement>(null);
  const inputRef = useRef(null);

  const [keyword, setKeyword] = useState<string>("");

  const router = useRouter();

  const changeHandler: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setKeyword(e.target.value)
  };

  const handleReset: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
    setKeyword("");
  };

  const submitHandler: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    router.push(`/search/${keyword}`);
    setKeyword("");
    modalRef.current?.close();
  };

  const openModal = () => {
    modalRef.current?.showModal();
  };

  const keyDownHandler = (event: KeyboardEvent) => {
    if (event.ctrlKey && event.key === "k") {
      event.preventDefault();
      openModal();
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", keyDownHandler);

    return () => {
      window.removeEventListener("keydown", keyDownHandler);
    };
  });

  return (
    <>
      <div
        className="w-[251px] flex items-center justify-between h-12 relative bg-slate-200 rounded-3xl px-4"
        onClick={() => openModal()}
      >
        <div className="  flex justify-start items-center gap-1  ">
          <SearchIcon />
          <p>검색</p>
        </div>
        <div className="flex justify-start items-center gap-1 *:text-xs">
          <Kbd>Ctrl</Kbd>

          <Kbd>K</Kbd>
        </div>
      </div>
      <dialog ref={modalRef} className="modal ">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Hello!</h3>
          <form onSubmit={submitHandler} className="form-control relative">
            {keyword !== "" ? (
              <>
                <input
                  type="text"
                  defaultValue={keyword}
                  value={keyword}
                  required
                  placeholder="검색"
                  onChange={changeHandler}
                  className="input input-bordered h-full w-full px-[19px] "
                />

                <button
                  className="z-1 btn btn-circle btn-ghost btn-xs   absolute right-2 top-2"
                  type="reset"
                  onClick={handleReset}
                >
                  <CloseIcon />
                </button>
              </>
            ) : (
              <input
                className="input input-bordered h-full w-full px-[19px] "
                placeholder="검색"
                value={keyword}
                required
                type="text"
                onChange={changeHandler}
              ></input>
            )}
          </form>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </>
  );
}
