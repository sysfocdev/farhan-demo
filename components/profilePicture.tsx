"use client";
import Image from "next/image";
import { useState } from "react";

export default function ProfilePicture({
  image,
  size = 40,
}: {
  image?: string;
  size?: number;
}) {
  const PFP = "/images/PFP.webp";
  const [imgSrc, setImgSrc] = useState(image || PFP);

  return (
    <div
      className="rounded-full overflow-hidden flex justify-center items-center cursor-pointer shadow-light"
      style={{ width: size, height: size }}
    >
      <Image
        unoptimized
        src={imgSrc || PFP}
        key={image}
        width={size}
        height={size}
        alt="profile picture"
        className="object-cover w-full h-full"
        onError={() => setImgSrc(PFP)}
      />
    </div>
  );
}
