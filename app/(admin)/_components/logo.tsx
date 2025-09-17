import Image from "next/image";

const Logo = () => {
  return (
    <Image
      height={120}
      width={120}
      alt="logo"
      src="/logo.png"
      className=" m-1 rounded-md "
    />
  );
};

export default Logo;
