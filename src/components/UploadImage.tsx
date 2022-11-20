import React, { useState, useContext, useEffect } from "react";
import Image from "next/image";
import axios from "axios";
import { AuthContext } from "@/contexts/AuthContext";
import { TiDelete } from "react-icons/ti";
import { RiImageAddLine } from "react-icons/ri";
import imageCompression from "browser-image-compression";
import { getImageUrl, supabase } from "@/libs/supabase";

export type Props = {
  // uploadImages: File[];
  // setUploadImages: (value: React.SetStateAction<File[]>) => void;
  image: File | undefined;
  newImage: File | undefined;
  setNewImage: (value: React.SetStateAction<File | undefined>) => void;
};

export const UploadImage = ({ image, newImage, setNewImage }: Props) => {
  const { user, profile, avatar, setAvatar } = useContext(AuthContext);

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

  // const handleOnRemoveImage = (index: number) => {
  //   // 選択した画像は削除可能
  //   const newImages = [...images];
  //   newImages.splice(index, 1);
  //   setImages(newImages);
  // };

  return (
    <div>
      {/* 1つのボタンで画像を選択する */}
      <label htmlFor="profile_image" className="inline-flex">
        <input
          id="profile_image"
          type="file"
          // multiple
          accept="image/*,.png,.jpg,.jpeg,.gif"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            handleOnAddImage(e)
          }
          className="hidden"
        />
        <div className="w-[100px] h-[100px] flex relative rounded-full bg-gray-800 border-4 border-gray-700 overflow-hidden items-center justify-center">
          {image && !newImage ? (
            <Image
              src={URL.createObjectURL(image)}
              layout="fill"
              objectFit="cover"
              alt=""
              loading="lazy"
              className=""
            />
          ) : (
            newImage && (
              <>
                {/* <img src={URL.createObjectURL(images[0])} alt="" className="" /> */}
                {/* <img
                  //@ts-ignore
                  // src={URL.createObjectURL(images[0])}
                  src={URL.createObjectURL(newImage)}
                  alt=""
                  loading="lazy"
                  className="image-fill"
                /> */}
                <Image
                  //@ts-ignore
                  // src={URL.createObjectURL(images[0])}
                  src={URL.createObjectURL(newImage)}
                  layout="fill"
                  alt=""
                  loading="lazy"
                />
                {/*<button
                  onClick={() => handleOnRemoveImage(0)}
                  className="left-0 top-0"
                >
                  <TiDelete />
            </button>*/}
              </>
            )
          )}
          {!avatar && !image && (
            <Image
              src="/default-avatar.jpg"
              layout="fill"
              objectFit="cover"
              alt=""
              loading="lazy"
              className=""
            />
          )}
          <div className="absolute left-0 top-0 right-0 bottom-0 m-auto flex items-center justify-center">
            <div className="w-8 h-8 rounded-full flex justify-center items-center translucent-black">
              <RiImageAddLine className="text-gray-300 text-sm" />
            </div>
          </div>
        </div>
      </label>
      {/*images.map((image, i) => (
        <div
          key={i}
          style={{
            position: "relative",
            width: "40%",
          }}
        >
          <button
            aria-label="delete image"
            style={{
              position: "absolute",
              top: 10,
              left: 10,
              color: "#aaa",URL
            }}
            onClick={() => handleOnRemoveImage(i)}
          >
            delete{" "}
          </button>
          <img
            src={URL.createObjectURL(image)}
            style={{
              width: "100%",
            }}
          />
        </div>
          ))*/}
    </div>
  );
};
