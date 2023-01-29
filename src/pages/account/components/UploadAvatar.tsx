import imageCompression from "browser-image-compression";
import Image from "next/image";
import type { FC } from "react";
import { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";
import { RiImageAddLine } from "react-icons/ri";

export type Props = {
  image?: string;
};

export const OPTIONS = {
  maxSizeMB: 1, // 最大ファイルサイズ
  maxWidthOrHeight: 500, // 最大画像幅もしくは高さ
  maxWidthOrWidth: 500, // 最大画像幅もしくは高さ
};

export const handleCompressImage = async (image: string, file: File) => {
  if (!file) return;
  const current_prototype = image && (Object.getPrototypeOf(image) as File);
  const new_prototype = Object.getPrototypeOf(file) as File;
  if (new_prototype !== current_prototype) {
    return await imageCompression(file, OPTIONS);
  }
};

export const UploadAvatar: FC<Props> = ({ image }) => {
  const [newImage, setNewImage] = useState<File | undefined>(undefined);
  const { register, watch } = useFormContext();

  const val = watch("profile_image");
  useEffect(() => {
    if (typeof val?.[0] !== undefined) {
      setNewImage(val?.[0]);
    }
  }, [val]);

  // const handleOnRemoveImage = (index: number) => {
  //   // 選択した画像は削除可能
  //   const newImages = [...images];
  //   newImages.splice(index, 1);
  //   setImages(newImages);
  // };

  return (
    <div>
      <label htmlFor="profile_image" className="inline-flex">
        <input
          id="profile_image"
          type="file"
          accept="image/*,.png,.jpg,.jpeg,.gif"
          className="hidden"
          {...register("profile_image")}
        />
        <div className="relative flex h-[56px] w-[56px] items-center justify-center overflow-hidden rounded-full border-2 border-gray-300 bg-gray-200">
          {image && !newImage ? (
            <Image
              src={image}
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
                  src={URL.createObjectURL(newImage)}
                  alt=""
                  loading="lazy"
                  quality={40}
                  fill
                  sizes="100vw"
                  style={{
                    objectFit: "cover",
                  }}
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
          {!image && !newImage && <DefaultImage />}
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

const DefaultImage: FC = () => {
  return (
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
  );
};
