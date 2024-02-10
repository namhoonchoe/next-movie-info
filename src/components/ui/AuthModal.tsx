import Link from "next/link";
import { useEffect, useRef } from "react";

type AuthModalType = {
  isOpen: boolean;
};

const AuthModal: React.FC<AuthModalType> = ({ isOpen }) => {
  const modalRef = useRef<HTMLDialogElement>(null);

  const openModal = () => {
    modalRef.current?.showModal();
  };

  const closeModal = () => {
    modalRef.current?.close();
  };

  useEffect(() => {
    if (isOpen) {
      openModal();
    }

    return () => {
      closeModal();
    };
  }, [isOpen]);

  return (
    <dialog ref={modalRef} className="modal ">
      <div className="modal-box">
        <h3 className="font-bold text-lg">Hello!</h3>
        <p>
          로그인이 필요한 서비스 입니다
          <br /> 로그인 하시겠습니까?
        </p>
        <div className="modal-action">
          <form
            method="dialog"
            className="flex items-center justify-start gap-4"
          >
            <Link href={"/signin"}>
              <button>로그인</button>
            </Link>
            <button>닫기</button>
          </form>
        </div>
      </div>
    </dialog>
  );
};

export default AuthModal;
