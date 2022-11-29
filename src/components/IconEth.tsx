import Image from "next/image";
export const IconEth = () => {
  return (
    <div className="flex w-4 items-center">
      <Image
        src="/icon-eth.svg"
        width={16}
        height={16}
        alt=""
        className=""
        style={{
          maxWidth: "100%",
          height: "auto",
        }}
      />
    </div>
  );
};
