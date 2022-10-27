import React, { useState, useContext, useEffect } from "react";
import Image from "next/image";
import axios from "axios";
import { AuthContext } from "@/contexts/AuthContext";
import { TiDelete } from "react-icons/ti";
import { RiImageAddLine } from "react-icons/ri";
import imageCompression from "browser-image-compression";
import { getImageUrl, supabase } from "@/libs/supabase";
import { IoClose, IoCloseOutline } from "react-icons/io5";

export type Props = {
  // uploadImages: File[];
  // setUploadImages: (value: React.SetStateAction<File[]>) => void;
  image: File | undefined;
  setImage: (value: React.SetStateAction<File | undefined>) => void;
};

export const UploadBackground = ({ image, setImage }: Props) => {
  // const [images, setImages] = useState<File[]>([]);
  // const [image, setImage] = useState<File>();

  const options = {
    maxSizeMB: 1, // 最大ファイルサイズ
    maxWidthOrHeight: 500, // 最大画像幅もしくは高さ
    maxWidthOrWidth: 500, // 最大画像幅もしくは高さ
  };

  const handleOnAddImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    if (e.target.files[0]) {
      let current_prototype = image && Object.getPrototypeOf(image);
      let new_prototype = Object.getPrototypeOf(e.target.files[0]);
      if (new_prototype != current_prototype) {
        const compressed_file = await imageCompression(
          e.target.files[0],
          options
        );
        // const compressed_file = e.target.files[0];
        setImage(compressed_file);
        // console.log("e.target.files[0]");
        // console.log(e.target.files[0]);
        // console.log(Object.getPrototypeOf(e.target.files[0]));
        // console.log(compressed_file);
        // console.log(Object.getPrototypeOf(compressed_file));
      }
    }
    // setImages([...images, ...e.target.files]);
  };

  const handleOnRemoveImage = () => {
    setImage(undefined);
  };
  // const handleOnRemoveImage = (index: number) => {
  //   // 選択した画像は削除可能
  //   const newImages = [...images];
  //   newImages.splice(index, 1);
  //   setImages(newImages);
  // };

  return (
    <div className="w-full h-full">
      {/* 1つのボタンで画像を選択する */}
      <label htmlFor="background_image" className="">
        <input
          id="background_image"
          type="file"
          // multiple
          accept="image/*,.png,.jpg,.jpeg,.gif"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            handleOnAddImage(e)
          }
          className="hidden"
        />
        <div className="w-full h-full flex relative bg-gray-700 overflow-hidden items-center justify-center">
          {image ? (
            <Image
              src={URL.createObjectURL(image)}
              layout="fill"
              objectFit="cover"
              alt=""
              loading="lazy"
              className="opacity-50"
            />
          ) : (
            image && (
              <>
                {/* <img src={URL.createObjectURL(images[0])} alt="" className="" /> */}
                <img
                  //@ts-ignore
                  // src={URL.createObjectURL(images[0])}
                  src={URL.createObjectURL(image)}
                  alt=""
                  loading="lazy"
                  className="image-fill opacity-50"
                />
              </>
            )
          )}
          <div className="absolute left-0 top-0 right-0 bottom-0 m-auto flex items-center justify-center gap-4">
            <div className="w-8 h-8 rounded-full flex justify-center items-center translucent-black">
              <RiImageAddLine className="text-gray-300 text-sm" />
            </div>
            {image && (
              <button
                onClick={(e) => {
                  e.preventDefault();
                  handleOnRemoveImage();
                }}
                className="w-8 h-8 rounded-full flex justify-center items-center translucent-black"
              >
                <IoClose className="text-gray-300 text-sm" />
              </button>
            )}
          </div>
        </div>
      </label>
    </div>
  );
};
