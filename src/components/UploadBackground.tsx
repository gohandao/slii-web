import imageCompression from "browser-image-compression";
import Image from "next/image";
import { IoClose } from "react-icons/io5";
import { RiImageAddLine } from "react-icons/ri";

export type Props = {
  image: File | undefined;
  newImage: File | undefined;
  setNewImage: (value: React.SetStateAction<File | undefined>) => void;
};
export const UploadBackground = ({ image, newImage, setNewImage }: Props) => {
  const options = {
    maxSizeMB: 1, // 最大ファイルサイズ
    maxWidthOrHeight: 500, // 最大画像幅もしくは高さ
    maxWidthOrWidth: 500, // 最大画像幅もしくは高さ
  };
  const handleOnAddImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    if (e.target.files[0]) {
      const current_prototype = image && Object.getPrototypeOf(image);
      const new_prototype = Object.getPrototypeOf(e.target.files[0]);
      if (new_prototype != current_prototype) {
        const compressed_file = await imageCompression(e.target.files[0], options);
        setNewImage(compressed_file);
      }
    }
  };
  const handleOnRemoveImage = () => {
    setNewImage(undefined);
  };

  return (
    <div className="h-full w-full">
      <label htmlFor="background_image" className="">
        <input
          id="background_image"
          type="file"
          accept="image/*,.png,.jpg,.jpeg,.gif"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            return handleOnAddImage(e);
          }}
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
                <Image src={URL.createObjectURL(image)} alt="" quality={40} fill sizes="100vw" />
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
