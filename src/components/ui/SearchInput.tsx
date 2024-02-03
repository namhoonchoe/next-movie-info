import { Kbd } from "flowbite-react";
import { useEffect, useRef } from "react";
import SearchIcon from "../svgIcons/SearchIcon";

export default function SearchInput() {
  const modalRef = useRef<HTMLDialogElement>(null);

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
      <dialog ref={modalRef} className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Hello!</h3>
          <p className="py-4">Press ESC key or click outside to close</p>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </>
  );
}
