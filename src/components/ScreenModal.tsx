import router from "next/router";
import React, { ReactNode, useContext, useState } from "react";
import Modal from "react-modal";
import { IoIosClose } from "react-icons/io";
// utilities
import { removeUndefinedObject } from "@/utilities/removeUndefinedObject";
// contexts
import { UtilitiesContext } from "@/contexts/UtilitiesContext";

type Props = {
  children: ReactNode;
  path?: string;
  modalIsOpen: boolean;
  setModalIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};
export const ScreenModal = ({
  path,
  children,
  modalIsOpen,
  setModalIsOpen,
}: Props) => {
  const { hiddenParams } = useContext(UtilitiesContext);

  const customStyles = {
    overlay: {
      position: "fixed",
      top: 0,
      left: 0,
      backgroundColor: "rgba(0,0,0,0.5)",
      zIndex: 9999,
      overflow: "auto",
      backdropFilter: "blur(3px)",
    },
    content: {
      top: "20px",
      left: "0",
      right: "0",
      bottom: "auto",
      margin: "auto",
      paddingBottom: "40px",
      border: "none",
      background: "none",
      width: "1000px",
      maxWidth: "100%",
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
  const new_query = hiddenParams && removeUndefinedObject(hiddenParams);
  const closeModal = () => {
    setModalIsOpen(false);
    if (path) {
      router.push({
        pathname: path,
        query: new_query,
      });
    } else {
      router.push("/");
    }
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
      className="hide-scrollbar"
    >
      <div className="relative bg-transparent p-5 ">
        <div className="bg-stripe h-full w-full rounded pt-[66px]">
          {children}
          <button
            onClick={closeModal}
            className="absolute right-3 top-3 flex h-7 w-7 items-center justify-center rounded-full bg-gray-600"
          >
            <IoIosClose className="text-xl text-gray-400" />
          </button>
        </div>
      </div>
    </Modal>
  );
};
