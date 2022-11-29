import Image from "next/image";
import React, { useContext } from "react";
import { RiImageAddLine } from "react-icons/ri";
import imageCompression from "browser-image-compression";
// contexts
import { AuthContext } from "@/contexts/AuthContext";

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
        setNewImage(compressed_file);
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
        <div className="relative flex h-[100px] w-[100px] items-center justify-center overflow-hidden rounded-full border-4 border-gray-700 bg-gray-800">
          {image && !newImage ? (
            <Image
              src={URL.createObjectURL(image)}
              alt=""
              loading="lazy"
              className=""
              quality={40}
              fill
              sizes="100vw"
              style={{
                objectFit: "cover",
              }}
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
                  alt=""
                  loading="lazy"
                  quality={40}
                  fill
                  sizes="100vw"
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
              alt=""
              loading="lazy"
              className=""
              quality={40}
              fill
              sizes="300px"
              style={{
                objectFit: "cover",
              }}
            />
          )}
          <div className="absolute left-0 top-0 right-0 bottom-0 m-auto flex items-center justify-center">
            <div className="translucent-black flex h-8 w-8 items-center justify-center rounded-full">
              <RiImageAddLine className="text-sm text-gray-300" />
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
