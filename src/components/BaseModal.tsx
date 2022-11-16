import React, { ReactNode, useState } from "react";
import { IoIosClose } from "react-icons/io";
import Modal from "react-modal";

type Props = {
  children: ReactNode;
  modalIsOpen: boolean;
  setModalIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};
export const BaseModal = ({ children, modalIsOpen, setModalIsOpen }: Props) => {
  const customStyles = {
    overlay: {
      position: "fixed",
      top: 0,
      left: 0,
      backgroundColor: "rgba(0,0,0,0.5)",
      zIndex: 9999,
    },

    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      padding: "0",
      border: "none",
      background: "none",
      width: "500px",
      maxWidth: "100%",
      // height: "300px",
      transform: "translate(-50%, -50%)",
    },
  };
  Modal.setAppElement("#__next");
  // const [modalIsOpen, setModalIsOpen] = useState(false);
  // モーダルを開く処理
  const openModal = () => {
    setModalIsOpen(true);
  };
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
      //@ts-ignore
      style={customStyles}
    >
      <div className="relative p-5 bg-transparent ">
        {children}
        <button
          onClick={closeModal}
          className="absolute right-3 top-3 w-7 h-7 bg-gray-600 rounded-full flex items-center justify-center"
        >
          <IoIosClose className="text-gray-400 text-xl" />
        </button>
      </div>
    </Modal>
  );
};
