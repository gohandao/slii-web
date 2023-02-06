import { useAtom } from "jotai";
import { useRouter } from "next/router";
import type { FC, ReactNode } from "react";
import Modal from "react-modal";

import { screenModalAtom } from "@/state/utilities.state";

type Props = {
  children: ReactNode;
};
export const ScreenModal: FC<Props> = ({ children }) => {
  const router = useRouter();
  const [screenModal, setScreenModal] = useAtom(screenModalAtom);
  Modal.setAppElement("#__next");
  const afterOpenModal = () => {
    // モーダルが開いた後の処理
  };

  // モーダルを閉じる処理
  const closeModal = () => {
    setScreenModal(false);
    router.back();
  };
  return (
    <Modal
      // isOpenがtrueならモダールが起動する
      isOpen={screenModal}
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
          right: "0",
        },
      }}
      className="hide-scrollbar	"
    >
      <div className="relative overflow-y-auto bg-transparent py-[66px] px-5 lg:pl-[300px]">
        <div className={`h-full w-full pb-5 lg:pb-0`}>
          {children}
          {/* <button
            onClick={() => {
              closeModal();
            }}
            className="absolute right-3 top-3 flex h-7 w-7 items-center justify-center rounded-full bg-gray-600"
          >
            <IoIosClose className="text-xl text-gray-400" />
          </button> */}
        </div>
      </div>
    </Modal>
  );
};
