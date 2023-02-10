import Image from "next/image";
import type { FC, ReactNode } from "react";
import Modal from "react-modal";

import { CloseButton } from "@/components/elements/CloseButton";

type Props = {
  children: ReactNode;
  modalIsOpen: boolean;
  setModalIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};
export const BaseModal: FC<Props> = ({ children, modalIsOpen, setModalIsOpen }) => {
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
      <div className="bg-transparent p-5 ">
        <div className=" flex w-full flex-col gap-3 rounded-xl bg-white px-5 pt-5 pb-7">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold">
              <Image src="/logo.svg" width={55} height={22} alt="title" className="mt-[2px] inline" />
            </h3>
            <button onClick={closeModal}>
              <CloseButton />
            </button>
          </div>
          {children}
          {/* <button onClick={closeModal} className="absolute right-5 top-5">
            <CloseButton />
          </button> */}
        </div>
      </div>
    </Modal>
  );
};
