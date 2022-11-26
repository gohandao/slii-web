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
  newImage: File | undefined;
  setNewImage: (value: React.SetStateAction<File | undefined>) => void;
};

export const UploadBackground = ({ image, newImage, setNewImage }: Props) => {
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
        setNewImage(compressed_file);
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
    setNewImage(undefined);
  };
  // const handleOnRemoveImage = (index: number) => {
  //   // 選択した画像は削除可能
  //   const newImages = [...images];
  //   newImages.splice(index, 1);
  //   setImages(newImages);
  // };

  return (
    <div className="h-full w-full">
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
        <div className="relative flex h-full w-full items-center justify-center overflow-hidden bg-gray-700">
          {newImage ? (
            <Image
              src={URL.createObjectURL(newImage)}
              alt=""
              loading="lazy"
              className="opacity-50"
              quality={40}
              fill
              sizes="100vw"
              style={{
                objectFit: "cover",
              }}
            />
          ) : (
            image && (
              <>
                {/* <img src={URL.createObjectURL(images[0])} alt="" className="" /> */}
                {/* <img
                  //@ts-ignore
                  // src={URL.createObjectURL(images[0])}
                  src={URL.createObjectURL(image)}
                  alt=""
                  loading="lazy"
                  className="image-fill opacity-50"
                  /> */}
                <Image
                  src={URL.createObjectURL(image)}
                  alt=""
                  quality={40}
                  fill
                  sizes="100vw"
                />
              </>
            )
          )}
          <div className="absolute left-0 top-0 right-0 bottom-0 m-auto flex items-center justify-center gap-4">
            <div className="translucent-black flex h-8 w-8 items-center justify-center rounded-full">
              <RiImageAddLine className="text-sm text-gray-300" />
            </div>
            {image && (
              <button
                onClick={(e) => {
                  e.preventDefault();
                  handleOnRemoveImage();
                }}
                className="translucent-black flex h-8 w-8 items-center justify-center rounded-full"
              >
                <IoClose className="text-sm text-gray-300" />
              </button>
            )}
          </div>
        </div>
      </label>
    </div>
  );
};
