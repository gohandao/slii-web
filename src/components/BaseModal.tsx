import type { ReactNode } from "react";
import { IoIosClose } from "react-icons/io";
import Modal from "react-modal";

type Props = {
  children: ReactNode;
  modalIsOpen: boolean;
  setModalIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};
export const BaseModal = ({ children, modalIsOpen, setModalIsOpen }: Props) => {
  Modal.setAppElement("#__next");
  // モーダルを開く処理
  // const openModal = () => {
  //   setModalIsOpen(true);
  // };
  const afterOpenModal = () => {
    // モーダルが開いた後の処理
  };
  // モーダルを閉じる処理
  const closeModal = () => {
    setModalIsOpen(false);
  };
  return (
    <Modal
      // isOpenがtrueならモダールが起動する
      isOpen={modalIsOpen}
      // モーダルが開いた後の処理を定義
      onAfterOpen={afterOpenModal}
      // モーダルを閉じる処理を定義
      onRequestClose={closeModal}
      style={{
        content: {
          background: "none",
          border: "none",
          bottom: "auto",
          left: "50%",
          marginRight: "-50%",
          maxWidth: "100%",
          padding: "0",
          right: "auto",
          top: "50%",
          transform: "translate(-50%, -50%)",
          width: "500px",
        },
        overlay: {
          backgroundColor: "rgba(0,0,0,0.5)",
          left: 0,
          position: "fixed",
          top: 0,
          zIndex: 9999,
        },
      }}
    >
      <div className="relative bg-transparent p-5 ">
        {children}
        <button
          onClick={closeModal}
          className="absolute right-3 top-3 flex h-7 w-7 items-center justify-center rounded-full bg-gray-600"
        >
          <IoIosClose className="text-xl text-gray-400" />
        </button>
      </div>
    </Modal>
  );
};
