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
      <div className="w-[251px] h-12 relative bg-zinc-300 rounded-3xl" onClick={() => openModal()}>
        <div className="w-6 h-6 left-[19px] top-[12px] absolute">
          <SearchIcon />
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
