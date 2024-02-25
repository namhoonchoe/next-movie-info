import { Modal } from "flowbite-react";
import Link from "next/link";

type AuthModalType = {
  isOpen: boolean;
  closeModal: () => void;
};

const AuthModal: React.FC<AuthModalType> = ({ isOpen, closeModal }) => {
  return (
    <Modal show={isOpen} size="md" onClose={closeModal} popup>
      <Modal.Header />
      <Modal.Body>
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
              <button className="btn btn-sm bg-emerald-500 text-white">
                로그인
              </button>
            </Link>
            <button className="btn btn-sm btn-ghost" onClick={closeModal}>
              닫기
            </button>
          </form>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default AuthModal;
