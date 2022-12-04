import { useRouter } from "next/router";
import type { ReactNode } from "react";
import { useContext } from "react";
import { IoIosClose } from "react-icons/io";
import Modal from "react-modal";

import { UtilitiesContext } from "@/contexts/UtilitiesContext";
import { removeUndefinedObject } from "@/utilities/removeUndefinedObject";

type Props = {
  children: ReactNode;
  modalIsOpen: boolean;
  path?: string;
  setModalIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};
export const ScreenModal = ({ children, modalIsOpen, path, setModalIsOpen }: Props) => {
  const router = useRouter();
  const { screen } = router.query;
  const { hiddenParams } = useContext(UtilitiesContext);

  Modal.setAppElement("#__next");
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
      style={{
        content: {
          background: "none",
          border: "none",
          bottom: "auto",
          left: "0",
          margin: "auto",
          maxWidth: "100%",
          paddingBottom: "40px",
          right: "0",
          top: "20px",
          width: "1000px",
        },
        overlay: {
          backdropFilter: "blur(3px)",
          backgroundColor: "rgba(0,0,0,0.5)",
          left: 0,
          overflow: "auto",
          position: "fixed",
          top: 0,
          zIndex: 9999,
        },
      }}
      className="hide-scrollbar	"
    >
      <div className="relative bg-transparent p-5">
        <div className={`bg-stripe h-full w-full rounded pt-[66px] ${screen == "modal" && "lg:px-6"}`}>
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
